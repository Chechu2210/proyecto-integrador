import productController from '/js/controllers/product.js';
import PageAlta from '/js/modules/create.js';

console.warn('🆗: Módulo PageBúsqueda cargado.');

class PageBusqueda {

    static productsTableContainer;
    static isEditModalVisible = false;
    static ageOptions = [{ value: 'meses', text: 'meses' }, { value: 'años', text: 'años'},];
    static btnCloseCart = document.querySelector('.close-button');

    static modalOuter = document.querySelector('.modal-outer');
    
    //                 CLOSE EDIT MODAL FUNCTION
    static async closeModalEdit(){
            const modalElement = document.getElementById('edit-modal-container');
            modalElement.classList.remove('modal-visible');
            PageBusqueda.isEditModalVisible = false;
        }
  
    static async addFunctionCloseModal(ev){
        if (ev.target.classList.contains('btn-close-button')||ev.target.classList.contains('close-button') || ev.target.classList.contains('modal-outer')){
            PageBusqueda.closeModalEdit();
        };
    }    

    static async optionsAvailable() {
        const brandCell = document.querySelector('td[data-product-property="brand"]');
        const categoryCell = document.querySelector('td[data-product-property="category"]');
        const ageCell = document.querySelector('td[data-product-property="ageGroup"]');

        brandCell.addEventListener('click', () => {
            this.populateDropdownOptionsOnce(brandCell, PageAlta.productBrand);
        });

        categoryCell.addEventListener('click', () => {
            this.populateDropdownOptionsOnce(categoryCell, PageAlta.productCategories);
        });

        ageCell.addEventListener('click', () => {
            this.populateDropdownOptionsOnce(ageCell, this.ageOptions);
        });
    }

    static async populateDropdownOptionsOnce(cell, options) {
        if (!cell.classList.contains('dropdown-populated')) {
            cell.classList.add('dropdown-populated');

            const selectElement = document.createElement('select');
            selectElement.classList.add('dropdown-options');

            options.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.value;
                optionElement.textContent = option.text;

                selectElement.appendChild(optionElement);
            });

            selectElement.addEventListener('change', () => {
                cell.textContent = selectElement.options[selectElement.selectedIndex].textContent;
                cell.dataset.productProperty = selectElement.value;
                selectElement.style.display = 'none';
            });

            cell.innerHTML = '';
            cell.appendChild(selectElement);
        }
    }


    static async updateProduct(id){
        const cellName = document.querySelector('td[data-product-property="name"]');
        const cellPrice = document.querySelector('td[data-product-property="price"]');
        const stockCell = getElementById("td-quantity");
        const brandCell = getElementById("td-brand");
        const cellCategory = getElementById("td-category");
        const cellShortDescription = document.querySelector('td[data-product-property="shortDescription"]');
        const cellLongDescription = document.getElementById("td-longDescription");
        const cellFreeShipping = document.getElementById("td-freeShipping");
        const cellAgeUnit = document.querySelector('td[data-product-property="ageGroup"]');
        const cellAgeFrom = document.querySelector('td[data-product-property="ageFrom"]');
        const cellAgeUpTo = document.querySelector('td[data-product-property="ageUpTo"]');
        const cellMainPhoto = document.querySelector('td[data-product-property="image"]');

        document.getElementById('button-submit-changes').addEventListener('click', async e => {
            e.preventDefault();
            const id = document.querySelector('td[data-product-property="id"]').textContent;
            const product = {
                name: cellName.textContent,
                price: parseFloat(cellPrice.textContent),
                stock: parseInt(stockCell.textContent),
                brand: brandCell.textContent,
                category: cellCategory.textContent,
                shortDescription: cellShortDescription.textContent,
                longDescription: cellLongDescription.textContent,
                freeShipping: cellFreeShipping.textContent,
                ageGroup: cellAgeUnit.value,
                ageFrom: parseInt(cellAgeFrom.textContent),
                ageUpTo: parseInt(cellAgeUpTo.textContent),
                //mainPhoto: cellMainPhoto.textContent,
            };
            try {
                const updatedProduct = await productController.updatedProduct(id, product);
                console.log(updatedProduct);
                showBanner('El producto se ha modificado de alta correctamente!', 'success');
                PageBusqueda.closeModalEdit();
            } catch (error) {
                showBanner('Hubo un error al intentar dar de alta el producto, por favor inténtelo nuevamente.', 'error');
            }

        });
    }    

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

    static toggleModalVisibility() {
        const modalElement = document.getElementById('edit-modal-container'); // Replace 'your-modal-id' with the actual ID of your modal
        modalElement.classList.toggle('modal-visible');
    };
      
    static async modifyProduct(e) {
        const row = e.target.closest('tr');
        const _id = row.querySelector('td[data-product-property="_id"]').innerHTML;
        const product = await productController.getProduct(_id);
        return product;
    }

    static async addTableEvents() {
        PageBusqueda.productsTableContainer.addEventListener('click', async e => {
            if (e.target.classList.contains('btn-delete')) {
                const deletedProduct = await PageBusqueda.deleteProduct(e);
                console.log('deletedProduct:', deletedProduct);            
                return;
            }
            if (e.target.classList.contains('btn-edit')) {
                console.log('editar'); 
                const productToModify = await  PageBusqueda.modifyProduct(e);  
                console.log(productToModify);
                console.log(productToModify._id);
                PageBusqueda.renderTemplateEditProduct(productToModify);

                PageBusqueda.toggleModalVisibility();
                PageBusqueda.isEditModalVisible = true;
                window.addEventListener('click', ev =>{
                    PageBusqueda.addFunctionCloseModal(ev);
                } )
                window.addEventListener('keydown', ev =>{
                    if (ev.key === 'Escape'){    
                        PageBusqueda.closeModalEdit();
                    };
                });
                return;
            }
        });
    }

    static async renderTemplateEditProduct(product) {
        const hbsFile = await fetch('templates/modify-product.hbs').then(r => r.text());
        const template = Handlebars.compile(hbsFile);
        const html = template({product});
        document.getElementById('edit-table-container').innerHTML = html;
        PageBusqueda.optionsAvailable();
        PageBusqueda.updateProduct();
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
