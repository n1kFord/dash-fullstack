import {Router} from 'express'
import {checkAuth} from "../utils/checkAuth.js";
import {updateScore, updateUser} from "../controllers/user.js";

const router = new Router()

router.put('/change', checkAuth, updateUser);
router.put('/score', checkAuth, updateScore);

export default router

