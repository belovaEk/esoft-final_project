import styles from './ProductCart.module.scss'
import React from 'react';
import { useNavigate } from 'react-router-dom'

interface ProductCartProps {
    name: string;
    type: string;
    description?: string;
    price?: number;
}

const ProductCart = React.memo(({ name, type, description, price }: ProductCartProps) => {

    const navigate = useNavigate();
    
    return(
        <article className={styles.cart} onClick={()=> navigate('/catalog/chay')}>
            <div className={styles.cart_inner}>
                <div className={styles.cart_header}>
                    <img src="/ico/heart_lineColor.png" alt=""/>
                    {/* <img className={styles.img_cross} src="/ico/cross_color.png" alt="" /> */}
                </div>
                <div className={styles.cart_content}>
                    <div className={styles.cart_img}>
                        <img src="/img_main/fruit.png" alt="" />
                    </div>
                    <h2>{name}</h2>
                    <p><i>{type}</i></p>
                    <div className={styles.cart_description}>{description}</div>
                    <button className={styles.cart_btn}><span>{price} Р/100унц</span></button>
                </div>
            </div>
        </article>
    )
})

export default ProductCart