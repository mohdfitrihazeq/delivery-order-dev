// src/types/purchase.type.ts
export interface PurchaseOrderItem {
    Id: number;
    PurchaseOrderId: number;
    RequestOrderItemId: number;
    SoDocNo?: string;
    ItemCode: string;
    Name: string;
    Uom?: string;
    Quantity: string | number;
    Price?: number;
    Discount?: number;
    DeliveryDate?: string;
    CreatedAt?: string;
    CreatedBy?: string;
    UpdatedAt?: string | null;
    UpdatedBy?: string | null;
}

export interface PurchaseOrder {
    Id: number;
    DocNo: string;
    PoDate: string;
    TotalAmount?: number | null;
    GstAmount?: number | null;
    Remark?: string | null;
    CreatedAt?: string;
    CreatedBy?: string;
    UpdatedAt?: string | null;
    UpdatedBy?: string | null;
    PurchaseOrderItems: PurchaseOrderItem[];
}

export interface PurchaseOrderResponse {
    success: boolean;
    data: PurchaseOrder[];
}
