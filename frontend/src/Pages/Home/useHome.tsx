import { useEffect, useState } from "react";
import { CatInfo } from "../../Types";

export const useHome = () => {
  const [catData, setCatData] = useState<CatInfo[]>([]);

  const getAllCatData = () => {
    fetch("http://localhost:3000/cat", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Ajoutez d'autres en-têtes si nécessaire
      },
    })
      .then((response) => response.json())
      .then((data) => setCatData(data))
      .catch((error) => console.error("Erreur lors de la requête:", error));

  };
  useEffect(() => {
    getAllCatData();
  }, []);

  return { catData };
};
