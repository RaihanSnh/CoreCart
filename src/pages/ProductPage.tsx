import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Heart, Share, Plus, Minus, ShoppingCart, MapPin } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { products } from '../data/products';
import { useStore } from '../store/useStore';

export const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, isInWishlist, addToWishlist, removeFromWishlist } = useStore();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === id);

  // Mock data for demonstration purposes - REMOVE IN PRODUCTION AND FETCH FROM ACTUAL DATA SOURCE
  if (product) {
    product.soldQuantity = 125; // Example sold quantity
    product.new = { price: product.price, inStock: true };
    product.used = { price: Math.floor(product.price * 0.7), inStock: true }; // Example used price, 30% cheaper
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Product not found</h2>
          <Button onClick={() => navigate('/')} variant="outline">
            Go back to home
          </Button>
        </div>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // You could add a toast notification here
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="font-semibold text-lg">Product Details</h1>
        <div className="flex items-center gap-2">
          <button className="p-2">
            <Share className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Product Image */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-80 object-cover"
        />
        {product.discount && (
          <Badge className="absolute top-4 left-4 bg-red-500 text-white">
            -{product.discount}% OFF
          </Badge>
        )}
        {!product.inStock && (
          <Badge className="absolute top-4 right-4 bg-gray-500 text-white">
            Out of Stock
          </Badge>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline">{product.brand}</Badge>
            <Badge variant="outline">{product.category}</Badge>
          </div>
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-2xl font-bold text-gray-900 pr-4">{product.name}</h1>
            <button onClick={handleWishlistToggle} className="p-2 -mr-2 mt-0.5">
              <Heart className={`w-7 h-7 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
            </button>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{product.rating}</span>
            </div>
            <span className="text-gray-500">({product.reviews} reviews)</span>
            <span className="text-gray-500 ml-auto">Sold: {product.soldQuantity}</span>
          </div>
        </div>

        {/* Condition Options */}
        <div className="space-y-3 mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Choose Condition</h2>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="flex flex-col items-start h-auto py-3"
              disabled={!product.new.inStock}
            >
              <span className="font-bold text-base">New</span>
              <span className="text-sm">Rp {product.new.price.toLocaleString()}</span>
              <Badge variant={product.new.inStock ? "default" : "destructive"} className="mt-1">
                {product.new.inStock ? "In Stock" : "Out of Stock"}
              </Badge>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-start h-auto py-3"
              disabled={!product.used.inStock}
            >
              <span className="font-bold text-base">Used</span>
              <span className="text-sm">Rp {product.used.price.toLocaleString()}</span>
              <Badge variant={product.used.inStock ? "default" : "destructive"} className="mt-1">
                {product.used.inStock ? "In Stock" : "Out of Stock"}
              </Badge>
            </Button>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-gray-900">
            Rp {product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-lg text-gray-500 line-through">
              Rp {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center gap-4">
          <span className="font-medium">Quantity:</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Shipping & Delivery Info */}
        <div className="space-y-3 p-4 border rounded-lg bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">Delivery Details</h2>
          <div className="flex justify-between text-sm text-gray-700">
            <span>Estimated Shipping & Handling:</span>
            <span>Rp 25,000</span>
          </div>
          <div className="flex justify-between text-sm text-gray-700">
            <span>Payment Fees:</span>
            <span>Rp 5,000</span>
          </div>
          <div className="flex justify-between text-sm text-gray-700">
            <span>Taxes:</span>
            <span>Rp 10,000</span>
          </div>
          <div className="pt-2 border-t border-gray-200">
            <span className="font-medium text-gray-800">Delivery When:</span>
            <span className="ml-2 text-gray-700">Tuesday, October 26, 2024</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-600" />
              <span className="font-medium text-gray-800">Ship to Cibeber</span>
            </div>
            <Button variant="link" className="p-0 h-auto text-blue-600" onClick={() => navigate('/profile')}>
              Change location
            </Button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="w-full h-12 text-lg font-semibold"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specs</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-4">
            <div className="prose prose-sm">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>
          </TabsContent>
          
          <TabsContent value="specifications" className="mt-4">
            <div className="space-y-3">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-700">{key}</span>
                  <span className="text-gray-900">{value}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-4">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold">{product.rating}</div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">{product.reviews} reviews</div>
                </div>
              </div>
              
              {/* Sample Reviews */}
              <div className="space-y-4">
                <div className="border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    <div>
                      <div className="font-medium">John D.</div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm">
                    Excellent performance and great value for money. Highly recommended!
                  </p>
                </div>
                
                <div className="border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    <div>
                      <div className="font-medium">Sarah M.</div>
                      <div className="flex items-center gap-1">
                        {[...Array(4)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                        <Star className="w-3 h-3 text-gray-300" />
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm">
                    Good product, fast shipping. Installation was straightforward.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};