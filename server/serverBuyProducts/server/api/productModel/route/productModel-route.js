import ProductModelController from '../controller/productModel-controller';

export default class ProductModelRoute {
  static init(router) {
    router.route('/productModel/getDetails').get(ProductModelController.getAll);
    router.route('/productModel/oneFieldAllAttributes').post(ProductModelController.oneFieldAllAttributes);
                                                        // pagination and searching one field all attributes at a time
    router.route('/productModel/:create').post(ProductModelController.add);          // Inserting values into attributes
    router.route('/productModel/search/:id').get(ProductModelController.getById);    // Getting Product Data by Id
  }
}
