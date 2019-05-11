import Promise from 'bluebird';
import models from '../../../models';

export default class BillDao {
  static getAll(_query) {
    return new Promise((resolve, reject) => {
      models.bill.findAll()
        .then(bills => { resolve(bills); });
    });
  }

  static add(body) {
    return new Promise((resolve, reject) => {
      models.bill
        .create({
          id: parseInt(body.id),
          purchasedBy: body.purchasedBy,
          purchasedOn: body.purchasedOn,
          list: body.list,
          total: body.netTotal
        })
        .then(bills => { resolve(bills); });
    });
  }

  static getById(id) {
    return new Promise(
      (resolve, reject) => {
        models.bill.find({
          where: {id: id}
        })
          .then(billById => { resolve(billById); });
      });
  }
}

