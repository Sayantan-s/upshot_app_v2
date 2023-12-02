import { UserDetails } from "./auth";

export interface IUpdateUser {
  userId: string;
  details: UserDetails;
}
