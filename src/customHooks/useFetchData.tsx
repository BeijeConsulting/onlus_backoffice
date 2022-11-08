import { useState, useEffect } from "react";

const useFetchData = (param: Function) => {
  async function fetchData(): Promise<void> {
    const data = await param();
    return data;
  }
};

export default useFetchData;
