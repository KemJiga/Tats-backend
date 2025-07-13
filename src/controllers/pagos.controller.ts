import { Request, Response } from "express";
import { PagosService } from "../services/pagos.service";
import { Pagos } from "../models/pagos.model";

export const PagosController = {
    createPago: async (req: Request, res: Response) => {
        try {
            const pago = await PagosService.createPago(req.body as Pagos);
            res.status(201).json(pago);
        } catch (error) {
            res.status(500).json({ error: "Error al crear el pago" });
        }
    },
    getPagos: async (req: Request, res: Response) => {
        try {
            const pagos = await PagosService.getPagos();
            res.status(200).json(pagos);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener los pagos" });
        }
    },
    getPagosByPrestamoId: async (req: Request, res: Response) => {
        try {
            const prestamoId = req.params.prestamoId as string;
            const pagos = await PagosService.getPagosByPrestamoId(prestamoId);
            res.status(200).json(pagos);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener los pagos" });
        }
    }
}