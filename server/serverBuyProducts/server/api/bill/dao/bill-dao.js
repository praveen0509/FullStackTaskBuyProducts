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

  // server side searching with purchasedBy(name) and totalCost greater than or equal to the given input
  static getAllWithSearch(search) {
    return new Promise((resolve, reject) => {
      console.log("total:", search.total.length);
      if(search.total.length==0){
        search.total = 0;
      }
      console.log("Search total:",search.total);
      models.bill.findAll({
        where: {
          purchasedBy: {[Op.iLike]: '%' + search.purchasedBy + '%'},
          total: {  [Op.gte]: search.total }
        }
      })
        .then(bills => { resolve(bills); })
        .catch(error => res.status(400).json(error));
    });
  }

  // server side pagination
  /*static getAllWithPage(pageNo,limit) {
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
  }*/


  static getAllWithPage(pageNo,limit, search) {
    return new Promise((resolve, reject) => {
      if(search.total.length==0){
        search.total = 0;
      }
      let offset = limit * (pageNo - 1);
      models.bill.findAndCountAll({
        where: {
                  purchasedBy: {[Op.iLike]: '%' + search.purchasedBy + '%'},
                  total: {  [Op.gte]: search.total }
               },
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



  //
  static add(body) {
    return new Promise((resolve, reject) => {
      models.bill
        .create({    // Insert Query
          id: parseInt(body.id),
          purchasedBy: body.purchasedBy,
          purchasedOn: body.purchasedOn,
          list: body.list,
          total: body.netTotal
        })
        .then(bills => { resolve(bills); })
        .catch(error => reject(error));
    });
  }


  // Get Bill data by Id
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

