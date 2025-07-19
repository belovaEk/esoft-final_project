import { fetchGet } from '../../../shared/api/http';
import type { productCartT } from '../../../shared/types/productCart';

export const fetchTeas = async (params: string): Promise<productCartT[]> => {
  return await fetchGet(`teas?${params}`);
};

export const fetchFilterOptions = async (filterType: string) => {
  return await fetchGet(`filter/${filterType}`);
};