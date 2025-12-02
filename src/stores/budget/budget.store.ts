import { budgetService } from '@/services/newBudget.service';
import { getCurrentProjectId } from '@/utils/contextHelper';
import { formatDate } from '@/utils/dateHelper';
import { showError } from '@/utils/showNotification.utils';
import { defineStore } from 'pinia';
import { ref } from 'vue';

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

    function normalizePagination(p: any) {
        return {
            total: p.total ?? p.totalBudgetItems ?? 0,
            totalPages: p.totalPages ?? 0,
            page: p.page ?? 1,
            pageSize: p.pageSize ?? 10
        };
    }

    async function fetchBudgetVersion() {
        loading.value = true;
        try {
            const params = {
                projectId: getCurrentProjectId()
            };

            const response = await budgetService.getBudgetVersion(params);
            if (!response.success) {
                showError(response.message || 'Failed to fetch budget versions.');
                return [];
            }

            return response.data.map((v: any) => ({
                id: v.Id,
                versionCode: v.VersionCode,
                name: v.BudgetName,
                createdAt: formatDate(v.CreatedAt)
            }));
        } catch (error) {
            showError(error, 'Failed to fetch budget versions.');
            return [];
        } finally {
            loading.value = false;
        }
    }

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
                pagination.value = normalizePagination(response.pagination);
            }
        } catch (error) {
            showError(error, 'Failed to fetch budgets.');
        } finally {
            loading.value = false;
        }
    }

    async function fetchBudgetItems(budgetId: number, page = pagination.value.page, pageSize = pagination.value.pageSize) {
        loading.value = true;
        try {
            const params = {
                projectId: getCurrentProjectId(),
                budgetId,
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
                location1: item.Location1,
                location2: item.Location2,

                category: item.Category,
                element: `${item.Category} > ${item.Element} > ${item.SubElement}`,
                elementCode: item.Element,
                subElement: item.SubElement,
                subSubElement: item.SubSubElement,

                uom: item.Unit,
                qty: Number(item.Quantity),
                price: Number(item.Rate),
                total: Number(item.Quantity) * Number(item.Rate),
                unit: item.Unit,
                rate: Number(item.Rate) || 0,
                amount: (Number(item.Quantity) || 0) * (Number(item.Rate) || 0),

                status: item.Status,
                createdAt: formatDate(item.CreatedAt),
                updatedAt: formatDate(item.UpdatedAt)
            }));

            if (response.pagination) {
                pagination.value = normalizePagination(response.pagination);
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
        fetchBudgetItems,
        fetchBudgetVersion
    };
});
