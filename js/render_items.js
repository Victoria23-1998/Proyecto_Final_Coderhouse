const d = document;
//creo elementos de la card 
const items= d.getElementById("items");
//uso fragment como buena practica para tener mejor rendimiento
const Fragmento1 = d.createDocumentFragment();
const templateCards= document.getElementById("template-card").content;
const inputSearch = document.querySelector("#search1");

const renderCards =async () =>{

  let dataProducts= await getProducts();
  //para obtener los productos y pintarlos
  
  dataProducts.forEach(product => {
        templateCards.querySelector("img").setAttribute("src", product.image);
        templateCards.querySelector("h3").textContent = product.productName;
        templateCards.querySelector("p").textContent = mostrarNumFormat(product.price);
        templateCards.querySelector("ion-icon").setAttribute("id", product.id);
        templateCards.querySelector('.btnz').setAttribute("id", product.id);
        
        // se hace un clone para poder utilizar el template mas de una vez
        let clone = templateCards.cloneNode(true)
        Fragmento1.appendChild(clone)
     
       
    })
    
    items.appendChild(Fragmento1)
    let cards = items.querySelectorAll(".cc")
    filtrar(cards)
   
    
}

const eventosCard=async ()=>{
  let dataProducts= await getProducts();
  items.addEventListener("click", (e) =>{
    e.stopPropagation()
  if(e.target.classList.contains('btn-zoom')){
   
    let productoId= e.target.getAttribute("id");
    //console.log(productoId)
   
    const producto=  dataProducts.find(el => el.id == productoId);
    //console.log(producto);
    abriModal()
    pintarModal(producto);
    
  }


 

})
}


//funcion para convertir numeros a pesos Argentinos
const mostrarNumFormat= (valor) =>{
    return new Intl.NumberFormat("es-AR", {style: "currency", currency: "ARS"}).format(valor);
}


