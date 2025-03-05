import { compare } from "bcrypt";
import Auth, { createToken } from "../../context/auth";
import Conserje from "../domain/Conserje";
import ConserjesRepository from "../domain/conserjes.repository";

export default class ConserjesUseCases {
  constructor(private repository: ConserjesRepository) {}

  async findByEmail(email: String): Promise<Conserje | null> {
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
}
