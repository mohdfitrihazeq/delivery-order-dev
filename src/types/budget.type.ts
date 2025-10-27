export interface FilterVersion {
    label: string;
    value: string;
    latest?: boolean;
}

export interface BudgetItem {
    Id: number;
    BudgetId: number;
    Category: string;
    Element: string;
    SubElement: string;
    SubSubElement: string;
    ItemClass: string;
    ItemType: string;
    ItemCode: string;
    Description: string;
    Description2?: string;
    Location1?: string;
    Location2?: string;
    Unit: string;
    Quantity: number | string;
    Amount: number | string;
    Wastage?: number | string;
    Rate?: number | string;
    Status: string;
    CreatedAt: string;
    CreatedBy: string;
    UpdatedAt?: string | null;
    UpdatedBy?: string | null;
}

export interface Budget {
    Id: number;
    ProjectId: number;
    BudgetName: string;
    VersionCode: number | string;
    DocNo: string;
    Date: string;
    TotalAmount: number;
    GstAmount: number;
    Terms?: string;
    RefDoc?: string;
    Posting: string;
    Currency: string;
    Gst: string;
    Remark?: string;
    Status: string;
    CreatedAt: string;
    CreatedBy: string;
    UpdatedAt?: string | null;
    UpdatedBy?: string | null;
    ApprovedBy?: string | null;
    ApproveAt?: string | null;
    RejectedBy?: string | null;
    RejectedAt?: string | null;
    BudgetItems: BudgetItem[];
}

export interface BudgetResponse {
    success: boolean;
    message?: string;
    data?: Budget[];
}
