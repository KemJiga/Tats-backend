export interface Boli {
    id?: string;
    sabor: string;
    cantidad: number;
    gananciaPorUnidad: number;
}

export interface BoliUpdate {
    id: string;
    cantidad: number;
    gananciaPorUnidad: number;
}