import BillController from '../controller/bill-controller';

export default class BillRoute {
  static init(router) {
    router.route('/bill/getDetails').get(BillController.getAll);
    router.route('/bill/:add').post(BillController.add);
    router.route('/bill/:id').get(BillController.getById);
  }
}
