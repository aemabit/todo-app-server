import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { IPayload } from "../interfaces/Payload";

export const TokenValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  try {
    // VERIFY HEADER
    if (!token) throw new Error("Access denied");

    const payload = jwt.verify(
      token,
      process.env.TOKEN_SECRET || "TODO_TOKEN_ALT"
    ) as IPayload;

    req.body.payload = payload._id

    next();
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};
