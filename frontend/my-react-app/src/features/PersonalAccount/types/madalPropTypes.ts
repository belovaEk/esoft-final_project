import type { clientT } from "../../../shared/types/client";


export type UserSettingsModalProps = {
    client: clientT,
    formData: {name: string, is_mailing: boolean}
    closeFun: () => void;
    setIsDeleteModalOpen: () => void;
    changeClientData: (e: React.FormEvent) => void;
    setFormData: Function;
}

export type DeleteAccountModalProps = {
    closeFun: () => void;
    deleteAccount: () => void;
}

export type CardSettingsModalProps = {
    closeFun: () => void;
}


export type SettingsModalProps = {
    client: clientT,
    formData: {name: string, is_mailing: boolean}
    closeFun: () => void;
    changeClientData: (e: React.FormEvent) => void;
    setFormData: Function;
}