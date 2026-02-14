import { useState } from "react"
import ProductGrid from "./components/ProductGrid"
import ProductDetails from "./components/ProductDetails"
import { Product } from "./types/product"
import { products } from "./data/products"

const App = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const handleAddToCart = (product: Product, quantity = 1) => {
    console.log(`Added ${quantity}x ${product.name} to cart`)
    alert(`Added ${quantity}x ${product.name} to cart!`)
    setSelectedProduct(null)
  }

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-zinc-900 mb-4">Product Provider</h1>
          <p className="text-zinc-500 text-lg">Discover amazing products at great prices</p>
        </div>

        <ProductGrid products={products} onAddToCart={handleAddToCart} onViewDetails={handleViewDetails} />

        {selectedProduct && <ProductDetails product={selectedProduct} onAddToCart={handleAddToCart} onClose={() => setSelectedProduct(null)} />}
      </div>
    </div>
  )
}

export default App
