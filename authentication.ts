import { Request } from "express";
import { Response } from "express-serve-static-core";
import { NextFunction } from "connect";
import { verify } from 'jsonwebtoken'
import { getSecret } from "./utils/configHelper";

export const authenticate = (request: Request, response: Response, next: NextFunction) => {
    const token = request.get("Authentication");
    try {
        if (verify(token, getSecret())) {
            next();
        }
    } catch (e) {
        response.status(400).json({ error: e, message: "Unauthenticated" })
    }

}