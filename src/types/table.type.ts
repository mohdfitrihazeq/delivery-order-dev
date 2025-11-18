export type TableColumn = {
    field?: string;
    header?: string;
    sortable?: boolean;
    frozen?: boolean;
    style?: string;
    bodySlot?: string;
    body?: (data: any) => string;
    action?: boolean;
    actions?: ('edit' | 'view' | 'delete' | 'comment')[];
};
