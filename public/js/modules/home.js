import productController from '/js/controllers/product.js';

console.warn('🆗: Módulo Home cargado.');

class PageHome {

    static async renderTemplateCards(products) {
        const textoToRender = await fetch('/templates/all-products.hbs').then(r => r.text());
        const template = Handlebars.compile(textoToRender);
        const html = template({ products });
        document.querySelector('.cards-container').innerHTML = html;
    }

    static async init () {
        console.log('PageHome.init()');
        console.log('.');
        console.log('..');
        console.log('...');

        const products = await productController.getProducts();
        PageHome.renderTemplateCards(products);
    
        console.log(`Se encontraron ${products.length} productos.`);
    };
}
export default PageHome;

