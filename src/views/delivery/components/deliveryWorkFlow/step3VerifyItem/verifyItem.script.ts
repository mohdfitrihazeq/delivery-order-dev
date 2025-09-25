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

interface PurchaseOrder {
    id: string;
    code: string;
    title?: string;
    content?: string;
}

interface Item {
    name: string;
    order: string;
    status: string;
    location: string;
    category: string;
    type: string;
    delivered: number;
    total: number;
}

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
        const itemList = ref<Item[]>([]);
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
                if (!newPo) {
                    itemList.value = [];
                    poNumber.value = null;
                    return;
                }

                if (newPo.id === '1') {
                    itemList.value = [
                        {
                            name: 'Steel reinforcement bars Grade 60',
                            order: 'Order 2,500 kg',
                            status: 'Pending',
                            location: 'Building A > Level 1-5',
                            category: 'Structure > Foundation > Reinforcement',
                            type: 'Materials',
                            delivered: 0,
                            total: 2500
                        },
                        {
                            name: 'Soil Disposal',
                            order: 'Order 500 m³',
                            status: 'Delivered',
                            location: 'Building B > Basement',
                            category: 'Earthworks > Disposal',
                            type: 'Services',
                            delivered: 0,
                            total: 500
                        }
                    ];
                } else if (newPo.id === '2') {
                    itemList.value = [
                        {
                            name: 'Excavation Work Package',
                            order: 'Order 1 unit',
                            status: 'Pending',
                            location: 'Building B > Basement',
                            category: 'Earthworks > Excavation',
                            type: 'Work',
                            delivered: 0,
                            total: 1
                        },
                        {
                            name: 'Soil Disposal',
                            order: 'Order 500 m³',
                            status: 'Pending',
                            location: 'Building B > Basement',
                            category: 'Earthworks > Disposal',
                            type: 'Services',
                            delivered: 0,
                            total: 500
                        }
                    ];
                } else if (newPo.id === '3') {
                    itemList.value = [
                        {
                            name: 'Glass Panel Double Glazed',
                            order: 'Order 20 pcs',
                            status: 'Pending',
                            location: 'Building C > Level 3',
                            category: 'Facade > Windows > Glass',
                            type: 'Materials',
                            delivered: 0,
                            total: 20
                        }
                    ];
                }

                poNumber.value = newPo.code;
            },
            { immediate: true }
        );

        // ---------------------------
        // 3. METHODS
        // ---------------------------
        const onFormSubmit = (event: FormSubmitEvent<Record<string, any>>) => {
            if (event.valid) {
                if (itemList.value.length > 0) {
                    emit('update', itemList.value);
                    emit('next-step');

                    toast.add({
                        severity: 'success',
                        summary: 'Form submitted',
                        detail: `PO ${poNumber.value} with ${itemList.value.length} items submitted.`,
                        life: 3000
                    });
                } else {
                    toast.add({
                        severity: 'warn',
                        summary: 'No Items',
                        detail: 'No items found for this PO. Please select a valid Purchase Order.',
                        life: 3000
                    });
                }
            } else {
                toast.add({
                    severity: 'error',
                    summary: 'Form Invalid',
                    detail: 'Please fix the errors in the form before submitting.',
                    life: 3000
                });
            }
        };

        const goBack = () => {
            emit('prev-step');
        };

        const toggle = (id: number) => {
            expanded.value = expanded.value.includes(id) ? expanded.value.filter((x) => x !== id) : [...expanded.value, id];
        };

        // ---------------------------
        // 4. RETURN (expose to template)
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
