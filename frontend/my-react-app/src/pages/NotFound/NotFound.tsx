import styles from './NotFound.module.scss'

import  { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

function NotFound() {
    const navigate = useNavigate()
    return (
        <div className={styles.container} onClick={()=>navigate(ROUTES.main)}>
            <h1>Такой страницы не существует</h1>
            <span> ( •︵• )</span>
        </div>
    )
}


export default NotFound