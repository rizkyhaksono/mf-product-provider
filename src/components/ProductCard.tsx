import React from 'react';

interface ProductCardProps {
  name: string;
  price: number;
  image?: string;
  description?: string;
  onAddToCart?: (product: { name: string; price: number }) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  image = 'https://github.com/rizkyhaksono/rizkyhaksono/raw/main/banner-v6.png',
  description = 'No description available',
  onAddToCart
}) => {
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart({ name, price });
    }
  };

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      margin: '8px',
      maxWidth: '250px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      backgroundColor: 'white'
    }}>
      <img
        src={image}
        alt={name}
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
          borderRadius: '4px',
          marginBottom: '8px'
        }}
      />
      <h3 style={{
        margin: '0 0 8px 0',
        fontSize: '18px',
        color: '#333'
      }}>
        {name}
      </h3>
      <p style={{
        color: '#666',
        fontSize: '14px',
        margin: '0 0 12px 0',
        lineHeight: '1.4'
      }}>
        {description}
      </p>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#2196F3'
        }}>
          ${price}
        </span>
        <button
          onClick={handleAddToCart}
          style={{
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1976D2'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2196F3'}
          onFocus={(e) => e.currentTarget.style.backgroundColor = '#1976D2'}
          onBlur={(e) => e.currentTarget.style.backgroundColor = '#2196F3'}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
