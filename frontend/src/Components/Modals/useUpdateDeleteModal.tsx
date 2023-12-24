import { useEffect, useState } from "react";
import { CatInfo } from "../../Types";

export const useUpdateDeleteModal = () => {
    const [catData, setCatData] = useState<CatInfo[]>([]);

    const getOneCat = async (id: string) => {
        const response = await fetch(`http://localhost:3001/cats/${id}`);
        const data = await response.json();
        setCatData(data);
    }


}