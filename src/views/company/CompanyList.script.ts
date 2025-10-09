import type { TableColumn } from '@/types/table.type';
import { Motion } from '@motionone/vue';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
    name: 'CompanyList',
    components: { Motion },
    setup() {
        const router = useRouter();

        const columns: TableColumn[] = [
            { field: 'no', header: 'No', sortable: false },
            { field: 'company', header: 'Company', sortable: true },
            { field: 'registrationNo', header: 'Registration No', sortable: true },
            { field: 'joinedDate', header: 'Joined Date', sortable: true },
            { field: 'subElement', header: '1st Sub Element', sortable: true },
            { header: 'Action', action: true, actions: ['view'] }
        ];

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

        const search = ref('');

        const handleSearch = (value: string) => {
            search.value = value;
        };

        const handleAction = (type: 'view', row: any) => {
            if (type === 'view') {
                router.push(`/companyDetail/${row.no}`);
            }
        };

        return {
            columns,
            companyList,
            search,
            onSearchWrapper: handleSearch,
            handleAction
        };
    }
});
