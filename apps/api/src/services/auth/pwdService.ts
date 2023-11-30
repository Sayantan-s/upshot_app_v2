import bcrypt from 'bcrypt';

export class PwdService {
  public static async hash(password: string, salt?: number) {
    return await bcrypt.hash(password, salt || 10);
  }

  public static async match(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }
}
