import ItemDao from '../dao/item-dao';

export default class ItemController {

  static getAll(req, res) {
    const deptQuery = req.query;
    ItemDao.getAll(deptQuery).then(items => {
      res.status(200);
      res.send(items);
    }).catch(error => res.status(400).json(error));
  }

  // Inserting One Object at a time
  static add(req, res){
    let _body = req.body;
    ItemDao.add(_body).then(addedItem=> {
      res.status(200);
      res.send(addedItem);
    }).catch(error => res.status(400).json(error));
  }

  // Inserting Array of Objects into item modal
  static bulkAdd(req, res) {
    const _reqBody = req.body;
    ItemDao.bulkAdd(_reqBody, _reqBody["billId"])
      .then( itemDao =>{res.status(201).json(itemDao);
      }) .catch(error => res.status(400).json(error));

  }


  // Getting rows by Id from item modal
  static getById(req, res){
    let id = req.params.id;
    ItemDao.getById(id).
    then(itemById=> {
      res.status(200);
      res.send(itemById);
    }).catch(error => {res.status(400).json(error)}
    );
  }
}

