import { StrictMode, useEffect } from 'react' // Hozzáadva: useEffect
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import Index from '../src/pages/Index'
import Register from '../src/pages/Register'
import Login from '../src/pages/Login'
import History from './pages/History'
import ProtectedRoute from './components/ProtectedRoute'
import Settings from '../src/pages/Settings'
import QrGenerator from '../src/pages/QrcodeGenerator'
import Profile from '../src/pages/Profile'

import { AuthProvider } from '../src/context/Authcontext'

// 1. Létrehozzuk az App komponenst, ami kezeli a globális témát frissítéskor
function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      document.body.classList.add("light-mode");
    } else {
      document.body.classList.remove("light-mode");
    }
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Index/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/history' element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }/>
          <Route path='/qrgen' element={<QrGenerator/>}/>
          <Route path='/settings' element={<Settings/>} />
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

// 2. A createRoot-ban most már az App komponenst rendereljük ki
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)