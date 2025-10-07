<script lang="ts" src="./CompanyList.script"></script>
<template>
    <Motion :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :transition="{ duration: 0.8 }">
        <div class="p-6 card mb-6">
            <BreadcrumbList />

            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h1 class="text-2xl font-bold dark:text-white">Company List</h1>
                    <p class="text-gray-500 dark:text-white">View and manage companies in the system, including their details and status.</p>
                </div>
            </div>

            <ReusableTable :value="companyList" :columns="columns" emptyTitle="Company Data" :onSearch="onSearchWrapper" :onActionClick="handleAction" />
        </div>
    </Motion>
</template>
