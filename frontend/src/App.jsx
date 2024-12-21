import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import HomePage from './pages/home/HomePage'
import Footer from './components/Footer'
import {AuthUser} from './store/AuthUser'
import { Toaster } from 'react-hot-toast'
import { Loader } from 'lucide-react'
import PlayPage from './pages/PlayPage'
import SeachPage from './pages/SearchPage'
import SearchHistoryPage from './pages/SearchHistoryPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  const { user, isCheckingAuth, authCheck} = AuthUser()
  React.useEffect(() => {
    authCheck()
  }, [authCheck]);
  if(isCheckingAuth){
    return <div className='h-screen'>
      <div className='flex items-center justify-center h-full bg-black'>
        <Loader className='animate-spin text-red-600 size-10' />
      </div>
    </div>
  }
  return (<>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={!user ? <LoginPage />: <Navigate to={'/'}/>} />
        <Route path="/signup" element={!user ? <SignUpPage />: <Navigate to={'/'}/>} />
        <Route path="/play/:id" element={user ? <PlayPage />: <Navigate to={'/login'}/>} />
        <Route path="/search" element={user ? <SeachPage />: <Navigate to={'/login'}/>} />
        <Route path="/history" element={user ? <SearchHistoryPage />: <Navigate to={'/login'}/>} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <Toaster />
    </>
  )
}

export default App
