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
    components: { Card, InputText, Button, Message, Toast, Form, Calendar, Textarea, FileUpload, ProgressBar, Badge },
    emits: ['update', 'next-step', 'prev-step'],
    props: {
        selectedPo: {
            type: Object,
            required: true
        }
    },
    setup(props, { emit }) {
        const itemList = ref<any[]>([]);
        const poNumber = ref<string | null>(null);
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

        const toast = useToast();
        const toastRef = ref<InstanceType<typeof Toast> | null>(null);

        const onFormSubmit = (event: FormSubmitEvent<Record<string, any>>) => {
            if (event.valid) {
                // if (selectedCard.value) {
                //     emit('update', selectedCard.value);
                //     emit('next-step');
                //     toast.add({
                //         severity: 'success',
                //         summary: 'Form submitted',
                //         detail: `Selected PO: ${selectedCard.value.id}`,
                //         life: 3000
                //     });
                // } else {
                //     toast.add({
                //         severity: 'warn',
                //         summary: 'No PO selected',
                //         detail: 'Please select a Purchase Order before continuing.',
                //         life: 3000
                //     });
                // }
            }
        };

        const goBack = () => {
            emit('prev-step');
        };

        const expanded = ref<number[]>([]);

        const toggle = (id: number) => {
            if (expanded.value.includes(id)) {
                expanded.value = expanded.value.filter((x) => x !== id);
            } else {
                expanded.value.push(id);
            }
        };

        const activeIndex = ref([0]);
        return {
            onFormSubmit,
            toastRef,
            goBack,
            toggle,
            expanded,
            itemList,
            poNumber,
            activeIndex
        };
    }
});
