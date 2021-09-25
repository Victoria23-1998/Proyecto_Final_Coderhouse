


const getProducts = async () => {
  try {
     let respuesta = await fetch ('../data/data.json');
     return await respuesta.json();
     
     
  
  } catch (error) {
    console.log(error)
  }
} 


