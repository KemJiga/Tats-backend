import { Request, Response } from "express";
import { PrestamosService } from "../services/prestamos.service";
import { PagosService } from "../services/pagos.service";

export const DineroController = {
    getDinero: async (req: Request, res: Response) => {
        try {
            const prestamos = await PrestamosService.getPrestamos();
            const pagos = await PagosService.getPagos();
            res.status(200).json({ prestamos, pagos });
        } catch (error) {
            res.status(500).json({ error: "Error al obtener prestamos y pagos" });
        }
    }
}
