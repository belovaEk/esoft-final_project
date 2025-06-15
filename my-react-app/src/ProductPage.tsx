import styles from '/src/assets/styles/ProductPage.module.scss'

function ProductPage(){
    return (
        <main>
             <div className={styles.container}>
                {/* <button className={styles.back_btn}>назад</button> */}
                <h1>Капуэро</h1>

                <div className={styles.main_content}>
                    <div className={styles.tea_img}>
                        <img src="/tea/kapuaro.png" alt="" />
                    </div>
                    <div className={styles.tea_description}>
                        <div className={styles.tea_text}>
                            Чай с яркими фруктовыми нотами горяч и пылок, как бразильское боевое искусство капоэйра.
                        </div>
                        <div className={styles.tea_composition}>
                            <h2>Состав:</h2>
                            <p>яблоко, шиповник, гибискус, сафлор, ананас, киви, клубника</p>
                        </div>
                        <div className={styles.tea_about}>
                            <div className={styles.tea_about__item}>
                                <h3>Страна</h3>
                                <span>Россия</span>
                            </div>
                            <div className={styles.tea_about__item}>
                                <h3>Вид</h3>
                                <span>Фруктовый чай</span>
                            </div>
                             <div className={styles.tea_about__item}>
                                <h3>Вкус</h3>
                                <span>Тропический</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.tea_price__block}>
                        <button className={styles.like_btn}></button>
                        <div>
                            <span className={styles.tea_price}>535</span>
                            <p>~ 14 чашек</p>
                        </div>
                        
                        <div className={styles.price_delivery}>
                            <p>Доставим сегодня</p>
                        </div>
                        <button className={styles.cart_btn}><span>в корзину</span></button>
                    </div>
                </div>
             </div>
        </main>
    )
}

export default ProductPage