import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";
import "./App1.css";

import Dashboard from "./pages/Dashboard";

import MainLayout from "./pages/MainLayout";
import ExamManagement from "./pages/exam_management/ExamManagement";
import SignIn from "./pages/auth/signin/SignIn";
import SignUp from "./pages/auth/signup/SignUp";

function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Protected Routes */}
        {isLogin ? (
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/exam-management" element={<ExamManagement />} />
            {/* Redirect to default dashboard route */}
            <Route path="/*" element={<Navigate to="/dashboard" />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Route>
        ) : (
          // Redirect if not logged in
          <Route path="*" element={<Navigate to="/signin" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
