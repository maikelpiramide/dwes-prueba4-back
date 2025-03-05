import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import jwt, { Secret } from "jsonwebtoken";
import Usuario from "../usuarios/domain/Usuario";

dotenv.config();
const SECRET_KEY: Secret = String(process.env.SECRET_KEY);

export default interface Auth {
  user: Usuario;
  token: string;
}

const decode = (token: string) => {
  return jwt.decode(token);
};

const createToken = (user: any): string => {
  const payload = {
    email: user.email,
  };
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1 years" });
};

const isAuth = (req: Request, response: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"];
    const token: string | undefined = authHeader && authHeader.split(" ")[1];
    if (token) {
      const decoded: any = jwt.verify(token, SECRET_KEY);
      req.body.auth = decoded;
      next();
    }
  } catch (err) {
    console.error(err);
    response.status(401).json({ message: "No autorizado" });
  }
};

const isConserje = (req: Request, response: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"];
    const token: string | undefined = authHeader && authHeader.split(" ")[1];
    if (token) {
      const decoded: any = jwt.verify(token, SECRET_KEY);
      if (isNaN(decoded.email.split("@")[0])) {
        req.body.auth = decoded;
        next();
      } else {
        response.status(401).json({ message: "No autorizado" });
      }
    }
  } catch (err) {
    console.error(err);
    response.status(401).json({ message: "No autorizado" });
  }
};

export { decode, createToken, isAuth, isConserje };
