import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

export function useDashboard() {
    const router = useRouter();

    const userRole = ref<string | null>(null);

    const approvalData = ref({
        pendingApprovals: 1,
        pendingValue: 0,
        status: 'Action Required',
        urgentRequests: 1,
        urgentValue: 0
    });

    const loadUserRole = () => {
        try {
            const user = localStorage.getItem('user');
            if (user) {
                const parsed = JSON.parse(user);
                userRole.value = parsed.role;
            }
        } catch (error) {
            console.error('Error loading user role:', error);
        }
    };

    const isPurchasingRole = computed(() => {
        return userRole.value?.toLowerCase() === 'purchasing';
    });

    const navigateToRequestOrders = () => {
        router.push('/request-orders');
    };

    return {
        userRole,
        approvalData,
        loadUserRole,
        isPurchasingRole,
        navigateToRequestOrders
    };
}
