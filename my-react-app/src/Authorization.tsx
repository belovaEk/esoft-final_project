
import styles from '/src/assets/styles/Authorization.module.scss'

import { useNavigate } from 'react-router-dom'

function Authorization(){

    const navigate = useNavigate()
 
    return(
        <div className={styles.main}>
            <div className={styles.background}></div>
        <div className={styles.container}>
            <h1 className={styles.title}>TeaTime</h1>
            <form action="">
                <label htmlFor="email">Введите почту</label>
                <input type="e-mail" name="" id="email" />

                <label htmlFor="password">Введите пароль</label>
                <input type="password" name="" id="password" />

                <button onClick={()=> navigate('/')}>Войти</button>
            </form>
        </div>
        </div>
    )

}

export default Authorization