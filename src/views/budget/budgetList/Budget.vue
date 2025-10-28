<script lang="ts" src="./BudgetLogic"></script>

<template>
    <Motion :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :transition="{ duration: 0.8 }">
        <div class="p-6 card mb-6">
            <BreadcrumbList />
            <!-- HEADER -->
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h1 class="text-2xl font-bold dark:text-white">Budget Management</h1>
                    <p class="text-gray-500 dark:text-white">Interactive charts showing budget distribution.</p>
                </div>

                <div class="flex items-center gap-2 w-full md:w-auto">
                    <Dropdown v-model="selectedVersion" :options="versions" optionLabel="label" optionValue="value" class="w-full md:w-64 h-10 rounded-lg" placeholder="Select Version">
                        <template #option="slotProps">
                            <div class="flex items-center">
                                <span>{{ slotProps.option.label }}</span>
                                <Badge v-if="slotProps.option.latest" value="Latest" severity="primary" class="ml-2" />
                            </div>
                        </template>

                        <template #value="slotProps">
                            <div class="flex items-center" v-if="slotProps.value">
                                <span>{{ versions.find((v) => v.value === slotProps.value)?.label }}</span>
                                <Badge v-if="versions.find((v) => v.value === slotProps.value)?.latest" value="Latest" severity="primary" class="ml-2" />
                            </div>
                            <span v-else class="text-gray-400">Select Version</span>
                        </template>
                    </Dropdown>
                </div>
            </div>
            <SelectButton v-model="viewMode" :options="viewOptions" optionLabel="label" optionValue="value" class="h-10 rounded-lg" />
            <!-- BODY -->
            <div v-if="viewMode === 'overview'">
                <Overview class="col-span-12" />
            </div>
            <div v-else>
                <ReusableTable
                    :value="budgetItems"
                    :columns="columns"
                    emptyTitle="Budget List Data"
                    :pagination="pagination"
                    :onPageChange="handlePageChange"
                    :onPageSizeChange="handlePageSizeChange"
                    :filters="filters"
                    :search="search"
                    @search="onSearchWrapper"
                    @action="handleAction"
                >
                    <template #rate="{ data }"> ${{ data.Rate }} </template>
                    <template #amount="{ data }"> ${{ data.Amount }} </template>
                </ReusableTable>

                <BudgetImportModal :visible="showImportModal" @close="showImportModal = false" />
            </div>
        </div>
    </Motion>
</template>
