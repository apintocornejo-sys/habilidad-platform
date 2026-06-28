import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function Spinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-sand-100">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-brand-600 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-sand-600">Cargando...</span>
      </div>
    </div>
  )
}

export default function ProtectedRoute({ children, requiredRole }) {
  const { user, role, loading } = useAuth()

  if (loading) return <Spinner />
  if (!user) return <Navigate to="/login" replace />
  if (requiredRole && role === null) return <Spinner />
  if (requiredRole && role !== requiredRole) {
    return <Navigate to={role === 'admin' ? '/admin' : '/cliente'} replace />
  }

  return children
}
