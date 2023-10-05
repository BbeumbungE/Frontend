import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import LoginTransitionPage from '../pages/LoginTransitionPage';
import FamilyProfilePage from '../pages/FamilyProfilePage';
import MainMenuPage from '../pages/MainMenuPage';
import DrawingTopicMenuPage from '../pages/DrawingTopicMenuPage';
import WatchingMenuPage from '../pages/WatchingMenuPage';
import TopicDrawingPage from '../pages/TopicDrawingPage';
import StageMapPage from '../pages/StageMapPage';
import StageDrawingPage from '../pages/StageDrawingPage';
import RankingPage from '../pages/RankingPage';
import TopicPage from '../pages/TopicPage';
import MyProfilePage from '../pages/MyProfilePage';
import CharacterChangePage from '../pages/CharacterChangePage';
import MyDrawingsPage from '../pages/MyDrawingsPage';
import StorePage from '../pages/StorePage';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/oauth/redirect" element={<LoginTransitionPage />} />
        <Route path="/profiles" element={<FamilyProfilePage />} />

        <Route path="/menu" element={<MainMenuPage />} />
        <Route path="/menu/draw" element={<DrawingTopicMenuPage />} />
        <Route path="/menu/view" element={<WatchingMenuPage />} />

        <Route path="/draw/topic" element={<TopicDrawingPage />} />
        <Route path="/stage" element={<StageMapPage />} />
        <Route path="/draw/stage" element={<StageDrawingPage />} />

        <Route path="/board/ranking/:topic" element={<RankingPage />} />
        <Route path="/board/:topic" element={<TopicPage />} />

        <Route path="/profile/manage" element={<MyProfilePage />} />
        <Route path="/profile/character" element={<CharacterChangePage />} />
        <Route path="/profile/drawings" element={<MyDrawingsPage />} />

        <Route path="/store" element={<StorePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
