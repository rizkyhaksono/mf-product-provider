import React, { useState, useMemo } from "react"
import { Product, ProductFilterOptions } from "../types/product"
import ProductCard from "./ProductCard"
import { Search } from "lucide-react"

interface ProductGridProps {
  products?: Product[]
  onAddToCart?: (product: Product) => void
  onViewDetails?: (product: Product) => void
}

const ProductGrid: React.FC<ProductGridProps> = ({ products: propProducts, onAddToCart, onViewDetails }) => {
  const [filters, setFilters] = useState<ProductFilterOptions>({
    category: "All",
    sortBy: "name",
    searchQuery: "",
    minPrice: 0,
    maxPrice: 500,
  })

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [visibleCount, setVisibleCount] = useState<number>(6)

  // Sample products (used when no `products` prop is provided)
  const sampleProducts: Product[] = [
    {
      id: "1",
      name: "Premium Wireless Headphones",
      description: "High-quality sound with active noise cancellation",
      price: 299,
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      rating: 4.8,
      stock: 45,
      featured: true,
    },
    {
      id: "2",
      name: "Smart Watch Pro",
      description: "Track your fitness and stay connected",
      price: 399,
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
      rating: 4.6,
      stock: 12,
    },
    {
      id: "3",
      name: "Leather Messenger Bag",
      description: "Handcrafted genuine leather bag",
      price: 179,
      category: "Fashion",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
      rating: 4.9,
      stock: 28,
      featured: true,
    },
    {
      id: "4",
      name: "Organic Coffee Beans",
      description: "Single-origin Ethiopian coffee",
      price: 24,
      category: "Food",
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&h=500&fit=crop",
      rating: 4.7,
      stock: 156,
    },
    {
      id: "5",
      name: "Yoga Mat Premium",
      description: "Non-slip eco-friendly material",
      price: 49,
      category: "Sports",
      image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop",
      rating: 4.5,
      stock: 8,
    },
    {
      id: "6",
      name: "Minimalist Desk Lamp",
      description: "LED lamp with adjustable brightness",
      price: 89,
      category: "Home",
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop",
      rating: 4.4,
      stock: 0,
    },
  ]

  const products: Product[] = propProducts && propProducts.length ? propProducts : sampleProducts

  const categories = useMemo(() => {
    return ["All", ...new Set(products.map((p) => p.category))]
  }, [products])

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products]

    if (filters.category && filters.category !== "All") {
      filtered = filtered.filter((p) => p.category === filters.category)
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      filtered = filtered.filter((p) => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query) || p.category.toLowerCase().includes(query))
    }

    if (filters.minPrice !== undefined) {
      filtered = filtered.filter((p) => p.price >= filters.minPrice!)
    }
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter((p) => p.price <= filters.maxPrice!)
    }

    switch (filters.sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "popular":
        // Popular: featured first, then rating, then stock
        filtered.sort((a, b) => {
          if ((b.featured ? 1 : 0) !== (a.featured ? 1 : 0)) return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
          if (b.rating !== a.rating) return b.rating - a.rating
          return b.stock - a.stock
        })
        break
      case "name":
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
    }

    return filtered
  }, [products, filters])

  const handleAddToCart = (product: Product) => {
    if (onAddToCart) return onAddToCart(product)
    // fallback behavior for quick local testing
    alert(`Added "${product.name}" to cart!`)
  }

  const handleViewDetails = (product: Product) => {
    if (onViewDetails) return onViewDetails(product)
    // fallback
    alert(`Viewing details for "${product.name}"`)
  }

  const clearFilters = () => {
    setFilters({
      category: "All",
      sortBy: "name",
      searchQuery: "",
      minPrice: 0,
      maxPrice: 500,
    })
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-900 mb-2">Discover Products</h1>
          <p className="text-zinc-500">Find your perfect match from our curated collection</p>
        </div>

        {/* Filters Section */}
        <div className="bg-white/80 backdrop-blur-xl border border-zinc-200 rounded-2xl p-6 mb-6 shadow-sm">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products, categories, or brands..."
                value={filters.searchQuery}
                onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                className="w-full px-4 py-4 pl-12 border-2 border-zinc-200 rounded-xl focus:border-zinc-900 focus:ring-4 focus:ring-zinc-100 focus:outline-none transition-all text-zinc-900 placeholder-zinc-400 font-medium"
              />
              {filters.searchQuery && (
                <button onClick={() => setFilters({ ...filters, searchQuery: "" })} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600">
                  ✕
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {/* Category Filter */}
            <div>
              <label htmlFor="filter-category" className="block text-sm font-bold text-zinc-700 mb-2">
                Category
              </label>
              <select
                id="filter-category"
                value={filters.category || "All"}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="w-full px-4 py-3 border-2 border-zinc-200 rounded-xl focus:border-zinc-900 focus:ring-4 focus:ring-zinc-100 focus:outline-none transition-all bg-white font-medium text-zinc-900"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label htmlFor="filter-sortby" className="block text-sm font-bold text-zinc-700 mb-2">
                Sort By
              </label>
              <select
                id="filter-sortby"
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    sortBy: e.target.value as ProductFilterOptions["sortBy"],
                  })
                }
                className="w-full px-4 py-3 border-2 border-zinc-200 rounded-xl focus:border-zinc-900 focus:ring-4 focus:ring-zinc-100 focus:outline-none transition-all bg-white font-medium text-zinc-900"
              >
                <option value="name">Name (A-Z)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
                <option value="rating">Top Rated</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>

            {/* Price Range */}
            <div className="md:col-span-2">
              <label htmlFor="filter-maxprice" className="block text-sm font-bold text-zinc-700 mb-2">
                Max Price: ${filters.maxPrice ?? 500}
              </label>
              <input
                id="filter-maxprice"
                type="range"
                min="0"
                max="500"
                step="10"
                value={filters.maxPrice ?? 500}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    maxPrice: parseInt(e.target.value),
                  })
                }
                className="w-full h-3 bg-zinc-200 rounded-full appearance-none cursor-pointer accent-zinc-900"
              />
              <div className="flex justify-between text-xs text-zinc-500 mt-1 font-medium">
                <span>$0</span>
                <span>$500</span>
              </div>
            </div>
          </div>

          {/* Results Count and Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-zinc-200">
            <div className="flex items-center gap-4">
              <div className="text-sm font-bold text-gray-900">
                <span className="text-zinc-900 text-lg">{Math.min(filteredAndSortedProducts.length, visibleCount)}</span> of {filteredAndSortedProducts.length} results
                <span className="text-zinc-400"> · total {products.length} products</span>
              </div>

              {/* View mode toggles */}
              <div className="flex items-center gap-2 bg-zinc-100 rounded-full p-1">
                <button onClick={() => setViewMode("grid")} aria-pressed={viewMode === "grid"} className={`px-3 py-1 rounded-lg text-sm font-semibold ${viewMode === "grid" ? "bg-white shadow" : "text-zinc-600"}`}>
                  Grid
                </button>
                <button onClick={() => setViewMode("list")} aria-pressed={viewMode === "list"} className={`px-3 py-1 rounded-lg text-sm font-semibold ${viewMode === "list" ? "bg-white shadow" : "text-zinc-600"}`}>
                  List
                </button>
              </div>
            </div>
            <button onClick={clearFilters} className="text-sm font-semibold text-zinc-600 hover:text-zinc-900 transition-colors">
              Clear all filters
            </button>
          </div>
        </div>

        {/* Products Grid */}
        {filteredAndSortedProducts.length === 0 ? (
          <div className="text-center py-20 bg-white/80 backdrop-blur-xl border border-zinc-200 rounded-2xl shadow-sm">
            <div className="w-24 h-24 mx-auto mb-6 bg-zinc-100 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-zinc-400" />
            </div>
            <h3 className="text-2xl font-bold text-zinc-900 mb-3">No products found</h3>
            <p className="text-zinc-500 mb-6">Try adjusting your filters or search terms</p>
            <button onClick={clearFilters} className="bg-zinc-900 hover:bg-zinc-800 text-white font-bold px-8 py-3 rounded-xl hover:shadow-xl transition-all duration-200">
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"}>
              {filteredAndSortedProducts.slice(0, visibleCount).map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} onViewDetails={handleViewDetails} />
              ))}
            </div>

            {visibleCount < filteredAndSortedProducts.length && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setVisibleCount((c) => Math.min(filteredAndSortedProducts.length, c + 6))}
                  className="bg-zinc-900 hover:bg-zinc-800 text-white font-bold px-6 py-3 rounded-xl hover:shadow-xl transition-all duration-200"
                >
                  Load more
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default ProductGrid
