import styles from '../styles/Header.module.css'
import todolistLogo from '../assets/todolist-logo.svg'
export function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <img src={todolistLogo} alt="Logotipo do Ignite" />
            </div>
      </header>
    )
}