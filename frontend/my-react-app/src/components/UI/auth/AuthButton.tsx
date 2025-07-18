import styles from './Authorization.module.scss'

type AuthButtonProps = {
    onClick?: (e: React.FormEvent) => void;
}


function AuthButton ({ onClick }: AuthButtonProps) {
    return (
        <button className={styles.authBtn} onClick={onClick}>Войти c Google</button>
    )
}

export default AuthButton