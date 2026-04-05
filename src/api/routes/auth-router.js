import express from "express";
import { getMe, postLogin } from "../controllers/auth-controller.js";
import { authenticateToken } from "../../middlewares/authentication.js";

const authRouter = express.Router();

authRouter.route("/auth/login").post(postLogin);
authRouter.route("/auth/me").get(authenticateToken, getMe);

export default authRouter;
