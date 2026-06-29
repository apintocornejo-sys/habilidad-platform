import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import PublicLayout from './pages/public/PublicLayout'
import HomePage from './pages/public/HomePage'
import LoginPage from './pages/public/LoginPage'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import ClientesPage from './pages/admin/clientes/ClientesPage'
import ClienteDetalle from './pages/admin/clientes/ClienteDetalle'
import ClienteForm from './pages/admin/clientes/ClienteForm'
import ClienteLayout from './pages/cliente/ClienteLayout'
import ClienteDashboard from './pages/cliente/ClienteDashboard'
import ProtectedRoute from './components/shared/ProtectedRoute'
import ContratosPage from './pages/admin/contratos/ContratosPage'
import ContratoForm from './pages/admin/contratos/ContratoForm'
import TareasPage from './pages/admin/tareas/TareasPage'
import TareaForm from './pages/admin/tareas/TareaForm'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="clientes" element={<ClientesPage />} />
          <Route path="clientes/nuevo" element={<ClienteForm />} />
          <Route path="clientes/:id" element={<ClienteDetalle />} />
          <Route path="clientes/:id/editar" element={<ClienteForm />} />
          <Route path="contratos" element={<ContratosPage />} />
          <Route path="contratos/nuevo" element={<ContratoForm />} />
          <Route path="contratos/:id/editar" element={<ContratoForm />} />
          <Route path="tareas" element={<TareasPage />} />
          <Route path="tareas/nueva" element={<TareaForm />} />
          <Route path="tareas/:id/editar" element={<TareaForm />} />
          <Route path="cobranza" element={<div className="text-sand-600">Módulo Cobranza — próximamente</div>} />
          <Route path="documentos" element={<div className="text-sand-600">Módulo Documentos — próximamente</div>} />
        </Route>

        <Route
          path="/cliente"
          element={
            <ProtectedRoute requiredRole="cliente">
              <ClienteLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<ClienteDashboard />} />
          <Route path="informes" element={<div className="text-sand-600">Informes — próximamente</div>} />
          <Route path="estado-cuenta" element={<div className="text-sand-600">Estado de cuenta — próximamente</div>} />
          <Route path="documentos" element={<div className="text-sand-600">Documentos — próximamente</div>} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
