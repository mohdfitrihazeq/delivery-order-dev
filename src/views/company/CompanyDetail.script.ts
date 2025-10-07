import BaseTab from '@/components/tab/BaseTab.vue';
import ReusableTable from '@/components/table/ReusableTable.vue';
import type { TableColumn } from '@/types/table.type';
import CostCenterElement from '@/views/company/components/tab/CostCenterElement.vue';
import { Motion } from '@motionone/vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'CompanyDetail',
    components: { BaseTab, Motion, ReusableTable, CostCenterElement },
    setup() {
        const tabs = [
            { label: 'Cost Center Element', value: 'cost-center' },
            { label: 'Subcon', value: 'subcon' }
        ];
        const activeTab = ref('cost-center');

        const columns: TableColumn[] = [
            { field: 'no', header: 'No' },
            { field: 'name', header: 'Name' },
            { field: 'description', header: 'Description' }
        ];

        const costCenterList = ref([
            { no: 1, name: 'HQ-01', description: 'Main Office Cost Center' },
            { no: 2, name: 'PRJ-02', description: 'Project Operations' }
        ]);

        const subconList = ref([
            { no: 1, name: 'ABC Engineering', description: 'Mechanical Works' },
            { no: 2, name: 'XYZ Builders', description: 'Civil Works' }
        ]);

        const projects = ref([
            {
                name: 'MKT2SA',
                code: 'MKT2SA',
                status: 'Ongoing',
                image: 'https://images.unsplash.com/photo-1581092580491-7d3c00a1d3f1?auto=format&fit=crop&w=100&q=60'
            },
            {
                name: 'PG OFFICE',
                code: 'PG Office',
                status: 'Ongoing',
                image: 'https://images.unsplash.com/photo-1590608897129-79da98d159f3?auto=format&fit=crop&w=100&q=60'
            }
        ]);

        return { tabs, activeTab, columns, costCenterList, subconList, projects };
    }
});
