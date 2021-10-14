const d = document;

const items= d.getElementById("items");
//uso fragment y templates como buena practica para tener mejor rendimiento
const Fragmento1 = d.createDocumentFragment();
const templateCards= document.getElementById("template-card").content;
const inputSearch = document.querySelector("#search1");
const menuNav= document.querySelector("#menuNav");
const contentFiltros= document.querySelector("#canvas");
const selectGenero=document.querySelector("#selectGenero");
const selectCategoria=document.querySelector("#selectCategoria");
const selectMarca=document.querySelector("#selectMarca");
const selectColor=document.querySelector("#selectColor");
const selectPrecio=document.querySelector("#selectPrecio");

const renderCards =async (filtros) =>{
  
  let dataProducts= await getProducts();
  // showProducts es el resultado de los productos filtrados
  let showProducts;

  //filtrado dinámico de productos
  switch (filtros.length) {
    case 1:
      
      showProducts = dataProducts.filter(product => {
        if(String(Object.keys(filtros[0])) == 'price'){
         
          if(String(Object.values(filtros[0])).substring(0,2) === '<='){
           return product[Object.keys(filtros[0])] <= String(Object.values(filtros[0])).slice(2);
           }else if(String(Object.values(filtros[0])).substring(0,2) === '>='){
            return product[Object.keys(filtros[0])] >= String(Object.values(filtros[0])).slice(2);
           }else if(String(Object.values(filtros[0])).substring(0,2) === 'RG'){
            let rangos= String(Object.values(filtros[0])).slice(2).split("-");
            return product[Object.keys(filtros[0])] >=rangos[0] &&  product[Object.keys(filtros[0])] <= rangos[1]
           }
          
        }else{
         return product[Object.keys(filtros[0])] == Object.values(filtros[0])
        }
        
      }) 
      break;
    case 2:
      if(String(Object.keys(filtros[1])) == 'price'){
        showProducts = dataProducts.filter(product =>{
          return product[Object.keys(filtros[0])] == Object.values(filtros[0]) 
        });
        console.log(showProducts)
        let showProductPrice = showProducts.filter(product =>{
          if(String(Object.values(filtros[1])).substring(0,2) === '<='){
            return product[Object.keys(filtros[1])] <= String(Object.values(filtros[1])).slice(2);
            }else if(String(Object.values(filtros[1])).substring(0,2) === '>='){
             return product[Object.keys(filtros[1])] >= String(Object.values(filtros[1])).slice(2);
            }else if(String(Object.values(filtros[1])).substring(0,2) === 'RG'){
             let rangos= String(Object.values(filtros[1])).slice(2).split("-");
             return product[Object.keys(filtros[1])] >=rangos[0] &&  product[Object.keys(filtros[1])] <= rangos[1]
            }
           
        });
        showProducts = showProductPrice;
      }else{
        showProducts = dataProducts.filter(product =>{
          return product[Object.keys(filtros[0])] == Object.values(filtros[0]) &&  
        product[Object.keys(filtros[1])] == Object.values(filtros[1])
        });
        
      }

      


      
     /* showProducts = dataProducts.filter(product => {
        if(String(Object.keys(filtros[1])) !== 'price'){
          return product[Object.keys(filtros[0])] == Object.values(filtros[0])  &&  product[Object.keys(filtros[1])] == Object.values(filtros[1])
        }
        if(String(Object.keys(filtros[1])) !== 'price'){
         
          if(String(Object.values(filtros[1])).substring(0,2) === '<='){
           return product[Object.keys(filtros[1])] <= String(Object.values(filtros[0])).slice(2);
           }else if(String(Object.values(filtros[1])).substring(0,2) === '>='){
            return product[Object.keys(filtros[1])] >= String(Object.values(filtros[0])).slice(2);
           }else if(String(Object.values(filtros[1])).substring(0,2) === 'RG'){
            let rangos= String(Object.values(filtros[1])).slice(2).split("-");
            return product[Object.keys(filtros[1])] >=rangos[0] &&  product[Object.keys(filtros[1])] <= rangos[1]
           }
          
        }else{
          return product[Object.keys(filtros[0])] == Object.values(filtros[0]) &&  product[Object.keys(filtros[1])] == Object.values(filtros[1])
        
       
      }); */
      break;

      case 3:
     console.log(Object.values(filtros[0]))
      showProducts = dataProducts.filter(product => {
       return product[Object.keys(filtros[0])] == Object.values(filtros[0]) && 
      product[Object.keys(filtros[1])] == Object.values(filtros[1])&&
      product[Object.keys(filtros[2])] == Object.values(filtros[2])
       
        
      }); 
      break;
      case 4:
      
         showProducts = dataProducts.filter(product => {
          return product[Object.keys(filtros[0])] == Object.values(filtros[0]) && 
         product[Object.keys(filtros[1])] == Object.values(filtros[1])&&
         product[Object.keys(filtros[2])] == Object.values(filtros[2]) &&
         product[Object.keys(filtros[3])] == Object.values(filtros[3])
          
           
      }); 
      break;
      case 4:
        console.log(Object.values(filtros[0]))
         showProducts = dataProducts.filter(product => {
          return product[Object.keys(filtros[0])] == Object.values(filtros[0]) && 
         product[Object.keys(filtros[1])] == Object.values(filtros[1])&&
         product[Object.keys(filtros[2])] == Object.values(filtros[2]) &&
         product[Object.keys(filtros[3])] == Object.values(filtros[3])&&
         product[Object.keys(filtros[4])] == Object.values(filtros[4])
          
           
      }); 
      break;
  }


  if (showProducts.length > 0) {
    
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
    filtrarBuscador(cards);
    
  } else {
    window.alert("No se encontro el producto")
  }
   
  
  
    
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
    succeful.classList.add("modalFilter");
    
  }
})
}


