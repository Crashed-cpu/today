import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useStore } from '../store/useStore';
import { products } from '../data/products';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const [selectedSize, setSelectedSize] = useState('');

  const product = products.find((p) => p.id === Number(id));
  const isWishlisted = wishlist.some((item) => item.id === product?.id);

  if (!product) {
    return <div>Product not found</div>;
  }

  const sizes = ['2XS', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL', '6XL'];

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart(product, selectedSize);
    navigate('/cart');
  };

  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[600px] object-cover rounded-lg"
            />
            <button
              onClick={() => toggleWishlist(product)}
              className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <Heart
                size={24}
                className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}
              />
            </button>
          </div>

          <div className="space-y-6">
            <h1 className="text-3xl font-serif font-bold text-gray-900">{product.name}</h1>
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-gray-900">₹{product.discountedPrice}</span>
              <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
              <span className="text-lg text-green-600">
                {Math.round(((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100)}% off
              </span>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Select Size</h3>
              <div className="grid grid-cols-5 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`${selectedSize === size ? 'selected' : ''}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleAddToCart}
                className="w-full px-6 py-3 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  handleAddToCart();
                  navigate('/checkout');
                }}
                className="w-full px-6 py-3 text-sm font-medium text-black bg-white border border-black rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              >
                Buy Now
              </button>
            </div>

            <div className="prose prose-sm">
              <h3 className="text-lg font-medium text-gray-900">Product Details</h3>
              <ul className="list-disc pl-4 text-gray-600">
                <li>Premium quality fabric</li>
                <li>Intricate embroidery work</li>
                <li>Includes matching accessories</li>
                <li>Dry clean only</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}