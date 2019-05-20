import Promise from 'bluebird';
import models from '../../../models';
import * as res from "express";
var Sequelize = require('sequelize');
const Op = Sequelize.Op;
const productModel = require('/home/sb-33/Desktop/FullStackTask/FullStackTaskBuyProducts' +
  '/server/serverBuyProducts/server/models/productmodel').productModel;

export default class ProductModelDao {
  static getAll(_query) {
    return new Promise((resolve, reject) => {
      models.productModel.findAll({
          order: [
            ['category', 'DESC']
          ]
          })
        .then(productModel => { resolve(productModel); })
        .catch(err => {reject(err)})
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
          .then(productModelId => { resolve(productModelId);})
          .catch((err) => {reject(err)} );
      });
  }


  /*Searching and Pagination using One field with multiple Data*/
  static oneFieldAllAttributes(bodyPage) {

    return new Promise((resolve, reject) => {
      let orCondition;
      let value = Number(bodyPage.search)                    // saving the search field value to check it is a Number or String
      if(!isNaN(value))    {                                  // If the field is Number, Parse the value to Integer
        bodyPage.search = parseInt(bodyPage.search);
         orCondition = [
           { price: { [Op.gte]: bodyPage.search }}
           ]
      }
      else {
        orCondition = [
          { name: {[Op.iLike]: '%' + bodyPage.search + '%'} },
          { category: {[Op.iLike]: '%' + bodyPage.search + '%'} }
        ]
      }

      let offset = bodyPage.itemsPerPage * (bodyPage.pageNo - 1);
      models.productModel.findAll({
        where : {
          [Op.or] : orCondition
        },
        limit: bodyPage.itemsPerPage,
        offset: offset,
        order: [
          ['category', 'DESC']
        ]
      }).then((result) => resolve(result))
        .catch((err) => reject(err));

    });
  }

}

