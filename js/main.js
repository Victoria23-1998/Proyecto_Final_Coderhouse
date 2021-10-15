


document.addEventListener("DOMContentLoaded",async()=>{
    let productosEncontrados =await filtroMultiple([{ categoria: 'zapatilla' }]);
    renderCards(productosEncontrados);
    eventosCard();
    eventosModal();
    numberItemsCar();
    

})



// fuera de contexto
//desafío clase constructora y array
class Producto{
    constructor(id, name,price,tipo) {
        this.id= id
        this.name = name;
        this.price = price;
        this.tipo= tipo
        
    }
}
class Zapatillas extends Producto{
    constructor(id, name,price,tipo){
        super(id, name,price,tipo)
    }
    
}
class Ropa extends Producto{
    constructor(id, name,price,tipo){
        super(id, name,price,tipo)
    }
    
}
const productos =[];

productos.push (new Zapatillas(1, "Zapatilla Nike", 3500,"zapatilla"));
productos.push( new Ropa(2, "Remera Converse", 5000,"ropa"));
productos.push (new Ropa(2, "Remera Nike", 5000,"ropa"));
productos.push (new Zapatillas(1, "Zapatilla Adidas", 3500,"zapatilla"));


//console.log(productos);


const EncontrarProducto =(tipo)=>{
    let producto = productos.filter(product => product.tipo == tipo.toLowerCase()  );
    console.log(producto)
}

//EncontrarProducto("ZapaTilla");


