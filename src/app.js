import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Inicio from './components/Homepage/Inicio';
import Profile from './components/Inicio/Profile';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);

reportWebVitals();
