import styles from './CreateOrder.module.scss'
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
function ThanksOrder(){
    const navigte = useNavigate();
    setTimeout(() => {
        navigte(ROUTES.main)
    }, 1000);
    return(
        <>
             <div className={styles.container}>
                <h1>Спасибо за заказ!</h1>
             </div>
        </>
    )
}

export default ThanksOrder