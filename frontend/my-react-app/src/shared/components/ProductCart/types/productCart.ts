export type ProductCartProps = {
    id: number;
    name: string;
    type_name: string;
    description?: string;
    price?: number;
    isFav: boolean;
    isCart: boolean;
    img_name: string;

    onFavouriteChange?: (id:number )=> void;

    authStatus: boolean;
    authModal?: ()=> void;
}