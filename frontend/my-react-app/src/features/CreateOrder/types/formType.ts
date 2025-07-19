export type deliveryDataT = {
  method: 'courier' | 'post';
  address: string;
}

export type orderClientDataT = {
  name: string;
  phone: string;
}

export type orderDataT = {
    customer_name: string,
    customer_phone: string,
    payment_method_id: number,
    delivery_method_id: number,
    shipping_address: string,
    confirmation_method_id: number,
}

export type clientDataT = {
    id: number,
    name: string,
    email: string
}