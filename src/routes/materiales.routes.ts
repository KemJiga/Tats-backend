import { Router } from "express";
import { MaterialesController } from "../controllers/materiales.controller";

const router = Router();

router.get("/", MaterialesController.getMateriales);
router.get("/:name", MaterialesController.getMaterialByName);
router.post("/", MaterialesController.createMaterial);
router.put("/", MaterialesController.updateStock);

export default router;
