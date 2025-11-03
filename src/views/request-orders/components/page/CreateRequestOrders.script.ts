import { requestOrderService } from '@/services/requestOrder.service';
import type { CreateRequestOrderPayload } from '@/types/request-order.type';
import { Motion } from '@motionone/vue';
import { usePrimeVue } from 'primevue/config';
import FileUpload from 'primevue/fileupload';
import Menu from 'primevue/menu';
import ProgressBar from 'primevue/progressbar';
import { useToast } from 'primevue/usetoast';
import { ComponentPublicInstance, computed, defineComponent, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { BudgetItem, BudgetOption, Item, ItemOption } from '../../../../types/request-order.type';
import BudgetInfoCard from '../card/BudgetInfoCard.vue';
import CreateROModal from '../modal/CreateRo.vue';
import PreviewRo, { type PreviewSummary } from '../modal/PreviewRo.vue';
import { getCurrentUsername, getCurrentProjectName, getCurrentProjectId } from '@/utils/contextHelper';
import { useConfirm } from 'primevue/useconfirm';
import ConfirmDialog from 'primevue/confirmdialog';

type MenuInstance = ComponentPublicInstance & {
    toggle: (event: Event) => void;
};

export default defineComponent({
    name: 'CreateRequestOrders',
    components: { Motion, BudgetInfoCard, Menu, CreateROModal, PreviewRo, FileUpload, ProgressBar },
    setup() {
        const router = useRouter();
        const route = useRoute();
        const toast = useToast();
        const $primevue = usePrimeVue();

        const calendarValue = ref<Date | null>(null);
        const roNumber = ref('RO2510-0001');
        const budgetType = ref('Budgeted Item');
        const roDate = ref('');

        const budgetOptions = ref<BudgetOption[]>([
            { label: 'Budgeted Item', value: 'Budgeted Item' },
            { label: 'Unbudgeted Item', value: 'Unbudgeted Item' }
        ]);

        const items = ref<Item[]>([]);
        const itemOptions = ref<ItemOption[]>([
            { label: 'STL-01', value: 'STL-01', description: 'Steel reinforcement bar 60mm', location: 'Building A > Level 1-5', uom: 'Ton' },
            { label: 'CEM-02', value: 'CEM-02', description: 'Cement Portland Type I', location: 'Building B > Level 1-8', uom: 'Bag' }
        ]);

        const showBulkItemModal = ref(false);
        const showPreviewModal = ref(false);
        const menuRefs = ref<(MenuInstance | null)[]>([]);

        // File upload states
        const totalSize = ref(0);
        const totalSizePercent = ref(0);
        const files = ref<File[]>([]);
        const overallRemark = ref('');
        const MAX_FILE_SIZE = 1_000_000;
        const attachments = ref<Array<File | AttachmentItem>>([]); // unified array
        const newAttachments = ref<File[]>([]);
        const existingAttachments = ref<AttachmentItem[]>([]);
        const isAttachmentValid = ref(true);
        const showValidation = ref(false);
        const confirm = useConfirm();
        const budgetSwitching = ref(false);

        // Load draft data if coming from draft modal
        onMounted(async () => {
            if (route.query.mode === 'edit-draft' && route.query.draftId) {
                const draftId = route.query.draftId as string;

                try {
                    const res = await requestOrderService.getRequestOrderById(draftId);
                    const draft = res.data;
                    if (!draft) return;

                    // Basic fields
                    roNumber.value = draft.DocNo;
                    budgetType.value = draft.PrType === 'Budgeted' ? 'Budgeted Item' : 'Unbudgeted Item';
                    overallRemark.value = draft.Remark || '';
                    if (draft.RequestOrderDate) calendarValue.value = new Date(draft.RequestOrderDate);

                    // Items
                    items.value = (draft.requestorderitems || draft.RequestOrderItems || []).map((item: any) => ({
                        itemCode: item.ItemCode || '',
                        description: item.Description || '',
                        location: item.Location || '',
                        uom: item.Uom || item.Unit || '',
                        quantity: item.Quantity?.toString() || '',
                        price: Number(item.Rate ?? 0),
                        deliveryDate: item.DeliveryDate ? new Date(item.DeliveryDate) : null,
                        notes: item.Notes || '',
                        remark: item.Remark || '',
                        showNotes: false,
                        showRemark: false
                    }));

                    if (draft.Attachment) {
                        const parsedAttachments = JSON.parse(draft.Attachment);
                        existingAttachments.value = parsedAttachments.map((att: any) => ({
                            filename: att.filename,
                            path: att.path.replace(/\\/g, '/'),
                            size: att.size,
                            type: att.type
                        }));
                        attachments.value = [...existingAttachments.value];
                    }

                    toast.add({
                        severity: 'info',
                        summary: 'Draft Loaded',
                        detail: `Loaded draft ${draft.DocNo} with ${attachments.value.length} attachment(s)`,
                        life: 3000
                    });
                } catch (error) {
                    toast.add({
                        severity: 'error',
                        summary: 'Failed to Load Draft',
                        detail: 'Could not fetch draft data. Please try again.',
                        life: 5000
                    });
                }
            }
        });

        watch(budgetType, (newType, oldType) => {
            if (budgetSwitching.value || newType === oldType) return;

            if (items.value.length === 0 && attachments.value.length === 0 && !overallRemark.value.trim()) {
                resetFormForType(newType);
                return;
            }

            budgetSwitching.value = true; // prevent re-triggering

            confirm.require({
                message: `Switching from "${oldType}" to "${newType}" will clear all filled data to avoid conflicts. Continue?`,
                header: 'Confirm Type Change',
                icon: 'pi pi-exclamation-triangle',
                acceptLabel: 'Yes, Reset',
                rejectLabel: 'Cancel',
                acceptClass: 'p-button-danger',
                rejectClass: 'p-button-text',
                accept: () => {
                    confirm.close();
                    resetFormForType(newType);
                    toast.add({
                        severity: 'info',
                        summary: 'Form Reset',
                        detail: `Form refreshed for ${newType}.`,
                        life: 2500
                    });
                    budgetSwitching.value = false;
                },
                reject: () => {
                    confirm.close();
                    budgetSwitching.value = true;
                    budgetType.value = oldType;
                    setTimeout(() => {
                        budgetSwitching.value = false;
                    });
                }
            });
        });

        function resetFormForType(type: string) {
            items.value = [];
            attachments.value = [];
            newAttachments.value = [];
            existingAttachments.value = [];
            overallRemark.value = '';

            if (type === 'Budgeted Item') {
                itemOptions.value = [
                    {
                        label: 'STL-01',
                        value: 'STL-01',
                        description: 'Steel reinforcement bar 60mm',
                        location: 'Building A > Level 1-5',
                        uom: 'Ton'
                    },
                    {
                        label: 'CEM-02',
                        value: 'CEM-02',
                        description: 'Cement Portland Type I',
                        location: 'Building B > Level 1-8',
                        uom: 'Bag'
                    }
                ];
            } else {
                itemOptions.value = [
                    {
                        label: 'GEN-01',
                        value: 'GEN-01',
                        description: 'General unbudgeted material',
                        location: '-',
                        uom: 'Unit'
                    },
                    {
                        label: 'OTH-02',
                        value: 'OTH-02',
                        description: 'Miscellaneous unbudgeted item',
                        location: '-',
                        uom: 'Unit'
                    }
                ];
            }
        }

        const onRemoveTemplatingFile = (file: File, removeFileCallback: (index: number) => void, index: number) => {
            removeFileCallback(index);
            totalSize.value -= file.size;
            totalSizePercent.value = Math.min((totalSize.value / 1000000) * 100, 100);
        };

        const onClearTemplatingUpload = (clear: () => void) => {
            clear();
            totalSize.value = 0;
            totalSizePercent.value = 0;
        };

        const uploadEvent = (callback: () => void) => {
            totalSizePercent.value = Math.min((totalSize.value / 1000000) * 100, 100);
            callback();
        };

        const onTemplatedUpload = () => {
            toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
        };

        const formatSize = (bytes: number) => {
            const k = 1024;
            const dm = 3;
            const sizes = $primevue.config.locale.fileSizeTypes;
            if (bytes === 0) return `0 ${sizes[0]}`;
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
            return `${formattedSize} ${sizes[i]}`;
        };

        const addItem = () => {
            items.value.push({
                itemCode: '',
                description: '',
                location: '',
                uom: '',
                quantity: '1',
                price: 0,
                deliveryDate: null,
                notes: '',
                remark: '',
                showNotes: false,
                showRemark: false
            });
        };

        const fillItemDetails = (item: Item) => {
            const selected = itemOptions.value.find((opt) => opt.value === item.itemCode);
            if (selected) {
                item.description = selected.description;
                item.uom = selected.uom;
                item.location = selected.location;
            }
        };

        const getItemLabel = (value: string): string => {
            const selected = itemOptions.value.find((opt) => opt.value === value);
            return selected ? selected.label : value;
        };

        const toggleMenu = (event: Event, index: number) => {
            const menu = menuRefs.value[index];
            if (menu) menu.toggle(event);
        };

        const getActionItems = (item: Item, index: number) => [
            {
                label: 'Delete Item',
                icon: 'pi pi-trash',
                command: () => {
                    items.value.splice(index, 1);
                    menuRefs.value.splice(index, 1);
                }
            },
            {
                label: item.showNotes ? 'Hide Note' : 'Add Note',
                icon: 'pi pi-file',
                command: () => {
                    item.showNotes = !item.showNotes;
                }
            }
        ];

        const setMenuRef = (el: MenuInstance | null, index: number) => {
            if (el) menuRefs.value[index] = el;
        };

        const openBulkItemModal = () => {
            if (budgetType.value === 'Budgeted Item') {
                showBulkItemModal.value = true;
            }
        };

        const handleSelectedItems = (selectedBudgetItems: BudgetItem[]) => {
            const newItems: Item[] = selectedBudgetItems.map((budgetItem) => ({
                itemCode: budgetItem.itemCode,
                description: budgetItem.description,
                location: budgetItem.location,
                uom: budgetItem.uom,
                quantity: budgetItem.quantity.toString(),
                deliveryDate: null,
                notes: '',
                remark: '',
                price: budgetItem.price,
                showNotes: false,
                showRemark: false
            }));

            items.value.push(...newItems);

            selectedBudgetItems.forEach((budgetItem) => {
                const existingOption = itemOptions.value.find((opt) => opt.value === budgetItem.itemCode);
                if (!existingOption) {
                    itemOptions.value.push({
                        label: budgetItem.itemCode,
                        value: budgetItem.itemCode,
                        description: budgetItem.description,
                        location: budgetItem.location,
                        uom: budgetItem.uom
                    });
                }
            });

            toast.add({
                severity: 'success',
                summary: 'Items Added Successfully',
                detail: `${selectedBudgetItems.length} ${selectedBudgetItems.length === 1 ? 'item has' : 'items have'} been added from budget`,
                life: 3000
            });
        };

        function removeAttachment(index: number) {
            const removed = attachments.value.splice(index, 1)[0];

            // If it's an existing attachment, also remove from existingAttachments
            if ('path' in removed) {
                existingAttachments.value = existingAttachments.value.filter((att) => att.path !== removed.path);
            } else {
                newAttachments.value = newAttachments.value.filter((f) => f !== removed);
            }

            console.log('Attachments after removal:', attachments.value);
        }

        // Preview/download existing attachment
        function previewAttachment(file: AttachmentItem) {
            const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://103.16.42.51:9001';
            const url = `${baseUrl}/${file.path}`;
            window.open(url, '_blank');
        }

        const onSelectedFiles = (event) => {
            attachments.value = event.files;
            let totalSizeTemp = 0;
            let valid = true;

            attachments.value.forEach((file) => {
                totalSizeTemp += file.size;
                if (file.size > MAX_FILE_SIZE) valid = false;
            });

            totalSize.value = totalSizeTemp;
            totalSizePercent.value = (totalSize.value / MAX_FILE_SIZE) * 100;

            if (!valid || totalSize.value > MAX_FILE_SIZE) {
                toast.add({
                    severity: 'error',
                    summary: 'File too large',
                    detail: `Each file must not exceed ${formatBytes(MAX_FILE_SIZE)}.`,
                    life: 5000
                });
                isAttachmentValid.value = false;
            } else {
                isAttachmentValid.value = true;
            }
        };

        const formatBytes = (bytes: number) => {
            const sizes = ['B', 'KB', 'MB', 'GB'];
            if (bytes === 0) return '0 B';
            const i = Math.floor(Math.log(bytes) / Math.log(1024));
            return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
        };

        const grandTotal = computed(() => {
            return items.value.reduce((sum, item) => {
                const price = item.price ?? 0;
                const qty = parseFloat(item.quantity) || 0;
                return sum + price * qty;
            }, 0);
        });

        const canSubmit = computed(() => {
            const hasItems = items.value.length > 0;
            const hasRoNumber = roNumber.value.trim() !== '';
            const hasRoDate = calendarValue.value !== null;
            const hasBudgetType = budgetType.value !== '';

            return hasItems && hasRoNumber && hasRoDate && hasBudgetType;
        });

        const previewSummary = computed<PreviewSummary>(() => ({
            totalItems: items.value.length,
            totalAmount: grandTotal.value,
            budgetType: budgetType.value,
            project: getCurrentProjectName() || '',
            roDate: calendarValue.value ? calendarValue.value.toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB'),
            roNumber: roNumber.value,
            requestedBy: getCurrentUsername() || 'Unknown User',
            items: items.value.map((item) => ({
                itemCode: item.itemCode,
                itemType: 'CO',
                description: item.description,
                uom: item.uom,
                quantity: item.quantity,
                price: item.price,
                deliveryDate: item.deliveryDate,
                location: item.location,
                notes: item.notes,
                remark: item.remark
            })),
            overallRemark: overallRemark.value,
            attachmentsCount: attachments.value.length
        }));

        function openPreviewModal() {
            if (!canSubmit.value) {
                showValidation.value = true;

                let errorMessage = 'Please ensure all required fields are filled before previewing:';
                if (items.value.length === 0) {
                    errorMessage += ' At least one item is required.';
                }
                if (!roNumber.value.trim()) {
                    errorMessage += ' RO Number is required.';
                }
                if (!budgetType.value) {
                    errorMessage += ' Budget Type is required.';
                }
                if (!calendarValue.value) {
                    errorMessage += ' RO Date is required.';
                }

                toast.add({
                    severity: 'warn',
                    summary: 'Validation Error',
                    detail: errorMessage,
                    life: 4000
                });
                return;
            }
            showValidation.value = false;
            showPreviewModal.value = true;
        }

        const submitRequestOrder = async () => {
            try {
                const formatDateToAPI = (date: Date | null) => (date ? new Date(date).toISOString() : null);

                const projectId = getCurrentProjectId();

                const payload: CreateRequestOrderPayload = {
                    ProjectId: projectId,
                    DocNo: roNumber.value,
                    DebtorId: 1,
                    RequestOrderDate: formatDateToAPI(calendarValue.value),
                    Terms: 'Net 30',
                    RefDoc: '',
                    BudgetType: budgetType.value === 'Budgeted Item' ? 'Budgeted' : 'NonBudgeted',
                    Type: 'requestOrder',
                    Remark: overallRemark.value || '',
                    Items: items.value.map((item) => ({
                        BudgetItemId: budgetType.value === 'Budgeted Item' ? 1 : null,
                        NonBudgetItemId: budgetType.value === 'Budgeted Item' ? null : 1,
                        Description: item.description,
                        Uom: item.uom,
                        ItemCode: item.itemCode,
                        ItemType: item.itemType || 'CO',
                        Quantity: parseFloat(item.quantity) || 0,
                        Rate: item.price || 0,
                        DeliveryDate: formatDateToAPI(item.deliveryDate)
                    }))
                };
                const isDraft = !!route.query.draftId; // check if editing a draft
                const attachmentsToSend = attachments.value.length > 0 ? attachments.value : undefined;

                let result: CreateRequestOrderResponse;

                if (isDraft) {
                    // update existing draft
                    result = await requestOrderService.submitDraftRequestOrder(route.query.draftId as string, payload, attachments.value.length > 0 ? attachments.value : undefined);
                } else {
                    // Create new RO
                    result = await requestOrderService.createRequestOrder(payload, attachmentsToSend);
                }

                if (result.success) {
                    toast.add({
                        severity: 'success',
                        summary: 'Request Order Submitted',
                        detail: `RO ${roNumber.value} has been submitted successfully`,
                        life: 3000
                    });

                    setTimeout(() => {
                        router.push('/request-orders');
                    }, 1000);
                } else {
                    toast.add({
                        severity: 'error',
                        summary: 'Submission Failed',
                        detail: result.message || 'Failed to submit request order',
                        life: 5000
                    });
                }
            } catch (error: any) {
                console.error('Submit failed:', error);
                toast.add({
                    severity: 'error',
                    summary: 'Submission Error',
                    detail: error.message || 'An unexpected error occurred',
                    life: 5000
                });
            }
        };

        async function saveDraft() {
            if (!canSubmit.value) {
                showValidation.value = true;

                let errorMessage = 'Please ensure all required fields are filled before saving as draft:';
                if (items.value.length === 0) {
                    errorMessage += ' At least one item is required.';
                }
                if (!roNumber.value.trim()) {
                    errorMessage += ' RO Number is required.';
                }
                if (!budgetType.value) {
                    errorMessage += ' Budget Type is required.';
                }
                if (!calendarValue.value) {
                    errorMessage += ' RO Date is required.';
                }

                toast.add({
                    severity: 'warn',
                    summary: 'Validation Error',
                    detail: errorMessage,
                    life: 4000
                });
                return;
            }

            showValidation.value = false;

            try {
                const formatDateToAPI = (date: Date | null): string => {
                    if (!date) return new Date().toISOString().split('T')[0];
                    return date.toISOString().split('T')[0];
                };
                const projectId = getCurrentProjectId();

                const payload: CreateRequestOrderPayload = {
                    ProjectId: projectId,
                    DocNo: roNumber.value,
                    DebtorId: 1,
                    RequestOrderDate: formatDateToAPI(calendarValue.value),
                    Terms: 'Net 30',
                    RefDoc: '',
                    BudgetType: budgetType.value === 'Budgeted Item' ? 'Budgeted' : 'NonBudgeted',
                    Type: 'requestOrder',
                    Remark: overallRemark.value || '',
                    Items: items.value.map((item) => ({
                        BudgetItemId: budgetType.value === 'Budgeted Item' ? 1 : null,
                        NonBudgetItemId: budgetType.value === 'Budgeted Item' ? null : 1,
                        Description: item.description,
                        Uom: item.uom,
                        Quantity: parseFloat(item.quantity) || 0,
                        Rate: item.price || 0,
                        DeliveryDate: formatDateToAPI(item.deliveryDate),
                        ItemCode: item.itemCode,
                        ItemType: item.itemType || 'CO'
                    }))
                };

                const result = await requestOrderService.createRequestOrderDraft(payload, attachments.value.length > 0 ? attachments.value : undefined);

                if (result.success) {
                    toast.add({
                        severity: 'success',
                        summary: 'Draft Saved',
                        detail: `RO ${roNumber.value} has been saved as draft successfully`,
                        life: 3000
                    });
                } else {
                    toast.add({
                        severity: 'error',
                        summary: 'Save Draft Failed',
                        detail: result.message || 'Failed to save request order as draft',
                        life: 5000
                    });
                }
            } catch (error: any) {
                console.error('Save draft failed:', error);
                toast.add({
                    severity: 'error',
                    summary: 'Save Draft Error',
                    detail: error.message || 'An unexpected error occurred while saving draft',
                    life: 5000
                });
            }
        }

        return {
            roNumber,
            budgetType,
            roDate,
            budgetOptions,
            calendarValue,
            items,
            addItem,
            itemOptions,
            fillItemDetails,
            getItemLabel,
            toggleMenu,
            getActionItems,
            menuRefs,
            setMenuRef,
            grandTotal,
            canSubmit,
            showBulkItemModal,
            showPreviewModal,
            openBulkItemModal,
            handleSelectedItems,
            openPreviewModal,
            submitRequestOrder,
            saveDraft,
            previewSummary,
            files,
            totalSize,
            totalSizePercent,
            onSelectedFiles,
            uploadEvent,
            onTemplatedUpload,
            formatSize,
            onRemoveTemplatingFile,
            onClearTemplatingUpload,
            isAttachmentValid,
            attachments,
            overallRemark,
            removeAttachment,
            newAttachments,
            existingAttachments,
            MAX_FILE_SIZE,
            previewAttachment,
            showValidation
        };
    }
});
