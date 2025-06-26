"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";

interface AuthContextData {
  isAuthenticated: boolean;
  login: (email: string, senha: string) => Promise<void>;
  register: (
    nome: string,
    nascimento: string,
    email: string,
    senha: string
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const cookies = document.cookie;
      setIsAuthenticated(cookies.includes("token="));
    };
    checkAuth();
  }, []);

  const login = async (email: string, senha: string) => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      setIsAuthenticated(true);

      const data = await response.json();

      const decodedJwt = jwt.decode(data.token);
      document.cookie = `token=${data.token}; Path=/`;
      document.cookie = `user=${JSON.stringify(decodedJwt)}; Path=/`;

      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (
    nome: string,
    nascimento: string,
    email: string,
    senha: string
  ) => {
    try {
      const response = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ nome, email, senha, nascimento }),
      });

      if (!response.ok) {
        throw new Error("Register failed");
      }

      setIsAuthenticated(true);

      const data = await response.json();
      document.cookie = `token=${data.token}; Path=/`;

      router.push("/");
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  };

  const logout = () => {
    document.cookie = "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    setIsAuthenticated(false);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
