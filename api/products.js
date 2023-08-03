import config from '../config.js';
import Model from '../models/products.js';


const model = Model.get(config.PERSISTENCE_TYPE);

////////////////////////////////////////////////////////////////////////////////
//                                 API Get All                                //
////////////////////////////////////////////////////////////////////////////////

const getProducts = async () => {
    const products = await model.getProducts();
    return products;
};

////////////////////////////////////////////////////////////////////////////////
//                                 API Get One                                //
////////////////////////////////////////////////////////////////////////////////

const getProduct = async id => {
    const product = await model.getProduct(id);
    return product;
}

////////////////////////////////////////////////////////////////////////////////
//                                 API Create                                 //
////////////////////////////////////////////////////////////////////////////////

const createProduct = async product => {
    const createdProduct = await model.createProduct(product);
    return createdProduct;
};
////////////////////////////////////////////////////////////////////////////////
//                                 API  Update                                //
////////////////////////////////////////////////////////////////////////////////

const updateProduct = async (id, product) =>{
    const updatedProduct = await model.updateProduct(id, product);
    return updatedProduct;
};

////////////////////////////////////////////////////////////////////////////////
//                                 API  Delete                                //
////////////////////////////////////////////////////////////////////////////////

const deleteProduct = async id =>{
    const deletedProduct = await model.deleteProduct(id);
    return deletedProduct;
};

export default {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};