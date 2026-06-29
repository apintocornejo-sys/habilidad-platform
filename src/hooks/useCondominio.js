import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

export function useCondominio() {
  const { user } = useAuth()
  const [condominio, setCondominio]   = useState(null)
  const [condominioId, setCondominioId] = useState(null)
  const [loading, setLoading]         = useState(true)

  useEffect(() => {
    if (!user) return
    supabase
      .from('condominio_usuarios')
      .select('condominio_id, condominios(*)')
      .eq('user_id', user.id)
      .limit(1)
      .single()
      .then(({ data }) => {
        if (data) {
          setCondominioId(data.condominio_id)
          setCondominio(data.condominios)
        }
        setLoading(false)
      })
  }, [user])

  return { condominio, condominioId, loading }
}
