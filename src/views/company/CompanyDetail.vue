<script lang="ts" src="./CompanyDetail.script"></script>

<template>
    <Motion :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :transition="{ duration: 0.8 }">
        <div class="p-6 card mb-6">
            <BreadcrumbList />

            <!-- Header -->
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h1 class="text-2xl font-bold dark:text-white">Company Detail</h1>
                    <p class="text-gray-500 dark:text-white">View company profile and track cost center & subcon information.</p>
                </div>
            </div>

            <!-- Company Info -->
            <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm mb-6">
                <div class="flex items-center gap-4 mb-6">
                    <img src="https://cdn-icons-png.flaticon.com/512/679/679922.png" alt="Company Logo" class="w-20 h-20 rounded-md object-cover" />
                    <div>
                        <h2 class="text-2xl font-semibold text-blue-600">Alunan Asasa</h2>
                        <p class="text-gray-600 dark:text-gray-300">Registration No: ab223124</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <p class="text-sm text-gray-400"><i class="pi pi-map-marker mr-1"></i> Kuala Lumpur</p>
                        <p class="text-sm mt-1 text-gray-500"><span class="font-semibold text-black dark:text-white">Joined:</span> 2025-08-27 16:50:29</p>

                        <div class="mt-4">
                            <h3 class="font-semibold text-black dark:text-white mb-1">Contact :</h3>
                            <div class="border rounded-lg p-3 bg-gray-50 dark:bg-gray-700">
                                <p class="font-semibold dark:text-white">Person 1</p>
                                <p class="text-gray-500 text-sm">person1@gmail.com</p>
                                <p class="text-gray-500 text-sm">01124232112</p>
                            </div>
                        </div>
                    </div>

                    <div class="ml-8 mt-3">
                        <div class="flex justify-between items-center mb-2">
                            <h3 class="font-semibold text-gray-700 dark:text-white">Projects</h3>
                            <a href="/projectList" class="text-blue-600 hover:underline text-sm font-medium">View More</a>
                        </div>

                        <div class="space-y-2">
                            <div v-for="(p, idx) in projects" :key="idx" class="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                                <div class="flex items-center gap-3">
                                    <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Project" class="w-10 h-10 object-cover rounded-md" />
                                    <div>
                                        <p class="font-semibold text-gray-900 dark:text-white">{{ p.name }}</p>
                                    </div>
                                </div>
                                <span class="bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full uppercase">
                                    {{ p.status }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tabs -->
            <BaseTab v-model="activeTab" :tabs="tabs" class="mb-4" />

            <!-- Tab Content -->
            <div v-if="activeTab === 'cost-center'">
                <CostCenterElement />
            </div>

            <div v-else-if="activeTab === 'subcon'">
                <SubconList />
            </div>
        </div>
    </Motion>
</template>
