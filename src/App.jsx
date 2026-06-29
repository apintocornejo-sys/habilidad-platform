import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import PublicLayout from './pages/public/PublicLayout'
import HomePage from './pages/public/HomePage'
import LoginPage from './pages/public/LoginPage'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import ClientesPage from './pages/admin/clientes/ClientesPage'
import ClienteDetalle from './pages/admin/clientes/ClienteDetalle'
import ClienteForm from './pages/admin/clientes/ClienteForm'
import ContratosPage from './pages/admin/contratos/ContratosPage'
import ContratoForm from './pages/admin/contratos/ContratoForm'
import TareasPage from './pages/admin/tareas/TareasPage'
import TareaForm from './pages/admin/tareas/TareaForm'
import ClienteLayout from './pages/cliente/ClienteLayout'
import ClienteDashboard from './pages/cliente/ClienteDashboard'
import ClienteContratos from './pages/cliente/ClienteContratos'
import ClienteCobranza from './pages/cliente/ClienteCobranza'
import ClienteDocumentos from './pages/cliente/ClienteDocumentos'
import ProtectedRoute from './components/shared/ProtectedRoute'
import UsuariosPage from './pages/admin/usuarios/UsuariosPage'
import UsuarioForm from './pages/admin/usuarios/UsuarioForm'
import UsuarioDetalle from './pages/admin/usuarios/UsuarioDetalle'

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
          <Route path="usuarios" element={<UsuariosPage />} />
          <Route path="usuarios/nuevo" element={<UsuarioForm />} />
          <Route path="usuarios/:id" element={<UsuarioDetalle />} />
          <Route path="usuarios/:id/editar" element={<UsuarioForm />} />
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
          <Route path="cobranza" element={<div style={{ color: '#8C8880' }}>Módulo Cobranza — próximamente</div>} />
          <Route path="documentos" element={<div style={{ color: '#8C8880' }}>Módulo Documentos — próximamente</div>} />
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
          <Route path="contratos" element={<ClienteContratos />} />
          <Route path="cobranza" element={<ClienteCobranza />} />
          <Route path="documentos" element={<ClienteDocumentos />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
