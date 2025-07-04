import { clientId } from '../subFuncs'

import styles from './Favourites.module.scss'
import ProductCart from '../Catalog/ProductCart'

import { fetchGet } from '../subFuncs'
import { useEffect, useState } from 'react'
import type { Tea } from '../interface/teaItem'


function Purchases(){

    const [teas, setTeas] = useState([] as Tea[])

    const getTeas = async(clientId: number) => {
        const teasData = await fetchGet(`orders/${clientId}/prevPurchased`);
        setTeas(teasData);
    }

    useEffect(() =>{
        getTeas(clientId)
    }, [])

    return (
        <section>
             <div className={styles.container}>
                <h1>Купленные ранее</h1>
                <div  className={styles.content}>
                    {teas.map(tea => (
                        <ProductCart 
                        key={tea.id}
                        id={tea.id}
                        name={tea.name}
                        type_name={tea.type_name}
                        description={tea.type_name}
                        price={tea.price}
                        isFav={tea.isfav}
                        isCart={tea.iscart}/>
                    ))}
                   
                </div>
            </div>
        </section>
    )
}

export default Purchases