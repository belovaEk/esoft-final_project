import styles from '/src/assets/styles/Articles.module.scss'

function About(){
    return(
        <main>
            <div className={styles.container}>
                <h1>О нас</h1>
                <div className={styles.ContactCity_container}>
                    <h3 className={styles.vacancies_title}>О нас — Teatime</h3>
                    <p><i>Чай — это не просто напиток. Это момент покоя, традиция, история в каждой чашке.</i></p>

                    <h3 className={styles.vacancies_title}>Наши истоки</h3>
                    <p>Всё началось в уютном городе Тюмени, где холодными вечерами так приятно согреваться ароматным чаем. Именно здесь, в 2015 году, родилась идея создать Teatime — место, где чай становится настоящим ритуалом. Мы влюбились в разнообразие вкусов, в культуру чаепития и решили делиться этим с другими.</p>

                    <h3 className={styles.vacancies_title}>Наша философия</h3>
                    <p>Мы верим, что чай — это искусство. Поэтому:</p>
                    <ul>
                        <li className={styles.about_item}>Работаем напрямую с плантациями, чтобы сохранить свежесть и качество.</li>
                        <li className={styles.about_item}>Поддерживаем малоизвестных поставщиков, открывая для вас уникальные вкусы.</li>
                        <li className={styles.about_item}>Учим ценить чай — проводим дегустации и мастер-классы.</li>
                    </ul>

                    <h3 className={[styles.vacancies_title, styles.about_title].join(' ')}><i>Teatime — это больше, чем магазин. Это сообщество ценителей настоящего чая.</i></h3>
                    <p>Приходите к нам за вкусом, теплом и новыми открытиями!</p>
                    <p><i>Ваш Teatime.</i></p>
                </div>
            </div>
        </main>
    )
}

export default About