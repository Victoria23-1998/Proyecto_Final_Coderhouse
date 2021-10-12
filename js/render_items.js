const d = document;

const items= d.getElementById("items");
//uso fragment y templates como buena practica para tener mejor rendimiento
const Fragmento1 = d.createDocumentFragment();
const templateCards= document.getElementById("template-card").content;
const inputSearch = document.querySelector("#search1");
const menuNav= document.querySelector("#menuNav");


const renderCards =async (category,gender) =>{

  let dataProducts= await getProducts();
  
  let showProducts= dataProducts.filter(product =>{
    if(gender === ""){
      return  product.categoria === category 
    }else{
      return product.categoria === category &&  product.genero === gender;
    }
   
  }
);
items.querySelectorAll('*').forEach(n => n.remove());
  showProducts.forEach(product => {
       
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
const eventFiltrado=()=>{
  menuNav.addEventListener("click",(e)=>{
    if(e.target.classList.contains('zapatillasH')){
      items.querySelectorAll('*').forEach(n => n.remove());
      renderCards("zapatilla","hombre");
    }
    if(e.target.classList.contains('zapatillasM')){
      
      
      renderCards("zapatilla","mujer");
    }
    if(e.target.classList.contains('remerasMujer')){
      
      renderCards("remera","mujer");
      
    }
    if(e.target.classList.contains('remerasH')){
     
      renderCards("remera","hombre");
    }
    
    if(e.target.classList.contains('zapatillasTodas')){
     
      renderCards("zapatilla","");
    }
    if(e.target.classList.contains('shortH')){
      
      renderCards("short","hombre");
    }
    if(e.target.classList.contains('shortM')){
      items.querySelectorAll('*').forEach(n => n.remove());
      renderCards("short","mujer");
    }
    if(e.target.classList.contains('musculosaM')){
      
      renderCards("musculosa","mujer");
    }
    if(e.target.classList.contains('musculosaH')){
      
      renderCards("musculosa","hombre");
    }

  })
  
}
//funcion para convertir numeros a pesos Argentinos
const mostrarNumFormat= (valor) =>{
    return new Intl.NumberFormat("es-AR", {style: "currency", currency: "ARS"}).format(valor);
}


