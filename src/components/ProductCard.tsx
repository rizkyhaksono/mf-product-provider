import React, { useState } from 'react';
import { Product } from '../types/product';
import { Heart, ShoppingCart, Star, TrendingUp, Package, Eye } from 'lucide-react';

// ProductCard Component
const ProductCard: React.FC<{
  product: Product;
  onAddToCart?: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
}> = ({ product, onAddToCart, onViewDetails }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart && product.stock > 0) {
      onAddToCart(product);
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const stockPercentage = Math.min(Math.round((product.stock / 100) * 100), 100);
  const isLowStock = product.stock < 20 && product.stock > 0;

  return (
    <article
      className="group relative bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200 hover:-translate-y-1"
    >
      {/* Badges Container */}
      <div className="absolute top-3 left-3 right-3 z-10 flex justify-between items-start">
        <div className="flex flex-col gap-2">
          {product.featured && (
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg backdrop-blur-sm flex items-center gap-1.5">
              <TrendingUp className="w-3 h-3" />
              Featured
            </span>
          )}
          {isLowStock && (
            <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg backdrop-blur-sm animate-pulse flex items-center gap-1.5">
              <Package className="w-3 h-3" />
              Only {product.stock} left
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
        >
          <Heart
            className={`w-5 h-5 transition-all duration-300 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
              }`}
          />
        </button>
      </div>

      {/* Image Container */}
      <div className="relative w-full h-64 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          </div>
        )}
        <img
          src={product.image}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            } group-hover:scale-110`}
          loading="lazy"
        />

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails?.(product);
            }}
            className="bg-white text-gray-900 px-6 py-2.5 rounded-full font-semibold text-sm flex items-center gap-2 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            <Eye className="w-4 h-4" />
            Quick View
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category */}
        <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2 flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
          {product.category}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem] group-hover:text-blue-600 transition-colors">
          <button
            onClick={() => onViewDetails?.(product)}
            className="text-left w-full"
            aria-label={`View details for ${product.name}`}
          >
            {product.name}
          </button>
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[2.5rem] leading-relaxed">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-1" aria-hidden>
            {[1, 2, 3, 4, 5].map((n) => {
              const full = n <= Math.floor(product.rating);
              const partial = !full && n - 1 < product.rating;
              let starClass = 'text-gray-300';
              if (full) {
                starClass = 'fill-yellow-400 text-yellow-400';
              } else if (partial) {
                starClass = 'fill-yellow-400 text-yellow-400 opacity-50';
              }
              return (
                <Star
                  key={`${product.id}-star-${n}`}
                  className={`w-4 h-4 transition-all duration-200 ${starClass}`}
                />
              );
            })}
          </div>
          <span className="text-sm font-bold text-gray-900">
            {product.rating.toFixed(1)}
          </span>
        </div>

        {/* Stock Progress Bar */}
        {product.stock > 0 && product.stock < 50 && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Stock</span>
              <span className="font-semibold">{product.stock} units</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              {(() => {
                let stockColorClass = 'bg-red-500';
                if (stockPercentage > 50) stockColorClass = 'bg-green-500';
                else if (stockPercentage > 20) stockColorClass = 'bg-yellow-500';
                return (
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${stockColorClass}`}
                    style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                  />
                );
              })()}
            </div>
          </div>
        )}

        {/* Price and Button */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <div className="text-3xl font-black text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ${product.price}
            </div>
            <div className="text-xs text-gray-500 mt-0.5 font-medium">
              Free shipping
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`${product.stock === 0
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl active:scale-95'
              } font-bold text-sm px-5 py-3 rounded-xl transition-all duration-200 flex items-center gap-2`}
          >
            <ShoppingCart className="w-4 h-4" />
            {product.stock === 0 ? 'Sold Out' : 'Add'}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;