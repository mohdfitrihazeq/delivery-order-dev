import type { VerifyPurchaseOrderItem } from '@/types/delivery.type';
import type { PurchaseOrder, PurchaseOrderItem } from '@/types/purchase.type';
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
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
    name: 'VerifyItem',
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
        Badge
    },
    emits: ['update', 'next-step', 'prev-step'],
    props: {
        selectedPo: {
            type: Object as () => PurchaseOrder | null,
            required: true
        }
    },
    setup(props, { emit }) {
        // ---------------------------
        // 1. STATE
        // ---------------------------
        const itemList = ref<VerifyPurchaseOrderItem[]>([]);
        const poNumber = ref<string | null>(null);
        const expanded = ref<number[]>([]);
        const activeIndex = ref<number[]>([0]);
        const toast = useToast();
        const toastRef = ref<InstanceType<typeof Toast> | null>(null);

        // ---------------------------
        // 2. WATCHERS
        // ---------------------------
        watch(
            () => props.selectedPo,
            (newPo) => {
                console.log('check the po', newPo);
                if (!newPo || !newPo.PurchaseOrderItems) {
                    itemList.value = [];
                    poNumber.value = null;
                    return;
                }

                itemList.value =
                    newPo.PurchaseOrderItems?.map((i: PurchaseOrderItem) => ({
                        id: i.Id,
                        purchaseOrderId: i.PurchaseOrderId,
                        requestOrderId: i.RequestOrderItemId,
                        name: i.Name,
                        order: i.ItemCode,
                        status: 'Pending',
                        location: '',
                        category: '',
                        type: '',
                        delivered: 0,
                        total: Number(i.Quantity) || 0
                    })) ?? [];

                poNumber.value = newPo.DocNo;
            },
            { immediate: true }
        );

        // ---------------------------
        // 3. METHODS
        // ---------------------------
        const onFormSubmit = (event: FormSubmitEvent<Record<string, any>>) => {
            if (!event.valid || itemList.value.length === 0) {
                const detail = !event.valid ? 'Please fix the errors in the form before submitting.' : 'No items found for this PO. Please select a valid Purchase Order.';

                toast.add({
                    severity: 'error',
                    summary: 'Form Invalid',
                    detail,
                    life: 3000
                });
                return;
            }

            const minimalItems = itemList.value.map((i) => ({
                purchaseOrderItemId: i.id,
                requestOrderId: i.requestOrderId,
                delivered: i.delivered
            }));

            emit('update', minimalItems);
            emit('next-step');

            toast.add({
                severity: 'success',
                summary: 'Form submitted',
                detail: `PO ${poNumber.value} with ${minimalItems.length} items submitted.`,
                life: 3000
            });
        };

        const goBack = () => {
            emit('prev-step');
        };

        const toggle = (id: number) => {
            expanded.value = expanded.value.includes(id) ? expanded.value.filter((x) => x !== id) : [...expanded.value, id];
        };

        // ---------------------------
        // 4. RETURN
        // ---------------------------
        return {
            itemList,
            poNumber,
            expanded,
            activeIndex,
            toastRef,
            onFormSubmit,
            goBack,
            toggle
        };
    }
});
