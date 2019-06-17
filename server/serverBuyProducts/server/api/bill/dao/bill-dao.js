import Promise from 'bluebird';
import models from '../../../models';
import * as res from "express";
var Sequelize = require('sequelize');
const Op = Sequelize.Op;


export default class BillDao {
  static getAll() {
    console.log("models:",models.bill);
    return new Promise((resolve, reject) => {
      models.bill.findAll()
        .then(bills => { resolve(bills); })
        .catch(error => res.status(400).json(error));
    });
  }



  static getCurrentCustomerData() {
    return new Promise((resolve, reject) => {
      models.bill.findAll({
        order: [
          ['createdAt', 'DESC']
        ],
        limit: 1
      })
        .then(bills => { resolve(bills); })
        .catch(error => res.status(400).json(error));
    });
  }



  // server side searching with purchasedBy(name) and totalCost greater than or equal to the given input
  static getAllWithSearch(search) {
    return new Promise((resolve, reject) => {
      if(search.total.length===0){
        search.total = 0;
      }
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


  // Server side pagination and searching by taking pageNo and limit values from client side
  static getAllWithPage(pageNo,limit, search) {
      return new Promise((resolve, reject) => {
          search.purchasedBy = search.purchasedBy.trim();
          if(typeof search.total === 'string')  {      // If the given value is String, we Have to trim first
             search.total = search.total.trim();}
          if(search.total.length===0)  {               // Checking whether the field is empty or not
            search.total = 0;}

          let offset = limit * (pageNo - 1);          // Setting baseValue
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
          }).then((result) => {resolve(result);})
            .catch(error=>{ reject(error); });
      });
  }



  // adding one more row based on customer details
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



