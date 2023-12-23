import React from "react";
import Logo from "../../assets/Chatdoptlogo.png";
import { useConnection } from "./useConnection";

export function Connection() {
  const {
    isLoginForm,
    setIsLoginForm,
    setEmail,
    setPassword,
    setPasswordConfirm,
    handleRegister,
    handleLogin,
    setUsername,
  } = useConnection();
  return (
    <div className="flex items-center justify-center">
      <div>
        <img src={Logo} alt="logo" className="" />
      </div>
      <div>
        {isLoginForm ? (
          <>
            <h1 className="text-center mb-10 text-xl">Connexion</h1>
            <form className="flex flex-col justify-center">
              <input
                type="email"
                placeholder="Email"
                className="border-pink-400 rounded-md border px-1 mb-4 "
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Mot de passe"
                className="border-pink-400 rounded-md border px-1"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="bg-black font-semibold text-white border border-pink-400 rounded-md py-1 mt-4 transition-all ease-in-out hover:border-black hover:border hover:bg-pink-400 hover:text-black delay-150 hover:translate-y-1"
                onClick={handleLogin}
              >
                Se connecter
              </button>
            </form>
            <span
              className="hover:cursor-pointer hover:text-pink-300"
              onClick={() => setIsLoginForm(false)}
            >
              créer un compte
            </span>
          </>
        ) : (
          <>
            <h1 className="text-center mb-10 text-xl">Inscription</h1>
            <form className="flex flex-col">
              <input
                type="email"
                placeholder="Email"
                className="border-pink-400 rounded-md border px-1 mb-4"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Pseudo"
                className="border-pink-400 rounded-md border px-1 mb-4"
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Mot de passe"
                className="border-pink-400 rounded-md border px-1 mb-4 "
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirmation du mot de passe"
                className="border-pink-400 rounded-md border px-1 mb-4 "
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
              <button
                type="button"
                onClick={handleRegister}
                className="bg-black font-semibold text-white border border-pink-400 rounded-md py-1 mt-4 transition-all ease-in-out hover:border-black hover:border hover:bg-pink-400 hover:text-black delay-150 hover:translate-y-1"
              >
                S'inscrire
              </button>
            </form>
            <span
              className="hover:cursor-pointer hover:text-pink-300"
              onClick={() => setIsLoginForm(true)}
            >
              se connecter
            </span>
          </>
        )}
      </div>
    </div>
  );
}
