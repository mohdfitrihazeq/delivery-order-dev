export interface MenuItemType {
    label?: string;
    icon?: string;
    to?: string;
    items?: MenuItemType[];
    class?: string;
    separator?: boolean;
}
