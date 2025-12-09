import { useBudgetChangeRequestStore } from '@/stores/budget/budgetChangeRequest.store';
import type { BCRRecommendationPayload } from '@/types/budgetChangeRequest.type';
import { useToast } from 'primevue/usetoast';
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
    props: {
        visible: {
            type: Boolean,
            required: true
        }
    },
    emits: ['update:visible', 'submit'],

    setup(props, { emit }) {
        const route = useRoute();
        const budgetChangeRequestId = Number(route.params.budgetChangeRequestId);

        const budgetCRStore = useBudgetChangeRequestStore();
        const toast = useToast();

        // Form fields
        const selection = ref<string>('');
        const specificQuantity = ref<string>('');
        const remark = ref<string>('');

        // Selected files (manual upload)
        const selectedFiles = ref<File[]>([]);

        // When user selects files
        function onFileSelect(event: any) {
            selectedFiles.value = event.files;
            toast.add({
                severity: 'info',
                summary: 'Files Attached',
                detail: `${event.files.length} file(s) added`,
                life: 2500
            });
        }

        async function handleSubmit() {
            if (!remark.value.trim()) {
                toast.add({
                    severity: 'warn',
                    summary: 'Remark Required',
                    detail: 'Please enter your remark before submitting.',
                    life: 3000
                });
                return;
            }

            const userInfo = JSON.parse(localStorage.getItem('user') || '{}');

            const payload: BCRRecommendationPayload = {
                Department: userInfo.role || 'Project Director',
                PersonInCharge: userInfo.username || 'Unknown User',
                RecommendationType: selection.value,
                SpecificQuantity: selection.value === 'Specific_Quantity' ? Number(specificQuantity.value) : undefined,
                Remark: remark.value,
                files: [] // backend will read actual uploaded files from FormData
            };

            console.log('BCR ID', budgetChangeRequestId);
            console.log('Payload', payload);
            console.log('Selected Files', selectedFiles.value);

            try {
                await budgetCRStore.createBCRRecommendation(budgetChangeRequestId, payload, selectedFiles.value);

                selection.value = '';
                specificQuantity.value = '';
                remark.value = '';
                selectedFiles.value = [];
                emit('update:visible', false);
            } catch (error) {
                toast.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to submit recommendation',
                    life: 3000
                });
            }
        }

        return {
            selection,
            specificQuantity,
            remark,
            selectedFiles,
            onFileSelect,
            handleSubmit
        };
    }
});
