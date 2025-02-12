'use client'
import React, { useState, useEffect } from "react";
import Header from '@/components/header';
import styles from "./consulta.module.css";

const urlPadrao = "https://api-clinica-2a.onrender.com/consultas";

export default function Medicos() {
    const [medicos, setMedicos] = useState([]);
    const [medicosPorNome, setMedicosPorNome] = useState([]);

    async function apresetarTodosMedicos() {
        try {
            const response = await fetch(urlPadrao);
            if (!response.ok) {
                throw new Error("Erro ao buscar dados:" + response.statusText);
            }
            const data = await response.json();
            setMedicos(data);
        } catch (error) {
            console.log('Ocorreu algum erro:' + error);
        }
    }

    async function pesquisarMedicoPorNome(nome) {
        try {
            const response = await fetch(`${urlPadrao}?nome=${nome}`);
            if (!response.ok) {
                throw new Error("Erro ao buscar dados:" + response.statusText);
            }
            const data = await response.json();
            setMedicosPorNome(data);
        } catch (error) {
            console.log('Ocorreu algum erro:' + error);
        }
    }

    useEffect(() => {
        apresetarTodosMedicos();
    }, []);

    return (
        <div className={styles.body}>
            <Header />
            <div className={styles.fundo}>
                <div className={styles.titulo2}>
                    <h1 className={styles.titulo}>Lista de Consultas</h1>
                </div>

                {/* Campo de pesquisa */}
                <div className={styles.input}>
                    <input
                        type="text"
                        placeholder="Buscar por Médico"
                        onChange={(e) => pesquisarMedicoPorNome(e.target.value)}
                    />
                </div>

                {/* Lista de médicos filtrados */}
                {medicosPorNome.length > 0 && (
                    <ul className={styles.lista}>
                        {medicosPorNome.map((medico) => (
                            <li key={medico.id}>{medico.nome}</li>
                        ))}
                    </ul>
                )}

                {/* Tabela de médicos */}
                <div className={styles.tabela}>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Médicos</th>
                                <th>Especialidade</th>
                                <th>Pacientes</th>
                                <th>Especialidade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {medicos.map((medico) => (
                                <tr key={medico.id}>
                                    <td>{medico.id}</td>
                                    <td>{medico.medico}</td>
                                    <td>{medico.especialidade}</td>
                                    <td>{medico.paciente}</td>
                                    <td>{medico.tipo}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
