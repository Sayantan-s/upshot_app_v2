import { JWTService } from "./jwtService";
import { PwdService } from "./pwdService";

export class AuthService {
  static jwt = JWTService;
  static pwd = PwdService;
}
