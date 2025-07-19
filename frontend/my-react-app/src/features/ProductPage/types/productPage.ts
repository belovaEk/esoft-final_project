import type { productCartT } from "../../../shared/types/productCart"

export type productPageT = productCartT & {
    country_name: string,
    ingredients: string[]
    tastes: string[]
}