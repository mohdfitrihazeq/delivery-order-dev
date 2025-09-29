import type { Order } from '@/types/request-order.type';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import { defineComponent, PropType, ref, watch } from 'vue';

export default defineComponent({
    name: 'EditRo',
    components: {
        Dialog,
        Button,
        InputText,
        InputNumber,
        Calendar,
        Dropdown,
        DataTable,
        Column
    },
    props: {
        visible: {
            type: Boolean,
            required: true
        },
        order: {
            type: Object as PropType<Order | null>,
            default: null
        }
    },
    emits: ['update:visible', 'save'],
    setup(props, { emit }) {
        const localVisible = ref(props.visible);

        watch(
            () => props.visible,
            (newVal) => {
                localVisible.value = newVal;
            }
        );

        // Emit updates to parent
        watch(localVisible, (val) => {
            emit('update:visible', val);
        });

        const budgetTypeOptions = [
            { label: 'Budgeted', value: 'Budgeted' },
            { label: 'Unbudgeted', value: 'Unbudgeted' }
        ];

        const editForm = ref({
            roNumber: '',
            requestedBy: '',
            roDate: null as Date | null,
            deliveryDate: null as Date | null,
            totalAmount: 0,
            budgetType: 'Budgeted',
            items: [] as Array<{
                code: string;
                description: string;
                uom: string;
                qty: number;
                deliveryDate: Date | null;
                note: string;
            }>
        });

        function parseDate(dateString: string): Date | null {
            if (!dateString) return null;
            return new Date(dateString);
        }

        function formatDate(date: Date | null): string {
            if (!date) return '';
            return date.toISOString().split('T')[0];
        }

        watch(
            () => props.order,
            (newOrder) => {
                if (newOrder) {
                    editForm.value = {
                        roNumber: newOrder.roNumber,
                        requestedBy: newOrder.requestedBy,
                        roDate: parseDate(newOrder.roDate),
                        deliveryDate: parseDate(newOrder.deliveryDate),
                        totalAmount: Number(newOrder.totalAmount),
                        budgetType: newOrder.budgetType,
                        items: newOrder.items.map((item) => ({
                            ...item,
                            deliveryDate: parseDate(item.deliveryDate)
                        }))
                    };
                }
            },
            { immediate: true }
        );

        function handleSave(): void {
            const saveData = {
                roNumber: editForm.value.roNumber,
                requestedBy: editForm.value.requestedBy,
                roDate: formatDate(editForm.value.roDate),
                deliveryDate: formatDate(editForm.value.deliveryDate),
                totalAmount: editForm.value.totalAmount,
                budgetType: editForm.value.budgetType,
                items: editForm.value.items.map((item) => ({
                    ...item,
                    deliveryDate: formatDate(item.deliveryDate)
                }))
            };
            emit('save', saveData);
            localVisible.value = false;
        }

        function handleCancel(): void {
            if (props.order) {
                editForm.value = {
                    roNumber: props.order.roNumber,
                    requestedBy: props.order.requestedBy,
                    roDate: parseDate(props.order.roDate),
                    deliveryDate: parseDate(props.order.deliveryDate),
                    totalAmount: Number(props.order.totalAmount),
                    budgetType: props.order.budgetType,
                    items: props.order.items.map((item) => ({
                        ...item,
                        deliveryDate: parseDate(item.deliveryDate)
                    }))
                };
            }
            localVisible.value = false;
        }

        function addItem(): void {
            editForm.value.items.push({
                code: '',
                description: '',
                uom: '',
                qty: 0,
                deliveryDate: null,
                note: ''
            });
        }

        function removeItem(index: number): void {
            editForm.value.items.splice(index, 1);
        }

        return {
            localVisible,
            editForm,
            budgetTypeOptions,
            handleSave,
            handleCancel,
            addItem,
            removeItem
        };
    }
});
