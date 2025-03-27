interface PaymentRequest {
    amount: number;
    orderId: string;
    orderName: string;
    customerName: string;
    successUrl: string;
    failUrl: string;
}

interface PaymentResponse {
    paymentKey: string;
    redirectUrl: string;
}

class TossPaymentsProvider {
    private apiKey: string;
    private apiSecret: string;

    constructor() {
        this.apiKey = process.env.TOSS_PAYMENTS_API_KEY || '';
        this.apiSecret = process.env.TOSS_PAYMENTS_API_SECRET || '';
    }

    async createPayment(request: PaymentRequest): Promise<PaymentResponse> {
        const response = await fetch('https://api.tosspayments.com/v1/payments', {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${Buffer.from(this.apiSecret + ':').toString('base64')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: request.amount,
                orderId: request.orderId,
                orderName: request.orderName,
                customerName: request.customerName,
                successUrl: request.successUrl,
                failUrl: request.failUrl,
                flowMode: 'DIRECT',
                easyPay: 'TOSSPAY',
            }),
        });

        if (!response.ok) {
            throw new Error('결제 요청 생성에 실패했습니다.');
        }

        const data = await response.json();
        return {
            paymentKey: data.paymentKey,
            redirectUrl: data.redirectUrl,
        };
    }

    async confirmPayment(paymentKey: string, amount: number, orderId: string): Promise<any> {
        const response = await fetch(`https://api.tosspayments.com/v1/payments/confirm`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${Buffer.from(this.apiSecret + ':').toString('base64')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                paymentKey,
                amount,
                orderId,
            }),
        });

        if (!response.ok) {
            throw new Error('결제 승인에 실패했습니다.');
        }

        return response.json();
    }

    async cancelPayment(paymentKey: string, cancelReason: string): Promise<any> {
        const response = await fetch(`https://api.tosspayments.com/v1/payments/${paymentKey}/cancel`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${Buffer.from(this.apiSecret + ':').toString('base64')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cancelReason,
            }),
        });

        if (!response.ok) {
            throw new Error('결제 취소에 실패했습니다.');
        }

        return response.json();
    }
}

export function getPaymentProvider() {
    return new TossPaymentsProvider();
} 