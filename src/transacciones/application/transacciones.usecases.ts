import Conserje from "../../usuarios/domain/Conserje";
import Usuario from "../../usuarios/domain/Usuario";
import Transaccion from "../domain/Transaccion";
import TransaccionesRepository from "../domain/transacciones.repository";

export default class TransaccionesUseCases {
  constructor(private transaccionesRepository: TransaccionesRepository) {}

  async getAll(): Promise<Transaccion[]> {
    return this.transaccionesRepository.getAll();
  }

  async get(usuario: Usuario): Promise<Transaccion[]> {
    return this.transaccionesRepository.get(usuario);
  }

  async getConserje(conserje: Conserje): Promise<Transaccion[]> {
    return this.transaccionesRepository.getConserje(conserje);
  }

  async crear(transaccion: Transaccion): Promise<Transaccion> {
    return this.transaccionesRepository.crear(transaccion);
  }
}
