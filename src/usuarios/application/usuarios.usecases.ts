import bcrypt, { compare } from "bcrypt";

import Usuario from "../domain/Usuario";
import UsuariosRepository from "../domain/usuarios.repository";
import Auth, { createToken } from "../../context/auth";

export default class UsuariosUseCases {
  constructor(private repository: UsuariosRepository) {}

  async save(email: String, password: String): Promise<void> {
    if (await this.repository.findByEmail(email)) {
      throw new Error("El email ya está en uso");
    }
    if (password.length < 6) {
      throw new Error("La contraseña debe tener al menos 6 caracteres");
    }
    if (!email.includes("@")) {
      throw new Error("El email no es válido");
    }
    if (isNaN(Number(email.split("@")[0]))) {
      throw new Error("El email no es válido");
    }
    const hashedPassword = await bcrypt.hash(password.toString(), 10);
    await this.repository.save(email, hashedPassword);
  }

  async findByEmail(email: String): Promise<Usuario | null> {
    return this.repository.findByEmail(email);
  }

  async login(email: String, password: String): Promise<Auth | false> {
    const user = await this.repository.findByEmail(email);
    if (
      user &&
      user.password &&
      (await compare(password.toString(), user.password.toString()))
    ) {
      const token = createToken(user);
      return { user: { email: user.email }, token };
    }
    return false;
  }

  async getSaldo(email: String): Promise<number> {
    const user = await this.repository.findByEmail(email);
    if (user) {
      return user.saldo || 0;
    }
    throw new Error("Usuario no encontrado");
  }
}
