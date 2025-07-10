import { teaProducts } from "./fs/teasDataFs";
import type { TeaType } from "../types/tea";
import sql from "./sql/db";

export function getTeas(): TeaType[] {
    return teaProducts;
}