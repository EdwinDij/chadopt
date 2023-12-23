import { useState } from "react"
import { Credentials } from "../../Types"
import { useNavigate } from "react-router-dom";

export const useConnection = () => {
  const [isLoginForm, setIsLoginForm] = useState<Boolean>(false)
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordConfirm, setPasswordConfirm] = useState<string>("")
  const [username, setUsername] = useState<string>("")
  const navigate = useNavigate()
  const checkPassword = () => {
    if (password !== passwordConfirm) {
      return false
    } else {
      return true
    }
  }

  const checkInputRegister = () => {
    if (email === "" || password === "" || username === "") {
      return false
    } else {
      return true
    }
  }

  const checkInputLogin = () => {
    if (email === "" || password === "") {
      return false
    } else {
      return true
    }
  }


  const handleRegister = async (e: { preventDefault: () => void }) => {

    const isSmaePassword = checkPassword()
    const isInput = checkInputRegister()
    if (!isInput) {
      console.log("Veuillez remplir tous les champs")
      return
    }

    if (!isSmaePassword) {
      console.log("Les mots de passe ne sont pas identiques")
      return
    }

    try {
      const res = await fetch("http://localhost:3000/auth/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email, password: password, username: username })
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      console.log(data);
      if (data.creadentials) {
        handleLogin(e)
      }

    } catch (error) {
      console.error("Fetch error:", error);
    }
  }



  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const isInput = checkInputLogin()

    if (!isInput) {
      console.log("Veuillez remplir tous les champs")
      return
    }

    try {
      const response = await fetch("http://localhost:3000/auth/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email, password: password })
      })
      const data = await response.json()
      console.log(data)
      localStorage.setItem("token", data.token)
      localStorage.setItem("userId", data.userId)
      localStorage.setItem("username", data.username)
      navigate("/")

    }
    catch (err) {
      console.log(err)
    }

  }



  return {
    isLoginForm,
    setIsLoginForm,
    email,
    setEmail,
    password,
    setPassword,
    passwordConfirm,
    setPasswordConfirm,
    username,
    setUsername,
    handleRegister,
    handleLogin
  }
}