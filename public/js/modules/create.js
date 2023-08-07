import productController from '/js/controllers/product.js';

console.warn('🆗: Módulo PageAlta cargado.');

class PageAlta {

    static resetFormFields() {
        const formProduct = document.getElementById('formProduct');
        formProduct.reset();
    };

    static async showBanner(message, type) {
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
    };

    static productBrand = [
        { value: '', text: 'Seleccione una opción' },
        { value: '1', text: 'Lego' },
        { value: '2', text: 'Fisher-Price' },
        { value: '3', text: 'Barbie' },
        { value: '4', text: 'Bandai Namco' },
        { value: '5', text: 'Nerf' },
        { value: '6', text: 'Hasbro' },
        { value: '7', text: 'Hot Wheels' },
        { value: '8', text: 'My Little Pony' },
        { value: '9', text: 'Mattel' },
        { value: '10', text: 'Play-Doh' },
        { value: '11', text: 'Playskool' },
    ]; 

    static productCategories = [
            { value: '1', text: 'Inflables y Piletas' },
            { value: '2', text: 'Playa' },
            { value: '3', text: 'Jardin' },
            { value: '4', text: 'Pistolas de Agua' },
            { value: '5', text: 'Deportes' },
            { value: '111', text: 'Libros' },
            { value: '112', text: 'Masas, Slime y Arenas' },
            { value: '113', text: 'Pizarras y Sets de Arte' },
            { value: '114', text: 'Squishys' },
            { value: '211', text: 'Cochecitos' },
            { value: '212', text: 'Cunas , Sillas y Butacas' },
            { value: '213', text: 'Móviles y Sonajeros' },
            { value: '214', text: 'Juguetes' },
            { value: '215', text: 'Pisos de Goma y Gimnasios' },
            { value: '216', text: 'Para el Baño' },
            { value: '217', text: 'Andadores y Andarines' },
            { value: '218', text: 'Columpios y Mecedoras' },
            { value: '1001', text: 'Para la escuela' },
            { value: '1100', text: 'Peluches' },
            { value: '1200', text: 'Pistas y Vehículos' },
            { value: '1300', text: 'Pistolas, Espadas y Lanzadardos' },
            { value: '1400', text: 'Primera infancia' },
            { value: '911', text: 'Muñecas y Ponys' },
            { value: '912', text: 'Bebotes' },
            { value: '913', text: 'Accesorios' },
            { value: '914', text: 'Coleccionables' },
            { value: '915', text: 'L.O.L. y Cry Babies' },
            { value: '811', text: 'Sets de Compras Y Cocina' },
            { value: '812', text: 'Sets de Herramientas' },
            { value: '813', text: 'Sets de Belleza' },
            { value: '814', text: 'Doctores Y Veterinarios' },
            { value: '711', text: 'Rompecabezas' },
            { value: '712', text: 'Trivias' },
            { value: '713', text: 'Estrategia' },
            { value: '714', text: 'Clasicos' },
            { value: '715', text: 'Habilidad e Ingenio' },
            { value: '716', text: 'De Salón' },
            { value: '717', text: 'Juegos de Mesa' },
        ];

    static populateSelect(selectId, options) {
        const selectElement = document.getElementById(selectId);
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.text;
            selectElement.appendChild(optionElement);
        });
    };

    static async init () {
        console.log('PageInicio.init()');

        PageAlta.populateSelect("brand", PageAlta.productBrand);
        PageAlta.populateSelect("category", PageAlta.productCategories);

        // Get the values from input fields
        const inputName = document.getElementById('product-name');
        const inputPrice =(document.getElementById('price'));
        const inputStock = (document.getElementById('stock'));
        const inputBrand = document.getElementById('brand');
        const inputCategory = document.getElementById('category');
        const inputShortDescription = document.getElementById('short-description');
        const inputLongDescription = document.getElementById('long-description')
        const inputFreeShipping = document.getElementById('free-shipping');
        const inputAgeUnit = document.querySelector('input[name="age"]:checked');
        const inputAgeFrom = document.getElementById('age-from');
        const inputAgeUpTo = document.getElementById('age-up-to');
        const inputMainPhoto = document.getElementById('main-photo');

        document.getElementById('formProduct').addEventListener('submit', async (e) => {
            e.preventDefault();
            const product = {
                name: inputName.value,
                price: parseFloat(inputPrice.value),
                stock: parseInt(inputStock.value),
                brand: inputBrand.value,
                category: inputCategory.value,
                shortDescription: inputShortDescription.value,
                longDescription: inputLongDescription.value,
                freeShipping: inputFreeShipping.value,
                ageUnit: inputAgeUnit,
                ageFrom: parseInt(inputAgeFrom.value),
                ageUpTo: parseInt(inputAgeUpTo.value),
                mainPhoto: inputMainPhoto.files[0],
            };    
            
            try {
                const newProduct = await productController.saveProduct(product);
                console.log(newProduct);
                PageAlta.resetFormFields();
                PageAlta.showBanner('El producto se ha dado de alta correctamente!', 'success');
            } catch (error) {
                console.error(error);
                PageAlta.showBanner('Hubo un error al intentar dar de alta el producto, por favor inténtelo nuevamente.', 'error');
            }
        });
    }
}    
    
export default PageAlta;


    