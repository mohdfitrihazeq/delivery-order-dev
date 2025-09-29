export interface Item {
    itemCode: string;
    description: string;
    uom: string;
    unitPrice: number;
    budgetQty: number;
    orderedQty: number;
    newOrder: number;
    exceededQty: number;
    exceededPercent: number;
    estimatedExceed: number;
    varianceQty: number;
    varianceAmount: number;
    remark: string;
    notes: string;
    showNotes: boolean;
    showRemark: boolean;
}

export interface DiscussionItem {
    role: string;
    name: string;
    datetime: string;
    message: string;
    documentUrl?: string;
}

export interface ItemOption {
    label: string;
    value: string;
    description: string;
    uom: string;
}

export interface ReasonOption {
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

export interface OrderItem {
    code: string;
    description: string;
    uom: string;
    qty: number;
    deliveryDate: string;
    note: string;
}

export interface RequestData {
    requestNo: string;
    projectCode: string;
    requestedBy: string;
    role: string;
    dateRequested: string;
    status: 'Under Review' | 'Approved' | 'Rejected';
    materials: number;
    varianceAmount: string;
    actions: ('view' | 'edit' | 'comment')[];
}
