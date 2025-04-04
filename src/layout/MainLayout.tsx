
import React from 'react';
import Header from '../components/Header';
import { Toaster } from "@/components/ui/toaster";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6 md:px-6">
        {children}
      </main>
      <footer className="bg-white border-t py-4">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© 2025 Road Watch. All rights reserved.</p>
          <p className="mt-1">A community-driven platform for road quality monitoring.</p>
        </div>
      </footer>
      <Toaster />
    </div>
  );
};

export default MainLayout;
