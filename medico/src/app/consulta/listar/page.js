"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/header";
import styles from "./consulta.module.css";

const urlConsultas = "https://api-clinica-2a.onrender.com/consultas";
const urlPacientes = "https://api-clinica-2a.onrender.com/pacientes";
const urlMedicos = "https://api-clinica-2a.onrender.com/medicos";

export default function Consultas() {
    const [dados, setDados] = useState([]);
    const [pesquisa, setPesquisa] = useState("");
    const [tipoDados, setTipoDados] = useState("consultas"); // Inicializando com "consultas"

    // Função para carregar os dados de acordo com o tipo
    async function carregarDados() {
        let url;
        if (tipoDados === "consultas") {
            url = urlConsultas;
        } else if (tipoDados === "medicos") {
            url = urlMedicos;
        } else {
            url = urlPacientes;
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Erro ao buscar dados: " + response.statusText);
            }
            const data = await response.json();
            setDados(data);
        } catch (error) {
            console.log("Ocorreu um erro: " + error);
        }
    }

    useEffect(() => {
        carregarDados();
    }, [tipoDados]);

    // Função para filtrar os dados
    const dadosFiltrados = dados.filter((item) =>
        item.nome ? item.nome.toLowerCase().includes(pesquisa.toLowerCase()) : true
    );

    return (
        <div className={styles.body}>
            <Header />
            <div className={styles.fundo}>
                <div className={styles.titulo2}>
                    <h1 className={styles.titulo}>Lista de {tipoDados.charAt(0).toUpperCase() + tipoDados.slice(1)}</h1>
                </div>

                {/* Botões para filtrar os dados */}
                <div className={styles.botoes}>
                    <button onClick={() => setTipoDados("pacientes")}>Pacientes</button>
                    <button onClick={() => setTipoDados("medicos")}>Médicos</button>
                    <button onClick={() => setTipoDados("consultas")}>Consultas</button>
                </div>

                {/* Campo de pesquisa */}
                <div className={styles.input}>
                    <input
                        type="text"
                        placeholder={`Pesquisar ${tipoDados}...`}
                        value={pesquisa}
                        onChange={(e) => setPesquisa(e.target.value)}
                    />
                </div>

                {/* Tabela de dados filtrados */}
                <div className={styles.tabela}>
                    <table>
                        <thead>
                            <tr>
                                {tipoDados === "pacientes" && (
                                    <>
                                        <th>ID</th>
                                        <th>Nome</th>
                                    </>
                                )}
                                {tipoDados === "medicos" && (
                                    <>
                                        <th>ID</th>
                                        <th>Nome</th>
                                        <th>Especialidade</th>
                                    </>
                                )}
                                {tipoDados === "consultas" && (
                                    <>
                                        <th>ID</th>
                                        <th>Médico</th>
                                        <th>Especialidade</th>
                                        <th>Paciente</th>
                                        <th>Tipo</th>
                                    </>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {dadosFiltrados.map((item) => (
                                <tr key={item.id}>
                                    {tipoDados === "pacientes" && (
                                        <>
                                            <td>{item.id}</td>
                                            <td>{item.nome}</td>
                                        </>
                                    )}
                                    {tipoDados === "medicos" && (
                                        <>
                                            <td>{item.id}</td>
                                            <td>{item.nome}</td>
                                            <td>{item.especialidade}</td>
                                        </>
                                    )}
                                    {tipoDados === "consultas" && (
                                        <>
                                            <td>{item.id}</td>
                                            <td>{item.medico}</td>
                                            <td>{item.especialidade}</td>
                                            <td>{item.paciente}</td>
                                            <td>{item.tipo}</td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
