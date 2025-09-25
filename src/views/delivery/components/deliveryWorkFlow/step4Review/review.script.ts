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
import { useRouter } from 'vue-router';

interface DeliveryItem {
    deliveryInfo: { driverPlate: string; deliveryDate: string };
    selectPO: { id: string; title: string; content: string };
    verifyItem: Array<{ name: string; order: string; status: string }>;
    review: Record<string, any>;
}

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
        Badge
    },
    emits: ['update', 'next-step', 'prev-step'],
    props: {
        deliveryData: {
            type: Object as () => DeliveryItem,
            required: true
        }
    },
    setup(props, { emit }) {
        // ---------------------------
        // 1. DATA (constants, refs)
        // ---------------------------
        const deliveryInfo = ref<DeliveryItem['deliveryInfo'] | null>(props.deliveryData.deliveryInfo ?? null);
        const selectPO = ref<DeliveryItem['selectPO'] | null>(props.deliveryData.selectPO ?? null);
        const verifyItem = ref<DeliveryItem['verifyItem']>(props.deliveryData.verifyItem ?? []);

        const toastRef = ref<InstanceType<typeof Toast> | null>(null);
        const router = useRouter();
        const toast = useToast();

        // ---------------------------
        // 2. COMPUTED PROPERTIES
        // ---------------------------
        // 暂无额外 computed

        // ---------------------------
        // 3. FUNCTIONS (handlers, business logic)
        // ---------------------------
        const onFormSubmit = (event: FormSubmitEvent<Record<string, any>>) => {
            // if (event.valid) {
            //     if (verifyItem.value.length > 0) {
            //         emit('update', verifyItem.value);
            //         emit('next-step');
            //         toast.add({
            //             severity: 'success',
            //             summary: 'Form submitted',
            //             detail: 'Delivery data processed successfully',
            //             life: 3000
            //         });
            //     } else {
            //         toast.add({
            //             severity: 'warn',
            //             summary: 'No delivery data',
            //             detail: 'Please provide delivery data before continuing.',
            //             life: 3000
            //         });
            //     }
            // }
        };

        const goBack = () => {
            router.push('/deliveries');
        };

        // ---------------------------
        // 4. LIFECYCLE HOOKS
        // ---------------------------
        watch(
            () => props.deliveryData,
            (newData) => {
                deliveryInfo.value = newData.deliveryInfo ?? null;
                selectPO.value = newData.selectPO ?? null;
                verifyItem.value = newData.verifyItem ?? [];
                console.log('deliveryInfo:', deliveryInfo.value);
                console.log('selectPO:', selectPO.value);
                console.log('verifyItem:', verifyItem.value);
            },
            { immediate: true, deep: true }
        );

        // ---------------------------
        // 5. RETURN (expose to template)
        // ---------------------------
        return {
            deliveryInfo,
            selectPO,
            verifyItem,
            onFormSubmit,
            goBack,
            toastRef
        };
    }
});
