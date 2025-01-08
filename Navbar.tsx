import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Menu, X, User, LogOut } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, cart, logout } = useStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              className="sm:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link to="/" className="text-2xl font-serif font-bold text-gray-900 ml-2">
              ANDIVYA
            </Link>
          </div>
          
          <div className="hidden sm:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-gray-900">New Arrivals</Link>
            <Link to="/" className="text-gray-700 hover:text-gray-900">Collections</Link>
            <Link to="/" className="text-gray-700 hover:text-gray-900">Sale</Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/wishlist" className="text-gray-700 hover:text-gray-900">
              <Heart size={24} />
            </Link>
            <Link to="/cart" className="text-gray-700 hover:text-gray-900 relative">
              <ShoppingCart size={24} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>
            {user.isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-gray-900"
              >
                <LogOut size={24} />
              </button>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-gray-900">
                <User size={24} />
              </Link>
            )}
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-16 sm:hidden">
          <div className="p-4 space-y-4">
            <Link to="/" className="block text-gray-700 hover:text-gray-900">New Arrivals</Link>
            <Link to="/" className="block text-gray-700 hover:text-gray-900">Collections</Link>
            <Link to="/" className="block text-gray-700 hover:text-gray-900">Sale</Link>
          </div>
        </div>
      )}
    </nav>
  );
}