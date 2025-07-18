import styles from './Madal.module.scss'
import type { SettingsModalProps } from '../../types/madalPropTypes'

function SettingsModal({closeFun, client, formData, changeClientData, setFormData}: SettingsModalProps) {
    return(
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
                        <h2>Настройки</h2>
                        <form action="" className={styles.settings_form}>
                            <label htmlFor="mailing" className={styles.settings_lable}>Получать рассылки по почте</label>
                            <input type="checkbox" id='mailing' className={styles.settings_checkbox} checked={formData.is_mailing} onChange={(e) => setFormData({...formData, is_mailing: e.target.checked})}/>
                        </form>
                        <p className={styles.settings_email}>{client?.email}</p>
                        <button 
                        className={styles.settings_btn}
                        type="submit"
                        onClick={(e) => changeClientData(e)}
                        >Сохранить</button>
                    </div>
                </div>
                </>
    )
}

export default SettingsModal