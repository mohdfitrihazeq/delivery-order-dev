import { budgetService } from '@/services/budgetService.service';
import type { BudgetChangeRequest, BudgetChangeRequestPayload } from '@/types/budgetChangeRequest.type';
import { showError, showSuccess } from '@/utils/showNotification.utils';
import { defineStore } from 'pinia';

interface State {
    loading: boolean;
    budgetChangeRequestList: BudgetChangeRequest[];
    singleBudgetChangeRequest: BudgetChangeRequest | null;

    pagination: {
        page: number;
        pageSize: number;
        total: number;
        totalPages: number;
    };

    filters: {
        search: string;
        status: string;
    };
}

export const useBudgetChangeRequestStore = defineStore('budgetCRStore', {
    state: (): State => ({
        loading: false,
        budgetChangeRequestList: [],
        singleBudgetChangeRequest: null,

        pagination: {
            page: 1,
            pageSize: 10,
            total: 0,
            totalPages: 0
        },

        filters: {
            search: '',
            status: ''
        }
    }),

    actions: {
        async fetchBudgetChangesRequestList() {
            this.loading = true;
            this.budgetChangeRequestList = [];

            try {
                const response = await budgetService.getBudgetChangeRequests();
                if (!response.success) {
                    showError(response.message || 'Failed to fetch budget change requests.');
                    return [];
                }

                this.budgetChangeRequestList = response.data || [];

                // FE pagination (simulate total count)
                this.pagination.total = this.budgetChangeRequestList.length;
                this.pagination.totalPages = Math.ceil(this.pagination.total / this.pagination.pageSize);

                return this.budgetChangeRequestList;
            } catch (error: any) {
                showError(error?.message || 'Failed to fetch budget change requests.');
                return [];
            } finally {
                this.loading = false;
            }
        },

        async createBudgetChangeRequest(payload: BudgetChangeRequestPayload) {
            this.loading = true;
            try {
                const response = await budgetService.createBudgetChangeRequest(payload);

                if (!response.success) {
                    showError(response.message || 'Failed to create Budget Change Request.');
                    return null;
                }

                showSuccess(response.message || 'Budget Change Request created successfully.');
                await this.fetchBudgetChangesRequestList();

                return response.data;
            } catch (error: any) {
                showError(error, 'Failed to create budget change request.');
                return null;
            } finally {
                this.loading = false;
            }
        },

        async getSingleBudgetChange(bcrId: number) {
            this.loading = true;
            try {
                const response = await budgetService.getSingleBudgetChangeRequest(bcrId);

                if (!response.success || !response.data) {
                    showError('Budget change request not found.');
                    this.singleBudgetChangeRequest = null;
                    return null;
                }

                this.singleBudgetChangeRequest = { ...response.data };
                return this.singleBudgetChangeRequest;
            } catch (error: any) {
                showError(error, 'Failed to fetch budget change request.');
                this.singleBudgetChangeRequest = null;
                return null;
            } finally {
                this.loading = false;
            }
        },

        async editBudgetChangeRequest(payload: BudgetChangeRequestPayload, bcrId: number) {
            this.loading = true;
            try {
                const response = await budgetService.editBudgetChangeRequest(payload, bcrId);

                if (!response.success) {
                    showError(response.message || 'Failed to update Budget Change Request.');
                    return null;
                }

                showSuccess(response.message || 'Budget Change Request updated successfully.');
                await this.fetchBudgetChangesRequestList();

                return response.data || true;
            } catch (error: any) {
                showError(error?.message || 'Failed to update budget change request.');
                return null;
            } finally {
                this.loading = false;
            }
        },

        setPage(page: number) {
            this.pagination.page = page;
        },

        setPageSize(size: number) {
            this.pagination.pageSize = size;
            this.pagination.page = 1;
        },

        handleSearch(value: string) {
            this.filters.search = value;
            this.pagination.page = 1;
        },

        handleFilterChange(value: Record<string, any>) {
            this.filters.status = value.status ?? '';
            this.pagination.page = 1;
        }
    }
});
