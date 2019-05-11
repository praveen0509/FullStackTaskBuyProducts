import Promise from 'bluebird';
import models from '../../../models';
import * as res from "express";
const item = require('/home/sb-33/Desktop/FullStackTask/FullStackTaskBuyProducts' +
  '/server/serverBuyProducts/server/models/item').item;

export default class ItemDao {
  static getAll(_query) {
    return new Promise((resolve, reject) => {
      models.item.findAll()
        .then(items => {
          resolve(items);
        });
    });
  }

  static add(body) {
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

  static bulkAdd(body, id) {
    return new Promise((resolve, reject)=> {
      var productList = [];
      for(let i=0;i<body.itemDetails.length;i++){
        productList.push({
          productId:body.itemDetails[i].productId,
          billId   : id,
          quantity : body.itemDetails[i].quantity,
          totalCost:body.itemDetails[i].totalCost
        })
      } models.item.bulkCreate(productList,{returning: true})
    }).then((result)=>{resolve(result);})
      .catch(error => res.status(400).json(error));
  }

  static getById(id) {
    console.log("Item Dao:", id);
    return new Promise((resolve, reject) => {
          models.item.find({
            where: {billId: id}
          })
          .then(itemById => {
            console.log("dao itemById:", itemById);
            resolve(itemById); })
            .catch(error => res.status(400).json(error));
      });
  }

}

