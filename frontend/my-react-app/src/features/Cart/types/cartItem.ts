export type cartItemT = {
    amount:number,
    cartitem_id:number,
    description: string,
    id: number,
    img_name: string,
    name: string,
    price: number
}

export type CartItemProps = {
    teaId: number;
    name: string;
    img_name: string;
    description?: string;
    price: number;
    amount: number;
    onIncrease: () => void;
    onDecrease: () => void;
    deleteInCart: (teaId: number) => void;
    onCartChange: (cartitem_id: number) => void;
}