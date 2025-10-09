// ProjectList.script.ts
import { Motion } from '@motionone/vue';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import { computed, defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'ProjectListCard',
    components: { Motion, Button, Dropdown },
    setup() {
        const router = useRouter();
        const search = ref('');
        const selectedCompany = ref(null);

        const companyList = ref([
            { no: 0, company: 'All' },
            { no: 1, company: 'MKT' },
            { no: 2, company: 'PG OFFICE' }
        ]);

        const projectList = ref([
            { id: 1, companyNo: 1, projectName: 'MKT Project 1', projectCode: 'MKT2SA', propertyType: 'LANDED', subElement: 'Development Sdn Bhd', location: 'Kuala Lumpur', status: 'ONGOING' },
            { id: 2, companyNo: 1, projectName: 'MKT Project 2', projectCode: 'MKT2SB', propertyType: 'HIGHRISE', subElement: 'Development Sdn Bhd', location: 'Kuala Lumpur', status: 'COMPLETED' },
            { id: 3, companyNo: 2, projectName: 'PG Office Project', projectCode: 'PG1', propertyType: 'HIGHRISE', subElement: 'Development Sdn Bhd', location: 'Kuala Lumpur', status: 'ONGOING' }
        ]);

        const filteredProjectList = computed(() => {
            return projectList.value.filter((p) => (!search.value || p.projectName.toLowerCase().includes(search.value.toLowerCase())) && (!selectedCompany.value || p.companyNo === selectedCompany.value.no));
        });

        function handleAction(type: 'view', row: any) {
            if (type === 'view') {
                router.push(`/projectDetail/${row.id}`);
            }
        }

        return {
            search,
            selectedCompany,
            companyList,
            projectList,
            filteredProjectList,
            handleAction
        };
    }
});
