import React, { useState } from "react"
import { Product } from "../types/product"
import { Heart, ShoppingCart, Star, TrendingUp, Package, Eye } from "lucide-react"

// ProductCard Component
const ProductCard: React.FC<{
  product: Product
  onAddToCart?: (product: Product) => void
  onViewDetails?: (product: Product) => void
}> = ({ product, onAddToCart, onViewDetails }) => {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onAddToCart && product.stock > 0) {
      onAddToCart(product)
    }
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
  }

  const stockPercentage = Math.min(Math.round((product.stock / 100) * 100), 100)
  const isLowStock = product.stock < 20 && product.stock > 0

  return (
    <article className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-zinc-200 hover:border-zinc-300">
      {/* Badges Container */}
      <div className="absolute top-3 left-3 right-3 z-10 flex justify-between items-start">
        <div className="flex flex-col gap-2">
          {product.featured && (
            <span className="bg-zinc-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg backdrop-blur-sm flex items-center gap-1.5">
              <TrendingUp className="w-3 h-3" />
              Featured
            </span>
          )}
          {isLowStock && (
            <span className="bg-zinc-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg backdrop-blur-sm animate-pulse flex items-center gap-1.5">
              <Package className="w-3 h-3" />
              Only {product.stock} left
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button onClick={handleWishlist} className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:scale-110 transition-transform duration-200">
          <Heart className={`w-5 h-5 transition-all duration-300 ${isWishlisted ? "fill-red-500 text-red-500" : "text-zinc-600"}`} />
        </button>
      </div>

      {/* Image Container */}
      <div className="relative w-full h-64 overflow-hidden bg-zinc-100">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 border-3 border-zinc-200 border-t-zinc-900 rounded-full animate-spin" />
          </div>
        )}
        <img
          src={product.image}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-500 ${imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"} group-hover:scale-105`}
          loading="lazy"
        />

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onViewDetails?.(product)
            }}
            className="bg-white text-zinc-900 px-5 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 shadow-lg opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300"
          >
            <Eye className="w-4 h-4" />
            Quick View
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category */}
        <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">{product.category}</div>

        {/* Title */}
        <h3 className="text-base font-bold text-zinc-900 mb-1.5 line-clamp-2 min-h-[3rem] group-hover:text-zinc-700 transition-colors">
          <button onClick={() => onViewDetails?.(product)} className="text-left w-full" aria-label={`View details for ${product.name}`}>
            {product.name}
          </button>
        </h3>

        {/* Description */}
        <p className="text-sm text-zinc-500 mb-3 line-clamp-2 min-h-[2.5rem] leading-relaxed">{product.description}</p>

        {/* Rating */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-0.5" aria-hidden>
            {[1, 2, 3, 4, 5].map((n) => {
              const full = n <= Math.floor(product.rating)
              const partial = !full && n - 1 < product.rating
              let starClass = "text-zinc-200"
              if (full) {
                starClass = "fill-amber-400 text-amber-400"
              } else if (partial) {
                starClass = "fill-amber-400 text-amber-400 opacity-50"
              }
              return <Star key={`${product.id}-star-${n}`} className={`w-3.5 h-3.5 ${starClass}`} />
            })}
          </div>
          <span className="text-sm font-semibold text-zinc-700">{product.rating.toFixed(1)}</span>
        </div>

        {/* Stock Progress Bar */}
        {product.stock > 0 && product.stock < 50 && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-zinc-500 mb-1">
              <span>Stock</span>
              <span className="font-semibold">{product.stock} units</span>
            </div>
            <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
              {(() => {
                let stockColorClass = "bg-red-400"
                if (stockPercentage > 50) stockColorClass = "bg-emerald-400"
                else if (stockPercentage > 20) stockColorClass = "bg-amber-400"
                return <div className={`h-full rounded-full transition-all duration-500 ${stockColorClass}`} style={{ width: `${Math.min(stockPercentage, 100)}%` }} />
              })()}
            </div>
          </div>
        )}

        {/* Price and Button */}
        <div className="flex items-center justify-between pt-3 border-t border-zinc-100">
          <div>
            <div className="text-2xl font-black text-zinc-900">${product.price}</div>
            <div className="text-xs text-zinc-400 mt-0.5 font-medium">Free shipping</div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`${
              product.stock === 0 ? "bg-zinc-100 text-zinc-400 cursor-not-allowed" : "bg-zinc-900 hover:bg-zinc-800 text-white shadow-sm hover:shadow-md active:scale-95"
            } font-semibold text-sm px-4 py-2.5 rounded-lg transition-all duration-200 flex items-center gap-2`}
          >
            <ShoppingCart className="w-4 h-4" />
            {product.stock === 0 ? "Sold Out" : "Add"}
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
