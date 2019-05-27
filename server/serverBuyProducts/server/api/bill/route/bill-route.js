import BillController from '../controller/bill-controller';

export default class BillRoute {
  static init(router) {
    router.route('/bill/paginationAndSearch').post(BillController.getAllWithPage);
    router.route('/bill/getDetails').get(BillController.getAll);
    router.route('/bill/getCurrentCustomerData').get(BillController.getCurrentCustomerData);
    router.route('/bill/:add').post(BillController.add);
    router.route('/bill/:id').get(BillController.getById);
  }
}
