// src/views/request-orders/RequestOrder.ts

export interface RequestOrder {
    id: number;
    roNumber: string;
    requestedBy: string;
    deliveryDate: string;
    totalAmount: string;
    status: 'Approved' | 'Rejected' | 'Pending';
    requestedAt: string;
}

export async function getRequestOrders(): Promise<RequestOrder[]> {
    // Replace with API call later
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    roNumber: 'RO-2025-001',
                    requestedBy: 'John Doe',
                    deliveryDate: '2025-09-15',
                    totalAmount: '$5,000',
                    status: 'Pending',
                    requestedAt: '2025-09-10'
                }
            ]);
        }, 1000);
    });
}
