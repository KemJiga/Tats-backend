import { BolisService } from "./bolis.service";
import { MaterialesService } from "./materiales.service";
import { Stock } from "../models/stock.model";

const getStock = async (): Promise<Stock> => {
    try {
        // Reuse existing services to get bolis and materiales
        const [bolis, materiales] = await Promise.all([
            BolisService.getBolis(),
            MaterialesService.getMateriales()
        ]);

        const stock: Stock = {
            bolis,
            materiales
        };

        return stock;
    } catch (error) {
        console.error("Error al obtener el stock:", error);
        throw error;
    }
}

export const StockService = {
    getStock,
}
