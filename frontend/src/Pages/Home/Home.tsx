import React, { useEffect, useState } from "react";
import { useAuth } from "../../useAuth";
import { ModalUpdate, ModalAddCat } from "../../Components/";
import { useHome } from "./useHome";
import { CatInfo } from "../../Types";
import { ModalInfo } from "../../Components/Modals/index";
import { useModalInfo } from "../../Components/Modals/index";

export function Home() {
  const [catId, setCatId] = useState<string>("");
  const [ArrayId, setArrayId] = useState<string>("");

  const auth = useAuth();
  const { sendAdoptRequest, cancelAdoptRequest } = useModalInfo();
  const {
    catData,
    getAllCatData,
    openModal,
    isShown,
    setIsShown,
    deleteCat,
    isUpdateModal,
    setIsUpdateModal,
  } = useHome();

  const isAdmin = auth?.user?.isAdmin;
  useEffect(() => {
    const fetchData = async () => {
      await getAllCatData();
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("useEffect home", catData);
  }, [catData]);

  useEffect(() => {
    if (isUpdateModal === false) {
      console.log("fermé");
      getAllCatData();
    }
  }, [isUpdateModal]);
  

  return (
    <>
      <div>
        {isAdmin && (
          <button
            onClick={openModal}
            className="hover:bg-pink-400 bg-sky-300 px-4 py-2 rounded-md shadow-sm shadow-black mt-6 hover:scale-105 font-semibold "
          >
            Ajouter un chat
          </button>
        )}

        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 justify-items-center">
            {catData.map((cat: CatInfo) => (
              <div
                className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                key={cat.id}
              >
                {cat.picture && (
                  <img
                    className="rounded-t-lg p-1 object-contain w-full h-56"
                    src={cat.picture}
                    alt={cat.name}
                  />
                )}
                <div className="p-5">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {cat.name}
                  </h5>
                  {auth?.user?.isAdmin ? (
                    <div className="flex items-center gap-2">
                      <button
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center bg-sky-300  rounded-lg hover:bg-pink-400 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() => {
                          setIsUpdateModal(true);
                          setCatId(cat.id);
                        }}
                      >
                        Modifer
                        <svg
                          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </button>
                      <button
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center bg-red-400  rounded-lg hover:bg-pink-400 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={(e) => deleteCat(cat.id, e)}
                      >
                        supprimer
                        <svg
                          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center bg-sky-300  rounded-lg hover:bg-pink-400 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() => {
                          setIsShown(true);
                          setCatId(cat.id);
                        }}
                      >
                        Voir mes informations
                      </button>
                      {isShown &&
                        (auth.user?.isAdmin === false ||
                          auth.user === null) && (
                          <ModalInfo
                            onClose={() => setIsShown(false)}
                            id={catId}
                          />
                        )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      {isUpdateModal && auth?.user?.isAdmin === true && (
        <ModalUpdate onClose={() => setIsUpdateModal(false)} id={catId} />
      )}

      {isShown && auth?.user?.isAdmin === true && (
        <ModalAddCat onClose={openModal} />
      )}
    </>
  );
}
