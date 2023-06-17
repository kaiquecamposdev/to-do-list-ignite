import { Clipboard } from "../assets/Clipboard-icon";
import styles from "./EmptyList.module.css";

interface EmptyListProps {
  isLight: boolean;
}

export function EmptyList(isLight: EmptyListProps) {
  console.log(isLight)
  return (
    <div
      className={isLight ? `${styles.card} ${styles.cardLight}` : styles.card}
    >
      <Clipboard />
      <p>
        <strong>Você ainda não tem tarefas cadastradas</strong>
        <br />
        <span>Crie tarefas e organize seus itens a fazer</span>
      </p>
    </div>
  );
}
