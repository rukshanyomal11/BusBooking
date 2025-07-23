import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import BookingPage from './pages/Dashboard/BookingPage';
import ResponsePage from './pages/Dashboard/ResponsePage';
import AccountsPage from './pages/Dashboard/AccountsPage';
import HelpPage from './pages/Dashboard/HelpPage';
import AdminUsers from './pages/Admin/AdminUsers';
import AdminRequests from './pages/Admin/AdminRequests';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<div className="min-h-screen bg-gray-100 flex items-center justify-center"> <Login /></div>} />
          <Route path="/signup" element={<div className="min-h-screen bg-gray-100 flex items-center justify-center"> <Signup /></div>} />
          
          <Route path="/dashboard/booking" element={<BookingPage />} />
          <Route path="/dashboard/response" element={<ResponsePage />} />
          <Route path="/dashboard/accounts" element={<AccountsPage />} />
          <Route path="/dashboard/help" element={<HelpPage />} />

          <Route path="/admin/users" element={<AdminUsers/>} />
          <Route path="/admin/requests" element={<AdminRequests />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;