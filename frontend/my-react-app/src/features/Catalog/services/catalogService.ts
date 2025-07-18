import { fetchGet } from '../../../shared/api/http';


export const fetchTeas = async (params: string) => {
  return await fetchGet(`teas?${params}`);
};

export const fetchFilterOptions = async (filterType: string) => {
  return await fetchGet(`filter/${filterType}`);
};