import { requestOrderService } from '@/services/requestOrder.service';
import { useRequestOrderStore } from '@/stores/request-order/requestOrder.store';
import type { AttachmentItem, EditForm, Order } from '@/types/request-order.type';
import { storeToRefs } from 'pinia';
import Button from 'primevue/button';
import Column from 'primevue/column';
import { usePrimeVue } from 'primevue/config';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import { useToast } from 'primevue/usetoast';
import { defineComponent, PropType, ref, watch } from 'vue';

export default defineComponent({
    name: 'EditRo',
    components: { Dialog, Button, InputText, InputNumber, DataTable, Column },
    props: {
        visible: { type: Boolean, required: true },
        order: { type: Object as PropType<Order | null>, default: null }
    },
    emits: ['update:visible', 'save'],
    setup(props, { emit }) {
        const { updateOrder } = useRequestOrderStore();
        const { loading } = storeToRefs(useRequestOrderStore());
        const localVisible = ref(props.visible);
        const toast = useToast();

        // File upload states
        const totalSize = ref(0);
        const totalSizePercent = ref(0);
        const files = ref<File[]>([]);
        const overallRemark = ref('');
        const MAX_FILE_SIZE = 1_000_000;
        const attachments = ref<File[]>([]);
        const isAttachmentValid = ref(true);

        watch(
            () => props.visible,
            (val) => (localVisible.value = val)
        );
        watch(localVisible, (val) => emit('update:visible', val));

        const budgetTypeOptions = [
            { label: 'Budgeted', value: 'Budgeted' },
            { label: 'Unbudgeted', value: 'Unbudgeted' }
        ];

        const defaultForm = (): EditForm => ({
            roNumber: '',
            requestedBy: '',
            roDate: null,
            deliveryDate: null,
            totalAmount: 0,
            budgetType: 'Budgeted',
            remark: '',
            terms: 'Net 30',
            refDoc: 'RQ-001',
            currency: 'MYR',
            items: [],
            attachments: []
        });

        const editForm = ref<EditForm>(defaultForm());

        function parseDate(value: string | Date | null | undefined): Date | null {
            if (!value) return null;
            if (value instanceof Date) return value;
            const d = new Date(value);
            return isNaN(d.getTime()) ? null : d;
        }

        function formatDate(date: string | Date | null): string {
            if (!date) return '';
            const dateObj = typeof date === 'string' ? new Date(date) : date;
            if (isNaN(dateObj.getTime())) return '';
            return dateObj.toISOString().split('T')[0];
        }

        watch(
            () => props.order,
            (newOrder) => {
                if (!newOrder) return;

                const sourceItems = newOrder.RequestOrderItems?.length ? newOrder.RequestOrderItems : newOrder.items || [];

                editForm.value = {
                    roNumber: newOrder.roNumber,
                    requestedBy: newOrder.requestedBy,
                    roDate: newOrder.roDate ? new Date(newOrder.roDate) : null,
                    deliveryDate: newOrder.deliveryDate ? new Date(newOrder.deliveryDate) : null,
                    totalAmount: Number(newOrder.totalAmount),
                    budgetType: newOrder.budgetType === 'Budgeted' ? 'Budgeted' : 'NonBudgeted',
                    remark: newOrder.remark || '',
                    terms: newOrder.terms || 'Net 30',
                    refDoc: newOrder.refDoc || 'RQ-001',
                    currency: newOrder.currency || 'MYR',
                    attachments: (newOrder.attachments || []) as Array<File | AttachmentItem>,
                    items: sourceItems.map((item: any) => ({
                        code: item.ItemCode || item.code || '',
                        description: item.Description || item.description || '',
                        uom: item.Unit || item.uom || '',
                        qty: Number(item.Quantity ?? item.qty ?? 0),
                        deliveryDate: item.DeliveryDate ? new Date(item.DeliveryDate) : item.deliveryDate ? new Date(item.deliveryDate) : null,
                        notes: item.Notes ?? item.notes ?? item.note ?? '',
                        remark: item.Remark ?? item.remark ?? '',
                        budgetItemId: item.BudgetItemId ?? item.budgetItemId ?? null,
                        nonBudgetItemId: item.NonBudgetItemId ?? item.nonBudgetItemId ?? null
                    }))
                };
            },
            { immediate: true }
        );

        async function handleSave(): Promise<void> {
            if (!props.order) return;

            const parseDateToString = (value: string | Date | null | undefined) => {
                if (!value) return null;
                const d = value instanceof Date ? value : new Date(value);
                return isNaN(d.getTime()) ? null : d.toISOString().split('T')[0];
            };

            if (!editForm.value.roNumber) {
                toast.add({ severity: 'error', summary: 'Error', detail: 'RO Number is required.', life: 3000 });
                return;
            }

            const payload = {
                DocNo: editForm.value.roNumber || null,
                DebtorId: props.order.debtorId ?? null,
                BudgetType: editForm.value.budgetType === 'Budgeted' ? 'Budgeted' : 'NonBudgeted',
                Remark: editForm.value.remark || '',
                RequestOrderDate: parseDateToString(editForm.value.roDate),
                Terms: editForm.value.terms || 'Net 30',
                RefDoc: editForm.value.refDoc || 'RQ-001',
                Currency: editForm.value.currency || 'MYR',
                Type: 'requestOrder',
                Items: (editForm.value.items || []).map((item) => ({
                    ItemCode: item.code || '',
                    BudgetItemId: item.budgetItemId ?? null,
                    NonBudgetItemId: item.nonBudgetItemId ?? null,
                    Description: item.description || '',
                    Uom: item.uom || '',
                    Quantity: Number(item.qty ?? 0),
                    Notes: item.notes || '',
                    Remark: item.remark || '',
                    DeliveryDate: parseDateToString(item.deliveryDate)
                }))
            };

            const sanitizedPayload = JSON.parse(JSON.stringify(payload, (_, value) => (value === undefined ? null : value)));

            try {
                const result = await requestOrderService.updateRequestOrder(props.order.id.toString(), sanitizedPayload);
                console.log('Update result:', result);
                if (result.success) {
                    toast.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Request order updated successfully.',
                        life: 3000
                    });
                    emit('save');
                    localVisible.value = false;
                } else {
                    toast.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: result.message || 'Failed to update request order.',
                        life: 3000
                    });
                }
            } catch (error: any) {
                console.error('Update failed:', error.response?.data || error);
                toast.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: error.response?.data?.message || 'Failed to update request order.',
                    life: 3000
                });
            }
        }

        function handleCancel(): void {
            if (props.order) {
                editForm.value = {
                    roNumber: props.order.roNumber || '',
                    requestedBy: props.order.requestedBy || '',
                    roDate: parseDate(props.order.roDate),
                    deliveryDate: parseDate(props.order.deliveryDate),
                    totalAmount: Number(props.order.totalAmount || 0),
                    budgetType: props.order.budgetType || 'Budgeted',
                    remark: props.order.remark || '',
                    terms: 'Net 30',
                    refDoc: 'RQ-001',
                    currency: 'MYR',
                    items: (props.order.items || []).map((item) => ({
                        budgetItemId: (item as any).budgetItemId ?? null,
                        nonBudgetItemId: (item as any).nonBudgetItemId ?? null,
                        description: item.description,
                        uom: item.uom,
                        quantity: Number(item.qty || 0),
                        deliveryDate: parseDate(item.deliveryDate),
                        notes: (item as any).notes || '',
                        remark: (item as any).remark || ''
                    }))
                };
            } else {
                editForm.value = defaultForm();
            }
            localVisible.value = false;
        }

        function addItem(): void {
            editForm.value.items.push({
                budgetItemId: null,
                nonBudgetItemId: null,
                description: '',
                uom: '',
                quantity: 0,
                deliveryDate: null,
                notes: '',
                remark: ''
            });
        }

        function removeItem(index: number): void {
            editForm.value.items.splice(index, 1);
        }

        function getAttachmentName(file: File | AttachmentItem): string {
            return file instanceof File ? file.name : file.filename;
        }

        function previewAttachment(file: File | AttachmentItem) {
            if (file instanceof File) {
                const blobUrl = URL.createObjectURL(file);
                window.open(blobUrl, '_blank');
                return;
            }
            const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://103.16.42.51:9001';
            const fileUrl = `${backendUrl}/${file.path.replace(/\\/g, '/')}`;
            window.open(fileUrl, '_blank');
        }

        function getAttachmentUrl(file: File | AttachmentItem): string {
            if (file instanceof File) {
                return URL.createObjectURL(file);
            } else {
                const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://103.16.42.51:9001';
                const normalizedPath = file.path.replace(/\\/g, '/');
                return `${backendUrl}/${normalizedPath}`;
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

        return {
            localVisible,
            editForm,
            budgetTypeOptions,
            handleSave,
            handleCancel,
            addItem,
            removeItem,
            useRequestOrderStore,
            loading,
            previewAttachment,
            formatDate,
            getAttachmentName,
            getAttachmentUrl,
            onRemoveTemplatingFile,
            onClearTemplatingUpload,
            uploadEvent,
            onTemplatedUpload,
            formatSize,
            totalSize,
            totalSizePercent,
            files,
            overallRemark,
            MAX_FILE_SIZE,
            attachments,
            isAttachmentValid,
            usePrimeVue
        };
    }
});
