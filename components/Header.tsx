
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-3xl mx-auto py-4 px-4 sm:px-6 md:px-8">
        <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-rose-500">
              AtivaPartoPro
            </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
