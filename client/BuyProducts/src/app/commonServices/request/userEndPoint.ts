export const PRODUCTDATA = 'PRODUCT_DETAILS';
export const BILLDATA = 'BILL_DETAILS';
export const INSERTITEM = 'INSERT_DATA_INTO_ITEM';
export const INSERTBILL='INSERT_DATA_INTO_BILL';

export const UserEndPoint = (type: string) => {
  const endpoints = {
    [PRODUCTDATA]: '/productModel/getDetails',
    [BILLDATA]: '/bill/getDetails',
    [INSERTITEM]:'/item/add',
    [INSERTBILL]:'/bill/add'
  };
  return 'http://192.168.0.197:3333'+ endpoints[type];
};


/*
* export const UserEndPoint = (type:string,params:any)=>{
  switch(type){
    case Login:
      return environment.API_ROOT + '/tsms/login/' +params.username + '/password/' + params.password;
    case DeleteAss:
      return environment.API_ROOT + '/tsms/project/' + params.p_id + '/resource/' + params.r_id;
    case ResourceAss:
      return environment.API_ROOT + '/tsms/assosiates/' + params;
    case TimeSheetEntery:
      return environment.API_ROOT + '/tsms/timesheetentry' ;
    case ActionTimeSheetEntery:
      return environment.API_ROOT + '/tsms/timesheetentry/' + params;
    case ActionTimeSheet:
      return environment.API_ROOT + '/tsms/timesheet/' + params;
    case TimeSheet:
        return environment.API_ROOT + '/tsms/timesheet';
    case Ass :
      return environment.API_ROOT + '/tsms/assosiate/' +params;
    case CreateAss :
      return environment.API_ROOT + '/tsms/assosiate';
    case USERS:
      return environment.API_ROOT + '/tsms/user/' +params ;*/
