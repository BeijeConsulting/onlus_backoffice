import { useState, useEffect } from "react";

 const useFetchData = (param: Function) => {
  const [data, setData] = useState(null);

  async function fetchData(): Promise<void>{

    const dataTest = await param(); 
    setData({
        ...data,
        data: dataTest.data
    })
  }

  useEffect(() => {
    fetchData()
  }, [param]);

  return [data];
};

export default useFetchData;