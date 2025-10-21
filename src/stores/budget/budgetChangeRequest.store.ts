import { budgetService } from '@/services/budgetService.service';
import type { BudgetChangeRequest } from '@/types/bcr.type';
import { showError, showSuccess } from '@/utils/showNotification.utils';
import { defineStore } from 'pinia';

interface State {
    loading: boolean;
    budgetChangeRequestList: BudgetChangeRequest[];
}

export const useBudgetStore = defineStore('budgetStore', {
    state: (): State => ({
        loading: false,
        budgetChangeRequestList: []
    }),

    actions: {
        async fetchBudgetChangesRequestList() {
            this.loading = true;
            this.budgetChangeRequestList = [];

            try {
                const response = await budgetService.getBudgetChangeRequests();

                if (!response.success) {
                    showError(response.message || 'Failed to fetch budget change requests.');
                    return;
                }

                this.budgetChangeRequestList = response.data || [];
            } catch (error: any) {
                showError(error?.message || 'Failed to fetch budget change requests.');
            } finally {
                this.loading = false;
            }
        },
        async createBudgetChangeRequest(formData: FormData) {
            this.loading = true;
            try {
                const response = await budgetService.createBudgetChangeRequest(formData as any);

                if (!response.success) {
                    showError(response.message || 'Failed to create Budget Change Request.');
                    return false;
                }

                showSuccess(response.message || 'Budget Change Request created successfully.');
                await this.fetchBudgetChangesRequestList();
                return true;
            } catch (error: any) {
                showError(error, 'Failed to create budget change request.');
                return false;
            } finally {
                this.loading = false;
            }
        }
    }
});
