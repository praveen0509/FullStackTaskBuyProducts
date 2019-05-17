import Promise from 'bluebird';
import models from '../../../models';
import * as res from "express";
const productModel = require('/home/sb-33/Desktop/FullStackTask/FullStackTaskBuyProducts' +
  '/server/serverBuyProducts/server/models/productmodel').productModel;

export default class ProductModelDao {
  static getAll(_query) {
    return new Promise((resolve, reject) => {models.productModel.findAll({
      order: [
        ['category', 'DESC']
      ]
      })
        .then(productModel => {
          console.log('all users are'+JSON.stringify(productModel));
          resolve(productModel);
        });
    });
  }

  static add(body) {
    console.log(body);
    return new Promise((resolve, reject) => {
      models.productModel
        .create({
          id: parseInt(body.id),
          name: body.productName,
          category: body.category,
          price: body.price
        })
        .then((productModelAdd) => {resolve(productModelAdd)})
        .catch((err) => {reject(err)})
    });
  }



  static getById(id) {
    console.log(id);
    return new Promise(
      (resolve, reject) => {
        models.productModel.findAll({
          where: { id : id }
        })
          .then(productModelId => {
            resolve(productModelId);
          }).catch((err) => {reject(err)} );
      });
  }


  /*Searching and Pagination using One field with multiple Data*/
  oneFieldAllAttributes(bodyPage) {
    return new Promise((resolve, reject) => {
      let value = 
      models.productModel.findAll({

      })
    });
  }

}

