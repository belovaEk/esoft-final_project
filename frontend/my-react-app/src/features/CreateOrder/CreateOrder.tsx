import styles from './CreateOrder.module.scss'

import PhoneInput from './components/PhoneInput';
import { useCreateOrder } from './hooks/useCreateOrder';

function Order(){

    const {
        clientFormData,
        errors,
        deliveryMethod,
        deliveryData,
        paymentMethod,
        changeDeliveryMethod,
        changePaymentMethod,
        setConfirmationMethod,
        setClientFormData,
        setDeliveryData,
        handleSubmit
    } = useCreateOrder();

    


    return(
        <div>
            <div className={styles.container}>
                <h1>Оформление заказа</h1>
                <div className={styles.content}>
                    <div className={styles.forms_container}>
                        <div className={styles.order_userData}>
                            <form action="">
                                <input
                                 type="text"
                                  placeholder='ИМЯ'
                                  value={clientFormData.name}
                                  onChange={(e) => setClientFormData({...clientFormData, name: e.target.value})}
                                  className={errors.name ? styles.errorInput : ''}
                                  />
                                {errors.name && <div className={styles.errorMessage}>Пожалуйста, укажите имя</div>}
                                <PhoneInput 
                                value={clientFormData.phone}
                                onChange={(phone) => setClientFormData({...clientFormData, phone})}
                                hasError={errors.phone}
                                />
                                {errors.phone && <div className={styles.errorMessage}>Пожалуйста, укажите корректный телефон</div>}
                            </form>
                            
                        </div>

                        <div className={styles.order_deliveryData}>
                            <h2>Доставка</h2>
                            <div>
                                {/* <button>Магазин "TeaTime"</button> */}
                                <button onClick={changeDeliveryMethod} className={deliveryMethod === 'courier' ? styles.active_button : styles.inactive_button}>Курьер</button>
                                <button onClick={changeDeliveryMethod} className={deliveryMethod === 'post' ? styles.active_button : styles.inactive_button}>Почта России</button>
                            </div>

                            <div className={styles.order_address}>
                               
                                <div>
                                    <p>Введите точный адрес доставки – город, улица, дом, строение. <br />
                                    Для уточнения даты доставки с вами свяжется наш оператор.</p>
                                    <form action="">
                                        <label htmlFor="address">Адрес доставки</label>
                                        <input type="text" placeholder='Адрес доставки' id='address' onChange={(e) => setDeliveryData({...deliveryData, address: e.target.value})} className={errors.address ? styles.errorInput : ''}/>
                                        {errors.address && <div className={styles.errorMessage}>Пожалуйста, укажите адрес</div>}
                                        
                                    </form>
                                </div>
                        
                            </div>
                            

                            <div className={styles.order_delivery_payment}>
                                <h2>Оплата</h2>
                                <div className={styles.payment_content}>
                                    <form action="">
                                        <ul>
                                            <li>
                                                <input name="payment" type="radio" id='payment_method-1'
                                                onClick={()=> changePaymentMethod(1)}
                                                checked={deliveryMethod === 'post' || paymentMethod === 1}
                                                disabled={deliveryMethod === 'post'}/>
                                                <label htmlFor="payment_method-1">Картой на сайте</label>

                                            </li>
                                            {deliveryMethod !== 'post'&& (
                                            <>
                                                <li>
                                                    <input name="payment" type="radio" id="payment_method-2"  onClick={()=> changePaymentMethod(2)}/>
                                                    <label htmlFor="payment_method-2">Наличные курьеру</label>
                                                </li>
                                                <li>
                                                    <input name="payment" type="radio" id="payment_method-3"  onClick={()=> changePaymentMethod(3)}/>
                                                    <label htmlFor="payment_method-3">Картой курьеру</label>
                                                </li>
                                                {errors.payment && <div className={styles.errorMessage}>Пожалуйста, укажите способ оплаты</div>}
                                            </>
                                            )}
                                        </ul>
                                    </form>
                                    
                                </div>
                            </div>

                            <div className={styles.order_delivery_confirmation}>
                                <h2>Подтверждение заказа</h2>
                                <form action="">
                                    <ul>
                                        <li>
                                            <input name='confirmation' type="radio" id='sms' onClick={()=> setConfirmationMethod(2)}/>
                                            <label htmlFor="sms">СМС</label>
                                        </li>
                                        <li>
                                            <input name='confirmation' type="radio" id='call' onClick={()=> setConfirmationMethod(1)}/>
                                            <label htmlFor="call">Звонок оператора</label>
                                        </li>
                                    </ul>
                                    {errors.confirmation && <div className={styles.errorMessage}>Пожалуйста, укажите способ подтверждения</div>}
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className={styles.order_container}>
                        <button className={styles.mk_order_btn} onClick={handleSubmit}>оформить заказ</button>
                        <div className={styles.order_price}>
                            <p>Общая стоимость</p>
                            <span><i>1000 P</i></span>
                        </div>
                        <div className={styles.order_delivery}>Доставим бесплатно</div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order

