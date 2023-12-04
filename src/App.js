import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './components/screens/HomeScreen';
import VideoDetailScreen from './components/screens/VideoDetailScreen';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes> 
          <Route path="/" element={<HomeScreen />} />
          <Route path="/video-details" element={<VideoDetailScreen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
