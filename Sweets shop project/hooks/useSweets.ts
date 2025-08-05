import { useState, useEffect } from 'react';
import { fetchSweetsFromGemini } from '../services/geminiService';
import { type Product } from '../types';

export const useSweets = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadSweets = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const fetchedSweets = await fetchSweetsFromGemini();
                setProducts(fetchedSweets);
            } catch (err) {
                console.error("Error fetching sweets:", err);
                if (err instanceof Error) {
                    setError(`Failed to load sweets. ${err.message}. Please check if the API key is configured correctly.`);
                } else {
                    setError("An unknown error occurred while fetching sweets.");
                }
            } finally {
                setIsLoading(false);
            }
        };

        loadSweets();
    }, []); // Empty dependency array ensures this runs only once on mount

    return { products, isLoading, error };
};
