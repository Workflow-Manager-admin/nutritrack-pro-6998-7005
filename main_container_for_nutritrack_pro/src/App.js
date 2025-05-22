import React from 'react';
import './App.css';
import DailyLog from './containers/DailyLog/DailyLog';
import { NutritionProvider } from './context/NutritionContext';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">📊</span> NutriTrack Pro
            </div>
            <div className="nav-actions">
              <button className="btn">Settings</button>
            </div>
          </div>
        </div>
      </nav>

      <main style={{ paddingTop: '70px' }}>
        <NutritionProvider>
          <DailyLog />
        </NutritionProvider>
      </main>
    </div>
  );
}

export default App;