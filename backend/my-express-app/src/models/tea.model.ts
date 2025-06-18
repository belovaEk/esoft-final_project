interface TeaItem{
    id: number,
    name: string,
    description: string,
    country: string,
    type: string,
    taste: string[],
    composition: string[],
    price: number,
    orders: number
}


export type TeaType = TeaItem['type'];