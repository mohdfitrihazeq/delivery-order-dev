<template>
    <div class="space-y-6 pt-6">
        <!-- Delivery Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <!-- Overdue Deliveries -->
            <div class="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
                <h3 class="text-red-700 font-medium">Overdue Deliveries</h3>
                <div class="text-3xl font-bold text-red-700 mt-2">1</div>
                <p class="text-sm mb-4">Items past delivery date</p>
                <button class="px-4 py-2 rounded-md text-sm font-medium bg-white border border-red-300 hover:bg-red-100">Check Status</button>
            </div>

            <!-- Upcoming Deliveries -->
            <div class="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
                <h3 class="text-blue-700 font-medium">Upcoming Deliveries</h3>
                <div class="text-3xl font-bold text-blue-700 mt-2">3</div>
                <p class="text-sm mb-4">Expected this week</p>
                <button class="px-4 py-2 rounded-md text-sm font-medium bg-white border border-blue-300 hover:bg-blue-100">View Schedule</button>
            </div>
        </div>
    </div>
</template>
