import Promise from 'bluebird';
import models from '../../../models';
import * as res from "express";
const item = require('/home/sb-33/Desktop/FullStackTask/FullStackTaskBuyProducts' +
  '/server/serverBuyProducts/server/models/item').item;

export default class ItemDao {
  static getAll(_query) {
    return new Promise((resolve, reject) => {
      console.log('itemDao getAll method called ');
      models.item.findAll()
        .then(items => {
          console.log('all users are'+JSON.stringify(items))
          resolve(items);
        });
    });
  }

  static add(body) {
    // console.log(body);
    return new Promise((resolve, reject) => {
      models.item
        .create({
          id: parseInt(body.id),
          productId: body.productId,
          quantity: body.quantity,
          totalCost: body.totalCost
        })
        .then(() => {})
        .catch(() => {})
    });
  }

  static getById(id) {
    return new Promise(
      (resolve, reject) => {
          models.item.find({
            where: {id: id}
          })
          .then(itemById => {
            resolve(itemById);
          });
      });
  }

}

