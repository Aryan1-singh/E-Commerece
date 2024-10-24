import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/login';
import Dashboard from './components/Dashboard/dashboard';
import Order from './components/Order/order';
import About from './components/About/about';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/order" element={<Order />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </Router>
    );
};

export default App;
