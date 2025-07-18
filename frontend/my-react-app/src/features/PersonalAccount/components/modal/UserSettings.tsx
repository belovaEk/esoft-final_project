import styles from './Madal.module.scss'

import { logout } from "../../../../shared/services/authService";

import type{ UserSettingsModalProps } from '../../types/madalPropTypes';


function UserSettingsModal ({client, formData, closeFun, setIsDeleteModalOpen, changeClientData, setFormData}: UserSettingsModalProps) {
    return (
        <>
            <div className={styles.overlay} onClick={closeFun}></div>
                <div className={styles.modal}>
                    <button className={styles.btn_exit} onClick={closeFun}></button>
                    <div className={styles.modal_container}>
                        <h2>Личные данные</h2>
                        <form action="">
                            <label htmlFor="name">Имя</label>
                            <input type="text" id='name' placeholder='name' value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}/>
                            <label htmlFor="email">Почта</label>
                            <input type="email" placeholder='email' id='email' value={client?.email} disabled className={styles.form_email}/>
                            <button onClick={(e)=> changeClientData(e)}>Сохранить</button>
                        </form>

                        <button className={[styles.ico, styles.logout].join(' ')}
                        onClick={()=> {
                            logout();
                            window.location.reload()
                        }}>Выйти</button>
                        <button className={styles.delete_btn} onClick={()=> {
                            closeFun()
                            setIsDeleteModalOpen()
                        }}>Удалить профиль</button>
                    </div>
                </div>
            </>
    )
}

export default UserSettingsModal