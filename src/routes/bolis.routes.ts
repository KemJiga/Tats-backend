import { Router } from "express";
import { BolisController } from "../controllers/bolis.controller";

const router = Router();

router.get("/", BolisController.getBolis);
router.get("/:name", BolisController.getBoliByName);
router.post("/", BolisController.createBoli);
router.put("/", BolisController.updateStock);

export default router;