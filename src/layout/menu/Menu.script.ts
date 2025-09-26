import type { MenuItemType } from '@/types/sidebar.type';
import { computed, defineComponent, onMounted, ref } from 'vue';
import MenuItem from './MenuItem.vue';

export default defineComponent({
    components: {
        MenuItem
    },
    setup() {
        const userRole = ref<string | null>(null);

        const fullMenuModel: MenuItemType[] = [
            { separator: true },
            {
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' },
                    {
                        label: 'Budget',
                        icon: 'pi pi-fw pi-chart-bar',
                        items: [
                            {
                                label: 'Budget List',
                                icon: 'pi pi-fw pi-ticket',
                                to: '/budget'
                            },
                            {
                                label: 'Budget Change Request',
                                icon: 'pi pi-fw pi-tags',
                                to: '/'
                            }
                        ]
                    },
                    { label: 'Request Orders', icon: 'pi pi-fw pi-shopping-cart', to: '/request-orders' },
                    { label: 'Purchase Orders', icon: 'pi pi-fw pi-book', to: '/purchase-orders', badge: 1 },
                    { label: 'Deliveries', icon: 'pi pi-fw pi-car', to: '/deliveries' }
                ]
            },
            {
                label: 'Setting',
                items: [
                    { label: 'Company', icon: 'pi pi-fw pi-building-columns', to: '/' },
                    { label: 'Project', icon: 'pi pi-fw pi-server', to: '/' }
                ]
            }
        ];

        const rolePermissions = {
            purchasing: ['Dashboard', 'Request Orders', 'Purchase Orders'],
            site: ['Dashboard', 'Budget', 'Request Orders', 'Purchase Orders', 'Deliveries', 'Administration', 'Drafts File'],
            pm: ['Dashboard', 'Budget', 'Request Orders', 'Purchase Orders', 'Deliveries', 'Company', 'Project']
        };

        const filterMenuByRole = (menuItems: MenuItemType[], allowedItems: string[]): MenuItemType[] => {
            return menuItems
                .map((item) => {
                    if (item.separator) {
                        return item;
                    }

                    const isAllowed = allowedItems.includes(item.label || '');

                    if (!isAllowed && !item.items) {
                        return { ...item, visible: false };
                    }

                    if (item.items) {
                        const filteredItems = item.items.filter((subItem) => allowedItems.includes(subItem.label || ''));

                        if (filteredItems.length === 0 && !isAllowed) {
                            return { ...item, visible: false };
                        }

                        return {
                            ...item,
                            items: filteredItems,
                            visible: filteredItems.length > 0 || isAllowed
                        };
                    }

                    return { ...item, visible: isAllowed };
                })
                .filter((item) => item.visible !== false || item.separator);
        };

        const model = computed<MenuItemType[]>(() => {
            if (!userRole.value) {
                return fullMenuModel;
            }

            const allowedItems = rolePermissions[userRole.value.toLowerCase() as keyof typeof rolePermissions];
            if (!allowedItems) {
                return fullMenuModel;
            }

            return filterMenuByRole(fullMenuModel, allowedItems);
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

        onMounted(() => {
            loadUserRole();
        });

        return { model };
    }
});
