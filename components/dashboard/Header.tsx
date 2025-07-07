"use client"

import { useState, useEffect } from "react"
import { Building2, RefreshCw, Activity, Monitor, RotateCcw } from "lucide-react"

interface HeaderProps {
  lastUpdate: Date
  isRefreshing: boolean
  isTvMode: boolean
  currentView?: string
  rotateDepts?: string
  currentDeptIndex?: number
}

export default function Header({
  lastUpdate,
  isRefreshing,
  isTvMode,
  currentView = "default",
  rotateDepts,
  currentDeptIndex = 0,
}: HeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getViewDisplayName = () => {
    switch (currentView) {
      case "center":
        return "Resumo Central"
      case "left":
        return "Rotação Esquerda"
      case "right":
        return "Rotação Direita"
      default:
        return "Navegação Padrão"
    }
  }

  const getCurrentDeptName = () => {
    if (!rotateDepts) return ""
    const depts = rotateDepts.split(",").map((d) => d.trim())
    return depts[currentDeptIndex] || ""
  }

  return (
    <header className={`bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 ${isTvMode ? "py-6" : "py-4"}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-xl bg-blue-600">
              <Building2 className={`text-white ${isTvMode ? "h-8 w-8" : "h-6 w-6"}`} />
            </div>
            <div>
              <h1 className={`font-bold text-white ${isTvMode ? "text-3xl" : "text-xl"}`}>Dashboard Executivo</h1>
              <div className="flex items-center space-x-2">
                <p className={`text-gray-400 ${isTvMode ? "text-lg" : "text-sm"}`}>Sua Empresa S.A.</p>
                {isTvMode && (
                  <div className="flex items-center space-x-1 text-blue-400">
                    <Monitor className="h-4 w-4" />
                    <span className="text-xs font-medium">TV MODE</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-8">
          {/* Informações do modo de visualização */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className={`text-gray-300 ${isTvMode ? "text-base" : "text-sm"}`}>{getViewDisplayName()}</div>
              {(currentView === "left" || currentView === "right") && rotateDepts && (
                <div className="flex items-center space-x-2">
                  <RotateCcw className="h-3 w-3 text-gray-500" />
                  <span className={`text-gray-500 ${isTvMode ? "text-sm" : "text-xs"}`}>{getCurrentDeptName()}</span>
                </div>
              )}
            </div>
          </div>

          {/* Status do sistema */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Activity className={`text-green-500 ${isTvMode ? "h-5 w-5" : "h-4 w-4"}`} />
              <span className={`text-green-500 font-medium ${isTvMode ? "text-base" : "text-sm"}`}>Sistema Online</span>
            </div>
          </div>

          {/* Relógio */}
          <div className="text-right">
            <div className={`font-mono text-white font-bold ${isTvMode ? "text-2xl" : "text-lg"}`}>
              {formatTime(currentTime)}
            </div>
            <div className={`text-gray-400 ${isTvMode ? "text-base" : "text-sm"}`}>{formatDate(currentTime)}</div>
          </div>

          {/* Indicador de refresh */}
          <div className="flex items-center space-x-2 text-gray-400">
            <RefreshCw className={`${isRefreshing ? "animate-spin" : ""} ${isTvMode ? "h-5 w-5" : "h-4 w-4"}`} />
            <div className={`${isTvMode ? "text-base" : "text-sm"}`}>
              <div>Última atualização:</div>
              <div className="font-mono text-gray-300">{formatTime(lastUpdate)}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
