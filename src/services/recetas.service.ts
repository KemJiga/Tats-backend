import dotenv from 'dotenv';
import { notion } from "./notion.service";
import { Receta, RecetaUpdate } from "../models/recetas.model";

dotenv.config();

const createReceta = async (receta: Receta): Promise<any> => {
    try {
        const response = await notion.pages.create({
            parent: { database_id: process.env.RECETAS_DB_ID || "" },
            properties: {
                nombre: {
                    title: [{ text: { content: receta.nombre } }]
                },
                ingredientes: {
                    multi_select: receta.ingredientes.map(ingrediente => ({ name: ingrediente }))
                },
                pasos: {
                    multi_select: receta.pasos.map(paso => ({ name: paso }))
                }
            }
        });
        return response;
    } catch (error) {
        console.error("Error al crear la receta:", error);
        throw error;
    }
}

const getRecetas = async (): Promise<Receta[]> => {
    try {
        const response = await notion.databases.query({
            database_id: process.env.RECETAS_DB_ID || "",
        });
        const data = response.results;
        const recetas = data.map((item: any) => {
            const receta: Receta = {
                id: item.id,
                nombre: item.properties.nombre.title[0].plain_text,
                ingredientes: item.properties.ingredientes.multi_select?.map((item: any) => item.name) || [],
                pasos: item.properties.pasos.multi_select?.map((item: any) => item.name) || [],
            }
            return receta;
        });
        return recetas;
    } catch (error) {
        console.error("Error al obtener las recetas:", error);
        throw error;
    }
}

const getRecetaByName = async (name: string): Promise<Receta> => {
    try {
        const response = await notion.databases.query({
            database_id: process.env.RECETAS_DB_ID || "",
        });
        const data = response.results;
        const result = data.find((item: any) => item.properties.nombre.title[0].plain_text === name) as any;
        if (!result) {
            throw new Error("Receta no encontrada");
        }
        const receta: Receta = {
            id: result.id,
            nombre: result.properties.nombre.title[0].plain_text,
            ingredientes: result.properties.ingredientes.multi_select?.map((item: any) => item.name) || [],
            pasos: result.properties.pasos.multi_select?.map((item: any) => item.name) || [],
        }
        return receta;
    } catch (error) {
        console.error("Error al obtener la receta:", error);
        throw error;
    }
}

const updateReceta = async (updatedRecetas: RecetaUpdate[]) => {
    try {
        const response = await Promise.all(updatedRecetas.map(async (receta) => {
            return await notion.pages.update({
                page_id: receta.id,
                properties: {
                    nombre: {
                        title: [{ text: { content: receta.nombre } }]
                    },
                    ingredientes: {
                        multi_select: receta.ingredientes.map(ingrediente => ({ name: ingrediente }))
                    },
                    pasos: {
                        multi_select: receta.pasos.map(paso => ({ name: paso }))
                    }
                }
            });
        }));
        return response;
    } catch (error) {
        console.error("Error al actualizar la receta:", error);
        throw error;
    }
}

export const RecetasService = {
    createReceta,
    getRecetas,
    getRecetaByName,
    updateReceta,
}
