import type { TableColumn } from '@/types/table.type';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

import BaseTab from '@/components/tab/BaseTab.vue';
import ReusableTable from '@/components/table/ReusableTable.vue';
import Overview from '@/views/budget/budgetOverview/Overview.vue';
import BudgetImportModal from '@/views/budget/components/modal/BudgetImport.vue';

import { Motion } from '@motionone/vue';
import Badge from 'primevue/badge';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import SelectButton from 'primevue/selectbutton';
import Tag from 'primevue/tag';

export default defineComponent({
    name: 'CompanyList',
    components: {
        BaseTab,
        Motion,
        Badge,
        Button,
        Dropdown,
        SelectButton,
        Tag,
        ReusableTable,
        Overview,
        BudgetImportModal
    },
    setup() {
        // ---------------------------
        // 1. ROUTER
        // ---------------------------
        const router = useRouter();

        // ---------------------------
        // 2. TABLE COLUMNS
        // ---------------------------
        const columns: TableColumn[] = [
            { field: 'no', header: 'No', sortable: false },
            { field: 'company', header: 'Company', sortable: true },
            { field: 'registrationNo', header: 'Registration No', sortable: true },
            { field: 'joinedDate', header: 'Joined Date', sortable: true },
            { field: 'subElement', header: '1st Sub Element', sortable: true },
            { header: 'Action', action: true, actions: ['view'] }
        ];

        // ---------------------------
        // 3. COMPANY DATA
        // ---------------------------
        const companyList = ref([
            {
                no: 1,
                company: 'Alunan Asas Sdn Bhd',
                registrationNo: '201601011234 (1187654-X)',
                joinedDate: '2021-05-14',
                subElement: 'Construction'
            },
            {
                no: 2,
                company: 'Metrio Development Sdn Bhd',
                registrationNo: '201801008888 (1289902-M)',
                joinedDate: '2022-09-01',
                subElement: 'Property Development'
            }
        ]);

        // ---------------------------
        // 4. SEARCH STATE
        // ---------------------------
        const search = ref('');

        function handleSearch(value: string) {
            search.value = value;
        }

        // ---------------------------
        // 5. ACTION HANDLER
        // ---------------------------

        function handleAction(type: 'view', row: any) {
            if (type === 'view') {
                router.push(`/companyDetail/${row.no}`);
            }
        }

        // ---------------------------
        // 6. RETURN
        // ---------------------------
        return {
            columns,
            companyList,
            search,
            onSearchWrapper: handleSearch,
            handleAction
        };
    }
});
