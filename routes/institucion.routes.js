import {Router} from "express"
import { eliminarInstitucion, guardarInstituciones, obtenerInstituciones } from "../controllers/institucion.controller.js";

const router = Router();

router.get('/institucion/obtener',obtenerInstituciones);

router.post('/institucion/guardar', guardarInstituciones);

router.post('/institucion/eliminar/:id', eliminarInstitucion);



export default router;