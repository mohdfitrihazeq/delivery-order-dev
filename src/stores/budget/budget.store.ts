import { budgetService } from '@/services/budgetService.service';
import type { Budget, BudgetResponse } from '@/types/budget.type';
import { showError } from '@/utils/showNotification.utils';
import { defineStore } from 'pinia';

interface State {
    loading: boolean;
    budgets: Budget[];
    budgetVersionList: Budget[];
    totalItems: number;
    totalPages: number;
    page: number;
    pageSize: number;
}

export const useBudgetStore = defineStore('budgetStore', {
    state: (): State => ({
        loading: false,
        budgets: [],
        budgetVersionList: [],
        totalItems: 0,
        totalPages: 1,
        page: 1,
        pageSize: 10
    }),

    actions: {
        async fetchBudgetVersionList(projectId: number): Promise<Budget[] | undefined> {
            this.loading = true;
            try {
                const params = { projectId };
                const response = await budgetService.getBudgetVersion(params);

                if (!response.success) {
                    showError(response.message || 'Failed to fetch budget version list.');
                    return;
                }

                this.budgetVersionList = response.data || [];
                return this.budgetVersionList;
            } catch (error: any) {
                showError(error?.message || 'Failed to fetch budget version list.');
            } finally {
                this.loading = false;
            }
        },
        async fetchBudgetList(budgetId: number, page = 1, pageSize = 10): Promise<BudgetResponse | undefined> {
            this.loading = true;
            try {
                const params = { budgetId, page, pageSize };
                const response = await budgetService.getBudget(params);

                if (!response.success) {
                    showError(response.message || 'Failed to fetch budget.');
                    return;
                }

                this.budgets = response.data || [];
                this.totalItems = response.pagination?.totalBudgetItems ?? 0;
                this.totalPages = response.pagination?.totalPages ?? 1;
                this.page = response.pagination?.page ?? 1;
                this.pageSize = response.pagination?.pageSize ?? pageSize;

                return response;
            } catch (error: any) {
                showError(error?.message || 'Failed to fetch budget.');
            } finally {
                this.loading = false;
            }
        }
    }
});
