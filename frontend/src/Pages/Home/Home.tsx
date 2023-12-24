import React, { useState } from "react";
import { useAuth } from "../../useAuth";
import {Modal, ModalAddCat } from "../../Components/"
export function Home() {
  const auth = useAuth();
  const [isShown, setIsShown] = useState<boolean>(false);

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
          <div>

          </div>
        </section>
      </div>
      {isShown && <ModalAddCat setShown={setIsShown} isShown={isShown} />}
    </>
  );
}
