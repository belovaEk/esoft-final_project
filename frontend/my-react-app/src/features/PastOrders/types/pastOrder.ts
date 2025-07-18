

export type OrderItemProps = {
    tea_id: number;
    tea_name: string;
    tea_img_name: string;
    isCart: boolean;
}



export type OrderProps = {
    pretty_id: string;
    date: Date;
    status_name: string;
    items: OrderItemProps[]
}