import React, { createContext, useContext, useEffect, useState } from "react";
import api from "./api";
import cookie from "js-cookie";
import translateMessage from "../constants/messages";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const auth = useAuthProvider();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

function useAuthProvider() {
  const [user, setUser] = useState(null);

  const handleUser = (user) => {
    if (user) {
      // si tengo sesión activa
      setUser(user);
      cookie.set("auth", true, {
        expires: 1, // dia
      });

      return user;
    } else {
      // no tengo sesión activa
      setUser(false);
      cookie.remove("auth");
      return false;
    }
  };

  async function register(data) {
    try {
      const response = await api.post("/register", data);
      console.log("response", response);
      handleUser(response.data);
      return response;
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        //alert(error.response.data.message);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return Promise.reject(error.response);
        // return error.response;
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  }

  async function login(data) {
    try {
      const response = await api.post("/login", data);
      handleUser(response.data.user);
      return response;
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        //alert(translateMessage(error.response.data.message));
        //alert(error.response.data.message);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return error.response;
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  }

  async function logout() {
    try {
      const response = await api.post("/logout");
      handleUser(false);
      return response;
    } catch (error) {}
  }

  const sendPasswordResetEmail = async (email) => {
    // try {
    await api.post("/forgot-password", { email });
    // } catch (error) {
    //   if (error.response) {
    //     // The request was made and the server responded with a status code
    //     // that falls out of the range of 2xx
    //     console.log(error.response.data);
    //     console.log(error.response.status);
    //     console.log(error.response.headers);
    //     return error.response;
    //   } else if (error.request) {
    //     // The request was made but no response was received
    //     // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //     // http.ClientRequest in node.js
    //     console.log(error.request);
    //   } else {
    //     // Something happened in setting up the request that triggered an Error
    //     console.log("Error", error.message);
    //   }
    //   console.log(error.config);
    // }
  };

  const confirmPasswordReset = async (
    email,
    password,
    password_confirmation,
    token
  ) => {
    // try {
    await api.post("/reset-password", {
      email,
      password,
      password_confirmation,
      token,
    });
    // } catch (error) {
    //   if (error.response) {
    //     // The request was made and the server responded with a status code
    //     // that falls out of the range of 2xx
    //     console.log(error.response.data);
    //     console.log(error.response.status);
    //     console.log(error.response.headers);
    //     return error.response;
    //   } else if (error.request) {
    //     // The request was made but no response was received
    //     // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //     // http.ClientRequest in node.js
    //     console.log(error.request);
    //   } else {
    //     // Something happened in setting up the request that triggered an Error
    //     console.log("Error", error.message);
    //   }
    //   console.log(error.config);
    // }
  };

  async function getAuthenticatedUser() {
    try {
      const response = await api.get("/user");
      console.log("Usuario activo", response);
      handleUser(response.data);
      return response;
    } catch (error) {
      handleUser(false);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        //alert(error.response.data.message);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return error.response;
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  }

  useEffect(() => {
    console.log("RENDER AUTH", user);
    try {
      getAuthenticatedUser();
    } catch (error) {
      console.log("NO USER");
    }
  }, []);

  return {
    user,
    register,
    login,
    logout,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
}
