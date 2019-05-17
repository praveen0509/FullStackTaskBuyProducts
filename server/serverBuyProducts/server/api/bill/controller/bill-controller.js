import BillDao from '../dao/bill-dao';
var url = require('url');

export default class BillController {

  // Getting Bill Data
  static getAll(req, res) {
    BillDao.getAll().then(bills => {
      res.status(200);
      res.send(bills);
    }).catch(error => res.status(400).json(error));
  }

  // pagination based on pageNo and itemsPerPage
 /* static getAllWithPage(req, res) {
    let body= req.body;
    BillDao.getAllWithPage(body.pageNo, body.itemsPerPage).then(bills => {
      res.status(200);
      res.send(bills);
    }).catch(error => res.status(400).json(error));
  }*/

  static getAllWithPage(req, res) {
    let bodyPage= req.body.page;
    let bodySearch= req.body.search;
    console.log("Body:", req.body);
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
  static getById(req, res){
    BillDao.getById(req.id).then(billById=> {
      res.status(200);
      res.send(billById);
    }).catch(error => res.status(400).json(error));
  }
}



