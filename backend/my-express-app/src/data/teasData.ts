import { teaProducts } from "./fs/teasDataFs";
import type { TeaType } from "../types/tea.model";

export function getTeas(): TeaType[] {
    return teaProducts;
}