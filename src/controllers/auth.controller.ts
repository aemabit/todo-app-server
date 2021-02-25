import { Request, Response } from "express";

import User, { IUserModel } from "../models/User";
import { encryptPassword, validatePassword } from "../helpers/bcrypt";
import { JWTsession } from "../helpers/jwtSign";

export const signup = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    // VALIDATION
    const checkUserEmail = await User.findOne({ email });
    if (checkUserEmail) throw new Error("Email already registered");

    // HASH PASSWORD
    const hashedPassword = await encryptPassword(password);

    // CREATE USER
    const newUser: IUserModel = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    // TOKEN
    const token: string = JWTsession(newUser._id);

    res.status(200).json({ token, newUser });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // VALIDATE EMAIL
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid email or password");
    // VALIDATE PASSWORD
    const validPassword: boolean = await validatePassword(
      password,
      user.password
    );
    if (!validPassword) throw new Error("Invalid Password");

    // AUTH
    const token: string = JWTsession(user._id);

    res.status(200).json({ token, user });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const user = async (req: Request, res: Response) => {
  const { payload } = req.body;

  try {
    const user = await User.findById(payload, { password: 0 });
    if (!user) throw new Error("No User Found");
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
