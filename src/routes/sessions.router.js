import express from "express";
import passport from "passport";
import { createHash, passportCall, authorization, isValidPassword } from "../utils.js";
import AuthController from "../controllers/auth.controller.js";
import UserController from "../controllers/user.controllers.js";


const router = express.Router();
const UM = new UserManager();
const userController = new UserController();
const authController = new AuthController();


router.post("/login", (req, res) => authController.login(req, res));

router.post("/register", userController.register);

router.get("/restore", userController.restorePassword);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    console.log("GitHub Callback Route");
    authController.githubCallback(req, res);
  }
);
router.post("/logout", (req, res) => authController.logout(req, res));

router.get("/current", passportCall("jwt"), authorization("user"), (req, res) => {
  console.log(req.cookies); 
  userController.currentUser(req, res);
});

 
export default router;


