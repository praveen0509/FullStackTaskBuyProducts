import Promise from 'bluebird';
import models from '../../../models';
import * as res from "express";
const productModel = require('/home/sb-33/Desktop/FullStackTask/FullStackTaskBuyProducts' +
  '/server/serverBuyProducts/server/models/productmodel').productModel;

export default class ProductModelDao {
  static getAll(_query) {
    return new Promise((resolve, reject) => {models.productModel.findAll()
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
        .then(() => {})
        .catch(() => {})
    });
  }

  static getById(id) {
    console.log(id);
    return new Promise(
      (resolve, reject) => {
        models.productModel.find({
          where: { id : id }
        })
          .then(productModel => {
            console.log('Try')
            resolve(productModel);
          }).catch(() => {console.log('Error')} );
      });
  }

}

