import BillDao from '../dao/bill-dao';

export default class BillController {
  static getAll(req, res) {
    const deptQuery = req.query;
    BillDao.getAll(deptQuery).then(bills => {
      res.status(200);
      res.send(bills);
    }).catch(error => res.status(400).json(error));
  }

  static add(req, res){
    let _body = req.body;
    BillDao.add(_body).then(addedBill=> {
      res.status(200);
      res.send(addedBill);
    }).catch(error => res.status(400).json(error));
  }


  static getById(req, res){
    BillDao.getById(req.id).then(billById=> {
      res.status(200);
      res.send(billById);
    }).catch(error => res.status(400).json(error));
  }
}



