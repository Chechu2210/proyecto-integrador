
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

    static hambMenuButton = document.querySelector(".btn-hamb-menu");

    static addHambMenuFunction(){
        Main.hambMenuButton.addEventListener('click',() => {
            document.querySelector('.nav_bar').classList.toggle('active');
        });
    };

    //          CART 
    static btnCloseCart = document.querySelector('.close-button');

    static btnCart = document.querySelector('.btn-cart-toggle');

    static cartContainer = document.querySelector('.cart-modal-container');

    static modalOuter = document.querySelector('.modal-outer');

    static isCartVisible = true;

    static loadOpenCart(){
        Main.btnCart.addEventListener('click', function(){
            if(Main.isCartVisible){
                Main.btnCart.classList.toggle('btn-pressed', Main.isCartVisible);
                Main.cartContainer.classList.toggle('cart-visible', Main.isCartVisible);
        } 
        Main.isCartVisible = !Main.isCartVisible;
        });
    };    


    static closeCart(){
        if(!Main.isCartVisible){
            console.log("Cerrar carrito");
            Main.isCartVisible = true;
            Main.btnCart.classList.remove('btn-pressed');
            Main.cartContainer.classList.remove('cart-visible');
        };
    };

    static loadCloseCartFunction(){
        window.addEventListener('keydown', function(ev){
            if (ev.key === 'Escape'&& !Main.isCartVisible){    
                Main.closeCart();
            };
        });    
        Main.btnCloseCart.addEventListener('click', function(){
            if (!Main.isCartVisible){
                Main.closeCart();
            };
        });
        Main.modalOuter.addEventListener('click', ev =>{
            if(!ev.target.closest('.modal-inner')){
                Main.closeCart();
            };
        });
    };

    setActiveLink(id){
        const activePageId = `#nav-${id}`;
        const aActive = document.querySelector(activePageId); 
        const siblings = aActive.parentElement.closest('.main-nav').querySelectorAll('li');
        siblings.forEach(sibling => {
            sibling.classList.remove('link_active');   
        aActive.parentElement.classList.add('link_active');
        });
    };
    
    async loadTemplate() {
        const id = this.getIdFromHash();
        
        const viewUrl = this.getViewUrlFromId(id);
        const viewContent = await this.ajax(viewUrl);
        document.querySelector('main').innerHTML = viewContent;

        this.setActiveLink(id);

        this.initJS(id);
    }

    async loadTemplates() {
        this.loadTemplate();
        window.addEventListener('hashchange', () => this.loadTemplate());
    }

    async start() {
        await this.loadTemplates();
        Main.loadOpenCart();
        Main.loadCloseCartFunction();
        Main.addHambMenuFunction();
    }
}

const main = new Main();
main.start();