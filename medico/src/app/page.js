import styles from './page.module.css'
import Image from 'next/image'
import Header from '@/components/header';

export default function Home() {

  return (
    <div className={styles.div}>
      <Header />
      <h1 className={styles.titulo}>
        Bem-vindo à Clínica Vitality
      </h1>
      <p className={styles.para}>Na Clínica Vitality, nosso compromisso é oferecer um atendimento de qualidade para você e sua família.<br/> Contamos com uma equipe de profissionais altamente qualificados e estrutura moderna para garantir diagnósticos precisos e tratamentos eficazes.<br/> </p>
      <p className={styles.para2}>Agende sua consulta e tenha a tranquilidade de estar em boas mãos. Sua saúde é a nossa prioridade!</p>
    </div>
  );
}