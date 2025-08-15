export interface Event {
  orderId: string;
  status: string;
  timestamp: string;
}

export var status = ["Placed","PaymentConfirmed","Shipped","Delivered"];