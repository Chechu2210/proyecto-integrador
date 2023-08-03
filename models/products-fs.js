import fs from 'fs';

class ProductModelFile {

    productsFile = 'products.dat';
    charset = 'utf-8';

    getNextId = products => {
        const nextId = products.length ? (Number(products[products.length - 1]._id) + 1).toString() : '1';
        return nextId;
    };

    async readFileProducts () {
        let products = [];
        try {
            const fileContent = await fs.promises.readFile(this.productsFile, this.charset);
            products = JSON.parse(fileContent);
        } catch (error) {
            console.error(error.message);
        }
        return products;
    }

    async saveFileProducts (products) {
        await fs.promises.writeFile(this.productsFile, JSON.stringify(products, null, '\t'));
    }

    ////////////////////////////////////////////////////////////////////////////////
    //                                 CRUD - C: Create                           //
    ////////////////////////////////////////////////////////////////////////////////

    async createProduct(product){
        const products = await this.readFileProducts();
        product._id = this.getNextId(products);
        products.push(product);
        await this.saveFileProducts(products);
        return product;
    };

    ////////////////////////////////////////////////////////////////////////////////
    //                                 CRUD - R: Read                             //
    ////////////////////////////////////////////////////////////////////////////////

    async getProducts(){
        const products = await this.readFileProducts();
        return products;
    };

    async getProduct(id){
        const products = await this.readFileProducts();
        const product = products.find(product => product._id === id) || {};
        return product;
    };

    ////////////////////////////////////////////////////////////////////////////////
    //                                 CRUD - U: Update                           //
    ////////////////////////////////////////////////////////////////////////////////

    async updateProduct(id, product){
        const products = await this.readFileProducts();
        const index = products.findIndex(product => product._id === id);
        if (index === -1){
            return {};
        }
        product._id = id;
        products[index] = product;

        await this.saveFileProducts(products);
        return product;
    };

    ////////////////////////////////////////////////////////////////////////////////
    //                                 CRUD - D: Delete                           //
    ////////////////////////////////////////////////////////////////////////////////

    async deleteProduct(id){
        const products = await this.readFileProducts();
        const index = products.findIndex( product => product._id === id);
        if (index === -1){
            return {};
        }
        const removedProduct = products.splice(index, 1)[0];
        await this.saveFileProducts(products);
        return removedProduct;
    };
};

export default ProductModelFile;