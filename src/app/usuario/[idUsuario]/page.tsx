"use client";
import Curso from "@/components/curso";
import { MeusCursos } from "@/lib/methods";
import type { Curso as CursoType } from "@/lib/mockup";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { idUsuario: string } }) {
  const [cursos, setCursos] = useState<CursoType[]>([]);

  useEffect(() => {
    MeusCursos({ idUsuario: parseInt(params.idUsuario) }).then((cursos) =>
      setCursos(cursos)
    );
  }, [params.idUsuario]);

  return (
    <main>
      <h2 className="page-title">Meus cursos</h2>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {cursos.map((curso: CursoType) => (
          <Curso data={curso} key={curso.id} />
        ))}
      </div>
    </main>
  );
}
