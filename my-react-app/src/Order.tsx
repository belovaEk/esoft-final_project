import styles from '/src/assets/styles/Cart.module.scss'

import { IMaskInput } from 'react-imask';

import { useState } from 'react'
import { useNavigate } from 'react-router-dom';


function PhoneInput() {
  return (
    <IMaskInput
      mask="+7 (000) 000-00-00"
      placeholder="+7 (___) ___-__-__"
      definitions={{
        '0': /[0-9]/  
      }}
    />
  );
}


function Order(){

    const navigate = useNavigate()

    const [isCourier, setIsCourier] = useState(true);
    const [isPost, setIsPost] = useState(false);

    function changeOnCourier(){
        setIsPost(false);
        setIsCourier(true)
    }

    function changeOnPost(){
        setIsCourier(false);
        setIsPost(true)
    }



    return(
        <main>
            <div className={styles.container}>
                <h1>Оформление заказа</h1>
                <div className={styles.content}>
                    <div className={styles.forms_container}>
                        <div className={styles.order_userData}>
                            <form action="">
                                <input type="text" placeholder='ФИО'/>
                                <input type="email" placeholder='e-mail'/>
                                <PhoneInput />
                            </form>
                            
                        </div>

                        <div className={styles.order_deliveryData}>
                            <h2>Доставка</h2>
                            <div>
                                {/* <button>Магазин "TeaTime"</button> */}
                                <button onClick={changeOnCourier} className={isCourier ? styles.active_button : styles.inactive_button}>Курьер</button>
                                <button onClick={changeOnPost} className={isPost ? styles.active_button : styles.inactive_button}>Почта России</button>
                            </div>

                            <div className={styles.order_address}>
                               
                                <div>
                                    <p>Введите точный адрес доставки – город, улица, дом, строение. <br />
                                    Для уточнения даты доставки с вами свяжется наш оператор.</p>
                                    <form action="">
                                        <label htmlFor="address">Адрес доставки</label>
                                        <input type="text" placeholder='Адрес доставки' id='address'/>
                                         {isCourier && (
                                            <div className={styles.courier_container}>
                                                <div>
                                                    <label htmlFor="flat">Квартира</label>
                                                    <input type="text" id='flat'/>
                                                </div>
                                                <div>
                                                    <label htmlFor="entrance">Подъезд</label>
                                                    <input type="text" id='entrance'/>
                                                </div>
                                                <div>
                                                    <label htmlFor="floor">Этаж</label>
                                                    <input type="text" id='floor'/>
                                                </div>
                                           
                                            </div>
                                             )}
                                        
                                    </form>
                                </div>
                        
                            </div>
                            

                            <div className={styles.order_delivery_payment}>
                                <h2>Оплата</h2>
                                <div className={styles.payment_content}>
                                    <form action="">
                                        <ul>
                                            <li>
                                                <input name="payment" type="radio" id='payment_cart'/>
                                                <label htmlFor="payment_cart">Картой на сайте</label>

                                            </li>
                                            {!isPost && (
                                            <>
                                                <li>
                                                <input name="payment" type="radio" id="payment_cash" />
                                                <label htmlFor="payment_cash">Наличные курьеру</label>
                                                </li>
                                                <li>
                                                <input name="payment" type="radio" id="payment_cartCourier" />
                                                <label htmlFor="payment_cartCourier">Картой курьеру</label>
                                                </li>
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
                                            <input name='confirmation' type="radio" id='sms'/>
                                            <label htmlFor="sms">СМС</label>
                                        </li>
                                        <li>
                                            <input name='confirmation' type="radio" id='call'/>
                                            <label htmlFor="call">Звонок оператора</label>
                                        </li>
                                    </ul>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className={styles.order_container}>
                        <button className={styles.mk_order_btn} onClick={()=>navigate('/thanks')}>оформить заказ</button>
                        <div className={styles.order_price}>
                            <p>Общая стоимость</p>
                            <span><i>1000 P</i></span>
                        </div>
                        <div className={styles.order_delivery}>Доставим бесплатно</div>
                        
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Order

