import React from 'react';

const LogoIcon = () => (
    <svg className="w-8 h-8 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v6m3-6v6m3-6v6M3 6h18M3 12h18m-9 9V9" />
    </svg>
);

const CartIcon = () => (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

interface HeaderProps {
    cartItemCount: number;
    onCartClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartItemCount, onCartClick }) => {
    return (
        <header className="bg-white/70 backdrop-blur-lg shadow-sm sticky top-0 z-40">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-2">
                        <LogoIcon />
                        <span className="text-xl font-semibold text-rose-800 tracking-wider">Gemini Sweets</span>
                    </div>
                    <div className="flex items-center">
                        <button onClick={onCartClick} className="relative p-2 rounded-full text-stone-600 hover:bg-rose-100 hover:text-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-colors">
                            <span className="sr-only">View cart</span>
                            <CartIcon />
                            {cartItemCount > 0 && (
                                <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-rose-500 text-white text-xs flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
                                    {cartItemCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};
