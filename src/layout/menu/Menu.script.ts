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
                label: 'Procurement Workflow',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' },
                    { label: 'Budget', icon: 'pi pi-fw pi-chart-bar', to: '/budget' },
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
            },
            {
                label: 'Drafts File',
                items: [
                    {
                        label: 'Sample Call Table',
                        icon: 'pi pi-fw pi-ban',
                        to: '/sample-call-table'
                    },
                    {
                        label: 'UI Drafts',
                        icon: 'pi pi-fw pi-ban',
                        items: [
                            { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout' },
                            { label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/uikit/input' },
                            { label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/uikit/button', class: 'rotated-icon' },
                            { label: 'Table', icon: 'pi pi-fw pi-table', to: '/uikit/table' },
                            { label: 'List', icon: 'pi pi-fw pi-list', to: '/uikit/list' },
                            { label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/uikit/tree' },
                            { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/uikit/panel' },
                            { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/uikit/overlay' },
                            { label: 'Media', icon: 'pi pi-fw pi-image', to: '/uikit/media' },
                            { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/uikit/menu' },
                            { label: 'Message', icon: 'pi pi-fw pi-comment', to: '/uikit/message' },
                            { label: 'File', icon: 'pi pi-fw pi-file', to: '/uikit/file' },
                            { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/uikit/charts' },
                            { label: 'Timeline', icon: 'pi pi-fw pi-calendar', to: '/uikit/timeline' },
                            { label: 'Misc', icon: 'pi pi-fw pi-circle', to: '/uikit/misc' },
                            { label: 'Crud', icon: 'pi pi-fw pi-pencil', to: '/pages/crud' },
                            { label: 'Not Found', icon: 'pi pi-fw pi-exclamation-circle', to: '/pages/notfound' }
                        ]
                    }
                ]
            }
        ];

        const rolePermissions = {
            purchasing: ['Dashboard', 'Request Orders'],
            site: ['Dashboard', 'Budget', 'Request Orders', 'Deliveries', 'Administration', 'Drafts File'],
            pm: ['Dashboard', 'Budget', 'Request Orders', 'Deliveries']
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
