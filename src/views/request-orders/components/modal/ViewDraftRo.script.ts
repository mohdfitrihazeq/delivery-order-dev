import Badge from 'primevue/badge';
import Button from 'primevue/button';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import { useToast } from 'primevue/usetoast';
import { computed, defineComponent, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

export interface DraftRO {
    draftId: string;
    project: string;
    budgetType: 'Budgeted' | 'Unbudgeted';
    requestedBy: string;
    itemsCount: number;
    lastModified: string;
    roNumber: string;
    roDate: string;
    items: any[];
    overallRemark?: string;
    attachments?: File[];
}

export default defineComponent({
    name: 'ViewDraftRo',
    components: {
        Dialog,
        Button,
        DataTable,
        Column,
        InputText,
        Badge
    },
    props: {
        visible: {
            type: Boolean,
            required: true
        }
    },
    emits: ['update:visible'],
    setup(props, { emit }) {
        const router = useRouter();
        const toast = useToast();
        const searchQuery = ref('');
        const localVisible = ref(props.visible);

        const drafts = ref<DraftRO[]>([
            {
                draftId: 'DRAFT-RO-240901-001',
                project: 'MKT',
                budgetType: 'Budgeted',
                requestedBy: 'John Smith',
                itemsCount: 2,
                lastModified: '2024-09-01',
                roNumber: 'RO2025208757',
                roDate: '2024-09-01',
                items: [
                    {
                        itemCode: 'STL-01',
                        description: 'Steel reinforcement bar 60mm',
                        location: 'Building A > Level 1-5',
                        uom: 'Ton',
                        quantity: '25',
                        price: 550,
                        deliveryDate: null,
                        notes: '',
                        remark: ''
                    },
                    {
                        itemCode: 'CEM-02',
                        description: 'Cement Portland Type I',
                        location: 'Building B > Level 1-8',
                        uom: 'Bag',
                        quantity: '180',
                        price: 250,
                        deliveryDate: null,
                        notes: '',
                        remark: ''
                    }
                ],
                overallRemark: 'Urgent materials needed for Phase 1'
            },
            {
                draftId: 'DRAFT-RO-240902-001',
                project: 'MKT',
                budgetType: 'Unbudgeted',
                requestedBy: 'Maria Garcia',
                itemsCount: 1,
                lastModified: '2024-09-03',
                roNumber: 'RO2025208758',
                roDate: '2024-09-02',
                items: [
                    {
                        itemCode: 'STL-01',
                        description: 'Steel reinforcement bar 60mm',
                        location: 'Building A > Level 1-5',
                        uom: 'Ton',
                        quantity: '10',
                        price: 550,
                        deliveryDate: null,
                        notes: '',
                        remark: ''
                    }
                ],
                overallRemark: ''
            },
            {
                draftId: 'DRAFT-RO-20250929-321',
                project: 'MKT',
                budgetType: 'Budgeted',
                requestedBy: 'Jane Doe',
                itemsCount: 1,
                lastModified: '2025-09-29',
                roNumber: 'RO2025208759',
                roDate: '2025-09-29',
                items: [
                    {
                        itemCode: 'CEM-02',
                        description: 'Cement Portland Type I',
                        location: 'Building B > Level 1-8',
                        uom: 'Bag',
                        quantity: '50',
                        price: 250,
                        deliveryDate: null,
                        notes: '',
                        remark: ''
                    }
                ],
                overallRemark: 'For foundation work'
            }
        ]);

        // Filtered drafts based on search
        const filteredDrafts = computed(() => {
            if (!searchQuery.value.trim()) {
                return drafts.value;
            }

            const query = searchQuery.value.toLowerCase();
            return drafts.value.filter((draft) => draft.draftId.toLowerCase().includes(query) || draft.requestedBy.toLowerCase().includes(query) || draft.project.toLowerCase().includes(query) || draft.budgetType.toLowerCase().includes(query));
        });
        const draftCount = computed(() => drafts.value.length);

        watch(
            () => drafts.value.length,
            (newCount) => {
                emit('update:count', newCount);
            },
            { immediate: true }
        );
        // Sync prop changes from parent
        watch(
            () => props.visible,
            (newVal) => {
                localVisible.value = newVal;
            }
        );

        // Emit changes to parent
        watch(localVisible, (val) => {
            emit('update:visible', val);
        });

        function handleClose(): void {
            localVisible.value = false;
        }

        function handleContinue(draft: DraftRO): void {
            router.push({
                path: '/request-orders/create',
                query: {
                    draftId: draft.draftId,
                    mode: 'edit-draft'
                },
                state: {
                    draftData: draft
                }
            });

            toast.add({
                severity: 'info',
                summary: 'Draft Loaded',
                detail: `Continuing draft ${draft.draftId}`,
                life: 3000
            });

            handleClose();
        }

        function handleDelete(draft: DraftRO): void {
            const index = drafts.value.findIndex((d) => d.draftId === draft.draftId);

            if (index !== -1) {
                drafts.value.splice(index, 1);

                toast.add({
                    severity: 'success',
                    summary: 'Draft Deleted',
                    detail: `Draft ${draft.draftId} has been deleted`,
                    life: 3000
                });
            }
        }

        function formatDate(dateString: string): string {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                month: 'numeric',
                day: 'numeric',
                year: 'numeric'
            });
        }

        return {
            searchQuery,
            drafts,
            filteredDrafts,
            handleClose,
            handleContinue,
            handleDelete,
            formatDate,
            localVisible,
            draftCount
        };
    }
});
