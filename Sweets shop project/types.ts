export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  imagePrompt: string;
}

export interface CartItem extends Product {
  quantity: number;
}
