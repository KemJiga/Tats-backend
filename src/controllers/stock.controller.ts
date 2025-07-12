import { Request, Response } from "express";
import { StockService } from "../services/stock.service";

export const StockController = {
    getStock: async (req: Request, res: Response) => {
        try {
            const stock = await StockService.getStock();
            res.status(200).json(stock);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener el stock" });
        }
    }
}
