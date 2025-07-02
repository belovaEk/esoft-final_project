

export interface Tea {
  id: number;
  name: string;
  type_name: string;
  description?: string;
  price: number;
  country_name?: string;
  ingredients?: string[];
  tastes?: string[];


  cartitem_id: never
  amount: number;
}