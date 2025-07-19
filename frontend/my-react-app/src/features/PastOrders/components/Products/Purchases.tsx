
import styles from './Purchases.module.scss'
import ProductCart from '../../../../shared/components/ProductCart/ProductCart'
import AuthProposal from '../../../../components/UI/auth/AuthProposal'
import { usePurchases } from '../../hooks/usePurchases'

function Purchases(){

    const {
        teas,
        authStatus
    } = usePurchases()

    return (
        <section>
             <div className={styles.container}>
                {authStatus && (
                    <div className={styles.content}>
                        {teas?.map(tea => (
                            <ProductCart 
                            key={tea.id}
                            id={tea.id}
                            name={tea.name}
                            type_name={tea.type_name}
                            description={tea.description}
                            price={tea.price}
                            img_name={tea.img_name}
                            isFav={tea.isfav}
                            authStatus={authStatus}
                            isCart={tea.iscart}/>
                        ))}
                    </div>
                )}
                {!authStatus && (
                    <AuthProposal />
                )}
            </div>
        </section>
    )
}

export default Purchases