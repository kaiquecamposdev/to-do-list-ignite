import { Checkbox } from "@mui/material";
import { Trash2 } from "lucide-react";
import styles from "./List.module.css";
import { ItemsProps } from "./App";
import { ChangeEvent, useState } from "react";

interface ListProps extends ItemsProps {
  isLight: boolean;
  onDeleteItem: (itemToDelete: string) => void;
  onCheckItem: (uuid: string, itemToCheck: boolean) => void;
}

export function List({ uuid, item, completed, isLight, onDeleteItem, onCheckItem}: ListProps) {
  const [isChecked, setIsChecked] = useState(false)
  function handleRemoveItem() {
    onDeleteItem(uuid);
  }
  function handleCheckboxChange(event: ChangeEvent<HTMLInputElement>) {
    setIsChecked(event.target.checked)
    handleCheckedItem()
  }
  function handleCheckedItem() {
    onCheckItem(uuid, !isChecked)
  }
  return (
    <>
      <div key={uuid} className={isLight ? `${styles.card} ${styles.cardLight}` : styles.card}>
        <Checkbox
          sx={{
            color: "var(--blue)",
            "&.Mui-checked": {
              color: "var(--blue)",
            },
          }}
          checked={isChecked}
          onChange={handleCheckboxChange}
          className={isLight ? `${styles.checkbox} light` : styles.checkbox}
        />
        <p className={completed ? styles.checked : ''}>{item}</p>
        <button className={isLight ? `${styles.buttonRemove} ${styles.buttonRemoveLight}` : styles.buttonRemove} onClick={handleRemoveItem}>
          <Trash2 size={20} />
        </button>
      </div>
    </>
  );
} 