const armarFiltro=()=>{
  let arrayFiltros=[];
  
  if(selectCategoria.value !== "nada"){
    arrayFiltros.push({categoria:selectCategoria.value})
  }
  if(selectGenero.value !== "nada"){
    arrayFiltros.push({genero:selectGenero.value})
  }
  if(selectMarca.value !== "nada"){
    arrayFiltros.push({marca:selectMarca.value})
  }
  if(selectColor.value !== "nada"){
    arrayFiltros.push({color:selectColor.value})
  }
  if(selectPrecio.value !== "nada"){
    arrayFiltros.push({price:selectPrecio.value})
  }
  
  return arrayFiltros;
}


const eventFiltrado=()=>{
  menuNav.addEventListener("click",(e)=>{
    if(e.target.classList.contains('zapatillasH')){
      items.querySelectorAll('*').forEach(n => n.remove());
      renderCards([{categoria:"zapatilla"},{genero:"hombre"}]);
    }
    if(e.target.classList.contains('zapatillasM')){
      
      
      renderCards("categoria","zapatilla","mujer");
    }
    if(e.target.classList.contains('remerasMujer')){
      
      renderCards("categoria","remera","mujer");
      
    }
    if(e.target.classList.contains('remerasH')){
     
      renderCards("categoria","remera","hombre");
    }
    
    if(e.target.classList.contains('zapatillasTodas')){
     
      renderCards("categoria","zapatilla","");
    }
    if(e.target.classList.contains('shortH')){
      
      renderCards("categoria","short","hombre");
    }
    if(e.target.classList.contains('shortM')){
      items.querySelectorAll('*').forEach(n => n.remove());
      renderCards("categoria","short","mujer");
    }
    if(e.target.classList.contains('musculosaM')){
      
      renderCards("categoria","musculosa","mujer");
    }
    if(e.target.classList.contains('musculosaH')){
      
      renderCards("categoria","musculosa","hombre");
    }

  })
  
  contentFiltros.addEventListener("click",(e)=>{
    
    if(e.target.matches(".aplicarFiltro")){
      renderCards(armarFiltro());
      /*let valorCategoria=selectCategoria.value;
      let valorGenero= selectGenero.value;
      let valorMarca= selectMarca.value;
      let valorColor= selectColor.value;
      let valorPrecio= selectPrecio.value;
      //
      if(valorCategoria == "nada"){
        renderCards("categoria","zapatilla",valorGenero);
      }else{
        renderCards("categoria",valorCategoria,valorGenero);
      };

      if(valorGenero == "nada"){
        renderCards("categoria",valorCategoria,"nada");
      }else{
        renderCards("categoria",valorCategoria,valorGenero);
      };
      if(valorMarca == "nada"){
        renderCards("categoria",valorCategoria,valorGenero);
      }else{
        renderCards("marca",valorMarca,valorGenero);
      };
      if(valorColor == "nada"){
        renderCards("categoria",valorCategoria,valorGenero);
      }else{
        renderCards("color",valorColor,valorGenero);
      };*/
      
     
      
  }
  /*if(e.target.matches(".aplicarGenero")){
    let valorCategoria=selectCategoria.value;
      let valorGenero= selectGenero.value;
    if(valorCategoria == "nada"){
      renderCards("categoria","zapatilla",valorGenero);
    }else{
      renderCards("categoria",valorCategoria,valorGenero);
    }
  }*/
  
  })
}
//funcion para convertir numeros a pesos Argentinos
const mostrarNumFormat= (valor) =>{
    return new Intl.NumberFormat("es-AR", {style: "currency", currency: "ARS"}).format(valor);
}


