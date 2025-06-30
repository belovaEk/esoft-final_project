

export interface Tea {
  id: string | number;
  name: string;
  type_name: string;
  description?: string;
  price?: number;
  country_name?: string;
  ingredients?: string[];
  tastes?: string[];
}