import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Movie from '../pages/Movie'
import Login from '../pages/Login'
import Register from '../pages/Register'

export default function AppRoutes() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/cadastrar" element={<Register />} />
      </Routes>
  )
}
