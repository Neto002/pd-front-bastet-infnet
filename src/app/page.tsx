"use client";

import Curso from "@/components/curso";
import { CursosMockup } from "@/lib/mockup";
import type { Curso as CursoType } from "@/lib/mockup";
import { useEffect, useState } from "react";

export default function Page() {
  const [cursos, setCursos] = useState<CursoType[]>([]);

  useEffect(() => {
    const fetchCursos = async () => {
      const response = await fetch("http://localhost:3000/cursos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + (await cookieStore.get("token"))?.value || "",
        },
      });

      const data = await response.json();

      if (response.status === 401) {
        window.location.href = "/login";
      }

      setCursos(data);
    };

    fetchCursos();
  }, []);

  return (
    <main>
      <h2 className="page-title">Cursos</h2>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {cursos.length > 0 &&
          cursos.map((curso: CursoType) => (
            <Curso data={curso} key={curso.id} />
          ))}
        {cursos.length === 0 && (
          <p className="text-center text-gray-500">Não há cursos disponíveis</p>
        )}
      </div>
    </main>
  );
}
