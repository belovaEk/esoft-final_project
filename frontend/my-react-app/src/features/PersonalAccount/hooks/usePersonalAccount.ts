import { useState } from "react";
import type { clientT } from "../../../shared/types/client";
import { checkAuthStatus } from "../../../shared/services/authService";

import { fetchClient } from "../../../shared/services/clientService";
import { fetchGet } from "../../../shared/api/http";
import { deleteClient, patchClient } from "../services/personalAccountService";

import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";

export const usePersonalAccount = () => {
    const navigate = useNavigate();

    const [isCardModalOpen, setIsCardModalOpen] = useState(false);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    
    
    const [favQuantity, setfavQuantity] = useState(0);
    const [client, setClient] = useState<clientT>();

    const [formData, setFormData] = useState({
        name:'',
        is_mailing: false,
    });

    const [authStatus, setAuthStatus] = useState(false);
    
    const getClientData = async() => {
        const clientStatus = await checkAuthStatus();
        setAuthStatus(clientStatus)
        if (clientStatus) {
            const quantity = await fetchGet(`favourites/count`) as [{count: number}]; /// Изменить
            let clientData = await fetchClient();
    
            setfavQuantity(Number(quantity[0]?.count) || 0);
            setClient(clientData[0]);
            setFormData({
                name: clientData[0]?.name || '',
                is_mailing: clientData[0]?.is_mailing || false,
            })
        }
            
    }
    
    const changeClientData = async (e: React.FormEvent) => {
        e.preventDefault();
            
        const dataToSend: Partial<clientT> = {};
            
        if (formData.name.trim() && formData.name.trim() !== client?.name) {
            dataToSend.name = formData.name.trim();
        }
            
    
        if (formData.is_mailing != client?.is_mailing) {
            dataToSend.is_mailing = formData.is_mailing
        }
    
        if (Object.keys(dataToSend).length === 0) {
            setIsUserModalOpen(false);
            return;
                
        }
    
        try {
            await patchClient(dataToSend);
                
            setClient(prev => ({
                ...prev!,
                ...dataToSend
            }));
                
            setIsUserModalOpen(false);
            setIsSettingsModalOpen(false);
        } catch (err) {
            console.error('Ошибка обновления клиента:', err);
        }
            
    };
    
    const deleteAccount = async () => {
        await deleteClient()
        navigate(ROUTES.main)
    }

    function clickName() {

        if (!authStatus) {
            setIsAuthModalOpen(true)
        } else {
            setIsUserModalOpen(true)
        }
    }
    
    return {
        authStatus,
        client,
        isCardModalOpen,
        isAuthModalOpen,
        isDeleteModalOpen,
        isSettingsModalOpen,
        isUserModalOpen,
        favQuantity,
        formData,
        clickName,
        setIsCardModalOpen,
        setIsSettingsModalOpen,
        setIsDeleteModalOpen,
        setIsUserModalOpen,
        getClientData,
        deleteAccount,
        changeClientData,
        setIsAuthModalOpen,
        setFormData,
        navigate
    }

        
}