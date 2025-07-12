export interface Receta {
    id?: string;
    nombre: string;
    ingredientes: string[];
    pasos: string[];
}

export interface RecetaUpdate {
    id: string;
    nombre: string;
    ingredientes: string[];
    pasos: string[];
}