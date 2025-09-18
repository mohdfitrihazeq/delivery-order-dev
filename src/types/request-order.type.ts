export interface Item {
    itemCode: string;
    description: string;
    uom: string;
    quantity: string;
    deliveryDate: Date | null;
    notes: string;
    remark: string;
    showNotes: boolean;
    showRemark: boolean;
}

export interface ItemOption {
    label: string;
    value: string;
    description: string;
    uom: string;
}

export interface BudgetOption {
    label: string;
    value: string;
}

export interface BudgetItem {
    itemCode: string;
    description: string;
    location: string;
    element: string;
    itemType: string;
    uom: string;
    quantity: number;
}

export interface BudgetItem {
    itemCode: string;
    description: string;
    location: string;
    element: string;
    itemType: string;
    uom: string;
    quantity: number;
}

export interface FilterOption {
    label: string;
    value: string;
}
