export interface Material {
    id?: string;
    nombre: string;
    cantidad: number;
    unidad: string;
    presentacion: number;
    precio: number;
}

export interface MaterialUpdate {
    id: string;
    cantidad: number;
    precio: number;
}