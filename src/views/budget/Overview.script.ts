import BudgetSummaryData from '@/components/summaryCard/SummaryCard.vue';
import type { CardItem } from '@/types/card.type';
import { Chart } from 'highcharts-vue';
import { computed, defineComponent, onMounted, reactive, ref } from 'vue';

export default defineComponent({
    name: 'Overview',
    components: {
        BudgetSummaryData,
        highcharts: Chart
    },
    setup() {
        // ---------------------------
        // 1. DATA (constants, refs)
        // ---------------------------
        const BudgetSummaryData: CardItem[] = [
            { title: 'Total Budget', value: '$1800000', description: '24 new since last visit', icon: 'pi pi-dollar', color: 'orange' },
            { title: 'Total Items', value: '14', description: '5 Delivered', icon: 'pi pi-database', color: 'green' },
            { title: 'Location', value: '4', description: 'Upload 10 Location', icon: 'pi pi-building', color: 'blue' }
        ];

        const pieData = ref<any>(null);
        const pieOptions = ref<any>(null);

        type ChartData = { categories: string[]; series: number[]; drillMap?: Record<string, ChartData> };
        const dataMap: Record<string, ChartData> = {
            root: {
                categories: ['Concrete', 'Steel', 'Bricks'],
                series: [60, 20, 10],
                drillMap: {
                    Concrete: {
                        categories: ['Grade A', 'Grade B'],
                        series: [40, 20],
                        drillMap: {
                            'Grade A': { categories: ['Mix 1', 'Mix 2'], series: [20, 20] },
                            'Grade B': { categories: ['Mix 3', 'Mix 4'], series: [10, 10] }
                        }
                    },
                    Steel: {
                        categories: ['Rebar', 'Structural'],
                        series: [10, 10],
                        drillMap: {
                            Rebar: { categories: ['Type 1', 'Type 2'], series: [5, 5] },
                            Structural: { categories: ['Beam', 'Column'], series: [5, 5] }
                        }
                    },
                    Bricks: {
                        categories: ['Red Bricks', 'Fly Ash Bricks'],
                        series: [5, 5],
                        drillMap: {
                            'Red Bricks': { categories: ['Size 1', 'Size 2'], series: [2, 3] },
                            'Fly Ash Bricks': { categories: ['Size 3', 'Size 4'], series: [2, 3] }
                        }
                    }
                }
            }
        };

        const history: ChartData[] = [];
        const level = ref(0);
        const path = ref<string[]>([]);

        const chartOptions = reactive({
            chart: { type: 'column' },
            title: { text: '' },
            xAxis: { categories: dataMap.root.categories },
            yAxis: { title: { text: '' } },
            legend: { enabled: false },
            plotOptions: {
                series: {
                    showInLegend: false,
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function (this: Highcharts.Point) {
                                const category = this.category as string;
                                const currentData = getCurrentData();
                                if (currentData.drillMap && currentData.drillMap[category]) {
                                    drillDown(category, currentData.drillMap[category]);
                                }
                            }
                        }
                    }
                }
            },
            series: [{ data: dataMap.root.series }]
        });

        // ---------------------------
        // 2. COMPUTED
        // ---------------------------
        const breadcrumbTitle = computed(() => {
            const levelNames = ['Element', '1st Sub Element', '2nd Sub Element'];
            const currentLevel = path.value.length;
            if (currentLevel === 0) return 'Budget by Cost Centre (Material)';
            const name = path.value[currentLevel - 1];
            return `Budget by ${levelNames[currentLevel - 1]} (${name})`;
        });

        // ---------------------------
        // 3. FUNCTIONS
        // ---------------------------
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
                            label: function (context: any) {
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

        function getCurrentData(): ChartData {
            return history.length === 0 ? dataMap.root : history[history.length - 1];
        }

        function drillDown(category: string, nextData: ChartData) {
            history.push({ ...nextData, drillMap: nextData.drillMap });
            level.value++;
            chartOptions.xAxis.categories = nextData.categories;
            chartOptions.series[0].data = nextData.series;
            path.value.push(category);
        }

        function goBack() {
            if (history.length > 1) {
                history.pop();
                path.value.pop();
                level.value--;
                const prev = history[history.length - 1];
                chartOptions.xAxis.categories = prev.categories;
                chartOptions.series[0].data = prev.series;
            } else {
                history.pop();
                path.value = [];
                level.value = 0;
                const root = dataMap.root;
                chartOptions.xAxis.categories = root.categories;
                chartOptions.series[0].data = root.series;
            }
        }

        function goBackTo(levelIndex: number) {
            if (levelIndex < 0 || levelIndex >= path.value.length) return;
            history.splice(levelIndex + 1);
            path.value.splice(levelIndex);
            const current = history[history.length - 1];
            chartOptions.xAxis.categories = current.categories;
            chartOptions.series[0].data = current.series;
            level.value = history.length - 1;
        }

        // ---------------------------
        // 4. LIFECYCLE
        // ---------------------------
        history.push(dataMap.root);
        onMounted(() => {
            setColorOptions();
        });

        // ---------------------------
        // 5. RETURN
        // ---------------------------
        return {
            pieData,
            pieOptions,
            chartOptions,
            drillDown,
            goBackTo,
            goBack,
            level,
            path,
            breadcrumbTitle,
            BudgetSummaryData
        };
    }
});
