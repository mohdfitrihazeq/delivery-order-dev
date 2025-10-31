import { defineStore } from 'pinia';
import { ref } from 'vue';
import { formatDate } from '@/utils/dateHelper';
import { budgetService } from '@/services/newBudget.service';
import { getCurrentProjectId } from '@/utils/contextHelper';

export const useBudgetStore = defineStore('budget', () => {
    const budgets = ref<any[]>([]);
    const pagination = ref({
        total: 0,
        totalPages: 0,
        page: 1,
        pageSize: 10
    });
    const loading = ref(false);

    async function fetchBudgets(version: number = 1, page: number = pagination.value.page, pageSize: number = pagination.value.pageSize) {
        loading.value = true;
        try {
            const params = {
                projectId: getCurrentProjectId(),
                version,
                page,
                pageSize
            };

            const response = await budgetService.getBudgets(params);

            budgets.value = response.data.map((b: any) => ({
                id: b.Id,
                name: b.BudgetName,
                docNo: b.DocNo,
                totalAmount: b.TotalAmount,
                status: b.Status,
                date: formatDate(b.Date),
                createdBy: b.CreatedBy,
                createdAt: formatDate(b.CreatedAt),
                items: b.budgetitems || []
            }));

            if (response.pagination) {
                pagination.value.total = response.pagination.total;
                pagination.value.totalPages = response.pagination.totalPages;
                pagination.value.page = response.pagination.page;
                pagination.value.pageSize = response.pagination.pageSize;
            }
        } catch (error) {
            showError(error, 'Failed to fetch budgets.');
        } finally {
            loading.value = false;
        }
    }

    return { budgets, pagination, loading, fetchBudgets };
});
