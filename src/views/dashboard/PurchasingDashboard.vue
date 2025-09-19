<script setup lang="ts">
import { useDashboard } from '@/composables/useDashboard';

const { approvalData, navigateToRequestOrders } = useDashboard();
</script>

<template>
    <div class="p-6 card glossy-card mb-0">
        <!-- Header -->
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Approval Dashboard</h1>
            <p class="text-gray-600 dark:text-gray-300 mt-2">Manage pending request order approvals</p>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <!-- Pending Approvals Card -->
            <div class="shadow-sm border border-amber-200 rounded-lg p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="dark:text-amber-100 text-amber-800 font-semibold mb-2 flex items-center gap-2">
                            <i class="pi pi-exclamation-triangle text-amber-600"></i>
                            Pending Approvals
                        </h3>
                        <div class="dark:text-amber-100 text-3xl font-bold text-amber-900 mb-2">
                            {{ approvalData.pendingApprovals }}
                        </div>
                        <p class="dark:text-amber-100 text-amber-700 text-sm">Request orders awaiting approval</p>
                    </div>
                </div>
            </div>

            <!-- Pending Value Card -->
            <div class="shadow-sm border border-blue-200 rounded-lg p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="dark:text-blue-100 text-blue-800 font-semibold mb-2 flex items-center gap-2">
                            <i class="pi pi-dollar text-blue-600"></i>
                            Pending Value
                        </h3>
                        <div class="dark:text-blue-100 text-3xl font-bold text-blue-900 mb-2">${{ approvalData.pendingValue.toLocaleString() }}</div>
                        <p class="dark:text-blue-100 text-blue-700 text-sm">Total value pending approval</p>
                    </div>
                </div>
            </div>

            <!-- Status Card -->
            <div class="shadow-sm border border-gray-200 rounded-lg p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="dark:text-gray-100 text-gray-800 font-semibold mb-2 flex items-center gap-2">
                            <i class="dark:text-gray-100 pi pi-refresh text-gray-600"></i>
                            Status
                        </h3>
                        <div class="dark:text-gray-100 text-3xl font-bold text-gray-900 mb-2">
                            {{ approvalData.status }}
                        </div>
                        <p class="dark:text-gray-100 text-gray-700 text-sm">Current approval status</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Urgent Action Card -->
        <div class="dark:bg-gray-800 bg-amber-50 border border-amber-200 rounded-lg p-6 shadow-sm">
            <div class="flex items-center justify-between">
                <div>
                    <h3 class="dark:text-amber-100 text-amber-800 font-semibold text-lg mb-2">Urgent: {{ approvalData.urgentRequests }} Request Orders Need Approval</h3>
                    <p class="dark:text-amber-100 text-amber-700">Total value: ${{ approvalData.urgentValue.toLocaleString() }}</p>
                </div>
                <Button label="Review Now" icon="pi pi-exclamation-triangle" class="bg-amber-600 hover:bg-amber-700 border-amber-600 hover:border-amber-700" @click="navigateToRequestOrders" />
            </div>
        </div>

        <!-- Additional Info Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
                <div class="space-y-3">
                    <div class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded">
                        <i class="pi pi-clock text-blue-600"></i>
                        <div>
                            <p class="text-sm font-medium text-gray-900 dark:text-white">New request order submitted</p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">2 minutes ago</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded">
                        <i class="pi pi-check-circle text-green-600"></i>
                        <div>
                            <p class="text-sm font-medium text-gray-900 dark:text-white">Order RO2025208756 approved</p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">1 hour ago</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                <div class="space-y-3">
                    <Button label="View All Request Orders" icon="pi pi-list" outlined class="w-full" @click="navigateToRequestOrders" />
                    <Button label="Generate Report" icon="pi pi-file-pdf" outlined class="w-full" disabled />
                </div>
            </div>
        </div>
    </div>
</template>
