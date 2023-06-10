import { Checkbox } from "@mui/material";
import { blue, deepPurple } from "@mui/material/colors";
import { Trash2 } from "lucide-react";
import styles from "./List.module.css";

interface ListProps {
  uuid: string;
  item: string;
  onDeleteItem: (itemToDelete: string) => void;
}

export function List({ uuid, item, onDeleteItem }: ListProps) {
  function handleRemoveItem() {
    onDeleteItem(uuid);
  }
  return (
    <>
      <div key={uuid} className={styles.card}>
        <Checkbox
          sx={{
            color: blue[400],
            "&.Mui-checked": {
              color: deepPurple[400],
            },
          }}
          className={styles.checkbox}
        />
        <p>{item}</p>
        <button className={styles.buttonRemove} onClick={handleRemoveItem}>
          <Trash2 size={20} />
        </button>
      </div>
      ;
    </>
  );
}
