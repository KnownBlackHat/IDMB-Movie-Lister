import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { Header } from './components/Header.tsx'
// import Login from './pages/login.tsx'
import Signup from './pages/signup.tsx'
import Search from './pages/search.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import Profile from './pages/profile.tsx'
import { Toaster } from "@/components/ui/sonner"

const router = createHashRouter([
    {
        path: "/",
        element: <><Header /><App /></>
    },
    {
        path: "/search",
        element: <><Header /><Search /></>
    },
    {
        path: "/login",
        element: <><Header /><Signup /></>
    },
    {
        path: "/signup",
        element: <><Header /><Signup /></>
    },
    {
        path: "/profile",
        element: <><Header /><Profile /></>
    }
])

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <div className='bg-black min-h-screen min-w-screen text-white'>
                <Toaster toastOptions={{ style: { background: 'black', color: 'white' } }} />
                <RouterProvider router={router} />
            </div>
        </AuthProvider>
    </StrictMode>,
)
