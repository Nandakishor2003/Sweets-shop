import React from 'react';
import { useProductImage } from '../hooks/useProductImage';

interface ProductImageProps {
    prompt: string;
    productId: string;
    alt: string;
    className?: string;
}

const ImageSkeleton: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`bg-stone-200 animate-pulse ${className}`}></div>
);

export const ProductImage: React.FC<ProductImageProps> = ({ prompt, productId, alt, className }) => {
    const { imageUrl, isLoading, error } = useProductImage(prompt, productId);

    if (isLoading) {
        return <ImageSkeleton className={className} />;
    }

    if (error || !imageUrl) {
        // Fallback for when image fails to load
        return (
            <div className={`flex items-center justify-center bg-stone-100 text-stone-400 text-xs text-center p-2 ${className}`}>
                Image not available
            </div>
        );
    }

    return <img src={imageUrl} alt={alt} className={className} />;
};
