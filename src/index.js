import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from './components/Login';
import Header from './components/Header';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>  
    <Header/>
  <Routes>
    <Route exact path="/" element={<App />} />
    <Route exact path="/login" element={<Login />} />
    <Route exact path="/signup" element={<Signup />} />
    <Route exact path="/dashboard" element={<Dashboard />} />
  </Routes>
</Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
