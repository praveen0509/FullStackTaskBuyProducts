import ProductModelController from '../controller/productModel-controller';

export default class ProductModelRoute {

  static init(router) {
    router.route('/productModel/getDetails').get(ProductModelController.getAll);
    router.route('/productModel/:create').post(ProductModelController.add);
    router.route('/productModel/search/:id').get(ProductModelController.getById);
  }
}
