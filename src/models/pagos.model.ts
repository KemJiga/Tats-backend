import { Prestamos } from "./prestamos.model";

export interface Pagos {
    id?: string;
    nombre: string;
    prestamoId: string;
    prestamo?: Prestamos;
    fecha: Date;
    monto: number;
    restante: number;
    tipo: 'capital' | 'interes';
}