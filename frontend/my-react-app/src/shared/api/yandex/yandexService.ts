import { yandexGet } from "../http";
import type { yandexSuggestions } from "./types";

import { configureYandex } from "./yandexConfig";

export const  fetchAdress = async(text: string): Promise<string[]> => {
    const result: yandexSuggestions = await yandexGet(`${configureYandex(text)}`);
    return result.results.map(res => res.address.formatted_address)
}