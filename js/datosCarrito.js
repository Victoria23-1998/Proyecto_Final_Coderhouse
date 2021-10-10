
let cart =[];

//obtengo los datos del localStorage
const getShoppingCart = ()=>{
    let carritoStorage = JSON.parse(localStorage.getItem('carrito'));
    
    if (carritoStorage == null){
      cart =[]
    }else {
      cart = carritoStorage
      //console.log(cart)
    }
   
    return cart;
   
  }
  
  
  //agregar carrito al local
const AgregarProdCar =(id,talla,cantidad)=>{
  let objIndex = cart.findIndex(obj => obj.id == id);
  if(objIndex >=0){
    let cantOrg= parseInt(cart[objIndex].cantidad);
   cart[objIndex].cantidad = cantOrg + parseInt(cantidad);
  }else{
    cart.push({id:id, talla:talla, cantidad:cantidad});
    
  }
  //modifica la propiedad del objeto seleccionado por su indice

    
    guardarCart(cart);
   
  
};


//envio los datos al localStorage
const guardarCart=(productsCart)=>{
  localStorage.setItem('carrito', JSON.stringify(productsCart))
};

