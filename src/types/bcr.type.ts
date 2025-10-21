export interface DiscussionItem {
    role: string;
    name: string;
    datetime: string;
    message: string;
    documentUrl?: string;
    isEditing: boolean;
}

export interface FilterOption {
    label: string;
    value: string;
}

export interface BudgetAttachment {
    filename: string;
    path: string;
    type: string;
    size: number;
}

export interface BudgetChangeItem {
    Id: number;
    BudgetChangeId: number;
    BudgetItemId: number;
    ItemCode: string;
    Name: string;
    Uom: string;
    UnitPrice: string;
    OrderedQty: string;
    NewOrder: string;
    ExceededQty: string;
    Description: string;
    Remark: string;
    CreatedAt: string;
    CreatedBy: string | null;
    UpdatedAt: string;
    UpdatedBy: string | null;
    location: string;
    element: string;
}

export interface BudgetChangeRequest {
    Id: number;
    ProjectId: number;
    DocNo: string;
    RequestDate: string;
    RequestedBy: string;
    Department: string;
    Remark: string;
    TotalAmount: number;
    Reason: string;
    Attachment: string | BudgetAttachment[];
    Status: string;
    CreatedBy: string | null;
    CreatedAt: string;
    UpdatedAt: string;
    UpdatedBy: string | null;
    BudgetChangeItem: BudgetChangeItem[];
}

export interface BudgetChangeRequestResponse {
    success: boolean;
    message?: string;
    data?: BudgetChangeRequest[];
}

export interface BudgetChangeItemPayload {
    ItemCode: string;
    Name: string;
    Uom: string;
    UnitPrice: number;
    OrderedQty: number;
    NewOrder: number;
    Description: string;
    Remark: string;
    location?: string;
    element?: string;
}

export interface BudgetChangeRequestPayload {
    DocNo: string;
    RequestDate: string;
    RequestedBy: string;
    Department: string;
    Remark: string;
    TotalAmount: number;
    Reason: string;
    Type: 'BudgetChangeRequest';
    Items: BudgetChangeItemPayload[];
}
