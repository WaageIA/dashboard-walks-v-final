"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle, XCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WebhookStatusProps {
  status: {
    vendas: boolean
    marketing: boolean
    redes_sociais: boolean
    funil: boolean
  } | null
  onTest: () => void
  testing: boolean
}

export default function WebhookStatus({ status, onTest, testing }: WebhookStatusProps) {
  const getStatusIcon = (connected: boolean) => {
    if (connected) {
      return <CheckCircle className="h-4 w-4 text-green-500" />
    } else {
      return <XCircle className="h-4 w-4 text-red-500" />
    }
  }

  const getStatusBadge = (connected: boolean) => {
    if (connected) {
      return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Conectado</Badge>
    } else {
      return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Desconectado</Badge>
    }
  }

  const endpoints = [
    { key: "vendas", label: "Vendas", url: "/vendas" },
    { key: "marketing", label: "Marketing", url: "/marketing" },
    { key: "redes_sociais", label: "Redes Sociais", url: "/redes-sociais" },
    { key: "funil", label: "Funil", url: "/funil" },
  ]

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">Status dos Webhooks</CardTitle>
          <Button
            onClick={onTest}
            disabled={testing}
            variant="outline"
            size="sm"
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${testing ? "animate-spin" : ""}`} />
            Testar
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {endpoints.map((endpoint) => (
          <div key={endpoint.key} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
            <div className="flex items-center space-x-3">
              {status ? (
                getStatusIcon(status[endpoint.key as keyof typeof status])
              ) : (
                <AlertCircle className="h-4 w-4 text-yellow-500" />
              )}
              <div>
                <p className="font-medium text-white">{endpoint.label}</p>
                <p className="text-sm text-gray-400">
                  https://webhook.escalasdigitaischatboot.uk/webhook{endpoint.url}
                </p>
              </div>
            </div>
            {status ? (
              getStatusBadge(status[endpoint.key as keyof typeof status])
            ) : (
              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Verificando</Badge>
            )}
          </div>
        ))}

        <div className="mt-4 p-3 rounded-lg bg-blue-600/10 border border-blue-600/20">
          <p className="text-sm text-blue-400">
            💡 <strong>Dica:</strong> Configure seus sistemas para enviar dados para estes endpoints. O dashboard irá
            buscar automaticamente os dados a cada 5 minutos.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
