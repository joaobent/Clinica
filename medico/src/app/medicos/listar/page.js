'use client'
import React, { useState, useEffect } from "react";
import Header from '@/components/header';
import styles from "./medicos.module.css";

const urlPadrao = "http://localhost:9000/medicos";

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
                    <h1 className={styles.titulo}>Lista de Médicos</h1>
                </div>

                {/* Campo de pesquisa */}
                <div className={styles.input}>
                    <input
                        type="text"
                        placeholder="Pesquisar médico por nome..."
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
                                <th>Nome</th>
                                <th>Telefone</th>
                                <th>Email</th>
                                <th>Especialidade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {medicos.map((medico) => (
                                <tr key={medico.id}>
                                    <td>{medico.id}</td>
                                    <td>{medico.nome}</td>
                                    <td>{medico.telefone}</td>
                                    <td>{medico.email}</td>
                                    <td>{medico.especialidade}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
