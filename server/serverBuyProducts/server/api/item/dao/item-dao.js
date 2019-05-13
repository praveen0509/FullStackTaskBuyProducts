import Promise from 'bluebird';
import models from '../../../models';
import * as res from "express";
const item = require('/home/sb-33/Desktop/FullStackTask/FullStackTaskBuyProducts' +
  '/server/serverBuyProducts/server/models/item').item;

export default class ItemDao {
  static getAll(_query) {
    return new Promise((resolve, reject) => {
      models.item.findAll({ })
        .then(items => {
          resolve(items);
        })
        .catch(error => res.status(400).json(error));
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
        .catch(error => res.status(400).json(error));
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
    return new Promise((resolve, reject) => {
          models.item.findAll({
            where: {billId: parseInt(id)},
            include:[
                      { model: models.productModel,
                        attributes: ["id", "name", "category", "price"]
                      },
                      {model: models.bill}
                    ],
            attributes: ["id", "productId", "billId", "quantity", "totalCost"]
          })
          .then(itemById => {resolve(itemById); })
            .catch(error => { reject(error);});
      });
  }

}

