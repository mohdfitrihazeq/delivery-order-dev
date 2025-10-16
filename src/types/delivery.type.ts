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

export interface VerifyPurchaseOrderItem {
    id: number;
    name: string;
    order: string;
    status: string;
    location: string;
    purchaseOrderId: number;
    requestOrderId: number;
    category: string;
    type: string;
    delivered: number;
    total: number;
}

export interface Step1SelectPO {
    DocNo: string;
    purchaseOrderId: number;
    PurchaseOrderItems: Array<Record<string, any>>;
}
export interface Step2VerifyItem {
    purchaseOrderItemId: number;
    requestOrderId: number;
    quantity: number;
}

export interface Step3DeliveryInfo {
    PlateNo: string;
    Date: string;
    Remarks?: string;
    attachments?: File[];
}

export interface DeliveryFlow {
    deliveryInfo: Step3DeliveryInfo;
    selectPO: Step1SelectPO;
    verifyItem: Step2VerifyItem[];
}
