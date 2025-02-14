import React from 'react'
import Home from '../pages/Home'
import Movie from '../pages/Movie'
import { Route, Router, Routes } from 'react-router-dom'
import Register from '../pages/Register'

export default function AppRoutes() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/cadastrar" element={<Register />} />
      </Routes>
  )
}
