// src/types/budget.type.ts

export interface BudgetVersion {
    id: number;
    versionCode: number;
    name: string;
    createdAt: string;
}

export interface BudgetItem {
    id: number;
    budgetId: number;
    itemCode: string;
    itemType?: string;
    description: string;
    description2?: string;

    location: string;
    location1: string;
    location2?: string;

    category?: string;
    element: string;
    elementCode: string;
    subElement?: string;
    subSubElement?: string;

    uom?: string;
    qty: number;
    price: number;
    total: number;

    unit?: string;
    rate: number;
    amount: number;

    status?: string;
    createdAt: string;
    updatedAt?: string;

    rowIndex?: number;
}

export interface Budget {
    id: number;
    name: string;
    docNo?: string;
    totalAmount: number;
    status?: string;
    date?: string;
    createdBy?: string;
    createdAt: string;
    items: BudgetItem[];
}

export interface Pagination {
    total: number;
    totalPages: number;
    page: number;
    pageSize: number;
}

// API RESPONSE AND PARAMS DATA
export interface GetBudgetsParams {
    projectId?: number;
    version?: number;
    budgetId?: number;
    page?: number;
    pageSize?: number;
}

export interface GetBudgetsResponse<T = any> {
    success: boolean;
    message?: string;
    // IF STABLE DON'T USE T BCS T IS CALL ANY
    data: T[];
    pagination: Pagination;
}
