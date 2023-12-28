import { useState, MouseEvent, useEffect } from "react";
import { CatInfo } from "../../Types";
import { useAuth } from "../../useAuth";
import { useHome } from "../../Pages/Home/useHome";

export const useModalInfo = () => {
  const [name, setName] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [photo, setPhoto] = useState<string>("");
  const [race, setRace] = useState<string>("");
  const [sexe, setSexe] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [ArrayId, setArrayId] = useState<string[]>([]);

  const auth = useAuth();
  const { getAllCatData } = useHome();

  const checkUserIdInArray = (array: string[], userId: string) => {
    if (array.includes(userId)) {
      return true;
    } else {
      return false;
    }
  };

  const getOneCat = async (id: string) => {
    const res = await fetch(`http://localhost:3000/cat/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setName(data.name);
    setBirthday(data.birthday);
    setPhoto(data.picture);
    setRace(data.race);
    setSexe(data.sexe);
    setCity(data.city);
    setDescription(data.description);
    setArrayId(data.requestUserId);
    console.log(data);
  };

  const calculateAge = (birthday: string) => {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  const sendAdoptRequest = async (
    id: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const localUser =
      localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")!);
    try {
      const res = await fetch(`http://localhost:3000/cat/adopt/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth?.user?.token,
        },
        body: JSON.stringify({
          userId: localUser?.userId,
        }),
      });
      await getAllCatData();
    } catch (error) {
      console.log(error);
    }
  };

  const cancelAdoptRequest = async (
    id: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const localUser =
      localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")!);

    try {
      const res = await fetch(`http://localhost:3000/cat/adopt/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth?.user?.token,
        },
        body: JSON.stringify({
          userId: localUser?.userId,
          cancel: "Adoptable",
        }),
      });
      await getAllCatData();
    } catch (error) {
      console.log(error);
    }
  };

  const Favorite = async (
    id: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const localUser =
      localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")!);

    try {
      const res = await fetch(
        `http://localhost:3000/cat/addFavoriteCat/${id}`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth?.user?.token,
          },
          body: JSON.stringify({
            userId: localUser?.userId,
          }),
        }
      );
      const data = await res.json();
      console.log(data);
      await getAllCatData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUserIdInArray(ArrayId, auth?.user?.userId!);
  }, [ArrayId]);

  return {
    getOneCat,
    name,
    birthday,
    photo,
    race,
    sexe,
    city,
    description,
    calculateAge,
    sendAdoptRequest,
    cancelAdoptRequest,
    ArrayId,
    checkUserIdInArray,
    Favorite,
  };
};
