import { Navigate } from 'react-router-dom'

// disabled-eslint-next-line
import { ReactNode } from 'react';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const token = localStorage.getItem('token')
    if(!token){
        return <Navigate to='/' /> // Navigate (componente) nos permite redirigir a otra ruta
    
    }
    return children // children es un prop que nos permite renderizar el contenido de un componente. Se utiliza children porque el contenido de la ruta protegida se define en el componente padre.
}

// Esto hace que el contenido de la ruta protegida sea renderizado solo si el usuario tiene un token en localStorage, es decir, si el usuario ha iniciado sesión. Si no tiene un token, el usuario es redirigido a la ruta de inicio de sesión.

export default ProtectedRoute

