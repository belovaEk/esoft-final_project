
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


function AuthorizationModal({closeFun} : AuthorizationModalProps){
    

    const loginGoogle = (e: React.FormEvent) => {
        e.preventDefault();
        window.location.href = `http://localhost:8080/auth/google`;
    }
     
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
                                    <AuthButton onClick={loginGoogle}/>
                                </form>
                            </div>
                        </div>
                    </>
    )
}

interface AuthButtonProps {
    onClick?: (e: React.FormEvent) => void;
}

export function AuthButton ({ onClick }: AuthButtonProps) {
    return (
        <button className={styles.authBtn} onClick={onClick}>Войти c Google</button>
    )
}

export function AuthProposal() {

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
    

export default AuthorizationModal