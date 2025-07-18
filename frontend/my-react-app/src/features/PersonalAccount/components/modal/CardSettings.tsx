import styles from './Madal.module.scss'
import type { CardSettingsModalProps } from '../../types/madalPropTypes'

function CardSettingsModal({closeFun}: CardSettingsModalProps) {
    return (
        <>
            <div 
            className={styles.overlay}
            onClick={closeFun}
            ></div>
            <div className={styles.modal}>
                <button 
                className={styles.btn_exit}
                onClick={closeFun}
                ></button>
                <div className={styles.modal_container}>
                    <h2>Привязка карты</h2>
                    <form action="">
                        <input type="text" id='number' placeholder='номер карты'/>
                    <div className={styles.cart_content}>
                            <input className={styles.cart_date} type="month" placeholder='ММ/ГГ' id='date'/>
                            <input className={styles.cart_cvc} type="text" placeholder='CVV/CVC' id='cvc'/>
                        </div>
                        <button onClick={(e) => {
                            e.preventDefault();
                            closeFun()
                        }}>Привязать</button>
                    </form>
                    <div className={styles.cart_disclaimer_container}>
                        <p className={styles.cart_disclaimer}>Данные карты надёжно защищены</p>
                    </div>
                </div>
            </div>
    </>
    )
}

export default CardSettingsModal