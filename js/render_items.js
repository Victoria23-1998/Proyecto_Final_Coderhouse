const d = document;

const items= d.getElementById("items");
//uso fragment y templates como buena practica para tener mejor rendimiento
const Fragmento1 = d.createDocumentFragment();
const templateCards= d.getElementById("template-card").content;
const menuNav= d.querySelector("#menuNav");
const contentFiltros= d.querySelector("#canvas");
const selectGenero=d.querySelector("#selectGenero");
const selectCategoria=d.querySelector("#selectCategoria");
const selectMarca=d.querySelector("#selectMarca");
const selectColor=d.querySelector("#selectColor");

const filtroBuscador = async (busqueda) => {
  let dataProducts = await getProducts();
  // showProducts es el resultado de los productos filtrados
  let showProducts = dataProducts.filter(product => {
    let nombres = product.productName.toLowerCase();
    let nombreEncontrado;
    if (nombres.indexOf(busqueda) !== -1) {
      nombreEncontrado = nombres
    }
    return nombreEncontrado
  })
  return showProducts
}

const filtroMultiple = async (filtros) => {
  let dataProducts = await getProducts();
  // showProducts es el resultado de los productos filtrados
  let showProducts;
  //filtrado dinámico de productos
  switch (filtros.length) {
    case 1:
       showProducts = dataProducts.filter(product => {
        return product[Object.keys(filtros[0])] == Object.values(filtros[0])
      })
    break;
    case 2:
      showProducts = dataProducts.filter(product => {
          return product[Object.keys(filtros[0])] == Object.values(filtros[0]) &&
          product[Object.keys(filtros[1])] == Object.values(filtros[1])
      });

      break;
    case 3:
      showProducts = dataProducts.filter(product => {
        return product[Object.keys(filtros[0])] == Object.values(filtros[0]) &&
          product[Object.keys(filtros[1])] == Object.values(filtros[1]) &&
          product[Object.keys(filtros[2])] == Object.values(filtros[2])
      });
      break;
    case 4:
      showProducts = dataProducts.filter(product => {
        return product[Object.keys(filtros[0])] == Object.values(filtros[0]) &&
          product[Object.keys(filtros[1])] == Object.values(filtros[1]) &&
          product[Object.keys(filtros[2])] == Object.values(filtros[2]) &&
          product[Object.keys(filtros[3])] == Object.values(filtros[3])
      });
      break;
    case 4:
      showProducts = dataProducts.filter(product => {
        return product[Object.keys(filtros[0])] == Object.values(filtros[0]) &&
          product[Object.keys(filtros[1])] == Object.values(filtros[1]) &&
          product[Object.keys(filtros[2])] == Object.values(filtros[2]) &&
          product[Object.keys(filtros[3])] == Object.values(filtros[3]) &&
          product[Object.keys(filtros[4])] == Object.values(filtros[4])
      });
      break;
  }
  return showProducts
}

const renderCards = (showProducts) => {

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


  } else {
    window.alert("No se encontro el producto")
  }

}

const eventosCard = async () => {
  let dataProducts = await getProducts();
  items.addEventListener("click", (e) => {
    e.stopPropagation()
    if (e.target.classList.contains('btn-zoom')) {

      let productoId = e.target.getAttribute("id");
      const producto = dataProducts.find(el => el.id == productoId);
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
 
  return arrayFiltros;
}



  
  menuNav.addEventListener("click",async(e) => {

    let productosEncontrados;
    if (e.target.classList.contains('zapatillasH')) {
      
      productosEncontrados=await filtroMultiple([{ categoria: 'zapatilla'},{genero:'hombre'}]);
      console.log(productosEncontrados)
      items.querySelectorAll('*').forEach(n => n.remove());
      renderCards(productosEncontrados);
    }
    if (e.target.classList.contains('zapatillasM')) {
      
      productosEncontrados=await filtroMultiple([{ categoria: 'zapatilla'}, {genero:'mujer'}])
      renderCards(productosEncontrados);
    }
    if (e.target.classList.contains('remerasMujer')) {
      productosEncontrados=await filtroMultiple([{ categoria: 'remera'}, {genero:'mujer'}])
      renderCards(productosEncontrados);

    }
    if (e.target.classList.contains('remerasH')) {
      productosEncontrados=await filtroMultiple([{ categoria: 'remera'}, {genero:'hombre'}])
      renderCards(productosEncontrados);
    }

    if (e.target.classList.contains('zapatillasTodas')) {
      productosEncontrados=await filtroMultiple([{ categoria: 'remera'}])
      renderCards(productosEncontrados);
    }
    if (e.target.classList.contains('shortH')) {
      productosEncontrados=await filtroMultiple([{ categoria: 'short'}, {genero:'hombre'}])
      renderCards(productosEncontrados);
    }
    if (e.target.classList.contains('shortM')) {
      productosEncontrados=await filtroMultiple([{ categoria: 'short'},{ genero:'mujer'}])
      items.querySelectorAll('*').forEach(n => n.remove());
      renderCards(productosEncontrados);
    }
    if (e.target.classList.contains('musculosaM')) {
      productosEncontrados=await filtroMultiple([{ categoria: 'musculosa'},{ genero:'mujer'}])
      renderCards(productosEncontrados);
    }
    if (e.target.classList.contains('musculosaH')) {
      productosEncontrados=await filtroMultiple([{ categoria: 'musculosa'}, {genero:'hombre'}])
      renderCards(productosEncontrados);
    }
    if(e.target.matches('.adidas')){
      productosEncontrados=await filtroMultiple([{ marca:'adidas'}])
      renderCards(productosEncontrados);
    }
    if(e.target.matches('.fila')){
      productosEncontrados=await filtroMultiple([{ marca:'fila'}])
      renderCards(productosEncontrados);
    }
    if(e.target.matches('.puma')){
      productosEncontrados=await filtroMultiple([{ marca:'puma'}])
      renderCards(productosEncontrados);
    }
    if(e.target.matches('.nike')){
      productosEncontrados=await filtroMultiple([{ marca:'nike'}])
      renderCards(productosEncontrados);
    }
    if(e.target.matches('.vans')){
      productosEncontrados=await filtroMultiple([{ marca:'vans'}])
      renderCards(productosEncontrados);
    }
    if(e.target.matches('.converse')){
      productosEncontrados=await filtroMultiple([{ marca:'converse'}])
      renderCards(productosEncontrados);
    }
    if(e.target.matches('.reebok')){
      productosEncontrados=await filtroMultiple([{ marca:'reebok'}])
      renderCards(productosEncontrados);
    }

})

contentFiltros.addEventListener("click",async(e)=>{
    
  if(e.target.matches(".aplicarFiltro")){
    let arrayFiltros=armarFiltro();
    let productosEncontrados= await filtroMultiple(arrayFiltros);
    renderCards(productosEncontrados);
    
}


})
//funcion para convertir numeros a pesos Argentinos
const mostrarNumFormat= (valor) =>{
    return new Intl.NumberFormat("es-AR", {style: "currency", currency: "ARS"}).format(valor);
}


