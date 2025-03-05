import express, { Request, Response } from "express";

import TransaccionesUseCases from "../../application/transacciones.usecases";
import { isAuth, isConserje } from "../../../context/auth";
import TransaccionesRepositoryPostgres from "../db/transacciones.postgres";
import Transaccion from "../../domain/Transaccion";
import UsuariosUseCases from "../../../usuarios/application/usuarios.usecases";
import UsuariosRepositoryPostgres from "../../../usuarios/infrastructure/db/usuarios.postgres";

const router = express.Router();

const transaccionesUseCases: TransaccionesUseCases = new TransaccionesUseCases(
  new TransaccionesRepositoryPostgres()
);

const usuariosUseCases: UsuariosUseCases = new UsuariosUseCases(
  new UsuariosRepositoryPostgres()
);

router.get("/", isAuth, async (req: Request, res: Response) => {
  try {
    const transacciones = await transaccionesUseCases.get(req.body.auth);
    res.status(200).send(transacciones);
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
});

router.get(
  "/todas",
  isAuth,
  isConserje,
  async (req: Request, res: Response) => {
    try {
      const transacciones = await transaccionesUseCases.getAll();
      res.status(200).send(transacciones);
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }
);

router.get(
  "/conserje",
  isAuth,
  isConserje,
  async (req: Request, res: Response) => {
    try {
      const transacciones = await transaccionesUseCases.getConserje(
        req.body.auth
      );
      res.status(200).send(transacciones);
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }
);

router.post(
  "/recargar",
  isAuth,
  isConserje,
  async (req: Request, res: Response) => {
    try {
      const exists = await usuariosUseCases.findByEmail(req.body.usuario);
      if (!exists) {
        throw new Error("El usuario no existe");
      }
      const transaccionEntrada: Transaccion = {
        concepto: "Recarga de saldo",
        importe: req.body.importe,
        usuario: {
          email: req.body.usuario,
        },
        conserje: { email: req.body.auth.email },
      };
      const transaccion = await transaccionesUseCases.crear(transaccionEntrada);
      res.status(200).send(transaccion);
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }
);

router.post(
  "/transaccion",
  isAuth,
  isConserje,
  async (req: Request, res: Response) => {
    try {
      const exists = await usuariosUseCases.findByEmail(req.body.usuario);
      if (!exists) {
        throw new Error("El usuario no existe");
      }
      if (exists.saldo && req.body.importe > exists.saldo) {
        throw new Error(`Saldo insuficiente, saldo actual: ${exists.saldo}`);
      }
      const transaccionEntrada: Transaccion = {
        concepto: req.body.concepto,
        importe: -req.body.importe,
        usuario: {
          email: req.body.usuario,
        },
        conserje: { email: req.body.auth.email },
      };
      const transaccion = await transaccionesUseCases.crear(transaccionEntrada);
      res.status(200).send(transaccion);
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }
);

export default router;
