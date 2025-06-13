import styles from '/src/assets/styles/Authorization.module.scss'

function Authorization(){
 
    return(
        <div className='main'>
        <div className={styles.container}>
            <h1 className={styles.title}>TeaTime</h1>
            <form action="">
                <label htmlFor="email">Введите почту</label>
                <input type="e-mail" name="" id="email" />

                <label htmlFor="password">Введите пароль</label>
                <input type="password" name="" id="password" />

                <button>Войти</button>
            </form>
        </div>
        </div>
    )

}

export default Authorization