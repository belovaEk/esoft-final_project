import { useState } from 'react';

export const  useEmailValidation = (initialValue = '') =>  {
  const [email, setEmail] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);

  const validate = (email: string): string | null => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email обязателен';
    if (!re.test(email)) return 'Некорректный формат email';
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setError(validate(value));
  };

  return { email, error, handleChange, validate, setEmail };
}