import { Router } from "express";
import { PagosController } from "../controllers/pagos.controller";

const router = Router();

router.post("/", PagosController.createPago);
router.get("/", PagosController.getPagos);
router.get("/:prestamoId", PagosController.getPagosByPrestamoId);

export default router;