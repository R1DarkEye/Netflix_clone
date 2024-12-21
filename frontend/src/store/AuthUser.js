import axios from 'axios'
import {create} from 'zustand'
import {toast} from 'react-hot-toast'

export const AuthUser=create((set)=>({
    user:null,
    isSigningUp:false,
    isCheckingAuth:true,
    isLoggingOut:false,
    isLoggingIn:false,
    signup: async(credentials)=>{
        set({isSigningUp:true})
        try{
            const response=await axios.post('/api/v1/auth/signup',credentials)
            set({user:response.data.user,isSigningUp:false})
            toast.success('user created successfully')
        }catch(error){
            toast.error(error.response.data.message || 'Sign up failed')
            set({user:null,isSigningUp:false})
        }
    },
    login: async(credentials)=>{
        set({isLoggingIn:true})
        try{
            const response=await axios.post('/api/v1/auth/login',credentials)
            set({user:response.data.user,isLoggingIn:false})
            toast.success('logged in successfully')
        }catch(error){
            // toast.error(error.response.data.message || 'Logging failed')
            set({user:null,isLoggingIn:false})
        }
    },
    logout: async()=>{
        set({isLoggingOut:true})
        try{
            await axios.post('/api/v1/auth/logout')
            set({user:null,isLoggingOut:false})
            toast.success('logged out successfully')
        }catch(error){
            toast.error(error.response.data.message || 'An error occurred')
            set({isLoggingOut:false})
        }
    },
    authCheck: async()=>{
        set({isCheckingAuth:true})
        try{
            const response=await axios.get('/api/v1/auth/authCheck')
            set({user:response.data.user,isCheckingAuth:false})
        }catch(error){
            set({user:null,isCheckingAuth:false})
            toast.error(error.response.data.message || 'An error occurred')
        }
    }

}))