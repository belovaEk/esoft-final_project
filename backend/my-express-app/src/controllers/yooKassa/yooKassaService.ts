const YooKassa = require('yookassa');
import { configureYooKassa } from "../../config/yooKassa";

const yooKassa = new YooKassa(configureYooKassa);

export async function createPayment(amount: string) {
  const payment = await yooKassa.createPayment({
    amount: {
      value: amount,
      currency: 'RUB'
    },
    payment_method_data: {
      type: 'bank_card'
    },
    confirmation: {
      type: 'redirect',
      return_url: 'http://localhost:5173/thanks'
    },
  });
  return payment;
}