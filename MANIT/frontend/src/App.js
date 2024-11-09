import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index' 
import Colorpallete from './pages/Colorpallete'
import Artworkanalysis from './pages/Artworkanalysis'
import Creativecollaboration from './pages/Creativecollaboration';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import FileUpload from './pages/FileUpload';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/Signup" element={<SignupPage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/color-palette" element={<Colorpallete />} />
          <Route path="/artwork-analysis" element={<Artworkanalysis />} />
          <Route path='/creative-collaboration' element={<Creativecollaboration/>}/>
          <Route path='/file-upload' element={<FileUpload/>}/>

        </Routes>
      </Router>
    </div>
  );
};

export default App;