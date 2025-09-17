<template>
    <div class="col-span-12 lg:col-span-6 xl:col-span-4">
        <div class="glossy-card mb-0">
            <div class="flex justify-between mb-4">
                <div>
                    <span class="block text-muted-color font-bold mb-4">Active Purchase Orders</span>
                </div>
                <div class="flex items-center justify-center bg-orange-100 dark:bg-grey-400/10 rounded-full w-6 h-6">
                    <i class="pi pi-book text-orange-500 text-xs"></i>
                </div>
            </div>
            <div class="text-blue-500 text-surface-900 dark:text-surface-0 font-medium text-xl">1</div>
            <span class="text-muted-color">Awaiting delivery</span>
        </div>
    </div>

    <div class="col-span-12 lg:col-span-6 xl:col-span-4">
        <div class="glossy-card mb-0">
            <div class="flex justify-between mb-4">
                <div>
                    <span class="block text-muted-color font-bold mb-4">Completed Deliveries</span>
                </div>
                <div class="flex items-center justify-center bg-green-100 dark:bg-grey-400/10 rounded-full w-6 h-6">
                    <i class="pi pi-check-circle text-green-500 text-xs"></i>
                </div>
            </div>
            <div class="font-medium text-xl text-green-500 !text-green-500 dark:text-surface-0">1</div>
            <span class="text-muted-color">No discrepancies found</span>
        </div>
    </div>

    <div class="col-span-12 lg:col-span-6 xl:col-span-4">
        <div class="glossy-card mb-0">
            <div class="flex justify-between mb-4">
                <div>
                    <span class="block text-muted-color font-bold mb-4">Pending Verification</span>
                </div>
                <div class="flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-full w-6 h-6">
                    <i class="pi pi-clock text-blue-500 text-xs"></i>
                </div>
            </div>
            <div class="font-medium text-xl text-blue-500 !text-blue-500 dark:text-surface-0">1</div>
            <span class="text-muted-color">Being processed</span>
        </div>
    </div>
</template>
