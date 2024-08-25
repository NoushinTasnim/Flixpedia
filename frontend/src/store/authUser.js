import axios from 'axios';
import toast from 'react-hot-toast';
import {create} from 'zustand'

export const useAuthStore = create((set) => ({
    user: null,
    isSigningUp: false,
    isLoggingIn: false,
    isLoggingOut: false,
    isAuthChecking: true,
    signUp: async(credentials) => {
        try{
            set({
                isSigningUp: true,
            })
            const response = await axios.post('/api/v1/auth/register', credentials);
            toast.success('Signup successful');
            set({
                user: response.data.user,
                isSigningUp: false,
            });
        }
        catch(e){
            toast.error(e.response.data.message || 'Sign up failed');
            set({
                isSigningUp: false,
                user: null
            });
        }
    },
    login: async(credentials) => {
        try{
            set({
                isLoggingIn: true,
            })
            const response = await axios.post('/api/v1/auth/login', credentials);
            toast.success('Login successful');
            set({
                user: response.data.user,
                isLoggingIn: false,
            });
        }
        catch(e){
            toast.error(e.response.data.message || 'Login Failed');
            set({
                isLoggingIn: false,
                user: null
            });
        }
    },
    logout: async() => {
        try{
            set({
                isLoggingOut: true,
            })
            await axios.post('/api/v1/auth/logout');
            toast.success('Logout successful');
            set({
                user: null,
                isLoggingOut: false,
            });
        }
        catch(e){
            toast.error(e.response.data.message || 'Logout Failed');
            set({
                isLoggingOut: false,
            });
        }
    },
    authCheck: async() => {
        set({
            isAuthChecking: true
        });

        try{
            const response = await axios.get('/api/v1/auth/authCheck');
            set({
                user: response.data.user,
                isAuthChecking: false,
            });
        }
        catch(e){
            set({
                user: null,
                isAuthChecking: false,
            });
        }
    }, 
}));