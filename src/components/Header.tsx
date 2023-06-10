import { Logo } from '../assets/Logo-icon'
import styles from './Header.module.css'
export function Header() {
  return(
    <header className={styles.header}>
      <Logo />
      <h1>to<span>do</span></h1>
    </header>
  )
}