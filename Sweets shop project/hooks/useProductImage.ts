import { useState, useEffect } from 'react';
import { generateImageFromPrompt } from '../services/geminiService';

// Module-level cache to persist across re-renders and components
const imageCache = new Map<string, string>();

export const useProductImage = (prompt: string, productId: string) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isCancelled = false;

        const fetchImage = async () => {
            if (!prompt || !productId) {
                setIsLoading(false);
                return;
            }

            // Use cached image if available
            if (imageCache.has(productId)) {
                if (!isCancelled) {
                    setImageUrl(imageCache.get(productId)!);
                    setIsLoading(false);
                }
                return;
            }

            // Fetch image from API
            try {
                if (!isCancelled) {
                    setIsLoading(true);
                    setError(null);
                }
                const base64Image = await generateImageFromPrompt(prompt);
                const url = `data:image/jpeg;base64,${base64Image}`;
                
                if (!isCancelled) {
                    imageCache.set(productId, url);
                    setImageUrl(url);
                }
            } catch (err) {
                console.error("Error generating image:", err);
                if (!isCancelled) {
                    setError("Could not load image.");
                }
            } finally {
                if (!isCancelled) {
                    setIsLoading(false);
                }
            }
        };

        fetchImage();

        return () => {
            isCancelled = true;
        };
    }, [prompt, productId]);

    return { imageUrl, isLoading, error };
};
