export const PRODUCTDATA = 'PRODUCT_DETAILS';
export const BILLDATA = 'BILL_DETAILS';
export const INSERTITEM = 'INSERT_DATA_INTO_ITEM';
export const BULKINSERTITEM='BULK_INSERT_DATA_INTO_ITEM';
export const INSERTBILL='INSERT_DATA_INTO_BILL';
export const ITEMBYID='ITEM_BY_ID';

export const UserEndPoint = (type: string, params: any) => {
  console.log(params);
  const endpoints = {
    [PRODUCTDATA]: '/productModel/getDetails',
    [BILLDATA]: '/bill/getDetails',
    [INSERTITEM]:'/item/add',
    [INSERTBILL]:'/bill/add',
    [BULKINSERTITEM]: '/item/bulkAdd',
    [ITEMBYID]: '/item/billId/'
  };
  if(endpoints[type] === '/item/billId/') {
    endpoints[type] = endpoints[type] + params;
  }
  console.log('http://192.168.0.197:3333'+ endpoints[type]);
  return 'http://192.168.0.197:3333'+ endpoints[type];
};

