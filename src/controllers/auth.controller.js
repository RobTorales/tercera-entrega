import AuthServices from "../services/auth.services.js";

class AuthController {
    constructor (){
        this.AuthServices = new AuthServices();
    }

    loginUser = async (req, res) => {
        const { email, pass: password } = req.body;
    
    
        let user = await userModel.findOne({ email: email });
    
    
        if (!user) {
            return res.status(401).send({ status: "error", message: "Error! El usuario no existe!" });
        }
    
    
        let token = jwt.sign({ email, password, role: user.role }, PRIVATE_KEY, { expiresIn: "24h" });
        res.cookie("robCookieToken", token, { maxAge: 3600 * 1000, httpOnly: true });
    
    
        return res.status(200).json({ status: "success", redirect: "/products" });
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