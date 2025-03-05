import Conserje from "../../usuarios/domain/Conserje";
import Usuario from "../../usuarios/domain/Usuario";

export default interface Transaccion {
  id?: Number;
  concepto: String;
  importe: Number;
  timestamp?: Date;
  usuario: Usuario;
  conserje: Conserje;
}
