import { Pagos } from "./pagos.model";
import { Prestamos } from "./prestamos.model";

export interface Dinero {
    prestamos: Prestamos[];
    pagos: Pagos[];
}
