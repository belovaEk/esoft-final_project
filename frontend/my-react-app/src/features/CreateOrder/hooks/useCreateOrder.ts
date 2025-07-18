import { useState, useEffect } from "react";
import { postOrder } from "../services/createOrderService";
import { fetchClient } from "../../../shared/services/clientService";
import type { OrderClientData, DeliveryData, ClientDataT } from "../types/formType";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";

export const useCreateOrder = () => {
    const navigate = useNavigate();

    const [deliveryMethod, setDeliveryMethod] = useState<'post' | 'courier'>('courier')
    const [confirmationMethod, setConfirmationMethod] = useState<number | null>(null);
    const [clientFormData, setClientFormData] = useState<OrderClientData>({
        name: '',         
        phone: '',        
    });

    const [deliveryData, setDeliveryData] = useState<DeliveryData>({
        method: deliveryMethod,
        address: ''
    });
    
    const [paymentMethod, setPaymentMethod] = useState<number>(1);

    function changeDeliveryMethod() {
        deliveryMethod === 'post' ? setDeliveryMethod('courier') : setDeliveryMethod('post')
    }
            
    
    const changePaymentMethod = (id: number) =>{
        setPaymentMethod(id)
    }

    const getClientInfo = async() => {
        const data = await fetchClient() as [ClientDataT]
        setClientFormData(prev => ({
            ...prev,
            name: data[0].name
        }));
    }
    
    const orderData = {
        customer_name: clientFormData.name,
        customer_phone: clientFormData.phone,
        payment_method_id: deliveryMethod === 'post' ? 1 : paymentMethod,
        delivery_method_id: deliveryMethod === 'courier' ? 1 : 2, // 1 - курьер, 2 - почта
        shipping_address: deliveryData.address,
        confirmation_method_id: confirmationMethod || 1,
    };

    const [errors, setErrors] = useState({
        name: false,
        phone: false,
        address: false,
        payment: false,
        confirmation: false
    });


    const validateForm = () => {
        const newErrors = {
            name: !clientFormData.name.trim(),
            phone: !clientFormData.phone || clientFormData.phone.includes('_'), 
            address: !deliveryData.address.trim(),
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
                postOrder(orderData)
                navigate(ROUTES.thanks);
            } catch (error) {
                console.error('Ошибка:', error);
            }
        };

    
    }

    useEffect(() => {
        getClientInfo();
    }, [])

    return {
        clientFormData,
        errors,
        deliveryMethod,
        deliveryData,
        paymentMethod,
        getClientInfo,
        changeDeliveryMethod,
        changePaymentMethod,
        setConfirmationMethod,
        setClientFormData,
        setDeliveryData,
        handleSubmit
    }
}