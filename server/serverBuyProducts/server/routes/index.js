import TodoRoutes from "../api/todo/route/todo-route";
import ProductModelRoute from "../api/productModel/route/productModel-route"
import ItemRoute from "../api/item/route/item-route"
import BillRoute from "../api/bill/route/bill-route"

export default class Routes {
   static init(app, router) {
     TodoRoutes.init(router);
     ProductModelRoute.init(router);
     ItemRoute.init(router);
     BillRoute.init(router);
     app.use("/", router);
   }
}














