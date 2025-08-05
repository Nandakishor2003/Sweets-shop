import { GoogleGenAI, Type } from "@google/genai";
import { type Product } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const sweetsSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      name: {
        type: Type.STRING,
        description: 'The creative and appealing name of the sweet.',
      },
      description: {
        type: Type.STRING,
        description: 'A short, enticing description (1-2 sentences) that makes the sweet sound delicious.',
      },
      price: {
        type: Type.INTEGER,
        description: 'The price of the sweet in Indian Rupees (INR), as an integer between 200 and 800.',
      },
      rating: {
          type: Type.NUMBER,
          description: 'A customer rating for the sweet, as a number between 4.0 and 5.0 with one decimal place.',
      },
      imagePrompt: {
        type: Type.STRING,
        description: 'A creative, descriptive prompt for an image generation model to create a photo of the sweet. e.g., "A glistening salted caramel celestial sphere on a dark slate plate."'
      }
    },
    required: ["name", "description", "price", "rating", "imagePrompt"],
  },
};

export const fetchSweetsFromGemini = async (): Promise<Product[]> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Generate a list of 12 unique and appetizing sweets for an online store. They should be creative and sound luxurious.",
            config: {
                systemInstruction: "You are a creative confectioner and marketing expert for a luxury sweet shop. Your task is to generate a list of unique and delicious sweets in JSON format according to the provided schema. Ensure prices and ratings are within the specified ranges.",
                responseMimeType: "application/json",
                responseSchema: sweetsSchema,
            },
        });

        const jsonText = response.text.trim();
        const parsedSweets: Omit<Product, 'id'>[] = JSON.parse(jsonText);

        // Add a unique ID to each product
        return parsedSweets.map((sweet, index) => ({
            ...sweet,
            id: `${sweet.name.replace(/\s+/g, '-')}-${index}`, // Create a simple, URL-friendly ID
        }));

    } catch (error) {
        console.error("Gemini API call failed:", error);
        // This makes the error more user-friendly if it bubbles up
        if (error instanceof Error && error.message.includes('API key')) {
             throw new Error("Invalid API Key. Please ensure your API_KEY is set correctly.");
        }
        throw new Error("Could not communicate with the Gemini API to fetch sweets.");
    }
};

export const generateImageFromPrompt = async (prompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-3.0-generate-002',
            prompt: `A professional, delicious-looking photograph of ${prompt}, with a clean, elegant background suitable for an e-commerce website. Aspect ratio 4:3.`,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio: '4:3',
            },
        });

        if (response.generatedImages.length === 0) {
            throw new Error("No image was generated.");
        }
        return response.generatedImages[0].image.imageBytes;
    } catch (error) {
        console.error("Image generation failed:", error);
        throw new Error("Could not generate image from prompt.");
    }
};
