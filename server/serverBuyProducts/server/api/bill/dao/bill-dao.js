import Promise from 'bluebird';
import models from '../../../models';
import * as res from "express";
var Sequelize = require('sequelize');
const Op = Sequelize.Op;


export default class BillDao {
  static getAll() {
    return new Promise((resolve, reject) => {
      models.bill.findAll({
      })
        .then(bills => { resolve(bills); })
        .catch(error => res.status(400).json(error));
    });
  }

  static getAllWithSearch(searchByName) {
    return new Promise((resolve, reject) => {
      models.bill.findAll({
        where: {
          purchasedBy: { [Op.iLike] :'%'+ searchByName + '%'
            }
        }
      })
        .then(bills => { resolve(bills); })
        .catch(error => res.status(400).json(error));
    });
  }



  static getAllWithPage(pageNo,limit) {
    return new Promise((resolve, reject) => {
      let offset = limit * (pageNo - 1);
      models.bill.findAndCountAll({
        limit: limit,
        offset: offset,
        order: [
          ['createdAt', 'DESC']
        ]
      })
        .then((result) => {resolve(result)})
        .catch(error=>{ reject(error); })
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

