export interface Item {
    itemCode: string;
    description: string;
    location: string;
    uom: string;
    qty: number;
    price?: number;
    deliveryDate: string | Date | null;
    notes?: string;
    remark?: string;
    showNotes?: boolean;
    showRemark?: boolean;
    isBudgeted: boolean;
    budgetItemId?: number | null;
    nonBudgetItemId?: number | null;
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
    qty: number;
    price: number;
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
    deliveryDate: string | Date | null;
    note: string;
    notes?: string;
    budgetItemId?: number | null;
    nonBudgetItemId?: number | null;
    remark?: string;
}

export interface Order {
    id: number;
    roNumber: string;
    requestedBy: string;
    roDate: string;
    deliveryDate: string | Date | null;
    totalAmount: string;
    budgetType: string;
    status: 'Approved' | 'Pending' | 'Rejected';
    requestedAt: string;
    items: OrderItem[];
    RequestOrderItems?: Array<{
        Id: number;
        RequestOrderId: number;
        BudgetItemId: number | null;
        NonBudgetItemId: number | null;
        Description: string;
        Unit: string;
        Quantity: number | string;
        Notes?: string | null;
        Remark?: string | null;
        DeliveryDate: string | Date | null;
        ItemCode: string;
    }>;
    debtorId?: number;
    remark?: string;
    terms?: string;
    refDoc?: string;
    currency?: string;
    attachments?: any[];
}

export interface PreviewItem {
    itemCode: string;
    itemType?: string;
    description: string;
    uom: string;
    qty: string | number;
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
    remark?: string;
}

export interface CreateRequestOrderPayload {
    DocNo: string;
    DebtorId: number;
    RequestOrderDate: string;
    Terms: string;
    RefDoc: string;
    BudgetType: 'Budgeted' | 'NonBudgeted';
    Type: string;
    Remark: string;
    Currency: string;
    Items: Array<{
        BudgetItemId: number | null;
        NonBudgetItemId: number | null;
        Description: string;
        Uom: string;
        Quantity: number;
        Rate?: number;
        Notes: string;
        Reason: string;
        DeliveryDate: string;
    }>;
}

export interface CreateRequestOrderResponse {
    success: boolean;
    data?: any;
    message?: string;
}

export interface EditFormItem {
    code?: string;
    budgetItemId?: number | null;
    nonBudgetItemId?: number | null;
    description: string;
    uom: string;
    qty: number;
    deliveryDate: string | Date | null;
    notes?: string;
    remark?: string;
}

export interface EditForm {
    roNumber: string;
    requestedBy: string;
    roDate: Date | null;
    deliveryDate: Date | null;
    totalAmount: number;
    budgetType: string;
    remark?: string;
    terms?: string;
    refDoc?: string;
    currency?: string;
    items: EditFormItem[];
    attachments: Array<File | AttachmentItem>;
}

export type AttachmentItem = {
    filename: string;
    path: string;
    type: string;
    size: number;
};

export interface EditForm {
    roNumber: string;
    requestedBy: string;
    roDate: Date | null;
    deliveryDate: Date | null;
    totalAmount: number;
    budgetType: string;
    remark?: string;
    terms?: string;
    refDoc?: string;
    currency?: string;
    items: EditFormItem[];
    attachments: (File | AttachmentItem)[];
}

export interface DraftRO {
    draftId: string;
    project: string;
    budgetType: string;
    requestedBy: string;
    itemsCount: number;
    lastModified: string;
    roNumber: string;
    roDate: string;
    items: any[];
    overallRemark?: string;
    attachments?: File[];
}
