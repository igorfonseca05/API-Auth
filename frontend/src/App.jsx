
import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Navigate, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Importa o CSS para o estilo do toast

// Estilo
import './App.css'

// Pages
import Home from '../src/pages/home/Home'
import SignupPage from './pages/signupPage/SignupPage';
import LoginPage from './pages/loginPage/LoginPage';
import Profile from './pages/Profile'

// Componentes
import Navbar from './components/navbar/Navbar'
import LoginForm from './components/formLogin/Login'
// import { useAuth } from './hooks/useAuth';

import useAuth from './hooks/useAuth';
import useLogin from './hooks/useLogin'
import { useAuthContext } from './Context/AuthContext';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/protectRoutes/ProtectedRoutes';
import verifyToken from './hooks/useVerifyToken';
import { OverlayContextProvider } from './Context/OverlayContext';
import Overlay from './overlay/Overlay';


function App() {

  const { userAuth, error, success, setError, setSuccess } = useAuthContext()

  // const { verifiedUser, loading } = verifyToken()

  // console.log(userAuth)

  // console.log(localStorage.length)


  useEffect(() => {
    error && toast.error(error, {
      autoClose: 2500,
      position: 'top-left'
    })
    success && toast.success(success, {
      autoClose: 2500,
      position: 'top-left'
    })
    error && setError('')
    success && setSuccess('')

  }, [error, success])

  // if (loading) {
  //   return <p style={{ paddingTop: '59px' }}>Verificando Token, aguarde!...</p>
  // }


  return (
    <>
      <BrowserRouter>
        <OverlayContextProvider>
          <Overlay />
          <ToastContainer></ToastContainer>
          <Navbar />
          <Routes>
            <Route path={'/'} element={<Home />} />
            <Route path={'/login'} element={!userAuth ? <LoginPage /> : <Home />} />
            <Route path={'/signup'} element={<SignupPage />} />

            {/* rotas protegidas */}
            <Route element={<ProtectedRoute />}>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/profile' element={<Profile />} />
            </Route>
          </Routes>
        </OverlayContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
