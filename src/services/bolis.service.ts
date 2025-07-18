import dotenv from 'dotenv';
import { notion } from "./notion.service";
import { Boli, BoliUpdate } from "../models/bolis.model";

dotenv.config();
const createBoli = async (boli: Boli): Promise<any> => {
    try {
        const response = await notion.pages.create({
            parent: { database_id: process.env.BOLIS_DB_ID || "" },
            properties: {
                sabor: {
                    title: [{ text: { content: boli.sabor } }]
                },
                cantidad: { number: boli.cantidad },
                gananciaPorUnidad: { number: boli.gananciaPorUnidad },
            }
        });
        return response;
    } catch (error) {
        console.error("Error al crear el boli:", error);
        throw error;
    }
}
const getBolis = async (): Promise<Boli[]> => {
    try {
        const response = await notion.databases.query({
            database_id: process.env.BOLIS_DB_ID || "",
        });
        const data = response.results;
        const bolis = data.map((item: any) => {
            const boli: Boli = {
                id: item.id,
                sabor: item.properties.sabor.title[0].plain_text,
                cantidad: item.properties.cantidad.number,
                gananciaPorUnidad: item.properties.gananciaPorUnidad.number,
            }
            return boli;
        });
        return bolis;
    } catch (error) {
        console.error("Error al obtener los bolis:", error);
        throw error;
    }
}
const getBoliByName = async (name: string): Promise<Boli> => {
    try {
        const response = await notion.databases.query({
            database_id: process.env.BOLIS_DB_ID || "",
            filter: {
                property: "sabor",
                rich_text: { equals: name }
            }
        });
        const result = response.results[0] as any;
        if (!result) {
            throw new Error("Boli no encontrado");
        }
        const boli: Boli = {
            id: result.id,
            sabor: result.properties.sabor.title[0].plain_text,
            cantidad: result.properties.cantidad.number,
            gananciaPorUnidad: result.properties.gananciaPorUnidad.number,
        }
        return boli;
    } catch (error) {
        console.error("Error al obtener el boli:", error);
        throw error;
    }
}
const updateStock = async (updatedBolis: BoliUpdate) => {
    try {
        const response = await notion.pages.update({
            page_id: updatedBolis.id,
            properties: {
                cantidad: { number: updatedBolis.cantidad },
            }
        });
        return response;
    } catch (error) {
        console.error("Error al actualizar el stock:", error);
        throw error;
    }
} 

export const BolisService = {
    createBoli,
    getBolis,
    getBoliByName,
    updateStock,
}