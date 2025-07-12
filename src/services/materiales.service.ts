import dotenv from 'dotenv';
import { notion } from "./notion.service";
import { Material, MaterialUpdate } from "../models/materiales.model";

dotenv.config();

const createMaterial = async (material: Material): Promise<any> => {
    try {
        const response = await notion.pages.create({
            parent: { database_id: process.env.MATERIALES_DB_ID || "" },
            properties: {
                nombre: {
                    title: [{ text: { content: material.nombre } }]
                },
                cantidad: { number: material.cantidad },
                unidad: {
                    rich_text: [{ text: { content: material.unidad } }]
                },
                presentacion: { number: material.presentacion },
                precio: { number: material.precio },
            }
        });
        return response;
    } catch (error) {
        console.error("Error al crear el material:", error);
        throw error;
    }
}

const getMateriales = async (): Promise<Material[]> => {
    try {
        const response = await notion.databases.query({
            database_id: process.env.MATERIALES_DB_ID || "",
        });
        const data = response.results;
        const materiales = data.map((item: any) => {
            const material: Material = {
                id: item.id,
                nombre: item.properties.nombre.title[0].plain_text,
                cantidad: item.properties.cantidad.number,
                unidad: item.properties.unidad.rich_text[0]?.plain_text || '',
                presentacion: item.properties.presentacion.number,
                precio: item.properties.precio.number,
            }
            return material;
        });
        return materiales;
    } catch (error) {
        console.error("Error al obtener los materiales:", error);
        throw error;
    }
}

const getMaterialByName = async (name: string): Promise<Material> => {
    try {
        const response = await notion.databases.query({
            database_id: process.env.MATERIALES_DB_ID || "",
        });
        const data = response.results;
        const result = data.find((item: any) => item.properties.nombre.title[0].plain_text === name) as any;
        if (!result) {
            throw new Error("Material no encontrado");
        }
        const material: Material = {
            id: result.id,
            nombre: result.properties.nombre.title[0].plain_text,
            cantidad: result.properties.cantidad.number,
            unidad: result.properties.unidad.rich_text[0]?.plain_text || '',
            presentacion: result.properties.presentacion.number,
            precio: result.properties.precio.number,
        }
        return material;
    } catch (error) {
        console.error("Error al obtener el material:", error);
        throw error;
    }
}

const updateStock = async (updatedMateriales: MaterialUpdate[]) => {
    try {
        const response = await Promise.all(updatedMateriales.map(async (material) => {
            return await notion.pages.update({
                page_id: material.id,
                properties: {
                    cantidad: { number: material.cantidad },
                    precio: { number: material.precio },
                }
            });
        }));
        return response;
    } catch (error) {
        console.error("Error al actualizar el stock:", error);
        throw error;
    }
}

export const MaterialesService = {
    createMaterial,
    getMateriales,
    getMaterialByName,
    updateStock,
}
