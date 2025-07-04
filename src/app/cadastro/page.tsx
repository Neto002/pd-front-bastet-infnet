"use client";

import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function Page() {
  const { register } = useAuth();
  const [nome, setNome] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formattedDate = new Date(nascimento).toLocaleDateString("pt-BR");
    await register(nome, formattedDate, email, senha);
  };

  return (
    <main>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h2 className="page-title">Cadastro</h2>
        <p>
          Eu já tenho cadastro, quero <Link href="/login">fazer login.</Link>
        </p>
        <div className="max-w-96 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="nome">Nome</label>
            <input
              type="nome"
              required
              name="nome"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="border h-10 rounded-xl focus:outline-none focus:border-indigo-300 px-4 py-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="nascimento">Data de nascimento</label>
            <input
              type="date"
              required
              name="nascimento"
              id="nascimento"
              value={nascimento}
              onChange={(e) => setNascimento(e.target.value)}
              className="border h-10 rounded-xl focus:outline-none focus:border-indigo-300 px-4 py-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              required
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border h-10 rounded-xl focus:outline-none focus:border-indigo-300 px-4 py-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              required
              name="senha"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="border h-10 rounded-xl focus:outline-none focus:border-indigo-300 px-4 py-2"
            />
          </div>
        </div>
        <div className="flex flex-row justify-between items-end">
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </main>
  );
}
