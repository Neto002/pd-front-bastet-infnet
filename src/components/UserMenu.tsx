"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function UserMenu() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const userCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("user="));

    if (userCookie) {
      try {
        const userData = JSON.parse(userCookie.split("=")[1]);
        setUserId(userData.id || userData.userId);
      } catch (error) {
        console.error("Erro ao parsear cookie do usuário:", error);
      }
    }
  }, []);

  if (!userId) {
    return null;
  }

  return (
    <Link className="text-indigo-600" href={`/usuario/${userId}`}>
      Meus cursos
    </Link>
  );
}
