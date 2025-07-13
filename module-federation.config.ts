import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin';

export default createModuleFederationConfig({
  name: 'mfProductProvider',
  exposes: {
    './ProductComponent': './src/components/ProviderComponent.tsx',
    './ProductCard': './src/components/ProductCard.tsx',
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
  },
  dts: false,
});
