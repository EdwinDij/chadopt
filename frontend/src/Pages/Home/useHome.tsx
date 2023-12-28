import { useEffect, useState } from "react";
import { CatInfo } from "../../Types";
import { useAuth } from "../../useAuth";

export const useHome = () => {
  const [catData, setCatData] = useState<CatInfo[]>([]);
  const [isShown, setIsShown] = useState<boolean>(false);
  const [isUpdateModal, setIsUpdateModal] = useState<boolean>(false);

  const auth = useAuth();

  const getAllCatData = async () => {
    try {
      const res = await fetch("http://localhost:3000/cat", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      setCatData([...data]); // Utilisation d'une copie du tableau    return Promise.resolve();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("useEffect home", catData);
  }, [catData]);

  const openModal = () => {
    setIsShown(!isShown);
    getAllCatData();
  };

  const deleteCat = async (
    id: string,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:3000/cat/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth?.user?.token}`,
      },
    });
    const data = await res.json();
    console.log(data);
    if (data.status === 200) {
      console.log("deleted");
      await getAllCatData();
      setCatData(catData.filter((cat) => cat.id !== id));
    }
  };


  return {
    catData,
    getAllCatData,
    setCatData,
    openModal,
    setIsShown,
    isShown,
    deleteCat,
    isUpdateModal,
    setIsUpdateModal,
  };
};
