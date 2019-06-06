export const PRODUCTDATA = 'PRODUCT_DETAILS';
export const BILLDATA = 'BILL_DETAILS';
export const BILLDATA_CURRENT_CUSTOMER = 'BILL_DATA_CURRENT_CUSTOMER';
export const BILLDATA_WITHPAGE = 'BILL_DETAILS_WITH_PAGE';
export const PRODUCTDATA_WITHPAGE = 'PRODUCT_DETAILS_WITH_PAGE';
export const PRODUCTDATA_WITHONEFIELD = 'PRODUCT_DETAILS_WITH_ONE_FIELD';  // Getting Product Data with one field multiple attributes
export const PRODUCTDATA_WITHMULTIPLE_FIELDS = 'PRODUCT_DETAILS_WITH_MULTIPLE_FIELDS';  // Getting Product Data with one field multiple attributes
export const INSERTITEM = 'INSERT_DATA_INTO_ITEM';
export const BULKINSERT_ITEM='BULK_INSERT_DATA_INTO_ITEM';
export const INSERTBILL='INSERT_DATA_INTO_BILL';
export const ITEMBYID='ITEM_BY_ID';
export const BILLBYID='BILL_BY_ID';

export const UserEndPoint = (type: string, params: any) => {
  const endpoints = {
    [PRODUCTDATA]: '/productModel/getDetails',
    [BILLDATA]: '/bill/getDetails',
    [BILLDATA_CURRENT_CUSTOMER]: '/bill/getCurrentCustomerData',
    [BILLDATA_WITHPAGE]: '/bill/paginationAndSearch',  //Getting Bill Data With Pagination and Search
    [PRODUCTDATA_WITHPAGE]: '/productModel/paginationAndSearch',  //Getting Product Data With Pagination and Search
    [PRODUCTDATA_WITHONEFIELD]: '/productModel/oneFieldAllAttributes',  //Getting Product Data With One Field Multiple Attributes
    [PRODUCTDATA_WITHMULTIPLE_FIELDS]: '/productModel/oneFieldOneAttribute',  //Getting Product Data With One Field Multiple Attributes
    [INSERTITEM]:'/item/add',
    [INSERTBILL]:'/bill/add',
    [BULKINSERT_ITEM]: '/item/bulkAdd',
    [ITEMBYID]: '/item/billId/',
    [BILLBYID]: '/bill/billId/'
  };
  if(endpoints[type] === '/item/billId/' || endpoints[type] === '/bill/billId/') {
    endpoints[type] = endpoints[type] + params;
  }
  return 'https://server-buyproducts.herokuapp.com'+ endpoints[type];  // http://192.168.0.197:3333
  // https://server-buyproducts.herokuapp.com
};



