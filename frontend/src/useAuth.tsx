import React, {
  createContext,
  useState,
  useContext,
  PropsWithChildren,
  useEffect,
} from "react";
import { Credentials } from "./Types";

export const useAuthProvider = () => {
  const [user, setUser] = useState<Credentials | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData: Credentials) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const clear = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return {
    user,
    login,
    logout,
    clear,
  };
};

const AuthUserContext = createContext<{
  user: Credentials | null;
  login: (userData: Credentials) => void;
  logout: () => void;
  clear: () => void;
}>({
  user: null,
  login: () => {},
  logout: () => {},
  clear: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const auth = useAuthProvider();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      auth.login(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
  );
};

export const useAuth = () => useContext(AuthUserContext);
