const selectCuotas= document.querySelector("#cantCuotas");
const selectBanco= document.querySelector("#banco");
const selectTarjeta=document.querySelector("#tarjeta");
const contentCuotas=document.querySelector("#cuotas");
const selects=document.querySelectorAll(".form-select");
const modalBody=document.querySelector(".modalCuota");
const montoT= document.querySelector("#totalCompra");
let  mensajeCuota;

let cuotaSel='1';

const bancos = [
    {
        id:"01",
        nombre:"Banco BBVA",
        tarjetas:["VISA","MASTERCAD"],
        cantCuotas:["1","3","6","12"]
    },
    {   id:"02",
        nombre:"Banco Galicia",
        tarjetas:["VISA","MASTERCAD","Naranja"],
        cantCuotas:["1","3","6"]
    },
    {   id:"03",
        nombre:"Banco Santander Río",
        tarjetas:["VISA","MASTERCAD"],
        cantCuotas:["1","3","6","9"]
    },
    {   id:"04",
        nombre:"Banco Nación",
        tarjetas:["VISA","MASTERCAD","Naranja"],
        cantCuotas:["1","3","6","12"]
    }
]
           


const renderBancos =()=>{
    selectBanco.style.display="block";
    bancos.forEach(element => {
        
        let option = document.createElement("option");
        
        option.value= element.id;
        option.textContent = element.nombre;
        selectBanco.appendChild(option);
    });

    contentCuotas.addEventListener("change",(e)=>{
        if(e.target.matches("#banco")){
            let bancoSel = e.target.value;
            renderTarjetayCuotas(bancoSel)
        }
       if(e.target.matches("#cantCuotas")){
          
            cuotaSel= e.target.value;
            calcular(cuotaSel);
       }
     })
     
}

renderBancos();

const renderTarjetayCuotas=(banco)=>{
   
    let bank = bancos.find(el=> el.id == banco);
    
    selectTarjeta.querySelectorAll('*').forEach(n => n.remove());
    bank.tarjetas.forEach(el=>{
        let option2 = document.createElement("option");
        
            option2.value= el;
            option2.textContent =el;
            selectTarjeta.appendChild(option2);
        
    });

    selectCuotas.querySelectorAll('*').forEach(n => n.remove());
    bank.cantCuotas.forEach(el =>{

        let option3 = document.createElement("option");
        option3.value= el;
        option3.textContent =el;
        selectCuotas.appendChild(option3);
    })
    
}
const calcular =(cantCuotas)=>{
    
    let Mtotal=montoT.textContent;
  
    let montoCuotas= Mtotal/cantCuotas;
    
    contentCuotas.addEventListener("click",(e)=>{
        if(e.target.matches(".cuotas")){
            selectBanco.style.display="block";
            selectTarjeta.style.display="block";
            selectCuotas.style.display="block";
            mensajeCuota.style.display="none";
        }
        if(e.target.matches(".calculo")){
            
            selectBanco.style.display="none";
            selectTarjeta.style.display="none";
            selectCuotas.style.display="none";

            mensajeCuota= document.createElement("h3");
           
            mensajeCuota.textContent= `En ${cantCuotas} cuotas pagarás : $ ${montoCuotas.toFixed(2)} `
            modalBody.appendChild(mensajeCuota);
        }
    })
   
}

