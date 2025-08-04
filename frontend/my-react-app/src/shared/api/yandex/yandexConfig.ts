const api: string = import.meta.env.VITE_YANDEX_API


export const configureYandex = (text: string): string => {
    const http = 'https://suggest-maps.yandex.ru/v1/suggest'
    const apikey = api;
    const lang = 'ru';
    const print_address = '1';
    const highlight = '0';
    const results = '4';
    const types = 'street,district,locality,area,house,entrance';


    return `${http}?apikey=${apikey}&text=${text}&lang=${lang}&print_address=${print_address}&hilight=${highlight}&results=${results}&types=${types}`
}