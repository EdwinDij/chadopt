import React, { useEffect } from "react";
import { CatInfo } from "../../Types";
import { useModalInfo } from "./useModalInfo";
import { useAuth } from "../../useAuth";
export const ModalInfo = ({
  id,
  onClose,
}: Pick<CatInfo, "id"> & { onClose: () => void }) => {
  const {
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
    ArrayId,
    checkUserIdInArray,
    cancelAdoptRequest,
    Favorite,
  } = useModalInfo();

  useEffect(() => {
    getOneCat(id);
    ArrayId;
  }, []);

  const auth = useAuth();

  return (
    <div
      id="crud-modal"
      aria-hidden="true"
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-xl"
    >
      <div className="relative p-10 w-full max-w-xl max-h-full">
        <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Profil de {name}
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              data-modal-toggle="crud-modal"
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="px-2">
            <img
              src={photo}
              alt={name}
              className="w-full h-56 object-cover rounded-lg mt-2"
            />
            <div className="pt-4 md:p-5 rounded-t dark:border-gray-600">
              <h4>{name}</h4>
            </div>
          </div>

          <div className=" md:p-5 border-b rounded-t dark:border-gray-600">
            <h4 className="mb-4 text-xl">Informations</h4>
            <p className="text-gray-700 dark:text-gray-400">{description}</p>
          </div>
          <div className="flex flex-col gap-4 mt-3">
            <div className="flex flex-wrap justify-around">
              <p>Âge:{calculateAge(birthday)}</p>
              <p>Sexe: {sexe}</p>
            </div>

            <div className="flex flex-wrap justify-around">
              <p>Ville: {city}</p>
              <p>Race: {race}</p>
            </div>
            {auth.user && (
              <div className="flex justify-around my-4">
                {checkUserIdInArray(ArrayId, auth?.user?.userId) ? (
                  <button
                    type="button"
                    className=" rounded-lg border-2 bg-sky-300 py-1 px-4 hover:scale-110 transition-all duration-200 hover:bg-sky-500"
                    onClick={(e) => {
                      cancelAdoptRequest(id, e);
                      onClose();
                    }}
                  >
                    annulé ma demande
                  </button>
                ) : (
                  <button
                    type="button"
                    className=" rounded-lg border-2 bg-sky-300 py-1 px-4 hover:scale-110 transition-all duration-200 hover:bg-sky-500"
                    onClick={(e) => {
                      sendAdoptRequest(id, e);
                      onClose();
                    }}
                  >
                    Adopté
                  </button>
                )}
                
                <button
                  type="button"
                  className=" rounded-lg border-2 bg-pink-300 py-1 px-4 hover:scale-110 transition-all duration-200 hover:bg-pink-500"
                  onClick={(e) => {
                    Favorite(id, e);
                    onClose();
                  }}
                >
                  Favori
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
