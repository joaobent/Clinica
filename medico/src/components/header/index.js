'use client';
import Link from "next/link";
import { useState } from "react";
import styles from "./header.module.css";

export default function Header() {
    const [isMedicoOpen, setIsMedicoOpen] = useState(false);
    const [isPacienteOpen, setIsPacienteOpen] = useState(false);

    const handleMedicoMouseEnter = () => setIsMedicoOpen(true);
    const handleMedicoMouseLeave = () => setIsMedicoOpen(false);

    const handlePacienteMouseEnter = () => setIsPacienteOpen(true);
    const handlePacienteMouseLeave = () => setIsPacienteOpen(false);

    return (
        <header className={styles.header}>
            <img className={styles.logo} src="/img/logo.png" alt="Clínica Vitalidade" />
            <ul className={styles.lista}>
                <li className={styles.home}><Link href="/">Home</Link></li>
                <li
                    className={styles.medico}
                    onMouseEnter={handleMedicoMouseEnter}
                    onMouseLeave={handleMedicoMouseLeave}
                >
                    <Link href="/medico">Médicos</Link>
                    {isMedicoOpen && (
                        <ul className={styles.dropdown}>
                            <li><Link href="/medicos/listar">Listar Registros</Link></li>
                            <li><Link href="/medico/buscar">Buscar</Link></li>
                            <li><Link href="/medico/adicionar">Adicionar Novo</Link></li>
                            <li><Link href="/medico/editar">Editar</Link></li>
                            <li><Link href="/medico/excluir">Excluir</Link></li>
                        </ul>
                    )}
                </li>
                <li
                    className={styles.paciente}
                    onMouseEnter={handlePacienteMouseEnter}
                    onMouseLeave={handlePacienteMouseLeave}
                >
                    <Link href="/paciente">Paciente</Link>
                    {isPacienteOpen && (
                        <ul className={styles.dropdown}>
                            <li><Link href="/paciente/listar">Listar Registros</Link></li>
                            <li><Link href="/paciente/buscar">Buscar</Link></li>
                            <li><Link href="/paciente/adicionar">Adicionar Novo</Link></li>
                            <li><Link href="/paciente/editar">Editar</Link></li>
                            <li><Link href="/paciente/excluir">Excluir</Link></li>
                        </ul>
                    )}
                </li>
                <li className={styles.consulta}><Link href="/consulta">Consulta</Link></li>
            </ul>
        </header>
    );
}
