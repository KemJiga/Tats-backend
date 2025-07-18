import { Router } from "express";
import { DineroController } from "../controllers/dinero.controller";

const router = Router();

router.get('/', DineroController.getDinero);

export default router;