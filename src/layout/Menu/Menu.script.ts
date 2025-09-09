import type { Ref } from 'vue';
import { ref } from 'vue';

export interface MenuItemType {
    label?: string;
    icon?: string;
    to?: string;
    items?: MenuItemType[];
    class?: string;
    separator?: boolean;
}

export function useMenu() {
    const model: Ref<MenuItemType[]> = ref([
        {
            label: 'Pocurement Workflow',
            items: [
                { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' },
                { label: 'Project', icon: 'pi pi-fw pi-receipt', to: '/project' },
                { label: 'Budget Items', icon: 'pi pi-fw pi-list', to: '/budget-items' },
                { label: 'Request Orders', icon: 'pi pi-fw pi-shopping-cart', to: '/request-orders' },
                { label: 'Deliveries', icon: 'pi pi-fw pi-car', to: '/deliveries' }
            ]
        },
        { separator: true },
        {
            label: 'Administration',
            icon: 'pi pi-fw pi-briefcase',
            to: '/pages',
            items: [{ label: 'Auth', icon: 'pi pi-fw pi-users', to: '/auth/login' }]
        }
    ]);

    return { model };
}
