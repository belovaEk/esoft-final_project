
import styles from './Favourites.module.scss'
import ProductCart from '../Catalog/ProductCart'

import { fetchGet } from '../subFuncs'
import { useEffect, useState } from 'react'
import type { Tea } from '../interface/teaItem'

import { AuthProposal, checkAuthStatus } from '../Authorization/Authorization';


function Purchases(){

    const [teas, setTeas] = useState([] as Tea[])
    const [authStatus, setAuthStatus] = useState(false);

    const getTeas = async() => {
        const clientStatus = await checkAuthStatus();
        setAuthStatus(clientStatus)
        if(clientStatus) {
            const teasData = await fetchGet(`orders/prevPurchased`);
            setTeas(teasData);
        }
    }

    useEffect(() =>{
        getTeas()
    }, [])

    return (
        <section>
             <div className={styles.container}>
                {authStatus && (
                    <div className={styles.content}>
                        {teas.map(tea => (
                            <ProductCart 
                            key={tea.id}
                            id={tea.id}
                            name={tea.name}
                            type_name={tea.type_name}
                            description={tea.type_name}
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