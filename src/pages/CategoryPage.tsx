import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Filter, Grid, List, Star } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { products, categories } from '../data/products';
import { useStore } from '../store/useStore';

export const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const { addToCart } = useStore();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating'>('name');

  const categoryInfo = categories.find(c => c.id === category);
  const categoryProducts = products.filter(p => p.category === category);

  const sortedProducts = [...categoryProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  if (!categoryInfo) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Category not found</h2>
          <Button onClick={() => navigate('/')} variant="outline" className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600">
            Go back to home
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = (product: any) => {
    addToCart(product);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-800 dark:text-gray-200">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="text-center">
            <h1 className="font-semibold text-lg text-gray-900 dark:text-white">{categoryInfo.name}</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">{sortedProducts.length} products</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="p-2 text-gray-800 dark:text-gray-200"
            >
              {viewMode === 'grid' ? <List className="w-5 h-5" /> : <Grid className="w-5 h-5" />}
            </button>
            <button className="p-2 text-gray-800 dark:text-gray-200">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sort Options */}
        <div className="px-4 pb-4">
          <div className="flex gap-2">
            {[
              { key: 'name', label: 'Name' },
              { key: 'price', label: 'Price' },
              { key: 'rating', label: 'Rating' }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setSortBy(key as any)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  sortBy === key
                    ? 'bg-black text-white dark:bg-blue-600 dark:hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="p-4">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 gap-4">
            {sortedProducts.map((product) => (
              <Card key={product.id} className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
                <CardContent className="p-3">
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
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-gray-600 dark:text-gray-300">{product.rating}</span>
                  </div>
                  <div className="space-y-1 mb-3">
                    <div className="text-sm font-bold text-gray-900 dark:text-white">
                      Rp {product.price.toLocaleString()}
                    </div>
                    {product.originalPrice && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 line-through">
                        Rp {product.originalPrice.toLocaleString()}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-black text-white text-xs py-2 rounded-md hover:bg-gray-800 transition-colors dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    Add to Cart
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedProducts.map((product) => (
              <Card key={product.id} className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      {product.discount && (
                        <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 dark:bg-red-600">
                          -{product.discount}%
                        </Badge>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-1">{product.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{product.brand}</p>
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{product.rating}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">({product.reviews})</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-bold text-gray-900 dark:text-white">
                            Rp {product.price.toLocaleString()}
                          </div>
                          {product.originalPrice && (
                            <div className="text-sm text-gray-500 dark:text-gray-400 line-through">
                              Rp {product.originalPrice.toLocaleString()}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="bg-black text-white text-sm px-4 py-2 rounded-md hover:bg-gray-800 transition-colors dark:bg-blue-600 dark:hover:bg-blue-700"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};