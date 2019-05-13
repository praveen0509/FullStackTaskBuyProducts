import ItemDao from '../dao/item-dao';

export default class ItemController {

  static getAll(req, res) {
    const deptQuery = req.query;
    ItemDao.getAll(deptQuery).then(items => {
      res.status(200);
      res.send(items);
    }).catch(error => res.status(400).json(error));
  }

  static add(req, res){
    let _body = req.body;
    ItemDao.add(_body).then(addedItem=> {
      res.status(200);
      res.send(addedItem);
    }).catch(error => res.status(400).json(error));
  }

  static bulkAdd(req, res) {
    const _reqBody = req.body;
    ItemDao.bulkAdd(_reqBody, _reqBody["billId"])   //doubt
      .then( itemDao =>{res.status(201).json(itemDao);
      }) .catch(error => res.status(400).json(error));

  }

  static getById(req, res){
    console.log("Item Controller:", req.params.id);
    let id = req.params.id;
    ItemDao.getById(id).
    then(itemById=> {
      res.status(200);
      res.send(itemById);
    }).catch(error => {res.status(400).json(error)}
    );
  }
}

