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

export interface BudgetItemResponse {
    success: boolean;
    message?: string;
    data?: BudgetItem[];
}
