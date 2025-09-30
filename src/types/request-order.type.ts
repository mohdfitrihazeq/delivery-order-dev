export interface Item {
    itemCode: string;
    description: string;
    location: string;
    uom: string;
    quantity: string;
    price?: number;
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
    location: string;
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
    price: number;
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

export interface OrderItem {
    code: string;
    description: string;
    uom: string;
    qty: number;
    deliveryDate: string;
    note: string;
}

export interface Order {
    id: number;
    roNumber: string;
    requestedBy: string;
    roDate: string;
    deliveryDate: string;
    totalAmount: string;
    budgetType: string;
    status: 'Approved' | 'Pending' | 'Rejected';
    requestedAt: string;
    items: OrderItem[];
}

export interface PreviewItem {
    itemCode: string;
    itemType?: string;
    description: string;
    uom: string;
    quantity: string | number;
    price: number;
    deliveryDate: Date | null;
    location: string;
    notes?: string;
    remark?: string;
}

export interface PreviewSummary {
    totalItems: number;
    totalAmount: number;
    budgetType: string;
    project: string;
    roDate: string;
    roNumber: string;
    requestedBy: string;
    items: PreviewItem[];
    overallRemark?: string;
    attachmentsCount: number;
}
