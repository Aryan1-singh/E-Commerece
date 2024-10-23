import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/login';
import Dashboard from './components/Dashboard/dashboard';
import Order from './components/Order/order';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/order" element={<Order />} />
            </Routes>
        </Router>
    );
};

export default App;
