import React, { useState } from 'react';
import { useStripe } from '@stripe/react-stripe-js';

const ApplePayButton = ({ event }) => {
  const stripe = useStripe();
  const [paymentRequest, setPaymentRequest] = useState(null);

  const handlePayment = async (event) => {
    event.preventDefault();
    if (!stripe || !paymentRequest) {
      return;
    }

    const { error } = await stripe.confirmApplePayPayment(paymentRequest, {
      payment_method: {
        billing_details: {
          name: 'John Doe',
        },
      },
    });

    if (error) {
      console.error(error);
    } else {
      // Handle successful payment
      console.log('Payment successful!');
    }
  };

  const initPaymentRequest = async () => {
    const paymentRequest = stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        label: 'Event Payment',
        amount: 1000, // Dummy amount for testing
      },
      requestPayerName: true,
      requestPayerEmail: true,
      requestPayerPhone: true,
      displayItems: event.vendors.map((vendor) => ({
        label: vendor.name,
        amount: vendor.price,
      })),
    });

    await paymentRequest.canMakePayment();
    setPaymentRequest(paymentRequest);
  };

  return (
    <form onSubmit={handlePayment}>
      <button onClick={initPaymentRequest}>Pay with Apple Pay</button>
    </form>
  );
};

export default ApplePayButton;
