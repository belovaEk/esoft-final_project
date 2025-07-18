import styles from './Madal.module.scss'


import type { DeleteAccountModalProps } from '../../types/madalPropTypes'

function DeleteAccount({closeFun, deleteAccount}: DeleteAccountModalProps) {


    return ( 
        <>
            <div 
                className={styles.overlay}
                onClick={closeFun}
            >
            </div>
            <div className={styles.modal}>
                <button 
                    className={styles.btn_exit}
                    onClick={closeFun}
                ></button>
                <div className={styles.modal_container}>
                <h1 className={styles.delete_warning}>ВЫ УВЕРЕНЫ?</h1>
                <button 
                className={styles.delete_btnNO}
                onClick={closeFun}>НЕТ</button>
                <button className={styles.delete_btnYES}
                    onClick={deleteAccount}>да</button>
                </div>
            </div>
        </>        
    )
}

export default DeleteAccount