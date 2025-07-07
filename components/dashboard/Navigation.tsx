"use client"

import { Button } from "@/components/ui/button"
import { BarChart3, TrendingUp, FileText } from "lucide-react"

interface NavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  isTvMode: boolean
}

export default function Navigation({ activeTab, setActiveTab, isTvMode }: NavigationProps) {
  const tabs = [
    {
      id: "resumo",
      label: "Resumo Geral",
      icon: FileText,
    },
    {
      id: "comercial",
      label: "Time Comercial",
      icon: TrendingUp,
    },
    {
      id: "marketing",
      label: "Marketing Digital",
      icon: BarChart3,
    },
  ]

  return (
    <nav className={`bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 ${isTvMode ? "py-4" : "py-3"}`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-center space-x-2">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id

            return (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                variant={isActive ? "default" : "ghost"}
                size={isTvMode ? "lg" : "default"}
                className={`
                  transition-all duration-200 
                  ${
                    isActive
                      ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-gray-800"
                  }
                  ${isTvMode ? "px-6 py-3 text-lg" : "px-4 py-2"}
                `}
              >
                <Icon className={`${isTvMode ? "h-5 w-5" : "h-4 w-4"} mr-2`} />
                {tab.label}
              </Button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
