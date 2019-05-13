import Promise from 'bluebird';
import models from '../../../models';
import * as res from "express";

export default class BillDao {
  static getAll(_query) {
    return new Promise((resolve, reject) => {
      models.bill.findAll({
      })
        .then(bills => { resolve(bills); })
        .catch(error => res.status(400).json(error));
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
        .then(bills => { resolve(bills); })
        .catch(error => res.status(400).json(error));
    });
  }

  static getById(id) {
    return new Promise(
      (resolve, reject) => {
        models.bill.find({
          where: {id: id}
        })
          .then(billById => { resolve(billById); })
          .catch(error => res.status(400).json(error));
      });
  }
}

