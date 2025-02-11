import { BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import AppRoutes from './routes/AppRoutes'

function App() {

  return (
    <BrowserRouter>
        <AppRoutes />
    </BrowserRouter>
  )
}

export default App
