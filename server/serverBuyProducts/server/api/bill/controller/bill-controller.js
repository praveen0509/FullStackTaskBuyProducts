import BillDao from '../dao/bill-dao';
import ItemDao from "../../item/dao/item-dao";
var url = require('url');

export default class BillController {

  // Getting Bill Data
  static getAll(req, res) {
    console.log("controller");
    BillDao.getAll().then(bills => {
      res.status(200);
      res.send(bills);
    }).catch(error => res.status(400).json(error));
  }


  // Getting Bill Data
  static getCurrentCustomerData(req, res) {
    BillDao.getCurrentCustomerData().then(bills => {
      res.status(200);
      res.send(bills);
    }).catch(error => res.status(400).json(error));
  }



  // pagination based on pageNo and itemsPerPage
  static getAllWithPage(req, res) {
    let bodyPage= req.body.page;
    let bodySearch= req.body.search;
    BillDao.getAllWithPage(bodyPage.pageNo, bodyPage.itemsPerPage, bodySearch).then(bills => {
      res.status(200);
      res.send(bills);
    }).catch(error => res.status(400).json(error));
  }




  // Inserting a row into Bill Table
  static add(req, res){
    let _body = req.body;
    BillDao.add(_body).then(addedBill=> {
      res.status(200);
      res.send(addedBill);
    }).catch(error => res.status(400).json(error));
  }



  // getting Bill Data based on ID
  static  getById(req, res){
    console.log("req controller:", req.params.id);
    BillDao.getById(req.id).then(billById=> {
      res.status(200);
      res.send(billById);
    }).catch(error => res.status(400).json(error));
  }
}



