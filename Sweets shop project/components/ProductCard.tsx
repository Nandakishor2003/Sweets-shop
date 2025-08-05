import React from 'react';
import { StarRating } from './StarRating';
import { ProductImage } from './ProductImage';
import { type Product } from '../types';
import { formatCurrency } from '../utils/currency';


interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
    index: number;
}

const AddToCartIcon = () => (
    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg>
);


export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, index }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out overflow-hidden flex flex-col group"
             style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.05}s forwards`, opacity: 0 }}
        >
            <div className="relative overflow-hidden">
                 <ProductImage
                    prompt={product.imagePrompt}
                    productId={product.id}
                    alt={product.name}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-stone-800 truncate" title={product.name}>{product.name}</h3>
                <div className="flex items-center my-2">
                    <StarRating rating={product.rating} />
                    <span className="text-xs text-stone-500 ml-2">({product.rating.toFixed(1)})</span>
                </div>
                <p className="text-stone-600 text-sm mb-4 flex-grow">{product.description}</p>
                <div className="flex items-center justify-between mt-auto">
                    <p className="text-2xl font-extrabold text-rose-600">
                        {formatCurrency(product.price)}
                    </p>
                    <button 
                        onClick={() => onAddToCart(product)} 
                        className="flex items-center justify-center bg-rose-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-opacity-75 transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <AddToCartIcon />
                        Add
                    </button>
                </div>
            </div>
            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};
