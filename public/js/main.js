const hambMenuButton = document.querySelector(".btn-hamb-menu");
const navbar = document.getElementsByClassName("nav_bar")[0];

hambMenuButton.addEventListener('click',() => {
    console.log("boton apretado");
    navbar.classList.toggle('active');
});

//BTN CART
const btnCart = document.querySelector('.btn-cart-toggle');
const cartContainer = document.querySelector('.cart-modal-container');
let isCartVisible = true;
btnCart.addEventListener('click', function(){
    if(isCartVisible){
        btnCart.classList.toggle('btn-pressed', isCartVisible);
        cartContainer.classList.toggle('cart-visible', isCartVisible);
    } 
    isCartVisible = !isCartVisible;
}) 

//EVENT CLICK ON MODAL CART 
cartContainer.addEventListener('click', ev =>{
    if(ev.target.classList.contains('btn-delete-item')){
        console.log('Botón de eliminar presionado');
    }
})
//                 CLOSE CART FUNCTION
function closeCart(){
    if(!isCartVisible){
        console.log("Cerrar carrito");
        isCartVisible = true;
        btnCart.classList.remove('btn-pressed');
        cartContainer.classList.remove('cart-visible');
    }
}
window.addEventListener('keydown', function(ev){
    if (ev.key === 'Escape'&& !isCartVisible){    
        closeCart();
    };
})

//          CROSS BUTTON TO CLOSE CART 
const btnCloseCart = document.querySelector('.close-button');
btnCloseCart.addEventListener('click', function(){
    if (!isCartVisible){
        closeCart();
    }
})
// CLOSE CART CLICKING OUT OF THE CART ZONE
const modalOuter = document.querySelector('.modal-outer');
modalOuter.addEventListener('click', ev =>{
    if(!ev.target.closest('.modal-inner')){
        closeCart();
    }
})


//          PLUS MINUS PRODUCT QUANTITY IN CART
const  productsQuantityMinus= document.querySelectorAll('.icon-minus');
const productsQuantityPlus = document.querySelectorAll('.icon-plus');
const productsQuantity = document.querySelectorAll('.quantity-number');
for(let i = 0; i < productsQuantityMinus.length; i++){
    productsQuantityMinus[i].addEventListener('click', function(){
        if(parseInt(this.nextElementSibling.innerHTML)===0){
            console.error("El número no puede ser menor a 0.")
        } else{
        let number = parseInt(this.nextElementSibling.innerHTML);
    // console.log(this.nextElementSibling.innerHTML);
        number = number-1;
        this.nextElementSibling.innerHTML = number;
        }
    })
};



for(let i = 0; i < productsQuantityPlus.length; i++){
        productsQuantityPlus[i].addEventListener('click', function(){
        let number = parseInt(this.previousElementSibling.innerHTML);
        //console.log(this.previousElementSibling.innerHTML);
        number = number+1;
        this.previousElementSibling.innerHTML = number;
    })
};



class Main{

    updatePageTitle() {
        document.title = `${document.title} - Cecilia Sosa - Proyecto Integrador: Juguetería Cósmica`
    };

    async ajax(url, method = 'get') {
        return await fetch(url, { method: method }).then(r => r.text());
    };

    getIdFromHash() {
        const id = location.hash.slice(2);
        return id || 'home';
    };

    getViewUrlFromId(id){
        return `views/${id}.html`;
    };


    getModuleUrlFromId(id){
        return `./modules/${id}.js`;
    };

  
    async initJS(id) {
        const moduleUrl = this.getModuleUrlFromId(id);
        try {
            const {default: module} = await import(moduleUrl);
            if (typeof module.init !== 'function') {
                console.error(`El módulo ${id} no posee un método init().`);
                return;
            }
            module.init();
        } catch (error) {
            console.error(`No se pudo importar el módulo ${moduleUrl}.`);
        }
    };

    setActiveLink(id){
        const activePageId = `#nav-${id}`;
        const aActive = document.querySelector(activePageId); 
        const siblings = aActive.parentElement.closest('.nav_links').querySelectorAll('li');
        siblings.forEach(sibling => {
            sibling.classList.remove('link_active');   
        aActive.parentElement.classList.add('link_active');
        });
    };
    
    async loadTemplate(id) {
        const viewUrl = this.getViewUrlFromId(id);
        const viewContent = await this.ajax(viewUrl);
        document.getElementById('main-container').innerHTML = viewContent;

        this.setActiveLink(id);

        this.initJS(id);
    }

    async loadTemplates() {
        const id = this.getIdFromHash();
        this.loadTemplate(id);
        window.addEventListener('hashchange', () => this.loadTemplate(id));
    }

    async start() {
        console.warn("start");
        await this.loadTemplates();
        this.updatePageTitle();

        document.getElementById('btn-search').addEventListener('click', async e =>{
            const id = 'search';
            this.loadTemplate(id);
            
            this.initJS(id);
        } )

        document.getElementById('btn-stores').addEventListener('click', async e =>{
            const id = 'stores';
            this.loadTemplate(id);
            
            this.initJS(id);
        } )
    };
}

const main = new Main();
main.start();