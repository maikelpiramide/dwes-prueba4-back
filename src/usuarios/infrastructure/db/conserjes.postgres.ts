import ConserjesRepository from "../../domain/conserjes.repository";
import Conserje from "../../domain/Conserje";
import executeQuery from "../../../context/postgres.connector";

export default class ConserjesRepositoryPostgres
  implements ConserjesRepository
{
  async findByEmail(email: String): Promise<Conserje | null> {
    const query = `SELECT * FROM conserjes WHERE email = '${email}'`;
    const result: any[] = await executeQuery(query);
    if (result.length === 0) {
      return null;
    }
    const user = result[0];
    return {
      email: user.email,
      password: user.password,
    };
  }
}
