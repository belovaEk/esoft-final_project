

export interface Tea {
  id: number;
  name: string;
  type_name: string;
  description?: string;
  price: number;
  country_name?: string;
  ingredients?: string[];
  tastes?: string[];
  isfav: boolean;
  iscart: boolean;

  cartitem_id: never;
  amount: number;
}