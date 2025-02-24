
import { BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import AppRoutes from './routes/AppRoutes'
import Register from './pages/Register'

function App() {

  return (

    <BrowserRouter>
        <AppRoutes />
    </BrowserRouter>
    // <Login />
    // <Register />
  )
}

export default App
