import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Star } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { products } from '../data/products';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/button';

export const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart, searchQuery, setSearchQuery } = useStore();
  const [results, setResults] = useState(products);

  useEffect(() => {
    const query = searchQuery.toLowerCase().trim();
    if (query) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
      setResults(filtered);
    } else {
      setResults(products);
    }
  }, [searchQuery]);

  const handleAddToCart = (product: any) => {
    addToCart(product);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="flex items-center gap-3 p-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-800 dark:text-gray-200">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-semibold text-lg text-gray-900 dark:text-white">Search Results</h1>
        </div>
      </div>

      {/* Results */}
      <div className="p-4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {searchQuery ? `Results for "${searchQuery}"` : 'All Products'}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">{results.length} products found</p>
        </div>

        {results.length === 0 ? (
          <div className="text-center py-12">
            <Star className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No products found</h3>
            <p className="text-gray-600 dark:text-gray-300">Try searching with different keywords</p>
            <Button onClick={() => navigate('/')} className="mt-4 bg-black text-white hover:bg-gray-800 transition-colors dark:bg-blue-600 dark:hover:bg-blue-700">Start Shopping</Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {results.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`} className="block flex flex-col">
                <Card className="bg-white dark:bg-gray-800 shadow-sm flex flex-col flex-grow border border-gray-200 dark:border-gray-700">
                  <CardContent className="p-3 flex flex-col h-full">
                    <div className="relative mb-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-32 object-cover rounded-md"
                      />
                      {product.discount && (
                        <Badge className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 dark:bg-red-600">
                          -{product.discount}%
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2 line-clamp-2 h-10 overflow-hidden">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-600 dark:text-gray-300">{product.rating}</span>
                    </div>
                    <div className="space-y-1 mt-auto">
                      <div className="text-sm font-bold text-gray-900 dark:text-white">
                        Rp {product.price.toLocaleString()}
                      </div>
                      {product.originalPrice && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 line-through">
                          Rp {product.originalPrice.toLocaleString()}
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <div className="px-2 pb-2">
                    <button
                      onClick={() => {
                        handleAddToCart(product);
                      }}
                      className="w-full my-2 bg-black text-white text-xs py-2 rounded-md hover:bg-gray-800 transition-colors px-3 dark:bg-blue-600 dark:hover:bg-blue-700"
                    >
                      Add to Cart
                    </button>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};