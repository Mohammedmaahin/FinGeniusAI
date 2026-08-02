import { createContext, useContext, useEffect, useState } from "react";
import * as authApi from "../api/auth.api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadUser = async () => {

      try {

        const { data } = await authApi.getProfile();

        setUser(data.user);

      } catch {

        localStorage.removeItem("token");

      }

      setLoading(false);

    };

    if (localStorage.getItem("token")) {

      loadUser();

    } else {

      setLoading(false);

    }

  }, []);

  const login = (token, user) => {

    localStorage.setItem("token", token);

    setUser(user);

  };

  const logout = () => {

    localStorage.removeItem("token");

    setUser(null);

  };

  return (

    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>

  );

};

export const useAuth = () => useContext(AuthContext);