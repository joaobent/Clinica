"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/header";
import styles from "./paciente.module.css";

const urlPadrao = "https://api-clinica-2a.onrender.com/pacientes";

export default function Pacientes() {
    const [pacientes, setPacientes] = useState([]);
    const [pesquisa, setPesquisa] = useState("");

    async function carregarPacientes() {
        try {
            const response = await fetch(urlPadrao);
            if (!response.ok) {
                throw new Error("Erro ao buscar dados: " + response.statusText);
            }
            const data = await response.json();
            setPacientes(data);
        } catch (error) {
            console.log("Ocorreu um erro: " + error);
        }
    }

    useEffect(() => {
        carregarPacientes();
    }, []);

    // Filtrando pacientes no front-end
    const pacientesFiltrados = pacientes.filter((paciente) =>
        paciente.nome.toLowerCase().includes(pesquisa.toLowerCase())
    );

    return (
        <div className={styles.body}>
            <Header />
            <div className={styles.fundo}>
                <div className={styles.titulo2}>
                    <h1 className={styles.titulo}>Lista de Pacientes</h1>
                </div>

                {/* Campo de pesquisa */}
                <div className={styles.input}>
                    <input
                        type="text"
                        placeholder="Pesquisar paciente por nome..."
                        value={pesquisa}
                        onChange={(e) => setPesquisa(e.target.value)}
                    />
                </div>

                {/* Tabela de pacientes filtrados */}
                <div className={styles.tabela}>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Telefone</th>
                                <th>Email</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {pacientesFiltrados.map((paciente) => (
                                <tr key={paciente.id}>
                                    <td>{paciente.id}</td>
                                    <td>{paciente.nome}</td>
                                    <td>{paciente.telefone}</td>
                                    <td>{paciente.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
