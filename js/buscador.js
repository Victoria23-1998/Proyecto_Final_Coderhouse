
const btnSearch = document.querySelector(".btnSearch1");
//tengo dos menus html que se activan segun tamaño de pantalla por ende son dos buscadores
const inputSearch = document.querySelector("#input1");
const inputSearch2 = document.querySelector("#input2");


btnSearch.addEventListener("click", async (e) => {
  if (e.target.matches("#btnSearch1")) {
    e.preventDefault()
    let productosEncontrados = await filtroBuscador(inputSearch.value.toLowerCase());
    renderCards(productosEncontrados);

  }
  if (e.target.matches("#btnSearch2")) {
    e.preventDefault()
    let productosEncontrados = await filtroBuscador(inputSearch2.value.toLowerCase());
    renderCards(productosEncontrados);
  }

})