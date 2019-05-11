import ItemController from '../controller/item-controller';

export default class ItemRoute {
  static init(router) {
    console.log("item route");
    router.route('/item/:bulkAdd').post(ItemController.bulkAdd);
    router.route('/item/getDetails').get(ItemController.getAll);
    router.route('/item/:id').get(ItemController.getById);
    router.route('/item/:add').post(ItemController.add);

  }
}
