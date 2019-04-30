export const productData = 'PRODUCT_DETAILS';
export const INSERTITEM = 'INSERT_DATA_INTO_ITEM';
// export const BILLDATA='INSERT_BILL_DATA';
export const UserEndPoint = (type: string) => {
  const endpoints = {
    [productData]: '/productModel/getDetails',
    [INSERTITEM]:'/item/add',
    // [BILLDATA]:'/bill'
  };
  console.log("---->",'http://localhost:3333' + endpoints[type]);
  return 'http://localhost:3333'+ endpoints[type];
};
