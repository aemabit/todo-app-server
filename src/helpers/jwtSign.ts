import jwt from "jsonwebtoken";

export const JWTsession = (id: string): string => {
  return jwt.sign({ _id: id }, process.env.TOKEN_SECRET || "TODO_TOKEN_ALT", {
    expiresIn: 60 * 60 * 24,
  });
};
