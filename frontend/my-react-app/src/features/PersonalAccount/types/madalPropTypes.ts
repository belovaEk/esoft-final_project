import type { ClientI } from "../../../shared/types/client";


export type UserSettingsModalProps {
    client: ClientI,
    formData: {name: string, is_mailing: boolean}
    closeFun: () => void;
    setIsDeleteModalOpen: () => void;
    changeClientData: (e: React.FormEvent) => void;
    setFormData: Function;
}

export type DeleteAccountModalProps {
    closeFun: () => void;
    deleteAccount: () => void;
}

export type CardSettingsModalProps {
    closeFun: () => void;
}


export type SettingsModalProps {
    client: ClientI,
    formData: {name: string, is_mailing: boolean}
    closeFun: () => void;
    changeClientData: (e: React.FormEvent) => void;
    setFormData: Function;
}