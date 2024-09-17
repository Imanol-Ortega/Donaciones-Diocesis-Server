import {Router} from "express"
import { eliminarDonado, guardarDonado, obtenerDonados } from "../controllers/donado.controller.js";

const router = Router();

router.get('/donado/obtener',obtenerDonados);


router.post('/donado/guardar',guardarDonado);

router.delete('/donado/eliminar/:id',eliminarDonado)

export default router;