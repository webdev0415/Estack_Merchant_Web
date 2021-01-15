import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { Button, Form } from 'antd';
import stripeImage from '../../../img/stripe.png';
import config from '../../../config';

const CheckoutForm = ({ addCard, onSuccess, onCancel }) => {
  const [error, setError] = useState(null);
  const [form] = Form.useForm();
  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  const handleSubmit = async () => {
    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    if (result.error) {
      setError(result.error.message);
    } else {
      setError(null);
      addCard({ token: result.token });
      onSuccess();
    }
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
    >
      <div style={{
        padding: '16px',
        background: 'rgba(64, 118, 217, 0.64)',
        borderRadius: 2,
      }}
      >
        <CardElement
          id="card-element"
          options={{
            style: {
              base: {
                color: '#fff',
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                  color: '#fff',
                },
              },
              invalid: {
                color: '#fa755a',
                iconColor: '#fa755a',
              },
            },
          }}
          onChange={handleChange}
        />
      </div>
      <div
        className="card-errors"
        role="alert"
        style={{ height: 22, color: '#fa755a' }}
      >
        {error}
      </div>
      <div className="d-flex justify-content-between align-items-end">
        <img className="w-25" src={stripeImage} alt="" />
        <div className="d-flex justify-content-end">
          <Button type="link" onClick={onCancel}>Cancel</Button>
          <Button type="primary" onClick={handleSubmit}>Add Payment</Button>
        </div>
      </div>
    </Form>
  );
};

const PaymentForm = (props) => (
  <Elements stripe={loadStripe(config.stripe)}>
    <CheckoutForm {...props} />
  </Elements>
);

export default PaymentForm;
