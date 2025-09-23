export type TableColumn = {
    field?: string;
    header?: string;
    sortable?: boolean;
    frozen?: boolean;
    style?: string;
    bodySlot?: string;
    action?: boolean;
    actions?: ('edit' | 'view' | 'delete')[];
};
