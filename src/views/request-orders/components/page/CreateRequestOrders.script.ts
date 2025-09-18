import { Motion } from '@motionone/vue';
import Menu from 'primevue/menu';
import { ComponentPublicInstance, defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { BudgetOption, Item, ItemOption } from '../../../../types/request-order.type';
import BudgetInfoCard from '../card/BudgetInfoCard.vue';

// Type for Menu component instance
type MenuInstance = ComponentPublicInstance & {
    toggle: (event: Event) => void;
};

export default defineComponent({
    name: 'CreateRequestOrders',
    components: { Motion, BudgetInfoCard, Menu, Motion },
    setup() {
        const router = useRouter();
        const calendarValue = ref<Date | null>(null);

        const roNumber = ref('RO2025208757');
        const budgetType = ref('Budgeted Item');
        const roDate = ref('');

        const budgetOptions = ref<BudgetOption[]>([
            { label: 'Budgeted Item', value: 'Budgeted Item' },
            { label: 'Unbudgeted Item', value: 'Unbudgeted Item' }
        ]);

        const items = ref<Item[]>([]);

        const itemOptions = ref<ItemOption[]>([
            { label: 'STL-01', value: 'STL-01', description: 'Steel reinforcement bar 60mm', uom: 'Ton' },
            { label: 'CEM-02', value: 'CEM-02', description: 'Cement Portland Type I', uom: 'Bag' }
        ]);

        // Properly typed menu refs
        const menuRefs = ref<(MenuInstance | null)[]>([]);

        const addItem = () => {
            items.value.push({
                itemCode: '',
                description: '',
                uom: '',
                quantity: '1',
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
            }
        };

        const getItemLabel = (value: string): string => {
            const selected = itemOptions.value.find((opt) => opt.value === value);
            return selected ? selected.label : value;
        };

        const toggleMenu = (event: Event, index: number) => {
            const menu = menuRefs.value[index];
            if (menu) {
                menu.toggle(event);
            }
        };

        const getActionItems = (item: Item, index: number) => [
            {
                label: 'Delete Item',
                icon: 'pi pi-trash',
                command: () => {
                    items.value.splice(index, 1);
                    // Also remove the corresponding menu ref
                    menuRefs.value.splice(index, 1);
                }
            },
            {
                label: item.showNotes ? 'Hide Note' : 'Add Note',
                icon: 'pi pi-file',
                command: () => {
                    item.showNotes = !item.showNotes;
                }
            },
            {
                label: item.showRemark ? 'Hide Remark' : 'Add Remark',
                icon: 'pi pi-comment',
                command: () => {
                    item.showRemark = !item.showRemark;
                }
            }
        ];

        const setMenuRef = (el: MenuInstance | null, index: number) => {
            if (el) {
                menuRefs.value[index] = el;
            }
        };

        return {
            roNumber,
            budgetType,
            roDate,
            goBack: () => router.push({ name: 'request-orders' }),
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
            setMenuRef
        };
    }
});
