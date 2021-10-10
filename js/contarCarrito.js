
  


const numberItemsCar = ()=>{

  if( screen.width > 750){
    let aumentarCar = document.querySelector('.number');
    aumentarCar.textContent=getShoppingCart().length;
  } else{
    let aumentarCar2 = document.querySelector('.number2');
    aumentarCar2.textContent=getShoppingCart().length;
  }
 
}


  window.addEventListener("resize", function(){
    numberItemsCar();
   });
    

