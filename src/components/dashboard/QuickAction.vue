<template>
    <div class="space-y-6">
        <!-- Quick Actions -->
        <div class="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <div class="mb-4">
                <h2 class="font-semibold text-gray-900 flex items-center gap-2"><i class="pi pi-plus text-sm"></i> Quick Actions</h2>
                <p class="text-gray-500 text-sm">Common tasks for your current project</p>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <!-- Import Budget -->
                <div class="flex items-center gap-3 p-4 rounded-lg border hover:shadow-sm transition bg-white">
                    <div class="flex items-center justify-center w-11 h-8 rounded-full bg-blue-100 text-blue-600">
                        <i class="pi pi-chart-bar"></i>
                    </div>
                    <div>
                        <div class="font-medium text-gray-900">Import Budget</div>
                        <div class="text-sm text-gray-500">Upload CSV file with budget items</div>
                    </div>
                </div>

                <!-- New Request Order -->
                <div class="flex items-center gap-3 p-4 rounded-lg border hover:shadow-sm transition bg-white">
                    <div class="flex items-center justify-center w-11 h-8 rounded-full bg-green-100 text-green-600">
                        <i class="pi pi-shopping-cart"></i>
                    </div>
                    <div>
                        <div class="font-medium text-gray-900">New Request Order</div>
                        <div class="text-sm text-gray-500">Create purchase request from budget</div>
                    </div>
                </div>

                <!-- Record Delivery -->
                <div class="flex items-center gap-3 p-4 rounded-lg border hover:shadow-sm transition bg-white">
                    <div class="flex items-center justify-center w-9 h-8 rounded-full bg-orange-100 text-orange-600">
                        <i class="pi pi-truck"></i>
                    </div>
                    <div>
                        <div class="font-medium text-gray-900">Record Delivery</div>
                        <div class="text-sm text-gray-500">Log received materials</div>
                    </div>
                </div>

                <!-- Manage Users -->
                <div class="flex items-center gap-3 p-4 rounded-lg border hover:shadow-sm transition bg-white">
                    <div class="flex items-center justify-center w-11 h-8 rounded-full bg-purple-100 text-purple-600">
                        <i class="pi pi-users"></i>
                    </div>
                    <div>
                        <div class="font-medium text-gray-900">Manage Users</div>
                        <div class="text-sm text-gray-500">Add users and buyer companies</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
