import { cartModel } from "../dao/models/cart.model.js";
import CartServices from "../services/cart.services.js";


class CartController {
    contructor (){
        this.CartServices = new CartServices ();
    }

    newCart = async (req, res) => {
        const cart = await this.CartServices.newCart();
    
        if (cart) {
            res.send({status:"ok", message:"El Carrito se creó correctamente!", id:cart._id});
        } else {
            res.status(500).send({status:"error", message:"Error! No se pudo crear el Carrito!"});
        }
    }

    getCart = async (req, res) => {
        const cid = req.params.cid;
        const cart = await this.CartServices.getCart(cid);
    
        if (cart) {
            res.send({products:cart.products});
        } else {
            res.status(400).send({status:"error", message:"Error! No se encuentra el ID de Carrito!"});
        }
    }

    addProduct = async (req, res) => {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const result = await this.CartServices.addProduct(cid, pid);
    
        if (result) {
            res.send({status:"ok", message:"El producto se agregó correctamente!"});
        } else {
            res.status(400).send({status:"error", message:"Error! No se pudo agregar el Producto al Carrito!"});
        }
    }

    updateCart = async (req, res) => {
        const cid = req.params.cid;
        const products = req.body.products;
        const result = await this.CartServices.updateCart(cid, products);
    
        if (result) {
            res.send({status:"ok", message:"El producto se agregó correctamente!"});
        } else {
            res.status(400).send({status:"error", message:"Error! No se pudo agregar el Producto al Carrito!"});
        }
    }

    updateQuantity = async (req, res) => {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const quantity = req.body.quantity;
        const result = await this.CartServices.updateQuantity(cid, pid, quantity);
    
        if (result) {
            res.send({status:"ok", message:"El producto se actualizó correctamente!"});
        } else {
            res.status(400).send({status:"error", message:"Error! No se pudo actualizar el Producto del Carrito!"});
        }
    }

    deleteProduct = async (req, res) => {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const result = await this.CartServices.deleteProduct(cid, pid);
    
        if (result) {
            res.send({status:"ok", message:"El producto se eliminó correctamente!"});
        } else {
            res.status(400).send({status:"error", message:"Error! No se pudo eliminar el Producto del Carrito!"});
        }
    }

    cleanCart = async (req, res) => {
        const cid = req.params.cid;
        const result = await this.CartServices.cleanCart(cid);
    
        if (result) {
            res.send({status:"ok", message:"El carrito se vació correctamente!"});
        } else {
            res.status(400).send({status:"error", message:"Error! No se pudo vaciar el Carrito!"});
        }
    }

    createPurchaseTicket = async (req, res) => {
        if(!req.user || !req.user.id){
            return res-status(400).json({error:"Usuario no definido"})
        }

        const cart = await this.CartServices.getCart(req.params.cid)

        if(!cart){
            return res.status(404).json({error: "Carrito no encontrado"});
        }

        const ProductManager = new ProductManager();
        const FailedProducts = [];
        const succesfulProducts = [];

        for(const item of cart.products){
            const product = await ProductManager.getProductById(item.product);

            if(!product){
                FailedProducts.push(item);
                continue;
            }

            if (product.stock < item.quantity) {
                console.error(
                  `Stock insuficiente para el producto ${JSON.stringify(
                    item.product
                  )}`
                );
                FailedProducts.push(item);
            }else{
                succesfulProducts.push(item);
                const newStock = product.stock - item.quantity;
                await ProductManager.updateProduct(item.product, {stock: newStock});
            }

            await cartModel.updateOne(
                { __id: req.params.cid },
                { products: FailedProducts }
            );

            if (succesfulProducts.length === 0){
                return res.status(400).json({
                    error: "No se puso comprar ningun producto",
                    FailedProducts,
                });
            }

            const totalAmount = succesfulProducts.reduce((total, products) => {
                return total + product.product.price * product.quantity;            
        },0)

        console.log("Totale Amount calculado:", totalAmount);

        const ticketData = {
            code: uuidv4(),
            purchase_datetime: new Date(),
            amount: totalAmount,
            purchaser: req.user.email,
          };
    
          console.log("Ticket Data justo antes de crear el ticket:", ticketData);
          const ticketCreated = await TicketController.createTicket({
            body: ticketData,
          });
          console.log("Ticket Creado:", ticketCreated);
    
          res.json({
            status: "success",
            message: "Compra realizada con éxito",
            ticket: ticketCreated,
            failedProducts: FailedProducts.length > 0 ? FailedProducts : undefined,
          });
        }
    }

    getPurchase = async (req,res) =>{
        const cid = req.params.cid;
      const purchase = await this.cartService.getCart(cid);

      if (purchase) {
        res.json({ status: "success", data: purchase });
      } else {
        res
          .status(404)
          .json({ status: "error", message: "Compra no encontrada" });
      }
    }
}

export default CartController;