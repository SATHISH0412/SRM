import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home.jsx';
import Getpage from './components/Getpage.jsx'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filter" element={<Getpage />} />
      </Routes>
    </Router>
  );
};

export default App;
