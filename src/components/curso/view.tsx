import type { Curso as CursoType } from "@/lib/mockup";
import Image from "next/image";

export default function CursoView({ data }: { data: CursoType }) {
  const handleCancel = async () => {
    const response = await fetch("http://localhost:3000/cursos/" + data.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + (await cookieStore.get("token"))?.value || "",
      },
    });

    if (response.ok) {
      alert("Inscrição cancelada");
      window.location.reload();
    } else {
      const data = await response.json();
      alert(data.message);
    }
  };

  const handleSubscribe = async () => {
    const response = await fetch("http://localhost:3000/cursos/" + data.id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + (await cookieStore.get("token"))?.value || "",
      },
    });

    if (response.ok) {
      alert("Inscrição realizada");
      window.location.reload();
    } else {
      const data = await response.json();
      alert(data.message);
    }
  };

  return (
    <div className="border flex-1 flex flex-col">
      <figure className="relative aspect-video">
        <Image src={data.capa} alt={data.nome} fill />
        {data.inscrito && (
          <figcaption className="text-sm p-4 bg-slate-200 absolute m-4 shadow-xl border-slate-400 border rounded-xl">
            Você já se inscreveu nesse curso
          </figcaption>
        )}
      </figure>
      <div className="p-6 flex flex-col gap-2 flex-1">
        <h3 className="text-2xl">{data.nome}</h3>
        <p>{data.descricao}</p>
        <div className="flex flex-row flex-wrap gap-1">
          <span className="text-xs py-1 px-2 leading-tight bg-slate-200 rounded-2xl">
            {data.inscricoes} inscritos
          </span>
          <span className="text-xs py-1 px-2 leading-tight bg-slate-200 rounded-2xl">
            Inicia em {data.inicio}
          </span>
        </div>
      </div>
      {data.inscrito ? (
        data.inscricao_cancelada ? (
          <p className="bg-red-500 p-4 text-center">Inscrição cancelada</p>
        ) : (
          <button
            onClick={handleCancel}
            className="text-center p-4 bg-slate-300 hover:bg-slate-400"
          >
            Cancelar inscrição
          </button>
        )
      ) : (
        <button
          onClick={handleSubscribe}
          className="text-center p-4 bg-indigo-500 hover:bg-indigo-600 text-white"
        >
          Fazer inscrição
        </button>
      )}
    </div>
  );
}
