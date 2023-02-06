import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || 'jwtsecret';

export function createJwtToken(payload) {
    const tokenJWT = jwt.sign(payload, secret, {
        expiresIn: "2h"
    });

    return tokenJWT;
}

export function verifyToken(token) {
    return jwt.verify(token, secret);
}
