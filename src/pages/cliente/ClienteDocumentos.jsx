import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useCondominio } from '../../hooks/useCondominio'

const G = {
  white: '#FFFFFF', sidebar: '#1A5C47', accent: '#2A7F62', accentLight: '#E6F5F1',
  sand: '#8C8880', sandBorder: '#E8E6E0', alert: '#C8601A', alertLight: '#FBF0E8',
  bg: '#F0F7F5',
}

const CATEGORIA_CFG = {
  acta:        { label: 'Acta',        bg: '#EFF6FF', color: '#2563EB' },
  informe:     { label: 'Informe',     bg: G.accentLight, color: G.accent },
  contrato:    { label: 'Contrato',    bg: '#F3F4F6',  color: '#374151' },
  reglamento:  { label: 'Reglamento',  bg: '#FEF3C7',  color: '#92400E' },
  otro:        { label: 'Otro',        bg: '#F3F4F6',  color: '#6B7280' },
}

function CategoriaBadge({ cat }) {
  const cfg = CATEGORIA_CFG[cat] ?? CATEGORIA_CFG.otro
  return (
    <span className="text-xs font-medium px-2 py-0.5 rounded-full"
      style={{ backgroundColor: cfg.bg, color: cfg.color }}>{cfg.label}</span>
  )
}

const CATEGORIAS = ['todas', 'acta', 'informe', 'contrato', 'reglamento', 'otro']

export default function ClienteDocumentos() {
  const { condominioId, loading: loadingCondo } = useCondominio()
  const [documentos, setDocumentos] = useState([])
  const [loading, setLoading]       = useState(false)
  const [filtro, setFiltro]         = useState('todas')
  const [descargando, setDescargando] = useState(null)

  useEffect(() => {
    if (!condominioId) return
    setLoading(true)
    supabase
      .from('documentos')
      .select('id, nombre, categoria, storage_path, publico, created_at')
      .eq('condominio_id', condominioId)
      .order('created_at', { ascending: false })
      .then(({ data }) => { setDocumentos(data ?? []); setLoading(false) })
  }, [condominioId])

  async function handleDescargar(doc) {
    if (!doc.storage_path) return
    setDescargando(doc.id)
    try {
      let url
      if (doc.publico) {
        const { data } = supabase.storage.from('documentos').getPublicUrl(doc.storage_path)
        url = data.publicUrl
      } else {
        const { data, error } = await supabase.storage.from('documentos').createSignedUrl(doc.storage_path, 3600)
        if (error) throw error
        url = data.signedUrl
      }
      window.open(url, '_blank', 'noopener')
    } catch (e) {
      alert('No se pudo obtener el archivo. Contacta a tu administrador.')
    }
    setDescargando(null)
  }

  const filtrados = documentos.filter(d => filtro === 'todas' || d.categoria === filtro)

  if (loadingCondo || loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="w-7 h-7 rounded-full border-2 border-t-transparent animate-spin"
        style={{ borderColor: G.accent, borderTopColor: 'transparent' }} />
    </div>
  )

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: G.sidebar }}>Documentos</h1>
        <p className="text-sm mt-0.5" style={{ color: G.sand }}>{documentos.length} documento{documentos.length !== 1 ? 's' : ''} disponible{documentos.length !== 1 ? 's' : ''}</p>
      </div>

      {/* Filtro categoría */}
      <div className="flex flex-wrap gap-2 mb-5">
        {CATEGORIAS.map(cat => {
          const cfg = cat === 'todas' ? null : CATEGORIA_CFG[cat]
          const isActive = filtro === cat
          return (
            <button key={cat} onClick={() => setFiltro(cat)}
              className="text-xs font-medium px-3 py-1.5 rounded-full transition-all capitalize"
              style={{
                backgroundColor: isActive ? (cfg?.bg ?? G.accentLight) : G.white,
                color:           isActive ? (cfg?.color ?? G.accent)    : G.sand,
                border: `1px solid ${isActive ? (cfg?.color ?? G.accent) : G.sandBorder}`,
              }}>
              {cat === 'todas' ? 'Todos' : (CATEGORIA_CFG[cat]?.label ?? cat)}
            </button>
          )
        })}
      </div>

      {filtrados.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-sm" style={{ color: G.sand }}>
            {filtro !== 'todas' ? 'Sin documentos en esta categoría.' : 'No hay documentos disponibles aún.'}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filtrados.map(doc => (
            <div key={doc.id}
              className="flex items-center justify-between gap-4 rounded-xl px-4 py-3.5"
              style={{ backgroundColor: G.white, border: `1px solid ${G.sandBorder}` }}>
              <div className="flex items-center gap-3 min-w-0">
                {/* Icono documento */}
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: G.accentLight }}>
                  <svg className="w-4 h-4" style={{ color: G.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: G.sidebar }}>{doc.nombre}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <CategoriaBadge cat={doc.categoria} />
                    <span className="text-xs" style={{ color: G.sand }}>
                      {new Date(doc.created_at).toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleDescargar(doc)}
                disabled={!doc.storage_path || descargando === doc.id}
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg shrink-0 transition-all disabled:opacity-40"
                style={{ backgroundColor: G.accentLight, color: G.accent }}>
                {descargando === doc.id ? (
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-t-transparent animate-spin"
                    style={{ borderColor: G.accent, borderTopColor: 'transparent' }} />
                ) : (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                )}
                {descargando === doc.id ? 'Cargando…' : 'Descargar'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
