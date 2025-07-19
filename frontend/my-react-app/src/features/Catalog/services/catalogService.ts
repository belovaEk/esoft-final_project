import { fetchGet } from '../../../shared/api/http';
import type { productCartT } from '../../../shared/types/productCart';
import type { filterItemT } from '../types/filter';

export const fetchTeas = async (params: string): Promise<productCartT[]> => {
  return await fetchGet(`teas?${params}`);
};

export const fetchFilterOptions = async (filterType: string): Promise<filterItemT[]> => {
  return await fetchGet(`filter/${filterType}`);
};