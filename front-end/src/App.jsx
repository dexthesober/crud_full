import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Task from './pages/Task'
import './styles.css'



export default function App() {
  return (
    <div className="min-h-screen rounded-2xl bg-gradient-to-r from-blue-800 to-pink-600  text-white shadow-md">
        <Navbar/>
      <div className="container my-20 mx-auto p-4">
       
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/tasks" element={<ProtectedRoute><Task /></ProtectedRoute>} />

        </Routes>
      </div>
    </div>
  )
}
