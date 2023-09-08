import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import MenuPage from '../pages/MenuPage';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/menu" element={<MenuPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
