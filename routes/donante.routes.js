import {Router} from "express"
import { eliminarUnaDonacion, guardarDonacion, obtenerDonacion, obtenerUnaDonacion } from "../controllers/donante.controller.js";

const router = Router();

router.post('/donante/guardar',guardarDonacion);

router.get('/donante/obtener',obtenerDonacion);

router.get('/donante/obtener/:id',obtenerUnaDonacion);

router.delete('/donante/eliminar/:id',eliminarUnaDonacion);

export default router;