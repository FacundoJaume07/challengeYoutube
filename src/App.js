import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './components/screens/HomeScreen';
import VideoDetailScreen from './components/screens/VideoDetailScreen';
import { VideoProvider } from './context/VideoContext'; 


function App() {
  return (
    <div className="App">
      <Router>
        <VideoProvider>
          <Routes> 
            <Route path="/" element={<HomeScreen />} />
            <Route path="/video-details/:id" element={<VideoDetailScreen />} />
          </Routes>
        </VideoProvider>
      </Router>
    </div>
  );
}

export default App;
