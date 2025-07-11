
import styles from './Authorization.module.scss'
import { fetchGet } from '../subFuncs';


interface AuthorizationModalProps {
    closeFun: () => void;
}


export const checkAuthStatus = async() => {
    const res = await fetchGet('auth/status')
    return res.isAuthenticated
}

export const logout = async () => {
    await fetchGet('auth/logout')
}

const loginGoogle = (e: React.FormEvent) => {
        e.preventDefault();
        window.location.href = 'http://localhost:8080/auth/google'
    }

function AuthorizationModal({closeFun} : AuthorizationModalProps){
    
     
    return (
        <>
            <div 
            className={styles.overlay}
            onClick={closeFun}
                        ></div>
                        <div className={styles.modal}>
                            <button 
                                className={styles.btn_exit}
                                onClick={closeFun}
                            ></button>
                            <div className={styles.modal_container}>
                                <h1 className={styles.title}>TeaTime</h1>
                                <form action="">
                                    <AuthButton/>
                                </form>
                            </div>
                        </div>
                    </>
    )
}


export function AuthButton () {
    return (
        <button className={styles.authBtn} onClick={(e) => loginGoogle(e)}>Войти c Google</button>
    )
}

export function AuthProposal() {
    return (
        <div className={styles.noAuthConteiner}>
            <p className={styles.noAuthText}>Скорее вступайте в нашу чайную семью! </p>
            <AuthButton />
        </div>
    )
}
    

export default AuthorizationModal