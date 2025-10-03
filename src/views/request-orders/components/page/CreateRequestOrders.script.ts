import type { CreateRequestOrderPayload } from '@/services/requestOrder.service';
import { requestOrderService } from '@/services/requestOrder.service';
import { Motion } from '@motionone/vue';
import { usePrimeVue } from 'primevue/config';
import FileUpload from 'primevue/fileupload';
import Menu from 'primevue/menu';
import ProgressBar from 'primevue/progressbar';
import { useToast } from 'primevue/usetoast';
import { ComponentPublicInstance, computed, defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { BudgetItem, BudgetOption, Item, ItemOption } from '../../../../types/request-order.type';
import BudgetInfoCard from '../card/BudgetInfoCard.vue';
import CreateROModal from '../modal/CreateRo.vue';
import PreviewRo, { type PreviewSummary } from '../modal/PreviewRo.vue';

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
        const attachments = ref<File[]>([]);
        const isAttachmentValid = ref(true);

        // Load draft data if coming from draft modal
        onMounted(() => {
            if (route.query.mode === 'edit-draft' && history.state.draftData) {
                const draft = history.state.draftData;
                roNumber.value = draft.roNumber;
                budgetType.value = draft.budgetType === 'Budgeted' ? 'Budgeted Item' : 'Unbudgeted Item';
                items.value = draft.items;
                overallRemark.value = draft.overallRemark || '';
                if (draft.roDate) {
                    calendarValue.value = new Date(draft.roDate);
                }

                toast.add({
                    severity: 'info',
                    summary: 'Draft Loaded',
                    detail: `Loaded draft ${draft.draftId}`,
                    life: 3000
                });
            }
        });

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
            return items.value.length > 0 && isAttachmentValid.value && roNumber.value.trim() !== '';
        });

        const previewSummary = computed<PreviewSummary>(() => ({
            totalItems: items.value.length,
            totalAmount: grandTotal.value,
            budgetType: budgetType.value,
            project: 'MKT',
            roDate: calendarValue.value ? calendarValue.value.toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB'),
            roNumber: roNumber.value,
            requestedBy: 'Current User',
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
                toast.add({
                    severity: 'warn',
                    summary: 'Validation Error',
                    detail: 'Please ensure all required fields are filled and at least one item is added',
                    life: 3000
                });
                return;
            }
            showPreviewModal.value = true;
        }

        async function submitRequestOrder() {
            try {
                const formatDateToAPI = (date: Date | null): string => {
                    if (!date) return new Date().toISOString().split('T')[0];
                    return date.toISOString().split('T')[0];
                };

                const payload: CreateRequestOrderPayload = {
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
                        DeliveryDate: formatDateToAPI(item.deliveryDate)
                    }))
                };

                const result = await requestOrderService.createRequestOrder(payload, attachments.value.length > 0 ? attachments.value : undefined);

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
        }

        function saveDraft() {
            const draftData = {
                draftId: `DRAFT-RO-${Date.now()}`,
                roNumber: roNumber.value,
                budgetType: budgetType.value,
                roDate: calendarValue.value,
                items: items.value,
                overallRemark: overallRemark.value,
                attachments: attachments.value
            };

            console.log('Saving draft:', draftData);

            toast.add({
                severity: 'success',
                summary: 'Draft Saved',
                detail: 'Your request order has been saved as draft',
                life: 3000
            });
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
            overallRemark
        };
    }
});
