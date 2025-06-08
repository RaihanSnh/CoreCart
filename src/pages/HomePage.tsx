import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Star, Flame, TrendingUp, ChevronLeft } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ScrollArea, ScrollBar } from '../components/ui/scroll-area';
import { products, categories } from '../data/products';
import { useStore } from '../store/useStore';

export const HomePage: React.FC = () => {
  const { addToCart } = useStore();
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const bannerData = [
    {
      id: 1,
      title: "New Year Sale",
      description: "Up to 50% off on processors",
      badge: "Limited Time",
      bgColor: "from-red-600 to-red-800",
      badgeColor: "text-red-600",
    },
    {
      id: 2,
      title: "Gaming Setup",
      description: "Complete your gaming rig",
      badge: "Best Deals",
      bgColor: "from-blue-600 to-blue-800",
      badgeColor: "text-blue-600",
    },
    {
      id: 3,
      title: "Free Shipping",
      description: "On orders over Rp 5,000,000",
      badge: "No Minimum",
      bgColor: "from-green-600 to-green-800",
      badgeColor: "text-green-600",
    },
  ];

  const nextBanner = () => {
    setCurrentBannerIndex((prevIndex) =>
      (prevIndex + 1) % bannerData.length
    );
  };

  const prevBanner = () => {
    setCurrentBannerIndex((prevIndex) =>
      (prevIndex - 1 + bannerData.length) % bannerData.length
    );
  };

  const featuredProducts = products.filter(p => p.discount).slice(0, 6);
  const newProducts = products.slice(0, 8);
  const topRatedProducts = products.filter(p => p.rating >= 4.7).slice(0, 6);

  const handleAddToCart = (product: any) => {
    addToCart(product);
  };

  return (
    <div className="space-y-6">
      {/* Hero Banners (Carousel) */}
      <div className="px-4 relative">
        <div className="relative w-full h-[160px] rounded-lg overflow-hidden">
          {bannerData.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute top-0 left-0 w-full h-full bg-gradient-to-r ${banner.bgColor} rounded-lg p-4 text-white transition-opacity duration-500 ease-in-out ${index === currentBannerIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              <h3 className="text-lg font-bold">{banner.title}</h3>
              <p className="text-sm opacity-90">{banner.description}</p>
              <Badge className={`mt-2 bg-white ${banner.badgeColor}`}>{banner.badge}</Badge>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevBanner}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-20 hover:bg-opacity-75 transition-opacity"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextBanner}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-20 hover:bg-opacity-75 transition-opacity"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dot Indicators */}
        <div className="flex justify-center absolute bottom-4 left-0 right-0 z-20">
          {bannerData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBannerIndex(index)}
              className={`w-2 h-2 mx-1 rounded-full ${index === currentBannerIndex ? 'bg-white' : 'bg-gray-400'} hover:bg-white transition-colors`}
            ></button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="px-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Shop by Category</h2>
        <div className="grid grid-cols-4 gap-3">
          {categories.slice(0, 8).map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="bg-white rounded-lg p-4 text-center shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="text-2xl mb-2">{category.icon}</div>
              <span className="text-xs font-medium text-gray-700">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-red-500" />
            <h2 className="text-xl font-bold text-gray-900">Hot Deals</h2>
          </div>
          <Link to="/category/processors" className="flex items-center text-blue-600 text-sm font-medium">
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        <ScrollArea className="w-full">
          <div className="flex space-x-4 pb-4">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="w-40 flex-shrink-0 bg-white shadow-sm border border-gray-200">
                <Link to={`/product/${product.id}`} className="block">
                  <CardContent className="p-3">
                    <div className="relative mb-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-24 object-cover rounded-md"
                      />
                      {product.discount && (
                        <Badge className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1">
                          -{product.discount}%
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-xs font-medium text-gray-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-600">{product.rating}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-bold text-gray-900">
                        Rp {product.price.toLocaleString()}
                      </div>
                      {product.originalPrice && (
                        <div className="text-xs text-gray-500 line-through">
                          Rp {product.originalPrice.toLocaleString()}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Link>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full mt-2 bg-black text-white text-xs py-2 rounded-md hover:bg-gray-800 transition-colors"
                >
                  Add to Cart
                </button>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* New Products */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <h2 className="text-xl font-bold text-gray-900">New Arrivals</h2>
          </div>
          <Link to="/category/graphics-cards" className="flex items-center text-blue-600 text-sm font-medium">
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        <ScrollArea className="w-full">
          <div className="flex space-x-4 pb-4">
            {newProducts.map((product) => (
              <Card key={product.id} className="w-40 flex-shrink-0 bg-white shadow-sm border border-gray-200">
                <Link to={`/product/${product.id}`} className="block">
                  <CardContent className="p-3">
                    <div className="relative mb-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-24 object-cover rounded-md"
                      />
                      <Badge className="absolute top-1 right-1 bg-green-500 text-white text-xs px-1">
                        New
                      </Badge>
                    </div>
                    <h3 className="text-xs font-medium text-gray-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-600">{product.rating}</span>
                    </div>
                    <div className="text-sm font-bold text-gray-900 mb-2">
                      Rp {product.price.toLocaleString()}
                    </div>
                  </CardContent>
                </Link>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-black text-white text-xs py-2 rounded-md hover:bg-gray-800 transition-colors"
                >
                  Add to Cart
                </button>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* Top Rated */}
      <div className="px-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            <h2 className="text-xl font-bold text-gray-900">Top Rated</h2>
          </div>
          <Link to="/category/motherboards" className="flex items-center text-blue-600 text-sm font-medium">
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        <ScrollArea className="w-full">
          <div className="flex space-x-4 pb-4">
            {topRatedProducts.map((product) => (
              <Card key={product.id} className="w-40 flex-shrink-0 bg-white shadow-sm border border-gray-200">
                <Link to={`/product/${product.id}`} className="block">
                  <CardContent className="p-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-24 object-cover rounded-md mb-3"
                    />
                    <h3 className="text-xs font-medium text-gray-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-600">{product.rating}</span>
                      <span className="text-xs text-gray-500">({product.reviews})</span>
                    </div>
                    <div className="text-sm font-bold text-gray-900 mb-2">
                      Rp {product.price.toLocaleString()}
                    </div>
                  </CardContent>
                </Link>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-black text-white text-xs py-2 rounded-md hover:bg-gray-800 transition-colors"
                >
                  Add to Cart
                </button>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};