import Usuario from "../../../usuarios/domain/Usuario";
import Transaccion from "../../domain/Transaccion";
import TransaccionesRepository from "../../domain/transacciones.repository";
import executeQuery from "../../../context/postgres.connector";

export default class TransaccionesRepositoryPostgres
  implements TransaccionesRepository
{
  async getAll(): Promise<Transaccion[]> {
    const query = `SELECT * from transacciones order by id desc`;
    const result: any[] = await executeQuery(query);

    return result.map((transaccion) => {
      return {
        id: transaccion.id,
        timestamp: transaccion.timestamp,
        concepto: transaccion.concepto,
        importe: transaccion.importe,
        usuario: {
          email: transaccion.usuario,
        },
        conserje: {
          email: transaccion.conserje,
        },
      };
    });
  }

  async get(usuario: Usuario): Promise<Transaccion[]> {
    const query = `SELECT * from transacciones WHERE usuario = '${usuario.email}' order by id desc`;
    const result: any[] = await executeQuery(query);

    return result.map((transaccion) => {
      return {
        id: transaccion.id,
        timestamp: transaccion.timestamp,
        concepto: transaccion.concepto,
        importe: transaccion.importe,
        usuario: {
          email: transaccion.usuario,
        },
        conserje: {
          email: transaccion.conserje,
        },
      };
    });
  }

  async getConserje(conserje: Usuario): Promise<Transaccion[]> {
    const query = `SELECT * from transacciones WHERE conserje = '${conserje.email}' order by id desc`;
    const result: any[] = await executeQuery(query);

    return result.map((transaccion) => {
      return {
        id: transaccion.id,
        timestamp: transaccion.timestamp,
        concepto: transaccion.concepto,
        importe: transaccion.importe,
        usuario: {
          email: transaccion.usuario,
        },
        conserje: {
          email: transaccion.conserje,
        },
      };
    });
  }

  async crear(transaccion: Transaccion): Promise<Transaccion> {
    const query = `INSERT INTO transacciones (timestamp, concepto, importe, usuario, conserje) VALUES (now(), '${transaccion.concepto}', ${transaccion.importe}, '${transaccion.usuario.email}', '${transaccion.conserje.email}') RETURNING id, timestamp`;
    const results: any = await executeQuery(query);
    transaccion.id = results[0].id;
    transaccion.timestamp = results[0].timestamp;
    const queryUpdate = `UPDATE usuarios SET saldo = saldo + ${transaccion.importe} WHERE email = '${transaccion.usuario.email}'`;
    await executeQuery(queryUpdate);
    return transaccion;
  }
}
