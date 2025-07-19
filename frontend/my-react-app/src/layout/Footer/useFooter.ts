import { useState } from "react";
import { useNavigate } from 'react-router-dom'


export const useFooter = () => {
    
    const navigate = useNavigate();
    const [subscriptionButtonText, setSubscriptionButtonText] = useState('Отправить');
    const [isChecked, setIsChecked] = useState(false);
    const [isWarning, setIsWarning] = useState(false);

     const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); 

        if (!isChecked) {
            setIsWarning(true)
            setTimeout(() => setIsWarning(false), 2000)
            return;
            
        }
        setSubscriptionButtonText('Готово!');
        setTimeout(() => setSubscriptionButtonText('Отправить'), 3000);
        
       
    };

    return{
        navigate,
        isChecked,
        subscriptionButtonText,
        setIsChecked,
        isWarning,
        handleSubmit
    }
}