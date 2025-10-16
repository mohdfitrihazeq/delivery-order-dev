export interface FilterVersion {
    label: string;
    value: string;
    latest?: boolean;
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
}

export interface BudgetChange {
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
    message: string;
    data: BudgetChange[];
}
