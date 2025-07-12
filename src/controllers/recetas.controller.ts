import { Request, Response } from "express";
import { RecetasService } from "../services/recetas.service";
import { Receta, RecetaUpdate } from "../models/recetas.model";

export const RecetasController = {
    createReceta: async (req: Request, res: Response) => {
        try {
            console.log(req.body);
            const receta = await RecetasService.createReceta(req.body as Receta);
            res.status(201).json(receta);
        } catch (error) {
            res.status(500).json({ error: "Error al crear la receta" });
        }
    },
    getRecetas: async (req: Request, res: Response) => {
        try {
            const recetas = await RecetasService.getRecetas();
            res.status(200).json(recetas);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener las recetas" });
        }
    },
    getRecetaByName: async (req: Request, res: Response) => {
        try {
            const name = req.params.name as string;
            const receta = await RecetasService.getRecetaByName(name);
            res.status(200).json(receta);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener la receta" });
        }
    },
    updateReceta: async (req: Request, res: Response) => {
        try {
            const receta = await RecetasService.updateReceta(req.body as RecetaUpdate[]);
            res.status(200).json(receta);
        } catch (error) {
            res.status(500).json({ error: "Error al actualizar la receta" });
        }
    }
}
