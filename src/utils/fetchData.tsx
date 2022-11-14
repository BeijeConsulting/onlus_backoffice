export const fetchData = async (apiFunc: Function, params:any=null): Promise<any> => {
    return await apiFunc(params);
  };