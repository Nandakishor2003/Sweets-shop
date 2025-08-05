import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-white border-t border-stone-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-stone-500">
                <p>&copy; {new Date().getFullYear()} Gemini Sweet Creations. All rights reserved.</p>
                <p className="text-sm mt-1">Invented by AI, perfected for you.</p>
            </div>
        </footer>
    );
};
