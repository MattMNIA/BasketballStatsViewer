import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import SearchGames from './pages/SearchGames';
import GameStatsPage from './pages/GameStatsPage';
import BoxScorePage from './pages/BoxScoreScreen';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route path="/" element={<SearchGames />} />
            <Route path="/game/:id" element={<GameStatsPage />} />
            <Route path="/game/boxscore/:id" element={<BoxScorePage />} />
          </Routes>
    </Router>
  );
}

export default App;
