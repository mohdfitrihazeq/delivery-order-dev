<script lang="ts" src="./BCR.script.ts"></script>

<template>
    <Motion :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :transition="{ duration: 0.8 }">
        <div class="p-6 card mb-0">
            <BreadcrumbList />

            <div class="flex justify-between items-center mb-6">
                <div>
                    <h1 class="text-2xl font-bold">Budget Change Request</h1>
                    <p class="dark:text-gray-200 text-gray-500">Manage budget have changes</p>
                </div>
                <Button label="+ New Budget Change Request" @click="$router.push('/bcr/create')" />
            </div>

            <div class="grid grid-cols-12 gap-4 mt-4 mb-16">
                <SummaryCard :cardItems="BudgetChangeRequestSummaryData" :cardCol="4" />
            </div>

            <ReusableTable
                :value="filteredRequests"
                :columns="tableColumns"
                :loading="false"
                :showCreate="false"
                :showImportFile="false"
                :onActionClick="handleActionClick"
                :onSearch="(val) => (searchTerm = val)"
                :extraFilters="extraFilters"
                :onFilterChange="(filters) => (activeFilters = filters)"
                emptyTitle="No budget change requests found"
            >
                <!-- Status Badge Slot -->
                <template #status="{ data }">
                    <Badge :value="data.status" :severity="getStatusSeverity(data.status)" />
                </template>

                <!-- Variance Amount Slot -->
                <template #varianceAmount="{ data }">
                    <span class="font-semibold">{{ data.varianceAmount }}</span>
                </template>
            </ReusableTable>

            <!-- View Modal -->
            <!-- <ViewBCR v-model:visible="showDetailsModal" :order="selectedOrder" :isPurchasingRole="isPurchasingRole" @approve="handleApproveFromModal" @reject="handleRejectFromModal" /> -->

            <!-- Edit Modal -->
            <!-- <EditBCR v-model:visible="showEditModal" :order="selectedOrder" @save="handleSaveOrder" /> -->
        </div>
    </Motion>
</template>
