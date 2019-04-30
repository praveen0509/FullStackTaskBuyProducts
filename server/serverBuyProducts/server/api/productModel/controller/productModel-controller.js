import ProductModelDao from '../dao/productModel-dao';

export default class ProductModelController {

  static getAll(req, res) {
    const deptQuery = req.query;
    ProductModelDao.getAll(deptQuery).then(products => {
     res.status(200);
     res.send(products);
    }).catch(error => res.status(400).json(error));
  }

  static add(req, res){
    let _body = req.body;
    console.log(_body);
    ProductModelDao.add(_body).then(products => {
      res.status(200);
      res.send(products);
    }).catch(error => res.status(400).json(error));

  }

  static getById(req, res){
    let _id = req.params.id;
     ProductModelDao.getById(_id).then(products => {
      console.log('User data:-', JSON.stringify(products));
      res.send(products);
    }).catch(error => res.status(400).json(error));
  }

}











