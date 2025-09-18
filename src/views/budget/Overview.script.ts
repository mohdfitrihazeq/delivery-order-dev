import BudgetSummaryData from '@/components/summaryCard/Card.vue';
import type { CardItem } from '@/types/card.type';
import Highcharts from 'highcharts';
import { computed, defineComponent, onMounted, reactive, ref } from 'vue';

export default defineComponent({
    name: 'Overview',
    components: {
        BudgetSummaryData
    },
    setup() {
        // ---------------------------
        // 1. DATA (constants, refs)
        // ---------------------------
        const BudgetSummaryData: CardItem[] = [
            { title: 'Total Budget', value: '$1800000', description: '', icon: 'pi pi-dollar', color: 'orange' },
            { title: 'Total Items', value: '14', description: '', icon: 'pi pi-database', color: 'green' },
            { title: 'Location', value: '4', description: '', icon: 'pi pi-building', color: 'blue' }
        ];

        const pieData = ref<any>(null);
        const pieOptions = ref<any>(null);

        type ChartData = { categories: string[]; series: number[]; drillMap?: Record<string, ChartData> };
        const dataMap: Record<string, ChartData> = {
            root: {
                categories: ['Labour', 'Material', 'Total Cost'],
                series: [120, 90, 150],
                drillMap: {
                    Labour: {
                        categories: ['Skilled', 'Unskilled', 'Supervision'],
                        series: [50, 40, 30],
                        drillMap: {
                            Skilled: {
                                categories: ['Plastering', 'Carpentry', 'Electrical'],
                                series: [20, 15, 15],
                                drillMap: {
                                    Plastering: { categories: ['Wall', 'Ceiling'], series: [10, 10] },
                                    Carpentry: { categories: ['Doors', 'Windows'], series: [8, 7] },
                                    Electrical: { categories: ['Wiring', 'Lighting'], series: [10, 5] }
                                }
                            },
                            Unskilled: {
                                categories: ['Labour A', 'Labour B'],
                                series: [25, 15],
                                drillMap: {
                                    'Labour A': { categories: ['Task 1', 'Task 2'], series: [12, 13] },
                                    'Labour B': { categories: ['Task 3', 'Task 4'], series: [8, 7] }
                                }
                            },
                            Supervision: {
                                categories: ['Site Engineer', 'Foreman'],
                                series: [10, 20],
                                drillMap: {
                                    'Site Engineer': { categories: ['Inspection', 'Planning'], series: [5, 5] },
                                    Foreman: { categories: ['Schedule', 'Quality Check'], series: [10, 10] }
                                }
                            }
                        }
                    },
                    Material: {
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
                    },
                    'Total Cost': {
                        categories: ['Labour Cost', 'Material Cost', 'Other Cost'],
                        series: [100, 120, 30],
                        drillMap: {
                            'Labour Cost': {
                                categories: ['Overtime', 'Regular'],
                                series: [60, 40],
                                drillMap: {
                                    Overtime: { categories: ['Weekday', 'Weekend'], series: [30, 30] },
                                    Regular: { categories: ['Weekday', 'Weekend'], series: [20, 20] }
                                }
                            },
                            'Material Cost': {
                                categories: ['Cement', 'Steel', 'Bricks'],
                                series: [50, 40, 30],
                                drillMap: {
                                    Cement: { categories: ['Type A', 'Type B'], series: [25, 25] },
                                    Steel: { categories: ['Type 1', 'Type 2'], series: [20, 20] },
                                    Bricks: { categories: ['Type X', 'Type Y'], series: [15, 15] }
                                }
                            },
                            'Other Cost': {
                                categories: ['Transport', 'Misc'],
                                series: [20, 10],
                                drillMap: {
                                    Transport: { categories: ['Truck', 'Van'], series: [10, 10] },
                                    Misc: { categories: ['Permit', 'Other'], series: [5, 5] }
                                }
                            }
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
            const levelNames = ['Category', 'Element', '1sd Element', '2nd Sub Element'];
            const currentLevel = path.value.length;
            if (currentLevel === 0) return 'Budget by Work Type';
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
