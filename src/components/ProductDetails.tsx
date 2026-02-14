import React, { useState } from "react"
import { Product } from "../types/product"

interface ProductDetailsProps {
  product: Product
  onAddToCart?: (product: Product, quantity: number) => void
  onClose?: () => void
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onAddToCart, onClose }) => {
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product, quantity)
    }
  }

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto ring-1 ring-zinc-900/5" role="dialog" aria-modal="true">
        {/* Close Button */}
        <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 flex justify-end p-4 border-b border-zinc-100">
          <button onClick={onClose} className="p-2 text-zinc-400 hover:text-zinc-900 bg-transparent hover:bg-zinc-100 rounded-full transition-all duration-200" aria-label="Close details">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image Section */}
            <div>
              <div className="relative rounded-xl overflow-hidden bg-zinc-100 aspect-square">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                {product.featured && <div className="absolute top-4 left-4 bg-zinc-900 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">Featured Product</div>}
              </div>
            </div>

            {/* Details Section */}
            <div>
              {/* Category */}
              <div className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-2">{product.category}</div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-zinc-900 mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <svg key={index} className={`w-5 h-5 ${index < Math.floor(product.rating) ? "text-amber-400 fill-current" : "text-zinc-200"}`} viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <span className="text-lg text-zinc-600 font-medium">{product.rating.toFixed(1)} / 5.0</span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="text-4xl font-bold text-zinc-900 mb-2">${product.price}</div>
                <div className="text-sm text-zinc-600">
                  {product.stock > 0 ? <span className="text-emerald-600 font-semibold">In Stock ({product.stock} available)</span> : <span className="text-red-600 font-semibold">Out of Stock</span>}
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-zinc-800 mb-2">Description</h3>
                <p className="text-zinc-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-zinc-700 mb-3">Quantity</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="w-10 h-10 rounded-lg bg-zinc-100 hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-bold text-xl transition-colors"
                  >
                    -
                  </button>
                  <span className="text-2xl font-bold text-zinc-900 min-w-[3rem] text-center">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stock}
                    className="w-10 h-10 rounded-lg bg-zinc-100 hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-bold text-xl transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`w-full ${
                  product.stock === 0 ? "bg-zinc-200 cursor-not-allowed" : "bg-zinc-900 hover:bg-zinc-800 active:scale-95"
                } text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl text-lg`}
              >
                {product.stock === 0 ? "Out of Stock" : `Add ${quantity} to Cart - $${(product.price * quantity).toFixed(2)}`}
              </button>

              {/* Additional Info */}
              <div className="mt-8 pt-8 border-t space-y-3">
                <div className="flex items-center gap-3 text-sm text-zinc-600">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-600">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>30-day return policy</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-600">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>1-year warranty included</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
