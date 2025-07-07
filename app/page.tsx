
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

import Header from "@/components/dashboard/Header"
import Navigation from "@/components/dashboard/Navigation"
import ActionBar from "@/components/dashboard/ActionBar"
import ResumoGeral from "@/components/dashboard/pages/ResumoGeral"
import TimeComercial from "@/components/dashboard/pages/TimeComercial"
import TimeMarketing from "@/components/dashboard/pages/TimeMarketing"
import RankingVendas from "@/components/dashboard/pages/RankingVendas"
import RankingVendas02 from "@/components/dashboard/pages/RankingVendas02"
import ResumoMetasProdutos from "@/components/dashboard/pages/ResumoMetasProdutos"
import ComercialTela01 from "@/components/dashboard/pages/ComercialTela01"
import ComercialTela02 from "@/components/dashboard/pages/ComercialTela02"
import MarketingTela01 from "@/components/dashboard/pages/MarketingTela01"
import MarketingTela02 from "@/components/dashboard/pages/MarketingTela02"
import SuporteDashboard from "@/components/dashboard/pages/SuporteDashboard"
import TPVDashboard from "@/components/dashboard/pages/TPVDashboard"
import TPVTela02 from "@/components/dashboard/pages/TPVTela02"
import { generateDashboardData } from "@/lib/mockData"
import type { DashboardData } from "@/types/dashboard"

// Componentes placeholder
const OutroDepartamento1 = ({ isTvMode }: { isTvMode: boolean }) => (
  <div className={`flex items-center justify-center h-96 ${isTvMode ? "text-4xl" : "text-2xl"}`}>
    <div className="text-center">
      <div className="text-white font-bold mb-4">Departamento de Recursos Humanos</div>
      <div className="text-gray-400">Tela em desenvolvimento</div>
    </div>
  </div>
)

const DashboardLoadingSkeleton = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <p className="text-gray-400 text-lg">Carregando Dashboard...</p>
    </div>
  </div>
)

export default function Dashboard() {
  // 1. Hook para resolver o problema de hidratação
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  const searchParams = useSearchParams()

  // Estados principais
  const [data] = useState<DashboardData>(generateDashboardData())
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [currentRotatingDeptIndex, setCurrentRotatingDeptIndex] = useState(0)
  const [activeTab, setActiveTab] = useState("resumo")

  // Parâmetros da URL - agora lidos de forma segura
  const isTvMode = searchParams.get("tv") === "true"
  const view = searchParams.get("view") || "default"
  const rotateDepts = searchParams.get("rotateDepts") || ""
  const viewRefresh = Number.parseInt(searchParams.get("viewRefresh") || "20000")

  // Simulação de carregamento
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      setLastUpdate(new Date())
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const departmentComponentMap: Record<
    string,
    React.ComponentType<{ data?: DashboardData; loading?: boolean; isTvMode: boolean }>
  > = {
    resumo: ResumoGeral,
    comercial: TimeComercial,
    marketing: TimeMarketing,
    comercial_tela01: ComercialTela01,
    comercial_tela02: ComercialTela02,
    marketing_tela01: MarketingTela01,
    marketing_tela02: MarketingTela02,
    ranking_vendas: (props) => <RankingVendas isTvMode={props.isTvMode} />,
    ranking_vendas_02: (props) => <RankingVendas02 isTvMode={props.isTvMode} />,
    metas_produtos: ResumoMetasProdutos,
    suporte: SuporteDashboard,
    tpv: TPVDashboard,
    tpv_tela02: TPVTela02,
    outro1: OutroDepartamento1,
  }

  // Lógica de rotação
  useEffect(() => {
    if (isClient && (view === "left" || view === "right") && rotateDepts) {
      const deptKeys = rotateDepts.split(",").map((key) => key.trim()).filter(Boolean)
      if (deptKeys.length > 1) {
        const interval = setInterval(() => {
          setCurrentRotatingDeptIndex((prevIndex) => (prevIndex + 1) % deptKeys.length)
        }, viewRefresh)
        return () => clearInterval(interval)
      }
    }
  }, [isClient, view, rotateDepts, viewRefresh])

  useEffect(() => {
    setCurrentRotatingDeptIndex(0)
  }, [rotateDepts])

  // 2. Renderiza um skeleton se não estiver no cliente ainda
  if (!isClient) {
    return <DashboardLoadingSkeleton />
  }

  // Lógica de renderização principal
  const renderMainContent = () => {
    if (loading) {
      return <DashboardLoadingSkeleton />
    }

    const currentKey = (view === "left" || view === "right")
      ? (rotateDepts.split(",").map((k) => k.trim())[currentRotatingDeptIndex] || "resumo")
      : activeTab

    const CurrentComponent = departmentComponentMap[currentKey] || departmentComponentMap["resumo"]

    return <CurrentComponent data={data} loading={loading} isTvMode={isTvMode} />
  }

  const showHeader = view === "default" || !view
  const showNavigation = view === "default" || !view
  const showActionBar = view === "default" || !view

  return (
    <div className={`min-h-screen bg-gray-950 ${isTvMode ? "tv-mode" : ""}`}>
      <div className="fixed inset-0 opacity-5" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`, backgroundSize: "24px 24px" }}></div>
      <div className="relative z-10">
        {showHeader && <Header lastUpdate={lastUpdate} isRefreshing={loading} isTvMode={isTvMode} />}
        {showActionBar && <ActionBar isTvMode={isTvMode} />}
        {showNavigation && <Navigation activeTab={activeTab} setActiveTab={setActiveTab} isTvMode={isTvMode} />}
        <main className={`container mx-auto px-6 py-6 ${isTvMode ? "px-8 py-8" : ""} ${!showHeader ? "pt-0" : ""}`}>
          {renderMainContent()}
        </main>
      </div>
    </div>
  )
}
