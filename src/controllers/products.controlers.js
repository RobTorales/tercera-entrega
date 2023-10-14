import ProductServices from "../services/product.services.js";

class ProductController{
    constructor () {
        this.ProductServices = new ProductServices();
    }

    getProducts = async (req, res) => {
        const products = await this.ProductServices.getProducts(req.query);
        res.send({products});
    }

    getProductsById = async (req, res) => {
        let pid = req.params.pid;
        const products = await this.ProductServices.getProductById(pid);
        
        res.send({products})
    }

    addProduct = async (req, res) => {
        let {title, description, code, price, status, stock, category, thumbnails} = req.body;
    
        if (!title) {
            res.status(400).send({status:"error", message:"Error! No se cargó el campo Title!"});
            return false;
        }
    
        if (!description) {
            res.status(400).send({status:"error", message:"Error! No se cargó el campo Description!"});
            return false;
        }
    
        if (!code) {
            res.status(400).send({status:"error", message:"Error! No se cargó el campo Code!"});
            return false;
        }
    
        if (!price) {
            res.status(400).send({status:"error", message:"Error! No se cargó el campo Price!"});
            return false;
        }
    
        status = !status && true;
    
        if (!stock) {
            res.status(400).send({status:"error", message:"Error! No se cargó el campo Stock!"});
            return false;
        }
    
        if (!category) {
            res.status(400).send({status:"error", message:"Error! No se cargó el campo Category!"});
            return false;
        }
    
        if (!thumbnails) {
            res.status(400).send({status:"error", message:"Error! No se cargó el campo Thumbnails!"});
            return false;
        } else if ((!Array.isArray(thumbnails)) || (thumbnails.length == 0)) {
            res.status(400).send({status:"error", message:"Error! Debe ingresar al menos una imagen en el Array Thumbnails!"});
            return false;
        }
    
        const result = await this.ProductServices.addProduct({title, description, code, price, status, stock, category, thumbnails}); 
    
        if (result) {
            res.send({status:"ok", message:"El Producto se agregó correctamente!"});
        } else {
            res.status(500).send({status:"error", message:"Error! No se pudo agregar el Producto!"});
        }
    }
    updateProduct = async (req, res) => {
        let pid = req.params.pid;
        let {title, description, code, price, status, stock, category, thumbnails} = req.body;
    
        if (!title) {
            res.status(400).send({status:"error", message:"Error! No se cargó el campo Title!"});
            return false;
        }
    
        if (!description) {
            res.status(400).send({status:"error", message:"Error! No se cargó el campo Description!"});
            return false;
        }
    
        if (!code) {
            res.status(400).send({status:"error", message:"Error! No se cargó el campo Code!"});
            return false;
        }
    
        if (!price) {
            res.status(400).send({status:"error", message:"Error! No se cargó el campo Price!"});
            return false;
        }
    
        status = !status && true;
    
        if (!stock) {
            res.status(400).send({status:"error", message:"Error! No se cargó el campo Stock!"});
            return false;
        }
    
        if (!category) {
            res.status(400).send({status:"error", message:"Error! No se cargó el campo Category!"});
            return false;
        }
    
        if (!thumbnails) {
            res.status(400).send({status:"error", message:"Error! No se cargó el campo Thumbnails!"});
            return false;
        } else if ((!Array.isArray(thumbnails)) || (thumbnails.length == 0)) {
            res.status(400).send({status:"error", message:"Error! Debe ingresar al menos una imagen en el Array Thumbnails!"});
            return false;
        }
    
        const result = await this.ProductServices.updateProduct(pid, {title, description, code, price, status, stock, category, thumbnails});
    
        if (result) {
            res.send({status:"ok", message:"El Producto se actualizó correctamente!"});
        } else {
            res.status(500).send({status:"error", message:"Error! No se pudo actualizar el Producto!"});
        }
    }

    deleteProduct = async (req, res) => {
        let pid = req.params.pid;
        const result = await this.ProductServices.deleteProduct(pid)
    
        if (result) {
            res.send({status:"ok", message:"El Producto se eliminó correctamente!"});
        } else {
            res.status(500).send({status:"error", message:"Error! No se pudo eliminar el Producto!"});
        }
    }
}

export default ProductController;