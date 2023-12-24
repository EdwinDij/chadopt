import React, { useState, MouseEvent, useEffect } from "react";
import { useAuth } from "../../useAuth";
export const useModalAddCat = () => {
  const [name, setName] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [photo, setPhoto] = useState<string>("");
  const [race, setRace] = useState<string>("");
  const [sexe, setSexe] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<string>("Adoptable");
  const [isShown, setIsShown] = useState<boolean>(true);

  const auth = useAuth();

  const checkInputs = () => {
    if (
      name === "" ||
      birthday === "" ||
      race === "" ||
      sexe === "" ||
      city === "" ||
      description === ""
    ) {
      return false;
    } else {
      return true;
    }
  };

  const clearInputs = () => {
    setName("");
    setBirthday("");
    setPhoto("");
    setRace("");
    setSexe("");
    setCity("");
    setDescription("");
    setStatus("Adoptable");
  };

  const addNewCat = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const isValid = checkInputs();

    if (!isValid) {
      alert("Veuillez remplir tous les champs");
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/cat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth?.user?.token,
        },
        body: JSON.stringify({
          name: name,
          birthday: birthday,
          description: description,
          city: city,
          sexe: sexe,
          picture: photo,
          race: race,
          isAdopted: status,
        }),
      });
      const data = await res.json();
      console.log(data);
      clearInputs();
    } catch (err) {
      console.error("Error while adding a new cat:", err);
    }
  };


  return {
    addNewCat,
    setName,
    setBirthday,
    setPhoto,
    setRace,
    setSexe,
    setCity,
    setDescription,
    setStatus,
    name,
    birthday,
    photo,
    race,
    sexe,
    city,
    description,
  };
};
