export type DeliveryData {
  method: 'courier' | 'post';
  address: string;
}

export type OrderClientData {
  name: string;
  phone: string;
}

export type OrderDataT = {
    customer_name: string,
    customer_phone: string,
    payment_method_id: number,
    delivery_method_id: number,
    shipping_address: string,
    confirmation_method_id: number,
}

export type ClientDataT = {
    id: number,
    name: string,
    email: string
}