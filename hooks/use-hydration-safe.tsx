"use client"

import { useState, useEffect } from 'react'

/**
 * Hook para garantir que valores que podem diferir entre servidor e cliente
 * sejam renderizados apenas após a hidratação
 */
export function useHydrationSafe<T>(getValue: () => T, fallback: T): T {
  const [mounted, setMounted] = useState(false)
  const [value, setValue] = useState<T>(fallback)

  useEffect(() => {
    setMounted(true)
    setValue(getValue())
  }, [])

  return mounted ? value : fallback
}

/**
 * Hook simples para verificar se o componente foi montado no cliente
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted
}