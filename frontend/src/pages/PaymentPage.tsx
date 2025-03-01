import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Shield, Check } from 'lucide-react';
import toast from 'react-hot-toast';

// Initialize Stripe (replace with your publishable key)
const stripePromise = loadStripe('your_publishable_key');

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');

  const plans = {
    monthly: {
      price: 29,
      features: [
        'Access to all job listings',
        'Priority application submission',
        'Monthly resume review',
        'Email support'
      ]
    },
    yearly: {
      price: 299,
      features: [
        'All monthly features',
        'Personal career coach',
        'Interview preparation sessions',
        'Salary negotiation guidance',
        '2 months free'
      ]
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    try {
      // Create payment intent on your backend
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: selectedPlan,
          amount: selectedPlan === 'monthly' ? plans.monthly.price : plans.yearly.price,
        }),
      });

      const data = await response.json();

      if (!data.clientSecret) {
        throw new Error('Failed to create payment intent');
      }

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) return;

      // Confirm payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      if (error) {
        throw new Error(error.message);
      }

      if (paymentIntent.status === 'succeeded') {
        toast.success('Payment successful!');
        navigate('/dashboard');
      }
    } catch (error: any) {
      toast.error(error.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900">Upgrade Your Job Search</h1>
        <p className="mt-4 text-gray-600">Choose the plan that's right for you</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Monthly Plan */}
        <div 
          className={`border rounded-lg p-6 cursor-pointer transition-all duration-200 ${
            selectedPlan === 'monthly' 
              ? 'border-blue-500 shadow-lg' 
              : 'border-gray-200 hover:border-blue-300'
          }`}
          onClick={() => setSelectedPlan('monthly')}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Monthly Plan</h3>
            <div className="text-2xl font-bold text-blue-600">${plans.monthly.price}</div>
          </div>
          <ul className="space-y-3">
            {plans.monthly.features.map((feature, index) => (
              <li key={index} className="flex items-center text-gray-600">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Yearly Plan */}
        <div 
          className={`border rounded-lg p-6 cursor-pointer transition-all duration-200 ${
            selectedPlan === 'yearly' 
              ? 'border-blue-500 shadow-lg' 
              : 'border-gray-200 hover:border-blue-300'
          }`}
          onClick={() => setSelectedPlan('yearly')}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Yearly Plan</h3>
            <div className="text-2xl font-bold text-blue-600">${plans.yearly.price}</div>
          </div>
          <ul className="space-y-3">
            {plans.yearly.features.map((feature, index) => (
              <li key={index} className="flex items-center text-gray-600">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Details
              </label>
              <div className="border rounded-md p-3">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                          color: '#aab7c4',
                        },
                      },
                      invalid: {
                        color: '#9e2146',
                      },
                    },
                  }}
                />
              </div>
            </div>

            <div className="flex items-center mb-6">
              <Shield className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm text-gray-600">
                Your payment is secure and encrypted
              </span>
            </div>

            <button
              type="submit"
              disabled={!stripe || loading}
              className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Processing...' : `Pay $${selectedPlan === 'monthly' ? plans.monthly.price : plans.yearly.price}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const PaymentPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default PaymentPage; 