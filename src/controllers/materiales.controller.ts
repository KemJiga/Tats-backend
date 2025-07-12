import { Request, Response } from "express";
import { MaterialesService } from "../services/materiales.service";
import { Material, MaterialUpdate } from "../models/materiales.model";

export const MaterialesController = {
    createMaterial: async (req: Request, res: Response) => {
        try {
            console.log(req.body);
            const material = await MaterialesService.createMaterial(req.body as Material);
            res.status(201).json(material);
        } catch (error) {
            res.status(500).json({ error: "Error al crear el material" });
        }
    },
    getMateriales: async (req: Request, res: Response) => {
        try {
            const materiales = await MaterialesService.getMateriales();
            res.status(200).json(materiales);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener los materiales" });
        }
    },
    getMaterialByName: async (req: Request, res: Response) => {
        try {
            const name = req.params.name as string;
            const material = await MaterialesService.getMaterialByName(name);
            res.status(200).json(material);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener el material" });
        }
    },
    updateStock: async (req: Request, res: Response) => {
        try {
            const material = await MaterialesService.updateStock(req.body as MaterialUpdate[]);
            res.status(200).json(material);
        } catch (error) {
            res.status(500).json({ error: "Error al actualizar el stock" });
        }
    }
}
