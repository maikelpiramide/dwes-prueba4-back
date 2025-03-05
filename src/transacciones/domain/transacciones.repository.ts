import Conserje from "../../usuarios/domain/Conserje";
import Usuario from "../../usuarios/domain/Usuario";
import Transaccion from "./Transaccion";

export default interface TransaccionesRepository {
  getAll(): Promise<Transaccion[]>;
  get(usuario: Usuario): Promise<Transaccion[]>;
  getConserje(conserje: Conserje): Promise<Transaccion[]>;
  crear(transaccion: Transaccion): Promise<Transaccion>;
}
