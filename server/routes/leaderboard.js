import {Router} from 'express'
import {getLeaderboard} from "../controllers/leaderboard.js";


const router = new Router()

router.get('/', getLeaderboard);

export default router

