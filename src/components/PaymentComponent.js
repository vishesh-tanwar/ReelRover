import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const PaymentComponent = () => {
  const { amount } = useParams(); // Extract amount from URL params
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [showPayment, setShowPayment] = useState(false);

  const handlePaymentSuccess = () => {
    alert('Payment Successful!');
    setShowPayment(false);
    // Optionally redirect or update state
  };

  const handleUpiPayment = async () => {
    try {
      const response = await fetch('http://localhost:3000/create-upi-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: parseFloat(amount) }), // Convert amount to number
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const { order_id, amount: paymentAmount } = await response.json();

      const options = {
        key: 'your-razorpay-key-id', // Replace with your Razorpay key ID
        amount: paymentAmount * 100, // Convert amount to the smallest currency unit (e.g., paise for INR)
        currency: 'INR',
        name: 'Your Company',
        description: 'Test Transaction',
        order_id: order_id,
        handler: function (response) {
          console.log(response);
          alert('UPI Payment Successful!');
          handlePaymentSuccess();
        },
        prefill: { 
          email: 'customer.email',
          contact: 'customer.phone',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('UPI Payment failed:', error);
    }
  };

  return (
    <div>
      <h2>Select Payment Method</h2>
      <div>
        <button onClick={() => setPaymentMethod('card')}>Pay with Card</button>
        <button onClick={() => setPaymentMethod('upi')}>Pay with UPI</button>
      </div>

      {paymentMethod === 'card' && showPayment && (
        <div>
          <h3>Card Payment</h3>
          <p>Card payment functionality needs to be added.</p>
        </div>
      )}
      {paymentMethod === 'upi' && showPayment && (
        <div>
          <h3>UPI Payment</h3>
          <button onClick={handleUpiPayment}>Pay with UPI</button>
        </div>
      )}
      {paymentMethod === 'cash' && showPayment && (
        <div>
          <h3>Cash Payment</h3>
          <button onClick={handleCashPayment}>Confirm Cash Payment</button>
        </div>
      )}

      {!showPayment && <button onClick={() => setShowPayment(true)}>Proceed for Payment</button>}
    </div>
  );
};

export default PaymentComponent;
