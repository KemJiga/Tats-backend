import { Router } from 'express';
import BolisRoutes from './bolis.routes';
import RecetasRoutes from './recetas.routes';
import MaterialesRoutes from './materiales.routes';
import StockRoutes from './stock.routes';

const router = Router();

router.use("/bolis", BolisRoutes);
router.use("/recetas", RecetasRoutes);
router.use("/materiales", MaterialesRoutes);
router.use("/stock", StockRoutes);

export default router; 