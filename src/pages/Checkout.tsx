
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock, Truck, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/Layout';

const Checkout = () => {
  const { state, dispatch } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const handlePlaceOrder = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast({
      title: "Order placed successfully!",
      description: "Thank you for your purchase. You'll receive a confirmation email shortly.",
    });
    navigate('/');
  };

  if (state.items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step Indicator */}
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3].map((num) => (
                <div key={num} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= num ? 'bg-aliblue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step > num ? <Check className="w-4 h-4" /> : num}
                  </div>
                  {num < 3 && (
                    <div className={`h-1 w-20 mx-4 ${
                      step > num ? 'bg-aliblue-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* Shipping Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Truck className="w-5 h-5 mr-2" />
                Shipping Information
              </h2>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="First Name" />
                <Input placeholder="Last Name" />
                <Input placeholder="Email" type="email" className="md:col-span-2" />
                <Input placeholder="Street Address" className="md:col-span-2" />
                <Input placeholder="City" />
                <Input placeholder="State/Province" />
                <Input placeholder="ZIP/Postal Code" />
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                  </SelectContent>
                </Select>
              </form>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Payment Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-2 p-4 border rounded-lg border-aliblue-200 bg-aliblue-50">
                  <input type="radio" name="payment" defaultChecked className="text-aliblue-600" />
                  <CreditCard className="w-5 h-5 text-aliblue-600" />
                  <span className="font-medium">Credit/Debit Card</span>
                </div>
                
                <div className="grid grid-cols-1 gap-4 ml-6">
                  <Input placeholder="Card Number" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="MM/YY" />
                    <Input placeholder="CVV" />
                  </div>
                  <Input placeholder="Cardholder Name" />
                </div>
              </div>
              
              <div className="mt-6 flex items-center gap-2 text-sm text-gray-600">
                <Lock className="w-4 h-4" />
                Your payment information is encrypted and secure
              </div>
            </div>

            <Button 
              onClick={handlePlaceOrder}
              className="w-full gradient-primary hover:opacity-90"
              size="lg"
            >
              Place Order
            </Button>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${state.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${(state.total * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-aliblue-600">${(state.total * 1.08).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
