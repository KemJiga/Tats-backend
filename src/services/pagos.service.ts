import dotenv from 'dotenv';
import { Pagos } from '../models/pagos.model';
import { notion } from './notion.service';
import { PrestamosService } from './prestamos.service';

dotenv.config();

const createPago = async (pago: Pagos): Promise<any> => {
    try {
        const fecha = new Date(pago.fecha);
        const response = await notion.pages.create({
            parent: { database_id: process.env.PAGOS_DB_ID || "" },
            properties: {
                nombre: { title: [{ text: { content: pago.nombre } }] },
                prestamo: { relation: [
                    {
                        id: pago.prestamoId,
                    }
                ] },
                fecha: { date: { start: fecha.toISOString() } },
                monto: { number: pago.monto },
                restante: { number: pago.restante },
                tipo: { select: { name: pago.tipo } }
            }
        });
        return response;
    } catch (error) {
        console.error('Error al crear el pago:', error);
        throw error;
    }
}

const getPagos = async (): Promise<Pagos[]> => {
    try {
        const response = await notion.databases.query({
            database_id: process.env.PAGOS_DB_ID || ""
        });

        if (!response || !response.results || response.results.length === 0) {
            return [];
        }

        return Promise.all(response.results.map(async (page: any) => {
            const prestamoId = page.properties.prestamo.relation[0]?.id || "";
            const prestamo = await PrestamosService.getPrestamoById(prestamoId);
            
            return {
                id: page.id,
                nombre: page.properties.nombre.title[0].plain_text,
                prestamoId: prestamoId,
                prestamo: prestamo,
                fecha: page.properties.fecha.date.start,
                monto: page.properties.monto.number,
                restante: page.properties.restante.number,
                tipo: page.properties.tipo.select.name,
            };
        }));
    } catch (error) {
        console.error('Error al obtener los pagos:', error);
        throw error;
    }
}

const getPagosByPrestamoId = async (prestamo: string): Promise<Pagos[]> => {
    try {
        const response = await notion.databases.query({
            database_id: process.env.PAGOS_DB_ID || "",
            filter: {
                property: "prestamo",
                relation: { contains: prestamo }
            }
        });

        if (!response || !response.results || response.results.length === 0) {
            return [];
        }

        return Promise.all(response.results.map(async (page: any) => {
            const prestamoId = page.properties.prestamo.relation[0]?.id || "";
            const prestamoData = await PrestamosService.getPrestamoById(prestamoId);
            
            return {
                id: page.id,
                nombre: page.properties.nombre.title[0].plain_text,
                prestamoId: prestamoId,
                prestamo: prestamoData,
                fecha: page.properties.fecha.date.start,
                monto: page.properties.monto.number,
                restante: page.properties.restante.number,
                tipo: page.properties.tipo.select.name,
            };
        }));
    } catch (error) {
        console.error('Error al obtener los pagos:', error);
        throw error;
    }
}

export const PagosService = {
    createPago,
    getPagos,
    getPagosByPrestamoId,
}   