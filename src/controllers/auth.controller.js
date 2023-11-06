import AuthServices from "../services/auth.services.js";
import CartServices from "../services/cart.services.js";

class AuthController {
    constructor (){
        this.AuthServices = new AuthServices();
        this.CartServices = new CartServices();
    }

    loginUser = async (req, res) => {
        const { email, password } = req.body;
        let user = await this.AuthServices.LoginUser(email, password);
        if (!user) {
            return res.status(401).send({ status: "error", message: "Error! El usuario no existe!" });
        }
        const userData = { token: Math.random().toString(36).substring(7) }; 
        res.cookie("robCookieToken", userData.token, { maxAge: 3600 * 1000, httpOnly: true });
        return res.status(200).json({ status: "success", user: userData.user, redirect: "/products" });
    }

    logOut = async (req, res) => {
        req.session.destroy;
        res.redirect("/");
    }

    githubCallback = async (req, res) => {
        req.session.user = req.user;
        req.session.loggedIn = true;
        res.redirect("/products");
    }

}

export default AuthController;