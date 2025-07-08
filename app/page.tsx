
"use client"

import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

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
import PodiumChangePopup from "@/components/dashboard/PodiumChangePopup"
import { generateDashboardData } from "@/lib/mockData"
import type { DashboardData, Vendedor } from "@/types/dashboard"

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
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  const searchParams = useSearchParams()

  // Parâmetros da URL
  const isTvMode = searchParams.get("tv") === "true"
  const view = searchParams.get("view") || "default"
  const rotateDepts = searchParams.get("rotateDepts") || ""
  const viewRefresh = Number.parseInt(searchParams.get("viewRefresh") || "20000")

  // Estados principais
  const [data] = useState<DashboardData>(generateDashboardData())
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [currentRotatingDeptIndex, setCurrentRotatingDeptIndex] = useState(0)
  const [activeTab, setActiveTab] = useState("resumo")

  // --- Lógica do Ranking de Vendas movida para cá ---
  const [rankingVendedores, setRankingVendedores] = useState<Vendedor[]>([])
  const [celebratedVendedor, setCelebratedVendedor] = useState<Vendedor | null>(null)
  const previousVendedoresRef = useRef<Vendedor[]>([])

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    previousVendedoresRef.current = rankingVendedores
  }, [rankingVendedores])

  const processVendedores = useCallback((data: any[]): Vendedor[] => {
    return data.map((v, index) => ({
      ...v,
      percentual: v.meta > 0 ? Math.round((v.vendas / v.meta) * 100) : 0,
      status: v.meta > 0 && (v.vendas / v.meta) * 100 >= 100 ? "Superou" : (v.meta > 0 && (v.vendas / v.meta) * 100 >= 80 ? "Próximo" : "Abaixo"),
      posicao: index + 1,
    }))
  }, [])

  const checkForPodiumChanges = useCallback((newVendedores: Vendedor[]) => {
    const oldVendedores = previousVendedoresRef.current
    if (oldVendedores.length === 0) return

    const newPodium = newVendedores.slice(0, 3)
    for (const newVendedor of newPodium) {
      const oldData = oldVendedores.find(v => v.id === newVendedor.id)
      const oldPosition = oldData ? oldData.posicao : Infinity
      if (newVendedor.posicao < oldPosition && newVendedor.posicao <= 3) {
        setCelebratedVendedor(newVendedor)
        return
      }
    }
  }, [])

  const fetchRankingMensal = useCallback(async (isInitialLoad = false) => {
    if (!isInitialLoad) {
      console.log("Realtime update triggered: Fetching new ranking data...");
    }
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.rpc("get_ranking_mensal");
      if (error) {
        console.error("Erro ao chamar RPC get_ranking_mensal:", error);
        throw new Error("A função para calcular o ranking falhou.");
      }
      if (data) {
        const processedData = processVendedores(data);
        checkForPodiumChanges(processedData);
        previousVendedoresRef.current = processedData; // Atualiza imediatamente após a checagem
        setRankingVendedores(processedData);
        setLastUpdate(new Date());
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [processVendedores, checkForPodiumChanges]);


  // Efeito para carregar dados e configurar listeners
  useEffect(() => {
    // Determina qual "aba" ou view está ativa
    const currentKey = (view === "left" || view === "right")
      ? (rotateDepts.split(",").map((k) => k.trim())[currentRotatingDeptIndex] || "resumo")
      : activeTab

    if (currentKey === "ranking_vendas") {
      fetchRankingMensal(true);
      const channel = supabase
        .channel("ranking_mensal_realtime_global")
        .on("postgres_changes", { event: "*", schema: "public", table: "registros_vendas" }, () => {
          fetchRankingMensal(false);
        })
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    } else {
      // Se não for a página de ranking, apenas termina o carregamento
      const timer = setTimeout(() => {
        setLoading(false);
        setLastUpdate(new Date());
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [activeTab, currentRotatingDeptIndex, rotateDepts, view, fetchRankingMensal]);

  const departmentComponentMap: Record<string, React.ComponentType<any>> = {
    resumo: ResumoGeral,
    comercial: TimeComercial,
    marketing: TimeMarketing,
    comercial_tela01: ComercialTela01,
    comercial_tela02: ComercialTela02,
    marketing_tela01: MarketingTela01,
    marketing_tela02: MarketingTela02,
    ranking_vendas: RankingVendas, // Apenas a referência ao componente
    ranking_vendas_02: RankingVendas02,
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

  if (!isClient) {
    return <DashboardLoadingSkeleton />
  }

  const renderMainContent = () => {
    if (loading && !rankingVendedores.length) {
      return <DashboardLoadingSkeleton />
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-96 text-red-400 text-2xl">
                Erro ao carregar dados do ranking: {error}
            </div>
        );
    }

    const currentKey = (view === "left" || view === "right")
      ? (rotateDepts.split(",").map((k) => k.trim())[currentRotatingDeptIndex] || "resumo")
      : activeTab

    const CurrentComponent = departmentComponentMap[currentKey] || departmentComponentMap["resumo"]

    // Passagem de props explícita
    if (currentKey === 'ranking_vendas') {
      return <RankingVendas isTvMode={isTvMode} vendedores={rankingVendedores} />;
    }

    return <CurrentComponent data={data} loading={loading} isTvMode={isTvMode} />
  }

  const showHeader = view === "default" || !view
  const showNavigation = view === "default" || !view
  const showActionBar = view === "default" || !view

  return (
    <div className={`min-h-screen bg-gray-950 ${isTvMode ? "tv-mode" : ""}`}>
      {celebratedVendedor && (
        <PodiumChangePopup
          vendedor={celebratedVendedor}
          onClose={() => setCelebratedVendedor(null)}
        />
      )}
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
