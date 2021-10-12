

    /* buscador sencillo sobre el contenido de la pagina de practica*/
    
    const filtrar =(selector)=>{
        document.addEventListener("keyup",(e)=>{
        
          if(e.target.matches("#search1")){
             //console.log(e.target.value)
             if(e.key === "Escape")e.target.value="";
          
            
             
             selector.forEach(el=>{
                if(el.textContent.toLocaleLowerCase().includes(e.target.value.toLowerCase())){
                  el.classList.remove("filter");
                }else{
                  el.classList.add("filter");
                }
              })
          }
      })
        
       
      }

  