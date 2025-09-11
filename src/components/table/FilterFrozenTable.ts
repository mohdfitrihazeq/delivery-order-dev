import { FilterMatchMode, FilterOperator } from '@primevue/core/api';
import { onBeforeMount, reactive, ref } from 'vue';

type Severity = 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast';

interface Representative {
    name: string;
    image: string;
}

interface Country {
    name: string;
    code: string;
}

interface Customer {
    id: number;
    name: string;
    country: Country;
    representative: Representative;
    date: Date;
    company: string;
    status: string;
    activity: number;
    balance: number;
    verified: boolean;
}

export function useCustomerTableScript() {
    const customers = ref<Customer[] | null>(null);
    const filters = ref<any>(null);
    const loading = ref(true);
    const balanceFrozen = ref(false);

    const statuses = reactive(['unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal']);
    const representatives = reactive<Representative[]>([
        { name: 'Amy Elsner', image: 'amyelsner.png' },
        { name: 'Anna Fali', image: 'annafali.png' },
        { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
        { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
        { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
        { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
        { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
        { name: 'Onyama Limba', image: 'onyamalimba.png' },
        { name: 'Stephen Shaw', image: 'stephenshaw.png' },
        { name: 'XuXue Feng', image: 'xuxuefeng.png' }
    ]);

    function getSeverity(status: string): Severity | undefined {
        switch (status) {
            case 'unqualified':
                return 'danger';
            case 'qualified':
                return 'success';
            case 'new':
                return 'info';
            case 'negotiation':
                return 'warn';
            case 'renewal':
                return 'secondary';
            default:
                return undefined;
        }
    }

    function formatCurrency(value: number): string {
        return value.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
    }

    function formatDate(value: Date): string {
        return value.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }

    function initFilters() {
        filters.value = {
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            name: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
            },
            'country.name': {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
            },
            representative: { value: null, matchMode: FilterMatchMode.IN },
            date: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }]
            },
            balance: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }]
            },
            status: {
                operator: FilterOperator.OR,
                constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }]
            },
            activity: { value: [0, 100], matchMode: FilterMatchMode.BETWEEN },
            verified: { value: null, matchMode: FilterMatchMode.EQUALS }
        };
    }

    // dummy data
    onBeforeMount(() => {
        setTimeout(() => {
            customers.value = [
                {
                    id: 1,
                    name: 'John Doe',
                    country: { name: 'USA', code: 'us' },
                    representative: representatives[0],
                    date: new Date(),
                    company: 'Company A',
                    status: 'qualified',
                    activity: 75,
                    balance: 10000,
                    verified: true
                },
                {
                    id: 2,
                    name: 'Jane Smith',
                    country: { name: 'UK', code: 'gb' },
                    representative: representatives[1],
                    date: new Date(),
                    company: 'Company B',
                    status: 'new',
                    activity: 30,
                    balance: 5000,
                    verified: false
                }
            ];
            loading.value = false;
        }, 500);
        initFilters();
    });

    return {
        customers,
        filters,
        loading,
        balanceFrozen,
        statuses,
        representatives,
        getSeverity,
        formatCurrency,
        formatDate,
        initFilters
    };
}
