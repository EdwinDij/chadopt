import React from "react";
import Logo from "../../assets/Chatdopt__2_-removebg-preview.png";

export const Navbar = () => {
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
          <a href="/connexion" className="hover:text-pink-400">
            Connexion
          </a>
        </li>
      </ul>
    </nav>
  );
};
