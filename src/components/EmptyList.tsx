import { Clipboard } from "../assets/Clipboard-icon";
import { ClipboardLight } from "../assets/ClipboardLight-icon";
import styles from "./EmptyList.module.css";

interface EmptyListProps {
  isLight: boolean;
}

export function EmptyList(isLight: EmptyListProps) {
  return (
    <div
      className={isLight ? `${styles.card} ${styles.cardLight}` : styles.card}
    >
      {
      <Clipboard />
      }
      <p><strong>Você ainda não tem tarefas cadastradas</strong></p>
      <p>Crie tarefas e organize seus itens a fazer</p>
    </div>
  );
}
