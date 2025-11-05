import { defineStore } from 'pinia';
import { ref } from 'vue';
import { formatDate } from '@/utils/dateHelper';
import { budgetService } from '@/services/newBudget.service';
import { getCurrentProjectId } from '@/utils/contextHelper';
import { showError } from '@/utils/showNotification.utils';

export const useBudgetStore = defineStore('budget', () => {
    const budgets = ref<any[]>([]);
    const budgetItems = ref<any[]>([]);
    const pagination = ref({
        total: 0,
        totalPages: 0,
        page: 1,
        pageSize: 10
    });
    const loading = ref(false);

    async function fetchBudgets(version = 1, page = pagination.value.page, pageSize = pagination.value.pageSize) {
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
                pagination.value = {
                    total: response.pagination.total,
                    totalPages: response.pagination.totalPages,
                    page: response.pagination.page,
                    pageSize: response.pagination.pageSize
                };
            }
        } catch (error) {
            showError(error, 'Failed to fetch budgets.');
        } finally {
            loading.value = false;
        }
    }

    async function fetchBudgetItems(page: number = pagination.value.page, pageSize: number = pagination.value.pageSize) {
        loading.value = true;
        try {
            const params = {
                projectId: getCurrentProjectId(),
                page,
                pageSize
            };

            const response = await budgetService.getBudgetItems(params);
            budgetItems.value = response.data.map((item: any) => ({
                id: item.Id,
                budgetId: item.BudgetId,
                itemCode: item.ItemCode,
                itemType: item.ItemType,
                description: item.Description,
                description2: item.Description2,
                location: `${item.Location1}${item.Location2 ? ' > ' + item.Location2 : ''}`,
                element: `${item.Category} > ${item.Element} > ${item.SubElement}`,
                uom: item.Unit,
                quantity: Number(item.Quantity) || 0,
                price: Number(item.Rate) || 0,
                status: item.Status,
                createdAt: formatDate(item.CreatedAt),
                updatedAt: formatDate(item.UpdatedAt)
            }));

            if (response.pagination) {
                pagination.value.total = response.pagination.totalBudgetItems;
                pagination.value.totalPages = response.pagination.totalPages;
                pagination.value.page = response.pagination.page;
                pagination.value.pageSize = response.pagination.pageSize;
            }
        } catch (error) {
            showError(error, 'Failed to fetch budget items.');
        } finally {
            loading.value = false;
        }
    }

    return {
        budgets,
        budgetItems,
        pagination,
        loading,
        fetchBudgets,
        fetchBudgetItems
    };
});
