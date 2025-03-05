import Conserje from "./Conserje";

export default interface ConserjesRepository {
  findByEmail(email: String): Promise<Conserje | null>;
}
