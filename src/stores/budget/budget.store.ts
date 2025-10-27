import { budgetService } from '@/services/budgetService.service';
import type { Budget } from '@/types/budget.type';
import { showError } from '@/utils/showNotification.utils';
import { defineStore } from 'pinia';

interface State {
    loading: boolean;
    budgetList: Budget[];
}

export const useBudgetStore = defineStore('budgetStore', {
    state: (): State => ({
        loading: false,
        budgetList: []
    }),

    actions: {
        async fetchBudgetList() {
            this.loading = true;
            this.budgetList = [];

            try {
                const response = await budgetService.getBudget();

                if (!response.success) {
                    showError(response.message || 'Failed to fetch budget.');
                    return;
                }

                this.budgetList = response.data || [];
            } catch (error: any) {
                showError(error?.message || 'Failed to fetch budget.');
            } finally {
                this.loading = false;
            }
        }
    }
});
