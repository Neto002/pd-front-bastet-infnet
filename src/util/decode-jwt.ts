import jwt from "jsonwebtoken";

export function decodeJwt(token: string) {
  return jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET || "");
}
