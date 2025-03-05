import Usuario from "./Usuario";

export default interface UsuariosRepository {
  save(email: String, password: String): Promise<void>;
  findByEmail(email: String): Promise<Usuario | null>;
}
