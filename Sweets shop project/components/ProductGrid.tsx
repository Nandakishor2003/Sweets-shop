import React from 'react';
import { ProductCard } from './ProductCard';
import { type Product } from '../types';

interface ProductGridProps {
    products: Product[];
    onAddToCart: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart }) => {
    if (products.length === 0) {
        return <div className="text-center py-12 text-stone-500">No sweets available at the moment. Please check back later!</div>
    }
    
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, index) => (
                <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} index={index} />
            ))}
        </div>
    );
};
