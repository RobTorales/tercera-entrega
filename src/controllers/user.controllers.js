import UserServices from "../services/user.services.js";

class UserController{
    constructor(){
        this.UserServices = new UserServices();
    }

    Register = async (req, res) => {
        const { first_name, last_name, email, age, password, role, isAdmin,cart } = req.body;
        const response = await this.userService.registerUser({
          first_name,
          last_name,
          email,
          age,
          password,
          role,
          isAdmin,
          cart,
        });
     
        return res.status(response.status === "success" ? 200 : 400).json({
          status: response.status,
          data: response.user,
          redirect: response.redirect,
        });
    }

    restorePassword = async (req, res) => {
        let {user, pass} = req.query;
        pass = createHash(pass);
        const passwordRestored = await UM.restorePassword(user, pass);
    
        if (passwordRestored) {
            res.send({status:"ok", message:"La contraseña se ha actualizado correctamente!"});
        } else {
            res.status(401).send({status:"error", message:"No se pudo actualizar la contraseña!"});
        }    
    }

    current = async (req, res) => {
        if (req.session.user) {
            return res.send({
              status: "OK",
              payload: new UserResponse(req.session.user),
            });
          } else {
            return res
              .status(401)
              .send({ status: "Error", message: "No authorized" });
          }
    }
}

export default UserController;