import jwt from "jsonwebtoken"
import {JWT_SECRET} from "../index.js";

export const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').split(" ")[1];
    if (token || req.headers.authorization) {
        try {
            const decoded = jwt.verify((token || req.headers.authorization), JWT_SECRET)

            req.userId = decoded.id;

            next()
        } catch (e) {
            return res.json({
                message: "Error: No access"
            })
        }
    } else {
        return res.json({
            message: "Error: No access"
        })
    }
}