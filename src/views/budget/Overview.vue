<script setup>
import { onMounted, ref } from 'vue';

const pieData = ref(null);
const pieOptions = ref(null);

onMounted(() => {
    setColorOptions();
});

function setColorOptions() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    const datasets = [
        { label: 'Building A', amount: 540, item: 4 },
        { label: 'Building B', amount: 325, item: 2 },
        { label: 'Parking Area', amount: 702, item: 7 },
        { label: 'Site Area', amount: 100, item: 3 }
    ];

    pieData.value = {
        labels: datasets.map((d) => d.label),
        datasets: [
            {
                data: datasets.map((d) => d.item),
                backgroundColor: ['#FF4D4F', '#1890FF', '#00CED1', '#FFA500'],
                hoverBackgroundColor: ['#FF7875', '#40A9FF', '#48D1CC', '#FFB347'],
                items: datasets.map((d) => d.item)
            }
        ]
    };

    pieOptions.value = {
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    color: textColor,
                    boxWidth: 12,
                    padding: 15
                }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const amount = context.raw;
                        const item = context.dataset.items[context.dataIndex];
                        return `Amount: $${amount}, Item: ${item}`;
                    }
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false
    };
}
</script>

<template>
    <!--HEADER-->
    <div class="grid grid-cols-12 gap-4 mb-3">
        <!-- Card 1 -->
        <div class="col-span-12 lg:col-span-4">
            <div class="glossy-card mb-0 p-4 rounded-lg border border-gray-300">
                <div class="flex items-center gap-4">
                    <div class="flex items-center justify-center">
                        <i class="pi pi-chart-line text-blue-500 !text-xl"></i>
                    </div>
                    <div>
                        <span class="block text-muted-color font-medium">Total Budget</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">$1,800,000</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Card 2 -->
        <div class="col-span-12 lg:col-span-4">
            <div class="glossy-card mb-0 p-4 rounded-lg border border-gray-300">
                <div class="flex items-center gap-4">
                    <div class="flex items-center justify-center">
                        <i class="pi pi-eject text-green-500 !text-xl"></i>
                    </div>
                    <div>
                        <span class="block text-muted-color font-medium">Total Items</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">14</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Card 3 -->
        <div class="col-span-12 lg:col-span-4">
            <div class="glossy-card mb-0 p-4 rounded-lg border border-gray-300">
                <div class="flex items-center gap-4">
                    <div class="flex items-center justify-center">
                        <i class="pi pi-building text-orange-500 !text-xl"></i>
                    </div>
                    <div>
                        <span class="block text-muted-color font-medium">Locations</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">4</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!--BODY CHART-->
    <div class="grid grid-cols-12 gap-4 mt-6">
        <div class="col-span-12 lg:col-span-6">
            <div class="glossy-card mb-0 p-4 rounded-lg border border-gray-300 relative flex flex-col items-center">
                <span class="self-start font-bold text-black-500 mb-10"> <i class="pi pi-map-marker" style="margin-right: 5px"></i> Budget by Location</span>

                <Chart type="pie" :data="pieData" :options="pieOptions" :style="{ width: '400px', height: '200px' }" />
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6">
            <div class="glossy-card mb-0 p-4 rounded-lg border border-gray-300 relative flex flex-col items-center">
                <span class="self-start font-bold text-black-500 mb-2"> <i class="pi pi-eject" style="margin-right: 5px"></i> Budget by Element</span>
                <span class="self-start font-small">Click on bars to drill down</span>
            </div>
        </div>
    </div>
</template>
