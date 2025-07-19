import { useState, useEffect } from "react";
import { postOrder } from "../services/createOrderService";
import { fetchClient } from "../../../shared/services/clientService";
import type { orderClientDataT, deliveryDataT } from "../types/formType";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import { createPayment } from "../../../shared/api/yooKassa/yooKassaService";

export const useCreateOrder = () => {
    const navigate = useNavigate();

    const totalCartPrice = localStorage.getItem('totalCartPrice'); // да, я каюсь за это

    const [deliveryMethod, setDeliveryMethod] = useState<'post' | 'courier'>('courier')
    const [confirmationMethod, setConfirmationMethod] = useState<number | null>(null);
    const [clientFormData, setClientFormData] = useState<orderClientDataT>({
        name: '',         
        phone: '',        
    });

    const [deliveryData, setDeliveryData] = useState<deliveryDataT>({
        method: deliveryMethod,
        address: ''
    });
    
    const [paymentMethod, setPaymentMethod] = useState<number>(1);

    function changeDeliveryMethod(): void {
        deliveryMethod === 'post' ? setDeliveryMethod('courier') : setDeliveryMethod('post')
    }
            
    
    const changePaymentMethod = (id: number): void =>{
        setPaymentMethod(id)
    }

    const getClientInfo = async(): Promise<void> => {
        const data = await fetchClient()
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


    const validateForm = (): boolean  => {
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
    
    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
          
        if (validateForm()) {
            try {
                if (totalCartPrice){
                     createPayment(totalCartPrice)
                     postOrder(orderData)
                }
            
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
        handleSubmit,
        totalCartPrice
    }
}