import styles from './Authorization.module.scss'

import AuthButton from './AuthButton';

type AuthorizationModalProps = {
    closeFun: () => void;
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

export default AuthorizationModal
