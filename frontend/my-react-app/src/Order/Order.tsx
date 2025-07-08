import { clientId } from '../subFuncs';

import styles from './Order.module.scss'

import { IMaskInput } from 'react-imask';

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


import { fetchPost, fetchGet } from '../subFuncs';


interface Client {
    id: number;
    name: string;
    email: string;
}

function PhoneInput({ value, onChange, hasError }: { value: string, onChange: (value: string) => void, hasError: boolean }) {


  return (
    <IMaskInput
      mask="+7 (000) 000-00-00"
      placeholder="+7 (___) ___-__-__"
      definitions={{
        '0': /[0-9]/  
      }
    }
    value={value}
    onAccept={(value) => onChange(value)}
    className={hasError ? styles.errorInput : ''}
    />
  );
}


interface DeliveryData {
  method: 'courier' | 'post';
  address: string;
  flat: string;
  entrance: string;
  floor: string;
}

interface OrderClientData {
  name: string;
  phone: string;
}

function Order(){

    const navigate = useNavigate()

    const [deliveryMethod, setDeliveryMethod] = useState<'post' | 'courier'>('courier')
    function changeDeliveryMethod() {
        deliveryMethod === 'post' ? setDeliveryMethod('courier') : setDeliveryMethod('post')
        }
            


    const [client, setClient] = useState<Client>();
    const [clientFormData, setClientFormData] = useState<OrderClientData>({
        name: '',         
        phone: '',        
    });
    const getClientInfo = async(clientId: number) => {
        const data = await fetchGet(`client/${clientId}`)
        setClient(data[0])
        setClientFormData(prev => ({
            ...prev,
            name: data[0].name
        }));
    }

    useEffect(() => {
        getClientInfo(clientId);
    }, [])

    

    const [deliveryData, setDeliveryData] = useState<DeliveryData>({
        method: deliveryMethod,
        address: '',
        flat: '',
        entrance: '',
        floor: '',
    });

    const [paymentMethod, setPaymentMethod] = useState<number | null>(null);

    const changePaymentMethod = (id: number) =>{
        setPaymentMethod(id)
    }

    const [confirmationMethod, setConfirmationMethod] = useState<number | null>(null);


    const orderData = {
        client_id: clientId, // должен быть доступен из auth/сессии
        // name: clientFormData.name,
        // phone: clientFormData.phone,
        payment_method_id: deliveryMethod === 'post' ? 1 : paymentMethod,
        delivery_method_id: deliveryMethod === 'courier' ? 1 : 2, // 1 - курьер, 2 - почта
        shipping_address: formatAddress(deliveryData),
        // confirmation_method: confirmationMethod,
    };

    function formatAddress(deliveryData: DeliveryData) {
        let address = deliveryData.address;
        if (deliveryMethod === 'courier') {
            address += `, кв ${deliveryData.flat}`;
            if (deliveryData.entrance) address += `, подъезд ${deliveryData.entrance}`;
            if (deliveryData.floor) address += `, этаж ${deliveryData.floor}`;
        }
        return address;
    }

 



    const [errors, setErrors] = useState({
        name: false,
        phone: false,
        address: false,
        flat: false,
        entrance: false, 
        floor: false,
        payment: false,
        confirmation: false
    });

    const validateForm = () => {
        const newErrors = {
            name: !clientFormData.name.trim(),
            phone: !clientFormData.phone || clientFormData.phone.includes('_'), 
            address: !deliveryData.address.trim(),
            flat: deliveryMethod === 'courier' && !deliveryData.flat.trim(),
            entrance: deliveryMethod === 'courier' && !deliveryData.entrance.trim(),
            floor: deliveryMethod === 'courier' && !deliveryData.floor.trim(),
            payment: deliveryMethod === 'courier' && paymentMethod === null,
            confirmation: confirmationMethod === null 
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
      
        if (validateForm()) {
             try {
                console.log(orderData)
                await fetchPost('orders', orderData)
                navigate('/thanks');
            } catch (error) {
                console.error('Ошибка:', error);
            }
        } else {
            console.log(errors)
        } 
    };

    return(
        <main>
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
                                         {deliveryMethod === 'courier' && (
                                            <div className={styles.courier_container}>
                                                <div>
                                                    <label htmlFor="flat">Квартира</label>
                                                    <input type="text" id='flat' onChange={(e) => setDeliveryData({...deliveryData, flat: e.target.value})} className={errors.flat ? styles.errorInput : ''}/>
                                                </div>
                                                <div>
                                                    <label htmlFor="entrance">Подъезд</label>
                                                    <input type="text" id='entrance' onChange={(e) => setDeliveryData({...deliveryData, entrance: e.target.value})} className={errors.entrance ? styles.errorInput : ''}/>
                                                </div>
                                                <div>
                                                    <label htmlFor="floor">Этаж</label>
                                                    <input type="text" id='floor' onChange={(e) => setDeliveryData({...deliveryData, floor: e.target.value})} className={errors.floor ? styles.errorInput : ''}/>
                                                </div>
                                           
                                            </div>
                                             )}
                                             {deliveryMethod === 'courier' && (errors.flat || errors.entrance || errors.floor) && <div className={styles.errorMessage}>Пожалуйста, заполните все данные</div>}
                                        
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
                                            <input name='confirmation' type="radio" id='sms' onClick={()=> setConfirmationMethod(1)}/>
                                            <label htmlFor="sms">СМС</label>
                                        </li>
                                        <li>
                                            <input name='confirmation' type="radio" id='call' onClick={()=> setConfirmationMethod(2)}/>
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
        </main>
    )
}

export default Order

