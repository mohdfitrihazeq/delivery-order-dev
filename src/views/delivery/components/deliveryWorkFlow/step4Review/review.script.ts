import ReusableTable from '@/components/table/ReusableTable.vue';
import { useDeliveryStore } from '@/stores/delivery/delivery.store';
import type { DeliveryFlow } from '@/types/delivery.type';
import type { TableColumn } from '@/types/table.type';
import Form, { FormSubmitEvent } from '@primevue/forms/form';
import Badge from 'primevue/badge';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import Card from 'primevue/card';
import FileUpload from 'primevue/fileupload';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import ProgressBar from 'primevue/progressbar';
import Textarea from 'primevue/textarea';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { computed, defineComponent, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'Review',
    components: {
        Card,
        InputText,
        Button,
        Message,
        Toast,
        Form,
        Calendar,
        Textarea,
        FileUpload,
        ProgressBar,
        Badge,
        ReusableTable
    },
    emits: ['update', 'next-step', 'prev-step'],
    props: {
        deliveryData: {
            type: Object as () => DeliveryFlow,
            required: true
        }
    },
    setup(props, { emit }) {
        // ---------------------------
        // 1. DATA
        // ---------------------------
        const deliveryInfo = ref<DeliveryFlow['deliveryInfo'] | null>(props.deliveryData.deliveryInfo ?? null);
        const selectPO = ref<DeliveryFlow['selectPO'] | null>(props.deliveryData.selectPO ?? null);
        const verifyItem = ref<DeliveryFlow['verifyItem']>(props.deliveryData.verifyItem ?? []);

        const toast = useToast();
        const router = useRouter();
        const deliveryStore = useDeliveryStore();

        const toastRef = ref<InstanceType<typeof Toast> | null>(null);

        const deliveryListColumn: TableColumn[] = [
            { field: 'ItemCode', header: 'Item Code', sortable: true },
            { field: 'SoDocNo', header: 'DO No.', sortable: true },
            { field: 'Name', header: 'Item Name', sortable: true },
            { field: 'Price', header: 'Unit Price' },
            { field: 'Quantity', header: 'Quantity' }
        ];

        // ---------------------------
        // 2. COMPUTED
        // ---------------------------
        const deliveredItems = computed(() => selectPO.value?.PurchaseOrderItems ?? []);
        const hasDeliveredItems = computed(() => deliveredItems.value.length > 0);

        const formatDate = (dateStr?: string) => {
            if (!dateStr) return '-';
            return new Date(dateStr).toISOString().split('T')[0];
        };

        // ---------------------------
        // 3. SUBMIT FUNCTION
        // ---------------------------
        const onFormSubmit = async (event: FormSubmitEvent<Record<string, any>>) => {
            if (!deliveryInfo.value || !selectPO.value) {
                toast.add({
                    severity: 'warn',
                    summary: 'Missing Data',
                    detail: 'Please complete delivery info and PO selection before submitting.',
                    life: 3000
                });
                return;
            }

            const payload = {
                PurchaseOrderId: selectPO.value?.purchaseOrderId,
                DocNo: selectPO.value?.DocNo,
                Date: deliveryInfo.value?.Date,
                PlateNo: deliveryInfo.value?.PlateNo,
                Remarks: deliveryInfo.value?.Remarks,
                Items: JSON.stringify(
                    verifyItem.value?.map((item) => ({
                        PurchaseOrderItemId: item.purchaseOrderItemId,
                        RequestOrderItemId: item.requestOrderId,
                        Quantity: item.quantity
                    }))
                )
            };

            const formData = new FormData();
            Object.entries(payload).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    formData.append(key, value as string);
                }
            });

            if (deliveryInfo.value?.attachments?.length) {
                deliveryInfo.value.attachments.forEach((file: File) => {
                    formData.append('attachments', file);
                });
            }

            try {
                const success = await deliveryStore.createDeliveryOrder(formData);
                if (success) {
                    router.push('/deliveries');
                }
            } catch (err) {
                console.error(err);
            }
        };

        // ---------------------------
        // 4. WATCH
        // ---------------------------
        watch(
            () => props.deliveryData,
            (newData) => {
                deliveryInfo.value = newData.deliveryInfo ?? null;
                selectPO.value = newData.selectPO ?? null;
                verifyItem.value = newData.verifyItem ?? [];
            },
            { immediate: true, deep: true }
        );

        const goBack = () => {
            router.push('/deliveries');
        };

        // ---------------------------
        // 5. RETURN
        // ---------------------------
        return {
            deliveryInfo,
            selectPO,
            verifyItem,
            deliveryListColumn,
            deliveredItems,
            hasDeliveredItems,
            onFormSubmit,
            goBack,
            toastRef,
            formatDate
        };
    }
});
