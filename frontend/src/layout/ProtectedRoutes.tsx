import { type ReactNode } from 'react'
import { Navigate } from 'react-router-dom';
interface props {
    children : ReactNode
}
const ProtectedRoutes = ({children}:props) => {
  const isAuthenticated = window.sessionStorage.getItem("accessToken");

  if(!isAuthenticated){
    return <Navigate to={'/login'} replace />
  }
  return (
    <div>
      {children}
    </div>
  )
}

export default ProtectedRoutes