import React, { useState } from "react";
import { useAuth } from "../../useAuth";
import { Modal, ModalAddCat, Card } from "../../Components/";
import { useHome } from "./useHome";
import { CatInfo } from "../../Types";
export function Home() {
  const auth = useAuth();
  const [isShown, setIsShown] = useState<boolean>(false);
  const { catData } = useHome();
  console.log(catData);
  return (
    <>
      <div>
        {auth?.user?.isAdmin && (
          <button
            onClick={() => setIsShown(!isShown)}
            className="hover:bg-pink-400 bg-sky-300 px-4 py-2 rounded-md shadow-sm shadow-black mt-6 hover:scale-105 font-semibold"
          >
            Ajouter un chat
          </button>
        )}

        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {catData.map((cat: CatInfo) => (
              <Card name={cat.name} picture={cat.picture} key={cat.id} id={cat.id} race={cat.race} sexe={cat.sexe} city={cat.city} description={cat.description} status={cat.status} age={0} />
            ))}
          </div>
        </section>
      </div>
      {isShown && <ModalAddCat setShown={setIsShown} isShown={isShown} />}
    </>
  );
}
