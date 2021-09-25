
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
  
    cart.push({id:id, talla:talla, cantidad:cantidad});
    
    guardarCart(cart);
   
  
};


//envio los datos al localStorage
const guardarCart=(productsCart)=>{
  localStorage.setItem('carrito', JSON.stringify(productsCart))
};

