import { Router } from "express";
import { PrestamosController } from "../controllers/prestamos.controller";

const router = Router();

router.post("/", PrestamosController.createPrestamo);
router.get("/", PrestamosController.getPrestamos);
router.get("/:username", PrestamosController.getPrestamoByUsername);

export default router;