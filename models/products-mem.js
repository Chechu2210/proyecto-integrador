class ProductModelMem {

    products = [];
    lastId = 0;

    getNextId(products){
        const nextId = this.products.length ? (Number(this.products[this.products.length - 1]._id) + 1).toString() : '1';
        return nextId;
    };

    ////////////////////////////////////////////////////////////////////////////////
    //                                 CRUD - C: Create                           //
    ////////////////////////////////////////////////////////////////////////////////

    async createProduct(product) {
        product._id = this.getNextId(this.products);
        this.products.push(product);
        return product;
    };

    ////////////////////////////////////////////////////////////////////////////////
    //                                 CRUD - R: Read                             //
    ////////////////////////////////////////////////////////////////////////////////

    async getProducts() {
        return this.products;
    }

    async getProduct(id){
        return this.products.find(product => product._id === id) || {};
    }

    ////////////////////////////////////////////////////////////////////////////////
    //                                 CRUD - U: Update                           //
    ////////////////////////////////////////////////////////////////////////////////

    async updateProduct(id, product) {
        const index = this.products.findIndex(product => product._id === id);
        if (index === -1){
            return {};
        }
        product._id = id;
        this.products[index] = product;
        return product;
    };

    ////////////////////////////////////////////////////////////////////////////////
    //                                 CRUD - D: Delete                           //
    ////////////////////////////////////////////////////////////////////////////////

    async deleteProduct(id) {
        const index = this.products.findIndex( product => product._id === id);
        if (index === -1){
            return {};
        }
        const removedProduct = this.products.splice(index, 1)[0];
        return removedProduct;
    };
};

export default ProductModelMem;