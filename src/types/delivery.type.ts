// src/types/delivery.type.ts
export interface DeliveryOrderItem {
    Id: number;
    DeliveryOrderId: number;
    PurchaseOrderItemId: number;
    ItemCode: string;
    Name: string;
    Uom: string;
    Quantity: string;
    DeliveryDate: string | null;
    CreatedAt: string;
    CreatedBy: string;
    UpdatedAt?: string | null;
    UpdatedBy?: string | null;
}

export interface DeliveryOrder {
    Id: number;
    PurchaseOrderId: number;
    DocNo: string;
    Date: string;
    TotalAmount?: number | null;
    GstAmount?: number | null;
    Terms?: string | null;
    RefDoc?: string | null;
    Posting?: string | null;
    Currency?: string | null;
    Gst?: string | null;
    PlateNo?: string | null;
    Remark?: string | null;
    Attachment?: string | null;
    Status: 'Pending' | 'Completed' | string;
    CreatedAt: string;
    CreatedBy: string;
    UpdatedAt?: string | null;
    UpdatedBy?: string | null;
    DeliveryOrderItems?: DeliveryOrderItem[];
}

export interface DeliveryOrderResponse {
    success: boolean;
    message: string;
    data: DeliveryOrder[];
}
