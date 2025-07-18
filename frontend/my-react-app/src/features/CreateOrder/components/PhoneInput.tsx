import styles from './../CreateOrder.module.scss'
import { IMaskInput } from 'react-imask';


function PhoneInput({ value, onChange, hasError }: { value: string, onChange: (value: string) => void, hasError: boolean }) {


  return (
    <IMaskInput
      mask="+7 (000) 000-00-00"
      placeholder="+7 (___) ___-__-__"
      definitions={{
        '0': /[0-9]/  
      }
    }
    value={value}
    onAccept={(value) => onChange(value)}
    className={hasError ? styles.errorInput : ''}
    />
  );
}

export default PhoneInput