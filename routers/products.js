import express from 'express';
import controller from '../controllers/products.js';

const routerProducts = express.Router();

////////////////////////////////////////////////////////////////////////////////
//                                 GET Routes                                 //
////////////////////////////////////////////////////////////////////////////////

routerProducts.get('/', controller.getProducts);


routerProducts.get('/:id', controller.getProduct);

////////////////////////////////////////////////////////////////////////////////
//                                 POST Routes                                //
////////////////////////////////////////////////////////////////////////////////

routerProducts.post('/', controller.postProduct);

////////////////////////////////////////////////////////////////////////////////
//                                 PUT Routes                                 //
////////////////////////////////////////////////////////////////////////////////

routerProducts.put('/:id',controller.putProduct);

////////////////////////////////////////////////////////////////////////////////
//                              DELETE Routes                                 //
////////////////////////////////////////////////////////////////////////////////

routerProducts.delete('/:id', controller.deleteProduct);








export default routerProducts;