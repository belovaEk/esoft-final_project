import styles from '/src/assets/styles/ProductCart.module.scss'


function ProductCart(){
    return(
        <article className={styles.cart}>
            <div className={styles.cart_inner}>
                <div className={styles.cart_header}>
                    <img src="/ico/heart_lineColor.png" alt=""/>
                    {/* <img className={styles.img_cross} src="/ico/cross_color.png" alt="" /> */}
                </div>
                <div className={styles.cart_content}>
                    <div className={styles.cart_img}>
                        <img src="/img_main/fruit.png" alt="" />
                    </div>
                    <h2>Капуэро</h2>
                    <p><i>Фруктовый чай</i></p>
                    <div className={styles.cart_description}>Чай с яркими фруктовыми нотами горяч и пылок, как бразильское боевое искусство к...</div>
                    <button className={styles.cart_btn}><span>{'505'} Р/100гр</span></button>
                </div>
            </div>
        </article>
    )
}

export default ProductCart