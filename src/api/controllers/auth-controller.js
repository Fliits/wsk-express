import { findUserByUsernamename } from "../models/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config.js";

const postLogin = async (req, res) => {
  console.log("pody", body);
  const { username, password } = req.body;
  const user = await findUserByUsernamename(username);
  if (!user) {
    res.status(401);
    return;
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    res.status(401);
    return;
  }

  delete user.password;

  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresnIn: "24h",
  });
  res.json({ user, token });
};

const getMe = async (req, res) => {
  console.log("getMe", res.locals.user);
  if (res.locals.user) {
    res.json({ message: "User found", user: res.locals.user });
  } else {
    res.sendStatus(401);
  }
};

export { postLogin, getMe };
