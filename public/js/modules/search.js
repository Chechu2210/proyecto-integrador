import productController from '/js/controllers/product.js';

console.warn('🆗: Módulo PageBúsqueda cargado.');

class PageBusqueda {

    static productsTableContainer;

    static async deleteProduct(e) {
        if (!confirm('¿Estás seguro de querer eliminar el producto?')) {
            return false;
        }
        const row = e.target.closest('tr');
        const _id = row.querySelector('td[data-product-property="_id"]').innerHTML;
        const deletedProduct = await productController.deleteProduct(_id);
        PageBusqueda.loadTable();
        return deletedProduct;
    };

    static getProductFromRow(row){

    }

    static completeForm(e){
        const row = e.target.closest('tr');
        const productToEdit = PageBusqueda.getProductFromRow(row);
        console.log('productTiEdit', productToEdit)

    }
    /*
        document.getElementById('btn-put').addEventListener('click', async e => {
        e.preventDefault();
        const id = inputId.value;
        const product = {
            name: inputName.value,
            description: inputDescription.value,
            price: inputPrice.value,
        };
        const updatedProduct = await http.put('/api/products/', id, product);
        // console.log(product);
        console.log(updatedProduct);
    });
*/
    static async addTableEvents() {
        PageBusqueda.productsTableContainer.addEventListener('click', async e => {
            if (e.target.classList.contains('btn-delete')) {
                const deletedProduct = await PageBusqueda.deleteProduct(e);
                console.log('deletedProduct:', deletedProduct);            
                return;
            }
            if (e.target.classList.contains('btn-edit')) {
                console.log('editar');  
                PageBusqueda.completeForm(e);          
                return;
            }
        });
    }

    static async renderTemplateTable(products) {
        const hbsFile = await fetch('templates/products-table.hbs').then(r => r.text());
        const template = Handlebars.compile(hbsFile);
        const html = template({ products });
        PageBusqueda.productsTableContainer.innerHTML = html;
    };

    static async loadTable() {
        const products = await productController.getProducts();
        console.log(`Se encontraron ${products.length} productos.`);
        PageBusqueda.renderTemplateTable(products);
    };

    static async prepareTable() {
        PageBusqueda.productsTableContainer = document.querySelector('#search-main-container');
        await PageBusqueda.loadTable();
        PageBusqueda.addTableEvents();
    };

    static async init () {
        console.log('PageBusqueda.init()');

        PageBusqueda.prepareTable();
    };

}

export default PageBusqueda;
