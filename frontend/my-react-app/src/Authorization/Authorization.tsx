
import styles from './Authorization.module.scss'

function Authorization(){

    const loginGoogle = (e: React.FormEvent) => {
        e.preventDefault();
        window.location.href = 'http://localhost:8080/auth/google'
    }

 
    return(
        <div className={styles.main}>
            <div className={styles.background}></div>
        <div className={styles.container}>
            <h1 className={styles.title}>TeaTime</h1>
            <form action="">
                <button onClick={(e) => loginGoogle(e)}>Войти c Google</button>
            </form>
        </div>
        </div>
    )

}

export default Authorization