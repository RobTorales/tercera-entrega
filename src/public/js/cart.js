const createCart = async () => {
    try {
        if (!localStorage.getItem("cart")) {
            const response = await fetch("/api/carts/", {
                method: "POST",
                headers: {"Content-type": "application/json; charset=UTF-8"}
            });
            
            const data = await response.json();
            localStorage.setItem("cart", JSON.stringify(data));
            localStorage.setItem("carrito", JSON.stringify({ id: data.id }));
            return{ id: data.id};
        }
    } catch(error) {
        console.log("Error en Crear el Carrito! " + error);
    }

    const getCartId = async () => {
        try{
            let cart = await createCart();
            if(!cart.id){
                console.log("el ID del carrito es indefinido");
            }
            return cart.id;
        }catch(error){
            console.log("Error en obtener el ID del carrito!" + error);
        }
    };

    const addProductToCart = async () => {
        try {
            let cid = await getCartId();

            if(!cid){
                console.log("el CID es indefinido");
                return;
            }

            console.log("Verificando IDs:", cid, pid);
            const response = await fetch("/api/carts/" + cid + "/products/" + pid, {
                method:"POST",
                headers: {"Content-type":"application/json charset=UTF-8"},
            });

            const data = await response.json();

            if(response.ok){
                console.log("Se agrego al carrito", data);
            }else{
                console.log("Error al agregar el producto al carrito! Status:", response.status,
                data);
            }
        } catch (error) {
            console.log("Error en agregar el producto al carrito" + error)
        }
    }

    async function makePurchase(){
        try {
            const cartId = await getCartId();
            console.log("Cart ID:", cartId);

            if(!cartId){
                throw new Error("Carrito no encontrado");
            }

            const url = `api/carts/${cartId}/purchase`;
            console.log("URL de compra:", url);
            
            const response = await fetch(url, {
                method: "POST",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                },
            });
            console.log("response", response);
            if(!response.ok){
                console.error("Error en la respuesta", response.statusText);
                const text = await response.text();
                console.error(text);
                return;
            }

            const contentType =  response.headers.get("content-type");
            if(contentType && contentType.indexOf("application/json") !== -1){
                const data = await response.json();
                console.log("Compra realizada con exito", data);
            }else{
                console.error("Respuesta no JSON:", await response.text());
            }
        } catch (error) {
            console.error("Error al realizar la compra", error);
        }

        document.addEventListener("DOMContentLoaded", () => {
            const cartButton = document.getElementById("cartButton");

            if(cartButton){
                cartButton.addEventListener("click", async () => {
                    try {
                        const cartId = await getCartId();
                        if(cartId){
                            window.location.href = `/carts/${cartId}`;
                        }else{
                            console.error("El Id del carrito es indefinido")
                        }
                    } catch (error) {
                        console.error("Error al obtener el ID del carrito:" + error);
                    }
                });
            }
        });
    }
}

