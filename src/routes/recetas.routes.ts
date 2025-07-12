import { Router } from "express";
import { RecetasController } from "../controllers/recetas.controller";

const router = Router();

router.get("/", RecetasController.getRecetas);
router.get("/:name", RecetasController.getRecetaByName);
router.post("/", RecetasController.createReceta);
router.put("/", RecetasController.updateReceta);

export default router;
