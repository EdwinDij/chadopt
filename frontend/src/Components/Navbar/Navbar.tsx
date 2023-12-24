import React from "react";
import Logo from "../../assets/Chatdopt__2_-removebg-preview.png";
import { useAuth } from "../../useAuth";
import { useNavbar } from "./useNavbar";

export const Navbar = () => {
  const auth = useAuth();
  const { greeting, isHovering, setIsHovering } = useNavbar();

  return (
    <nav className="bg-sky-200 px-4">
      <ul className="flex justify-between items-center text-xl">
        <li>
          <a href="/" className="hover:text-pink-400">
            Home
          </a>
        </li>
        <img src={Logo} alt="logo" className="w-[50px] h-[50px] " />
        <li>
          {auth.user ? (
            <p
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {isHovering ? (
                <p
                  onClick={() => auth.logout()}
                  className="hover:text-pink-400 hover:cursor-pointer"
                >
                  Déconnexion
                </p>
              ) : (
                greeting + ", " + auth.user.username
              )}
            </p>
          ) : (
            <a href="/connexion" className="hover:text-pink-400">
              Connexion/Inscription
            </a>
          )}
        </li>
      </ul>
    </nav>
  );
};
