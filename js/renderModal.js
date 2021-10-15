

const alert= document.querySelector(".alertTalla");
let succeful = document.querySelector("#successCart");
let animacionModal= document.querySelector(".modal-content");

let tallaSel = null;
let cantidadSel= '1';
let modalComprar= document.querySelector("#modalAgregado");
const contenedorModal = document.querySelector(".contenedorModal");
const pintarModal= (producto) =>{
  succeful.style.display="none";
  let nombre= document.getElementById("txtProduct");
  let precio= document.getElementById("txtPrice");
  let img=document.getElementById("imgProd");
  let btnAceptar = document.querySelector(".btn-Aceptar");
  let dropCantidad= document.getElementById("dropCantidad");
  
  btnAceptar.id=producto.id;
 
  nombre.textContent = producto.productName; 
  precio.textContent = mostrarNumFormat(producto.price); 
  img.setAttribute("src", producto.image);

  let tallaDiv= document.getElementById("tallas");
  
 //para que no se repita cada que recargamos.

  tallaDiv.querySelectorAll('*').forEach(n => n.remove());

  producto.talla.forEach(talla => {
    let btn = document.createElement("button");
   
    btn.className= "tallaBtn btnTallaNoSel";
    btn.id=talla;
    btn.textContent=talla
   
    //tallaDiv.setAttribute("data-id",talla)
    tallaDiv.appendChild(btn);
    
  })

  //cantidad
  dropCantidad.querySelectorAll('*').forEach(n => n.remove());

  for(let i=1; i <= producto.cantidadVenta; i++ ){
       
        let OptionsCant= document.createElement('option');
        
        OptionsCant.textContent = i;
        OptionsCant.value= i
        OptionsCant.className= 'cant'
       
        dropCantidad.appendChild(OptionsCant)
        
  }  

  animacionModal.classList.add('animate__animated','animate__zoomIn');
 
 //capturar el valor del menu de cantidad
 dropCantidad.addEventListener('change', (e)=>{
  e.stopPropagation
    cambioOpcion(e)
   
  })
}

const cambioOpcion = (e)=>{
  cantidadSel= e.target.value;
  //console.log(cantidadSel)
 }

 
const eventosModal =()=>{
  contenedorModal.addEventListener("click",(e)=>{
    if(e.target.classList.contains('close-modal')||e.target.classList.contains('close-modal *')){
    
     contenedorModal.style.display='none';
    tallaSel = null;
      
    }
    if(e.target.matches('.btn-Aceptar')||e.target.matches('.btn-Aceptar *')){
      const divbotones =  document.querySelector(".btn-Aceptar");
     let idProduct= divbotones.getAttribute("id")
     if (tallaSel===null){
       alert.classList.add('animate__animated', 'animate__shakeX');
       alert.style.display='block'
       
       return;
     }else{
      alert.style.display='none'
     }
    
    AgregarProdCar(idProduct,tallaSel,cantidadSel);
    numberItemsCar();
    //numberItemsCar2();
    cerrarBtnAceptar();
    
    succeful.classList.add('animate__animated','animate__slideOutUp');
    succeful.style.display="block"
    
    
    
   }
   if(e.target.matches('.tallaBtn')||e.target.matches('.tallaBtn *')){
     
    alert.style.display='none'
    
    let tallaBtn=e.target.textContent;
    console.log(tallaBtn)
   //tallaBtn.classList.toggle('btnTallaSel');
    tallaSel=tallaBtn
    
      
      
     }
  })
  
}

const abriModal=()=>{
contenedorModal.style.display='block';
}

const cerrarBtnAceptar=()=>{
  contenedorModal.style.display='none';
}

