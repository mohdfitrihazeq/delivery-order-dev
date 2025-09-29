import type { BudgetItem, BudgetOption, Item, ItemOption } from '@/types/bcr.type';
import CreateROModal from '@/views/budget/components/modal/CreateBCRModal.vue';
import { Motion } from '@motionone/vue';
import { usePrimeVue } from 'primevue/config';
import FileUpload from 'primevue/fileupload';
import Menu from 'primevue/menu';
import { useToast } from 'primevue/usetoast';
import { ComponentPublicInstance, defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

import ProgressBar from 'primevue/progressbar';

type MenuInstance = ComponentPublicInstance & {
    toggle: (event: Event) => void;
};

export default defineComponent({
    name: 'CreateRequestOrders',
    components: { Motion, Menu, CreateROModal, FileUpload, ProgressBar },
    setup() {
        const router = useRouter();
        const toast = useToast();
        const $primevue = usePrimeVue();

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

        const showBulkItemModal = ref(false);
        const menuRefs = ref<(MenuInstance | null)[]>([]);

        // File upload states
        const totalSize = ref(0);
        const totalSizePercent = ref(0);
        const files = ref<File[]>([]);

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

            if (bytes === 0) {
                return `0 ${sizes[0]}`;
            }

            const i = Math.floor(Math.log(bytes) / Math.log(k));
            const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

            return `${formattedSize} ${sizes[i]}`;
        };

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
            if (el) {
                menuRefs.value[index] = el;
            }
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
                uom: budgetItem.uom,
                quantity: budgetItem.quantity.toString(),
                deliveryDate: null,
                notes: '',
                remark: '',
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

        // Overall remark
        const overallRemark = ref('');

        const MAX_FILE_SIZE = 1_000_000; // 1 MB in bytes
        const attachments = ref<File[]>([]);
        const isAttachmentValid = ref(true);

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

        // Helper to format bytes
        const formatBytes = (bytes: number) => {
            const sizes = ['B', 'KB', 'MB', 'GB'];
            if (bytes === 0) return '0 B';
            const i = Math.floor(Math.log(bytes) / Math.log(1024));
            return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
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
            setMenuRef,
            // Modal functionality
            showBulkItemModal,
            openBulkItemModal,
            handleSelectedItems,
            // File upload
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
            // Remark
            overallRemark
        };
    }
});
