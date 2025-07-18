import { Request, Response } from "express";
import { BolisService } from "../services/bolis.service";
import { Boli, BoliUpdate } from "../models/bolis.model";

export const BolisController = {
    createBoli: async (req: Request, res: Response) => {
        try {
            console.log(req.body);
            const boli = await BolisService.createBoli(req.body as Boli);
            res.status(201).json(boli);
        } catch (error) {
            res.status(500).json({ error: "Error al crear el boli" });
        }
    },
    getBolis: async (req: Request, res: Response) => {
        try {
            const bolis = await BolisService.getBolis();
            res.status(200).json(bolis);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener los bolis" });
        }
    },
    getBoliByName: async (req: Request, res: Response) => {
        try {
            const name = req.params.name as string;
            const boli = await BolisService.getBoliByName(name);
            res.status(200).json(boli);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener el boli" });
        }
    },
    updateStock: async (req: Request, res: Response) => {
        try {
            const boli = await BolisService.updateStock(req.body as BoliUpdate);
            res.status(200).json(boli);
        } catch (error) {
            res.status(500).json({ error: "Error al actualizar el stock" });
        }
    }
}