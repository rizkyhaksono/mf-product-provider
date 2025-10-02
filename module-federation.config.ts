import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin';

export default createModuleFederationConfig({
  name: 'mfProductProvider',
  exposes: {
    './ProductCard': './src/components/ProductCard.tsx',
    './ProductGrid': './src/components/ProductGrid.tsx',
    './ProductDetails': './src/components/ProductDetails.tsx',
    './products': './src/data/products.ts',
    './types': './src/types/product.ts',
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
  },
  dts: false,
});
