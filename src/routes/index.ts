import { Router } from 'express';
import BolisRoutes from './bolis.routes';
import RecetasRoutes from './recetas.routes';
import MaterialesRoutes from './materiales.routes';
import StockRoutes from './stock.routes';
import PrestamosRoutes from './prestamos.routes';
import PagosRoutes from './pagos.routes';

const router = Router();

router.use("/bolis", BolisRoutes);
router.use("/recetas", RecetasRoutes);
router.use("/materiales", MaterialesRoutes);
router.use("/stock", StockRoutes);
router.use("/prestamos", PrestamosRoutes);
router.use("/pagos", PagosRoutes);

export default router; 