

import styles from './ProductPage.module.scss'

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchGet } from '../subFuncs';
import { postFavourite, deleteInFavourite } from '../Favourites/FavFuncs';
import { postInCart, deleteInCart } from '../Cart/cartFuncs';

import type { Tea } from '../interface/teaItem';


import { checkAuthStatus } from '../Authorization/Authorization';
import AuthorizationModal from '../Authorization/Authorization';

function ProductPage(){
    const { id } = useParams();

    const [tea, setTea] = useState<Tea | null>(null);
    const [isFavourite, setIsFavourite ] = useState(false);
    const [isInCart, setIsInCart] = useState(tea?.iscart);


    const [authModal, setAuthModal] = useState(false);
    const [authStatus, setAuthStatus] = useState(false);

   async function getTea(id: number) {

    const clientStatus = await checkAuthStatus()
    setAuthStatus(clientStatus)

    try {
        const teaData = await fetchGet(`teas/${id}`);
        setTea(teaData);
        setIsFavourite(teaData.isfav);
        setIsInCart(teaData.iscart);
    } catch (error) {
        console.error("Ошибка при загрузке чая:", error);
    }
    }

    const changeFavourite = async( teaId: number, e: React.MouseEvent) =>{
         e.stopPropagation()
            if (isFavourite) {
                setIsFavourite(false);
                deleteInFavourite( teaId)
            } else{
                setIsFavourite(true);
                return await postFavourite(teaId)
        }
    }


     useEffect(() => {
    if (id) {
      getTea(Number(id));
    }
    }, [id]);

    return (
        <main>
             <div className={styles.container}>
                {/* <button className={styles.back_btn}>назад</button> */}
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