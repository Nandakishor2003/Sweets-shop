import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ProductGrid } from './components/ProductGrid';
import { Footer } from './components/Footer';
import { CartSidebar } from './components/CartSidebar';
import { useSweets } from './hooks/useSweets';
import { Spinner } from './components/Spinner';
import { type Product, type CartItem } from './types';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { products, isLoading, error } = useSweets();

  const handleAddToCart = useCallback((product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);
  
  const handleRemoveFromCart = useCallback((productId: string) => {
      setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  }, []);

  const handleUpdateQuantity = useCallback((productId: string, quantity: number) => {
      if (quantity <= 0) {
          handleRemoveFromCart(productId);
          return;
      }
      setCartItems(prevItems => 
          prevItems.map(item => item.id === productId ? {...item, quantity} : item)
      );
  }, [handleRemoveFromCart]);

  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <Spinner />
            <p className="text-xl text-stone-600 mt-4">Generating today's delicious sweets...</p>
            <p className="text-sm text-stone-500">Our AI chef is working its magic!</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center min-h-[60vh] text-center text-red-500 bg-red-50 p-4 rounded-lg">
          <p className="text-xl">
            <span className="font-bold">Oops!</span> {error}
          </p>
        </div>
      );
    }
    
    return <ProductGrid products={products} onAddToCart={handleAddToCart} />;
  }

  return (
    <div className="min-h-screen flex flex-col font-sans text-stone-800 bg-rose-50/20">
      <Header cartItemCount={cartItemCount} onCartClick={() => setIsCartOpen(true)} />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-rose-800 tracking-tight" style={{fontFamily: "'Playfair Display', serif"}}>Sweet Creations</h1>
            <p className="mt-4 text-lg text-stone-600 max-w-2xl mx-auto">Handcrafted with love and a touch of AI magic. Discover your new favorite treat.</p>
        </div>
        {renderContent()}
      </main>
      <Footer />
      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
      />
    </div>
  );
}

export default App;
