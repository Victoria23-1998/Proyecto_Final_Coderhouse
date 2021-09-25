const pintarModal= (producto) =>{
        
           
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
    //let btn = document.createElement("button");
    //let btnTalla= document.createElement("h5");
   // btnTalla.className="tallaBoton";
    //btnTalla.textContent= talla;
    //btnTalla.id=talla;
    //btn.appendChild(btnTalla)
    //btn.className= "btnTalla tallaBtn";
    btn.className= "tallaBtn btnTallaNoSel";
    btn.id=talla;
    btn.textContent=talla
   
    //tallaDiv.setAttribute("data-id",talla)
    tallaDiv.appendChild(btn);
    
  })

  dropCantidad.querySelectorAll('*').forEach(n => n.remove());

  
  //cantidad

      for(let i=1; i <= producto.cantidadVenta; i++ ){
       
        let OptionsCant= document.createElement('option');

        OptionsCant.textContent = i;
        OptionsCant.value= i
        OptionsCant.className= 'cant'
       
        dropCantidad.appendChild(OptionsCant)
        
        
      }  
 
     
  animacionModal.classList.add('animate__animated','animate__zoomIn');
  modalStyle.style.display='flex';
 //capturar el valor del menu de cantidad
 dropCantidad.addEventListener('change', (e)=>{
  e.stopPropagation
    cambioOpcion(e)
   
  })

  
 }


const cerrarBtnAceptar=()=>{
  contenedorModal.style.display='none';
}

const alertCarrito=()=>{
 
  succeful.classList.add('animate__animated','animate__slideOutUp');
  
 
  succeful.style.display="block";
  //let quitar = setTimeout(quitarAlerta,3000);
 
}
const quitarAlerta=()=>{
  
  succeful.style.display="none";
  
  
}
const eventosModal=()=>{
  contenedorModal.addEventListener("click", (e) =>{
    e.stopPropagation()
  
    if(e.target.matches('.btn-Aceptar')||e.target.matches('.btn-Aceptar *')){
       const divbotones =  document.querySelector(".btn-Aceptar");
      let idProduct= divbotones.getAttribute("id")
      if (tallaSel===null){
        alert.classList.add('animate__animated', 'animate__shakeX');
        alert.style.display='block'
        
        return;
      }
      
     AgregarProdCar(idProduct,tallaSel,cantidadSel)
     numberItemsCar()
     cerrarBtnAceptar()
     alertCarrito();
        
     
    }
   
     if(e.target.classList.contains('close-modal')||e.target.classList.contains('close-modal *')){
     
       modalStyle.style.display='none';
       tallaSel = null;
       //fondoTalla = 'BLANCO';
      
     }

    if(e.target.matches('.close-modal2')||e.target.matches('.close-modal2 *')){
      modalStyle.style.display='none';
      tallaSel = null;
    }
   
      
      if(e.target.matches('.tallaBtn')||e.target.matches('.tallaBtn *')){
     
        alert.style.display='none'
        
        let tallaBtn=e.target.textContent;
        console.log(tallaBtn)
       //tallaBtn.classList.toggle('btnTallaSel');
        tallaSel=tallaBtn
        
          
          
         }
    
    
   
   
  });
}
const abriModal=()=>{

  contenedorModal.style.display='flex';

}
const cambioOpcion = (e)=>{
  cantidadSel= e.target.value;
  //console.log(cantidadSel)
 }


