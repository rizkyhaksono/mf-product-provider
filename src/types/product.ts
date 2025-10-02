export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: number;
  stock: number;
  featured?: boolean;
}

export interface ProductFilterOptions {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  // added 'popular' as a valid sort option
  sortBy?: 'price-asc' | 'price-desc' | 'name' | 'rating' | 'popular';
  searchQuery?: string;
}

export interface CartItem extends Product {
  quantity: number;
}
