

import styles from './ProductPage.module.scss'

import AuthorizationModal from '../../components/UI/auth/AuthModal';
import { useProductPage } from './hooks/useProductPage';


function ProductPage(){

    const {
        tea,
        isInCart,
        isFavourite,
        authStatus,
        authModal,
        changeFavourite,
        setAuthModal,
        setIsInCart,
        postInCart,
        deleteInCart
    } = useProductPage()


    return (
        <main>
             <div className={styles.container}>
                <h1>{tea?.name || "Загрузка..."}</h1>

                <div className={styles.main_content}>
                    <div className={styles.tea_img}>
                        <img src={`/tea/${tea?.img_name}.png`} alt="" />
                    </div>
                    <div className={styles.tea_description}>
                        <div className={styles.tea_text}>
                            {tea?.description}
                        </div>
                        <div className={styles.tea_composition}>
                            <h2>Состав:</h2>
                            <p>{tea?.ingredients?.join(', ')}</p>
                        </div>
                        <div className={styles.tea_about}>
                            <div className={styles.tea_about__item}>
                                <h3>Страна</h3>
                                <span>{tea?.country_name}</span>
                            </div>
                            <div className={styles.tea_about__item}>
                                <h3>Вид</h3>
                                <span>{tea?.type_name}</span>
                            </div>
                             <div className={styles.tea_about__item}>
                                <h3>Вкус</h3>
                                <span>{tea?.tastes?.join(', ')}</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.tea_price__block}>
                        <button className={styles.like_btn}>
                            <img className={styles.img_cross} 
                            src={isFavourite ? '/ico/favourite.png' : "/ico/heart_lineColor.png"} alt=""
                            onClick={(e)=> {
                                if (authStatus) {
                                    if (tea) {changeFavourite(tea?.id, e) }
                                } else {
                                    setAuthModal(true)
                                } 
                                }}/>
                        </button>
                        <div>
                            <span className={styles.tea_price}>{tea?.price}</span>
                            <p>~ 14 чашек</p>
                        </div>
                        
                        <div className={styles.price_delivery}>
                            <p>Доставим сегодня</p>
                        </div>
                        {!isInCart ? (
                            <button className={styles.cart_btn}
                            onClick={() => {
                                if (authStatus) {
                                    setIsInCart(true)
                                    if (tea) {
                                        postInCart(tea.id)
                                    }
                                } else {
                                    setAuthModal(true)
                                }
                                
                            }}>
                                <span>в корзину</span>
                            </button>
                        ) :
                        (
                            <div className={`${styles.cart_btn} ${styles.inCart_btn}`}
                            onClick={()=>{
                                setIsInCart(false);
                                if (tea) {
                                    deleteInCart(tea.id)
                                }
                            }}>В корзине!</div>
                        )
                        }
                    </div>
                </div>
             </div>

            {authModal && (
                <AuthorizationModal
                closeFun={()=> setAuthModal(false)}/>
            )}
        </main>

        
    )
}

export default ProductPage