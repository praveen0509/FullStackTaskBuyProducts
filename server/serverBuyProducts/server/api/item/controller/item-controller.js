import ItemDao from '../dao/item-dao';
// import ProductModelDao from "../../productModel/dao/productModel-dao";

export default class ItemController {

  static getAll(req, res) {
    const deptQuery = req.query;
    ItemDao.getAll(deptQuery).then(items => {
      res.status(200);
      res.send(items);
      // console.log('ItemController getAll method Called');
    }).catch(error => res.status(400).json(error));
  }

  static add(req, res){
    let _body = req.body;
    // console.log(_body);
    ItemDao.add(_body).then(addedItem=> {
      res.status(200);
      res.send(addedItem);
    }).catch(error => res.status(400).json(error));
  }


  static getById(req, res){
    ItemDao.getById(req.id).then(itemById=> {
      res.status(200);
      res.send(itemById);
    }).catch(error => res.status(400).json(error));
  }
}



