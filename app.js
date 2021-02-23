class Evento {
    constructor(nombre, precio, descripcion, sku) {
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.sku = sku;
    }
}

let producto1 = new Evento("Lifting de cejas", 25000, "$25,000", "0");
let producto2 = new Evento("Maquillaje profesional", 30000, "$30,000", "1");
let producto3 = new Evento("Micropigmentación", 32000, "$32,000", "2");
let producto4 = new Evento("Depilado con hilo", 25000, "$25,000", "3");
let producto5 = new Evento("Tintura de pestañas", 23000, "$23,000", "4");
let producto6 = new Evento("Reconstrucción", 14000, "$14,000", "5");

let productos = [producto1, producto2, producto3, producto4, producto5, producto6];
let newProduct = document.getElementById("productos");
let creador;
let precioTotal = 0;
let paz;


function listarProducto(item, destino) {
    for (let i = 0; i < item.length; i++) {
        const element = item[i];
        creador = document.createElement("li");
        creador.className = "list-group-item d-flex justify-content-between lh-condensed pro";
        creador.id = `${element.sku}`
        creador.innerHTML = ` <div>
        <h6 class="my-0">${element.nombre}</h6>
        <small class="text-muted">${element.descripcion}</small>
    </div>
    <span class="text-muted"><i id=${element.sku} class="fas fa-cart-plus" style="font-size: 1.8em; color: #142462;"></i></span>`
        destino.appendChild(creador);
    }

}

function dibujarCarrito(item, destino) {
    precioTotal = 0;
    for (let i = 0; i < item.length; i++) {
        const element = item[i];
        price = element.precio;
        precioTotal += price;
    }
    destino.innerHTML = `<li class="list-group-item d-flex justify-content-between">
    <span>Total (COP)</span>
    <strong>$ ${precioTotal}</strong>
    </li>`;

    for (let i = 0; i < item.length; i++) {
        const element = item[i];
        creador = document.createElement("li");
        creador.className = "list-group-item d-flex justify-content-between lh-condensed";
        creador.id = `${element.sku}`
        creador.style.width = "100%"
        creador.innerHTML =
            `<div>
            <h6 class="my-0">${element.nombre}</h6>
            <small class="text-muted">${element.descripcion}</small>
        </div>
        <span class="text-muted">$ ${element.precio} <span>
         <i style="color: #f57b7c" id=${element.sku} class="fas fa-minus-circle"></i></span>
         </span>`
        destino.appendChild(creador);
    }

    let retirarBtn = document.getElementsByClassName("fa-minus-circle");

    for (let i = 0; i < retirarBtn.length; i++) {
        const element = retirarBtn[i];
        element.addEventListener('click', function() {
            item.splice(this.id, 1);
            dibujarCarrito(item, destino);
            let counter = document.getElementById("contador");
            counter.innerHTML = item.length;

        })
    }
}

function retirarProducto(params) {

}

listarProducto(productos, newProduct);

let cartBtn = document.getElementsByClassName("fa-cart-plus");
let listaEventos = document.getElementsByClassName("list-group-item d-flex justify-content-between lh-condensed pro");

let carrito = [];
let cart = document.getElementById("carrito");



for (let index = 0; index < cartBtn.length; index++) {
    const boton = cartBtn[index];
    boton.addEventListener('click', function() {
        let sku = this.id;
        console.log(carrito);

        for (let index = 0; index < productos.length; index++) {
            const item = productos[index];
            if (item.sku === sku) {
                carrito.push(item);
                let counter = document.getElementById("contador");
                counter.innerHTML = carrito.length;
                dibujarCarrito(carrito, cart);
            }

        };
    });
};