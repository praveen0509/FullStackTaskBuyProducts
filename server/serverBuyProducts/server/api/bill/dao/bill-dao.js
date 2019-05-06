import Promise from 'bluebird';
import models from '../../../models';
/*
const bill = require('/home/sb-33/Desktop/FullStackTask/FullStackTaskBuyProducts' +
  '/server/serverBuyProducts/server/models/bill').bill;
*/

export default class BillDao {
  static getAll(_query) {
    return new Promise((resolve, reject) => {
      console.log('BillDao getAll method called ');
      models.bill.findAll()
        .then(bills => {
          console.log('all users are'+JSON.stringify(bills))
          resolve(bills);
        });
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
        .then(() => {})
        .catch(() => {})
    });
  }

  static getById(id) {
    return new Promise(
      (resolve, reject) => {
        models.bill.find({
          where: {id: id}
        })
          .then(billById => {
            resolve(billById);
          });
      });
  }
}

