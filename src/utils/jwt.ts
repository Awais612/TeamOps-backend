import * as jwt from "jsonwebtoken";
import { Secret, SignOptions } from "jsonwebtoken";

type JwtExpiresIn = SignOptions["expiresIn"];

interface SignTokenPayload {
  id: string;
  role: string;
  teamId?: string;
}

export const signAccessToken = (payload: SignTokenPayload) => {
  const secret = process.env.JWT_SECRET as Secret;
  if (!secret) throw new Error("JWT_SECRET is not defined");

  const expiresIn = (process.env.JWT_EXPIRES_IN ?? "15m") as JwtExpiresIn;

  return jwt.sign(payload, secret, { expiresIn });
};
