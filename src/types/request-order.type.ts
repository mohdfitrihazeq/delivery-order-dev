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
