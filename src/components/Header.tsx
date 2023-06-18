import { Logo } from "../assets/Logo-icon";
import styles from "./Header.module.css";
import { Switch } from "@mui/material";

interface HeaderProps {
  isLight: boolean;
  onSetColorScheme: () => void;
}

export function Header({isLight, onSetColorScheme}: HeaderProps) {
  function handleChangeColorScheme() {
    onSetColorScheme();
  }
  return (
    <header className={isLight ? `${styles.header} ${styles.headerLight}` : styles.header}>
      <div className={styles.switch}>
        <Switch
          checked={isLight}
          onChange={handleChangeColorScheme}
          inputProps={{ "aria-label": "controlled" }}
          sx={{
            "&.Mui-checked": {
              color: "var(--blue)",
            },
          }}
        />
      </div>
      <Logo />
      <h1>
        to<span>do</span>
      </h1>
    </header>
  );
}
