import dotenv from 'dotenv';
import { Prestamos } from "../models/prestamos.model";
import { notion } from "./notion.service";

dotenv.config();

const createPrestamo = async (prestamo: Prestamos): Promise<any> => {
    try {
        const fecha = new Date(prestamo.fecha);
        const response = await notion.pages.create({
            parent: { database_id: process.env.PRESTAMOS_DB_ID || "" },
            properties: {
                nombre: { title: [{ text: { content: prestamo.nombre } }] },
                fecha: { date: { start: fecha.toISOString() } },
                monto: { number: prestamo.monto },
                tasa: { number: prestamo.tasa },
            }
        });
        return response;
    } catch (error) {
        console.error('Error al crear el prestamo:', error);
        throw error;
    }
};

const getPrestamos = async (): Promise<Prestamos[]> => {
    try {
        const response = await notion.databases.query({
            database_id: process.env.PRESTAMOS_DB_ID || ""
        });
        return response.results.map((page: any) => ({
            id: page.id,
            nombre: page.properties.nombre.title[0].plain_text,
            fecha: page.properties.fecha.date.start,
            monto: page.properties.monto.number,
            tasa: page.properties.tasa.number,
        }));
    } catch (error) {
        console.error('Error al obtener los prestamos:', error);
        throw error;
    }
};

const getPrestamoByUsername = async (username: string): Promise<Prestamos> => {
    try {
        const response = await notion.databases.query({
            database_id: process.env.PRESTAMOS_DB_ID || "",
            filter: {
                property: "nombre",
                rich_text: { equals: username }
            }
        });
        const result = response.results[0] as any;
        if (!result) {
            throw new Error("Prestamo no encontrado");
        }
        return {
            id: result.id,
            nombre: result.properties.nombre.title[0].plain_text,
            fecha: result.properties.fecha.date.start,
            monto: result.properties.monto.number,
            tasa: result.properties.tasa.number,
        };
    } catch (error) {
        console.error('Error al obtener el prestamo:', error);
        throw error;
    }
};

const getPrestamoById = async (id: string): Promise<Prestamos> => {
    try {
        const response = await notion.pages.retrieve({ page_id: id }) as any;
        return {
            id: response.id,
            nombre: response.properties.nombre.title[0].plain_text,
            fecha: response.properties.fecha.date.start,
            monto: response.properties.monto.number,
            tasa: response.properties.tasa.number,
        };
    } catch (error) {
        console.error('Error al obtener el prestamo:', error);
        throw error;
    }
};

export const PrestamosService = {
    createPrestamo,
    getPrestamos,
    getPrestamoByUsername,
    getPrestamoById,
}