// CompanyDetail.script.ts
import BaseTab from '@/components/tab/BaseTab.vue';
import CostCenterElement from '@/views/company/components/tab/CostCenterElement.vue';
import SubconList from '@/views/company/components/tab/Subcon.vue';
import { Motion } from '@motionone/vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'CompanyDetail',
    components: { BaseTab, Motion, CostCenterElement, SubconList },
    setup() {
        const tabs = [
            { label: 'Cost Center Element', value: 'cost-center' },
            { label: 'Subcon', value: 'subcon' }
        ];
        const activeTab = ref('cost-center');

        const projects = ref([
            { name: 'MKT2SA', code: 'MKT2SA', status: 'Ongoing', image: 'https://images.unsplash.com/photo-1581092580491-7d3c00a1d3f1?auto=format&fit=crop&w=100&q=60' },
            { name: 'PG OFFICE', code: 'PG Office', status: 'Ongoing', image: 'https://images.unsplash.com/photo-1590608897129-79da98d159f3?auto=format&fit=crop&w=100&q=60' }
        ]);

        return { tabs, activeTab, projects };
    }
});
