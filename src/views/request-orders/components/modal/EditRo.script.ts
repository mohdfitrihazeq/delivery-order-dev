import type { Order, OrderItem } from '@/types/request-order.type';
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
        DataTable,
        Column,
        Calendar,
        Dropdown
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

        // Sync dialog visibility with parent
        watch(
            () => props.visible,
            (val) => (localVisible.value = val)
        );
        watch(localVisible, (val) => emit('update:visible', val));

        const budgetTypeOptions = [
            { label: 'Budgeted', value: 'Budgeted' },
            { label: 'Unbudgeted', value: 'Unbudgeted' }
        ];

        const defaultForm = () => ({
            roNumber: '',
            requestedBy: '',
            roDate: null as Date | null,
            deliveryDate: null as Date | null,
            totalAmount: 0,
            budgetType: 'Budgeted',
            items: [] as OrderItem[]
        });

        const editForm = ref(defaultForm());

        function parseDate(value: string | Date | null | undefined): Date | null {
            if (!value) return null;
            if (value instanceof Date) return value;
            return new Date(value);
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
                if (newOrder) {
                    editForm.value = {
                        roNumber: newOrder.roNumber,
                        requestedBy: newOrder.requestedBy,
                        roDate: parseDate(newOrder.roDate),
                        deliveryDate: newOrder.deliveryDate ? new Date(newOrder.deliveryDate) : null,
                        totalAmount: Number(newOrder.totalAmount),
                        budgetType: newOrder.budgetType,
                        items: newOrder.items.map((item) => ({
                            code: item.code,
                            description: item.description,
                            uom: item.uom,
                            qty: Number(item.qty),
                            deliveryDate: item.deliveryDate ? new Date(item.deliveryDate) : null,
                            note: item.note || ''
                        }))
                    };
                }
            },
            { immediate: true }
        );

        function handleSave(): void {
            const saveData: Order = {
                ...props.order!,
                roNumber: editForm.value.roNumber,
                requestedBy: editForm.value.requestedBy,
                roDate: formatDate(editForm.value.roDate),
                deliveryDate: formatDate(editForm.value.deliveryDate),
                totalAmount: editForm.value.totalAmount.toString(),
                budgetType: editForm.value.budgetType,
                items: editForm.value.items.map((item) => ({
                    code: item.code,
                    description: item.description,
                    uom: item.uom,
                    qty: item.qty,
                    deliveryDate: formatDate(item.deliveryDate),
                    note: item.note
                }))
            };

            emit('save', saveData);
            localVisible.value = false;
        }

        function handleCancel(): void {
            if (props.order) {
                editForm.value.items = (props.order.items || []).map((item) => ({
                    code: item.code || '',
                    description: item.description || '',
                    uom: item.uom || '',
                    qty: Number(item.qty || 0),
                    deliveryDate: parseDate(item.deliveryDate),
                    note: item.note || ''
                }));
                editForm.value.roNumber = props.order.roNumber || '';
                editForm.value.requestedBy = props.order.requestedBy || '';
                editForm.value.roDate = parseDate(props.order.roDate);
                editForm.value.deliveryDate = parseDate(props.order.deliveryDate);
                editForm.value.totalAmount = Number(props.order.totalAmount || 0);
                editForm.value.budgetType = props.order.budgetType || 'Budgeted';
            } else {
                editForm.value = defaultForm();
            }
            localVisible.value = false;
        }

        // Add/remove items
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
