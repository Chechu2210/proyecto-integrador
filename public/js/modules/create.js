import productController from '/js/controllers/product.js';

console.warn('🆗: Módulo PageAlta cargado.');

function showBanner(message, type) {
    const resultBanner = document.getElementById('resultBanner');
    resultBanner.innerHTML = message;

    if (type === 'success') {
        resultBanner.classList.remove('error');
        resultBanner.classList.add('success');
    } else if (type === 'error') {
        resultBanner.classList.remove('success');
        resultBanner.classList.add('error');
    }
    // Hide the banner after a few seconds (adjust the time as needed)
    setTimeout(() => {
        resultBanner.style.display = 'none';
    }, 5000); // Hide the banner after 5 seconds (5000 milliseconds)
}

function resetFormFields() {
    const formProduct = document.getElementById('formProduct');
    formProduct.reset();
}

class PageAlta {


    static async init () {
        console.log('PageInicio.init()');

        // Get the values from input fields
        const inputName = document.getElementById('product-name');
        const inputPrice = parseFloat(document.getElementById('price'));
        const inputStock = parseInt(document.getElementById('stock'));
        const inputBrand = document.getElementById('brand');
        const inputCategory = document.getElementById('category');
        const inputShortDescription = document.getElementById('short-description');
        const inputLongDescription = document.getElementById('long-description')
        const inputFreeShipping = document.getElementById('free-shipping');
        const inputAgeGroup = document.querySelector('input[name="age"]:checked');
        const inputAgeFrom = parseInt(document.getElementById('age-from'));
        const inputAgeUpTo = parseInt(document.getElementById('age-up-to'));
        const inputMainPhoto = document.getElementById('main-photo');

        document.getElementById('formProduct').addEventListener('submit', async (e) => {
            e.preventDefault();
            const product = {
                name: inputName.value,
                price: inputPrice.value,
                stock: inputStock.value,
                brand: inputBrand.value,
                category: inputCategory.value,
                shortDescription: inputShortDescription.value,
                longDescription: inputLongDescription.value,
                freeShipping: inputFreeShipping.checked,
                ageGroup: inputAgeGroup,
                ageFrom: inputAgeFrom.value,
                ageUpTo: inputAgeUpTo.value,
                mainPhoto: inputMainPhoto.files[0],
            };    
            
            try {
                const newProduct = await productController.saveProduct(product);
                console.log(newProduct);
                resetFormFields();
                showBanner('El producto se ha dado de alta correctamente!', 'success');
            } catch (error) {
                console.error(error);
                showBanner('Hubo un error al intentar dar de alta el producto, por favor inténtelo nuevamente.', 'error');
            }
        });
    }
}    
    
export default PageAlta;


    