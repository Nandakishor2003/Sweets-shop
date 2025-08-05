import React from 'react';
import { type CartItem } from '../types';
import { formatCurrency } from '../utils/currency';
import { ProductImage } from './ProductImage';

interface CartSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    items: CartItem[];
    onRemoveItem: (id: string) => void;
    onUpdateQuantity: (id: string, quantity: number) => void;
}

const CloseIcon = () => (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const TrashIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
);

export const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, items, onRemoveItem, onUpdateQuantity }) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <>
            <div 
                className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />
            <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-6 border-b border-stone-200">
                        <h2 className="text-2xl font-bold text-rose-800">Your Cart</h2>
                        <button onClick={onClose} className="p-2 rounded-full text-stone-500 hover:bg-stone-100 hover:text-stone-800 transition-colors">
                           <CloseIcon/>
                        </button>
                    </div>

                    <div className="flex-grow overflow-y-auto p-6">
                        {items.length === 0 ? (
                            <div className="text-center text-stone-500 h-full flex flex-col justify-center">
                                <p>Your cart is empty.</p>
                                <p className="text-sm">Time to add some sweets!</p>
                            </div>
                        ) : (
                            <ul className="space-y-4">
                                {items.map(item => (
                                    <li key={item.id} className="flex items-start space-x-4">
                                        <ProductImage
                                            prompt={item.imagePrompt}
                                            productId={item.id}
                                            alt={item.name}
                                            className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                                        />
                                        <div className="flex-grow">
                                            <h3 className="font-semibold text-stone-800">{item.name}</h3>
                                            <p className="text-sm text-stone-500">{formatCurrency(item.price)}</p>
                                            <div className="flex items-center mt-2">
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={item.quantity}
                                                    onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value, 10))}
                                                    className="w-16 text-center border rounded-md"
                                                />
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-stone-800">{formatCurrency(item.price * item.quantity)}</p>

                                            <button onClick={() => onRemoveItem(item.id)} className="text-red-500 hover:text-red-700 mt-2 text-sm p-1">
                                                <TrashIcon />
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    
                    {items.length > 0 && (
                        <div className="p-6 border-t border-stone-200 bg-stone-50">
                            <div className="flex justify-between items-center text-lg font-semibold text-stone-800 mb-4">
                                <span>Subtotal</span>
                                <span>{formatCurrency(total)}</span>
                            </div>
                            <button className="w-full bg-rose-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-rose-700 transition-colors shadow-lg hover:shadow-xl">
                                Proceed to Checkout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
