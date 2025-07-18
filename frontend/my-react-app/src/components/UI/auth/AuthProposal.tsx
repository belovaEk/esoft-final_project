import styles from './Authorization.module.scss'
import AuthButton from "./AuthButton";


function AuthProposal() {

    const loginGoogle = (e: React.FormEvent) => {
        e.preventDefault();
        window.location.href = `http://localhost:8080/auth/google`;
    }
    return (
        <div className={styles.noAuthConteiner}>
            <p className={styles.noAuthText}>Скорее вступайте в нашу чайную семью! </p>
            <AuthButton onClick={loginGoogle}/>
        </div>
    )
}

export default AuthProposal