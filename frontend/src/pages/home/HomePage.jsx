import React from 'react'
import AuthScreen from './AuthScreen'
import HomeScreen from './HomeScreen'
import { AuthUser } from '../../store/AuthUser';

const HomePage = () => {
  const {user}=AuthUser();
  return (
    <div>
      {user ? <HomeScreen/> : <AuthScreen/>}
    </div>
  )
}

export default HomePage