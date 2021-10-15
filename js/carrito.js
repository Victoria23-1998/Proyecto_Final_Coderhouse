


const carritoVacio = document.querySelector('#carritoVacio');
const templateCarrito = document.querySelector("#carrito").content;
const fragmento2= document.createDocumentFragment();
let contCartHtml= document.querySelector("#contenedorCart");
const contenedorCarrito=document.querySelector("#contenedorCarrito");
const carritoLleno=document.querySelector("#miCar");
let succeful = document.querySelector("#successCompra");

let contenedorCompra= document.querySelector("#seccionTotal");
let total=0;
const modalCompra=document.querySelector("#modalComprar2");
document.addEventListener("DOMContentLoaded", (e)=>{
 
  pintarCarrito();
  
})



  const pintarCarrito = async()=>{
    
    let dataProducts= await getProducts();
    
    

    numberItemsCar();
    
    contCartHtml.querySelectorAll('*').forEach(n => n.remove());

    ocultarCarritoVacio();

    let dataCarrito = getShoppingCart();
    
    
    let subTotal=0;
    
    dataCarrito.forEach(el=>{
      
    
 
    let totalItem= 0;
      
     let product=dataProducts.find(element => element.id === el.id);
     
     
     templateCarrito.querySelector(".imgCart").setAttribute("src", product.image);
     templateCarrito.querySelector(".tituloCart").textContent= product.productName;
     templateCarrito.querySelector(".precioCart").textContent =`$${product.price}` ;
     templateCarrito.querySelector(".talla").textContent= `Talla:${el.talla}`;
     templateCarrito.querySelector(".eliminar").setAttribute("id",product.id);
     templateCarrito.querySelector(".delete").setAttribute("id",product.id);
      
     //precio total por cada producto
     totalItem=product.price * el.cantidad;
     //precio total de todo el carrito
     subTotal += totalItem;
   
     templateCarrito.querySelector(".precioT").textContent = `$${totalItem}`;

     //agregar cantidades;
     let cantidadCar = templateCarrito.querySelector("#dropCantidadItem");

     cantidadCar.setAttribute("data-id", product.id);
   
     cantidadCar.querySelectorAll('*').forEach(n => n.remove());

     for(let i=1; i <= product.cantidadVenta; i++ ){
       
      let OptionsCant= document.createElement('option');
      //para que la opcion seleccionada en el modal aparezca seleccionada en el carrito
      if(i == el.cantidad){
        OptionsCant.setAttribute("selected",'selected');
       
      }
      
      OptionsCant.textContent = i;
      OptionsCant.value= i;
      OptionsCant.className= 'canti'
      
      cantidadCar.appendChild(OptionsCant)
      
      
    }  
    
     let clone= templateCarrito.cloneNode(true);
     fragmento2.appendChild(clone);

   

  })

  
      
    contCartHtml.appendChild(fragmento2)
  
    sumaTotal(subTotal);
   
   
  }
  
  
  
  
   contCartHtml.addEventListener("change",(e)=>{
     if(e.target.matches("#dropCantidadItem")){
      
       modificarCart(e.target.getAttribute("data-id"),e.target.value);
       
     }
     e.stopPropagation()
   })

  const modificarCart =(productId,newCant)=>{
   
    let shoppingCart = getShoppingCart();
     //modificar la cantidad del localStorage a traves de su index 
    let objIndex = shoppingCart.findIndex((obj => obj.id == productId));
    //modifica la propiedad del objeto seleccionado por su indice
    shoppingCart[objIndex].cantidad = newCant;

    guardarCart(shoppingCart);
    //se vuelve a pintar para que aparezca el precio actualizado
    pintarCarrito();
  

  }

  contCartHtml.addEventListener("click",(e)=>{
    e.stopPropagation
    if(e.target.classList.contains("remove")){
      let productId= e.target.getAttribute("id");
      
     eliminarItem(productId);
  
   }
  
  })

  //pintar total
  const sumaTotal=(subTotal)=>{
  
    
    let divSubtotal= document.querySelector("#subtotalCompra");
    let divTotal= document.querySelector("#totalCompra");
    total=subTotal;
    
    divSubtotal.textContent= `${subTotal}`;
    divTotal.textContent= ` ${total}`;
    
  }

  
const eliminarItem = (id) => {

  let dataCarrito = getShoppingCart();
  let nuevoCarrito = dataCarrito.filter(producto => producto.id !== id);

  guardarCart(nuevoCarrito);
  if (nuevoCarrito.length == 0) {
    mostrarCartVacio();
    ocultarCarrito();
    numberItemsCar();
  } else {
    pintarCarrito();
  }
}

const ocultarCarritoVacio=()=>{
    carritoVacio.style.display="none";
    numberItemsCar();
    
}

const mostrarCarrito =()=>{
  contenedorCarrito.style.display="flex";
  carritoLleno.style.display="flex";
}
const mostrarCartVacio=()=>{
  carritoVacio.style.display="flex"
}
const ocultarCarrito=()=>{
  contenedorCarrito.style.display="none";
  carritoLleno.style.display="none";
}



const mostrarNumFormat= (valor) =>{
  return new Intl.NumberFormat("es-AR", {style: "currency", currency: "ARS"}).format(valor);
}