import Promise from 'bluebird';
import models from '../../../models';
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

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
      let orCondition = [];
      let value = Number(bodyPage.searchAll);                    // saving the search field value to check it is a Number or String
      if(!isNaN(value))    {                                  // If the field is Number, Parse the value to Integer
        bodyPage.searchAll = value;
       orCondition = [
                       { price: { [Op.gte]: bodyPage.searchAll }}
                      ]
      }
      else {
        orCondition = [
                        { name: {[Op.iLike]: '%' + bodyPage.searchAll + '%'} },
                        { category: {[Op.iLike]: '%' + bodyPage.searchAll + '%'} }
                      ]
      }

      let offset = bodyPage.itemsPerPage * (bodyPage.pageNo - 1);
      models.productModel.findAndCountAll({
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



  /*Searching and Pagination using one field ne multiple data*/
  static oneFieldOneAttribute(bodyPage) {

    return new Promise((resolve, reject) => {
      let bodySearch = bodyPage.searchAll;
      bodySearch.name = bodySearch.name.trim();              // trimming all the spaces
      bodySearch.category = bodySearch.category.trim();
      bodySearch.price = Number(bodySearch.price);           // If user doesn't give price, default value will be 0
      let offset = bodyPage.itemsPerPage * (bodyPage.pageNo - 1);      // Setting starting row  in the database

      models.productModel.findAndCountAll({
        where: {
          name: {[Op.iLike]: '%' + bodySearch.name + '%'},
          category: {[Op.iLike]: '%' + bodySearch.category + '%'},
          price: {  [Op.gte]: bodySearch.price }
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

