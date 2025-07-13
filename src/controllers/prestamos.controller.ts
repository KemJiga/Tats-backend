import { Request, Response } from "express";
import { PrestamosService } from "../services/prestamos.service";
import { Prestamos } from "../models/prestamos.model";

export const PrestamosController = {
    createPrestamo: async (req: Request, res: Response) => {
        try {
            const prestamo = await PrestamosService.createPrestamo(req.body as Prestamos);
            res.status(201).json(prestamo);
        } catch (error) {
            res.status(500).json({ error: "Error al crear el prestamo" });
        }
    },
    getPrestamos: async (req: Request, res: Response) => {
        try {
            const prestamos = await PrestamosService.getPrestamos();
            res.status(200).json(prestamos);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener los prestamos" });
        }
    },
    getPrestamoByUsername: async (req: Request, res: Response) => {
        try {
            const username = req.params.username as string;
            const prestamo = await PrestamosService.getPrestamoByUsername(username);
            res.status(200).json(prestamo);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener el prestamo" });
        }
    }
}
