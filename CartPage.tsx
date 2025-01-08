import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useStore();
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum: number, item: { discountedPrice: number; quantity: number }) => sum + item.discountedPrice * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="pt-24 px-4 max-w-7xl mx-auto text-center">
        <h2 className="text-2xl font-serif font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-8">Add items to your cart to continue shopping</p>
        <button
          onClick={() => navigate('/')}
          className="inline-block px-6 py-3 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-900"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="pt-24 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-serif font-bold mb-8">Shopping Cart</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={`${item.id}-${item.size}`} className="flex gap-4 p-4 bg-white rounded-lg shadow-sm">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-600">Size: {item.size}</p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <select
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                      className="border rounded p-1"
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{item.discountedPrice * item.quantity}</p>
                    <p className="text-sm text-gray-500 line-through">
                      ₹{item.originalPrice * item.quantity}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-4">Order Summary</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{total}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-2 font-medium">
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate('/checkout')}
              className="w-full px-6 py-3 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-900"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}