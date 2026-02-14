# mf-product-provider

A Module Federation **provider** that exposes product catalog components for the ShopHub e-commerce platform.

## Exposed Modules

| Module             | Component        | Description                                                                      |
| ------------------ | ---------------- | -------------------------------------------------------------------------------- |
| `./ProductCard`    | `ProductCard`    | Individual product card with image, Quick View, wishlist, ratings, add-to-cart   |
| `./ProductGrid`    | `ProductGrid`    | Filterable, searchable product grid with category, sort, and price range filters |
| `./ProductDetails` | `ProductDetails` | Full product detail modal with quantity selector and add-to-cart                 |
| `./products`       | Product data     | Sample product dataset                                                           |
| `./types`          | TypeScript types | `Product`, `ProductFilterOptions` type definitions                               |

## Usage in Consumer

```tsx
import ProductGrid from "productProvider/ProductGrid"
import ProductDetails from "productProvider/ProductDetails"

<ProductGrid
  products={products}
  onAddToCart={handleAddToCart}
  onViewDetails={handleViewDetails}
/>

<ProductDetails
  product={selectedProduct}
  onAddToCart={handleAddToCart}
  onClose={() => setSelectedProduct(null)}
/>
```

## Development

```bash
bun install
bun run dev        # starts on :3002
bun run build
bun run preview
```

## Module Federation Config

```ts
name: "mfProductProvider"
// Manifest: http://localhost:3002/mf-manifest.json
```

## Port

`http://localhost:3002`
