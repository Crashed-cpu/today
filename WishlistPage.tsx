import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useStore();

  if (wishlist.length === 0) {
    return (
      <div className="pt-24 px-4 max-w-7xl mx-auto text-center">
        <h2 className="text-2xl font-serif font-bold mb-4">Your Wishlist is Empty</h2>
        <p className="text-gray-600 mb-8">Add items to your wishlist while shopping</p>
        <Link
          to="/"
          className="inline-block px-6 py-3 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-900"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-serif font-bold mb-8">My Wishlist</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {wishlist.map((item: { id: number; name: string; image: string; discountedPrice: number; originalPrice: number; size: string; }) => (
          <div key={item.id} className="relative">
            <Link to={`/product/${item.id}`}>
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-96 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                  <div className="mt-1 flex items-center">
                    <span className="text-xl font-bold text-gray-900">₹{item.discountedPrice}</span>
                    <span className="ml-2 text-sm text-gray-500 line-through">₹{item.originalPrice}</span>
                  </div>
                </div>
              </div>
            </Link>
            <button
              onClick={() => toggleWishlist(item)}
              className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <Heart size={20} className="fill-red-500 text-red-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}