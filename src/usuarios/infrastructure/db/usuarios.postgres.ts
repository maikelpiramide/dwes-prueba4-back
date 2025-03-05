import executeQuery from "../../../context/postgres.connector";
import Usuario from "../../domain/Usuario";
import UsuariosRepository from "../../domain/usuarios.repository";

export default class UsuariosRepositoryPostgres implements UsuariosRepository {
  async findByEmail(email: String): Promise<Usuario | null> {
    const query = `SELECT * FROM usuarios WHERE email = '${email}'`;
    const result: any[] = await executeQuery(query);
    if (result.length === 0) {
      return null;
    }
    const user = result[0];
    return {
      email: user.email,
      password: user.password,
      saldo: user.saldo,
    };
  }

  async save(email: String, password: String): Promise<void> {
    const query = `INSERT INTO usuarios (email, password) VALUES ('${email}', '${password}')`;
    const result = await executeQuery(query);
    if (!result) {
      throw new Error("Error guardando usuario");
    }
  }
}
