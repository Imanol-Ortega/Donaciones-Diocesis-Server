import {Router} from "express"
import { login, register } from "../controllers/user.controller.js";


const router = Router();

router.post('/user/login',login);

router.post('/user/register',register);

export default router;