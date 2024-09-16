import {Router} from "express"
import { eliminarUnInventario, guardarInventario, obtenerInventario, obtenerUnInventario } from "../controllers/inventario.controller.js";

const router = Router();

router.post('/inventario/guardar',guardarInventario);

router.get('/inventario/obtener',obtenerInventario);

router.get('/inventario/obtener/:id',obtenerUnInventario);

router.put('/inventario/eliminar/:id',eliminarUnInventario);

export default router;