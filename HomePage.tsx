//import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="pt-16">
        <div className="grid grid-cols-3 gap-2 h-[70vh]">
          <img
            src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80"
            alt="Ethnic Wear 1"
            className="w-full h-full object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1583391733881-5e216fef3419?auto=format&fit=crop&q=80"
            alt="Ethnic Wear 2"
            className="w-full h-full object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1583391733912-201ea2c2ce9f?auto=format&fit=crop&q=80"
            alt="Ethnic Wear 3"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">Featured Collection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}