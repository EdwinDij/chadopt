import { useEffect, useState } from "react";
import { CatInfo } from "../../Types";

export const useHome = () => {
  const [catData, setCatData] = useState<CatInfo[]>([]);

  const getAllCatData = async () => {
    const res = await fetch("http://localhost:3000/cat", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setCatData(data);
  };

  useEffect(() => {
    getAllCatData();
  }, []);

  useEffect(() => {
    console.log("useHome Component re-rendered", catData);
  }, [catData]);

  console.log("useHome", catData)

  return { catData, getAllCatData, setCatData };
};
