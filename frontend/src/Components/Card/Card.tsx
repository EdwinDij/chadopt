import React, { useState } from "react";
import { CatInfo } from "../../Types";
import { Modal } from "../Modals";
import { useAuth } from "../../useAuth";
import { UpdateDeleteModal } from "../Modals/UpdateDeleteModal";

export const Card = ({
  name,
  picture,
  description,
  sexe,
  id,
  race,
  city,
  status,
}: CatInfo) => {
  const [isShown, setIsShown] = useState(false);
  const auth = useAuth();

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      {picture && (
        <img
          className="rounded-t-lg p-1 object-contain w-full h-56"
          src={picture}
          alt={name}
        />
      )}
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>
        {auth?.user?.isAdmin ? (
          <div className="flex items-center gap-2">
            <button
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center bg-sky-300  rounded-lg hover:bg-pink-400 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => setIsShown(true)}
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
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center bg-sky-300  rounded-lg hover:bg-pink-400 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              M'adopter
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
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center bg-sky-300  rounded-lg hover:bg-pink-400 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => setIsShown(true)}
            >
              Voir mes informations
            </button>
          </div>
        )}
        {isShown && <UpdateDeleteModal setShown={setIsShown} isShown={isShown} id={id}/>}
      </div>
    </div>
  );
};
