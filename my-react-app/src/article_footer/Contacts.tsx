import styles from '/src/assets/styles/Articles.module.scss'

function Contacts(){
    return(
        <main>
            <div className={styles.container}>
                <h1>Контакты</h1>
                <ContactCity city='Тюмень' 
                            adress='г. Тюмень, ул. Мельникайте, д.42'
                            phone_ofice='+7 (812) 213-22-11'
                            phone_shop='8 (800) 555-28-35'
                            email='info@TeaTime.info'
                />
                <ContactCity city='Казань' 
                            adress='г. Казань, ул. Баумена, 29'
                            phone_ofice='+7 (495) 625-45-47'
                            phone_shop='8 (800) 555-28-35'
                            email='info@TeaTime_Kz.info'
                />

                <div className={styles.ContactCity_container}>
                    <h2>Инренет-магазин</h2>
                    <p>Наш интернет-магазин осуществляет доставку чая на дом и в офис.</p>
                    <div className={styles.ContactCity_item}>
                        <h3>E-mail:</h3>
                        <a href="mailto:info@TeaTime.info"><span>internet_shop@TeaTime.info</span></a>
                    </div>
                    <div className={styles.ContactCity_item}> 
                    <h3>Телефон:</h3>
                    <span>8 800 555 28 35</span>
            </div>
                </div>
            
            </div>
        </main>
    )
}

export default Contacts



interface ContactCityProps {
    city: string,
    adress: string;
    phone_ofice: string;
    phone_shop: string;
    email: string;
}

function ContactCity({city, adress, phone_ofice, phone_shop, email }: ContactCityProps) {
    return(
        <div className={styles.ContactCity_container}>
            <h2>{city}</h2>
            <div className={styles.ContactCity_item}>
                <h3>Фактический и почтовый адрес:</h3>
                <span>{adress}</span>
            </div>
            <div className={styles.ContactCity_item}> 
                <h3>Телефон (офис):</h3>
                <span>{phone_ofice}</span>
            </div>
            <div className={styles.ContactCity_item}>
                <h3>Телефон (интернет-магазин):</h3>
                <span>{phone_shop}</span>
            </div>
            <div className={styles.ContactCity_item}>
                <h3>E-mail:</h3>
                <a href="mailto:info@TeaTime.info"><span>{email}</span></a>
                
            </div>
            <div className={styles.ContactCity_item}>
                <h3>Рабочие дни:</h3>
                <span>понедельник — пятница</span>
            </div>
            <div className={styles.ContactCity_item}>
                <h3>Часы работы:</h3>
                <span>с 10: 00 до 18:45</span>
            </div>
        </div>
    )
}