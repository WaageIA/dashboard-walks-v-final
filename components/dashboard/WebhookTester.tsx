"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle, RefreshCw, Play, Eye, EyeOff } from "lucide-react"

interface TestResult {
  endpoint: string
  status: "success" | "error" | "testing"
  responseTime?: number
  statusCode?: number
  error?: string
  data?: any
}

export default function WebhookTester() {
  const [testing, setTesting] = useState(false)
  const [results, setResults] = useState<TestResult[]>([])
  const [showResponses, setShowResponses] = useState(false)

  const endpoints = [
    { key: "vendas", label: "Vendas", url: "/vendas" },
    { key: "marketing", label: "Marketing", url: "/marketing" },
    { key: "redes_sociais", label: "Redes Sociais", url: "/redes-sociais" },
    { key: "funil", label: "Funil", url: "/funil" },
    { key: "metricas_periodicas", label: "Métricas Periódicas", url: "/metricas-periodicas" },
    { key: "vendas_produtos", label: "Vendas por Produto", url: "/vendas-produtos" },
    { key: "atividades_comerciais", label: "Atividades Comerciais", url: "/atividades-comerciais" },
    { key: "funil_detalhado", label: "Funil Detalhado", url: "/funil-detalhado" },
  ]

  const testSingleEndpoint = async (endpoint: (typeof endpoints)[0]): Promise<TestResult> => {
    const startTime = Date.now()
    const fullUrl = `https://waagewalks.app.n8n.cloud/webhook${endpoint.url}`

    try {
      const response = await fetch(fullUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const responseTime = Date.now() - startTime

      if (response.ok) {
        let data
        try {
          data = await response.json()
        } catch {
          data = await response.text()
        }

        return {
          endpoint: endpoint.label,
          status: "success",
          responseTime,
          statusCode: response.status,
          data,
        }
      } else {
        return {
          endpoint: endpoint.label,
          status: "error",
          responseTime,
          statusCode: response.status,
          error: `HTTP ${response.status}: ${response.statusText}`,
        }
      }
    } catch (error) {
      const responseTime = Date.now() - startTime
      return {
        endpoint: endpoint.label,
        status: "error",
        responseTime,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      }
    }
  }

  const testAllEndpoints = async () => {
    setTesting(true)
    setResults([])

    // Inicializar resultados com status "testing"
    const initialResults: TestResult[] = endpoints.map((endpoint) => ({
      endpoint: endpoint.label,
      status: "testing",
    }))
    setResults(initialResults)

    // Testar cada endpoint
    for (let i = 0; i < endpoints.length; i++) {
      const result = await testSingleEndpoint(endpoints[i])

      setResults((prev) => prev.map((item, index) => (index === i ? result : item)))

      // Pequena pausa entre requests para não sobrecarregar
      await new Promise((resolve) => setTimeout(resolve, 200))
    }

    setTesting(false)
  }

  const getStatusIcon = (status: TestResult["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "testing":
        return <RefreshCw className="h-4 w-4 text-yellow-500 animate-spin" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (result: TestResult) => {
    if (result.status === "testing") {
      return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Testando...</Badge>
    }

    if (result.status === "success") {
      return (
        <div className="flex items-center gap-2">
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">✓ {result.statusCode}</Badge>
          {result.responseTime && <span className="text-xs text-gray-400">{result.responseTime}ms</span>}
        </div>
      )
    }

    return (
      <div className="flex items-center gap-2">
        <Badge className="bg-red-500/20 text-red-400 border-red-500/30">✗ {result.statusCode || "Erro"}</Badge>
        {result.responseTime && <span className="text-xs text-gray-400">{result.responseTime}ms</span>}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Teste de Webhooks</CardTitle>
            <div className="flex gap-2">
              <Button
                onClick={() => setShowResponses(!showResponses)}
                variant="outline"
                size="sm"
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                {showResponses ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {showResponses ? "Ocultar" : "Ver"} Respostas
              </Button>
              <Button
                onClick={testAllEndpoints}
                disabled={testing}
                variant="outline"
                size="sm"
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                <Play className="h-4 w-4 mr-2" />
                Testar Todos
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-gray-400 mb-4">
            <p>
              <strong>URL Base:</strong> https://waagewalks.app.n8n.cloud/webhook
            </p>
            <p>
              <strong>Método:</strong> GET
            </p>
            <p>
              <strong>Headers:</strong> Content-Type: application/json
            </p>
          </div>

          {results.length === 0 && !testing && (
            <div className="text-center py-8 text-gray-400">
              <AlertCircle className="h-8 w-8 mx-auto mb-2" />
              <p>Clique em "Testar Todos" para verificar a conectividade dos webhooks</p>
            </div>
          )}

          {results.map((result, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(result.status)}
                  <div>
                    <p className="font-medium text-white">{result.endpoint}</p>
                    <p className="text-sm text-gray-400">{endpoints[index]?.url}</p>
                  </div>
                </div>
                {getStatusBadge(result)}
              </div>

              {result.error && (
                <div className="ml-7 p-2 rounded bg-red-900/20 border border-red-500/20">
                  <p className="text-sm text-red-400">
                    <strong>Erro:</strong> {result.error}
                  </p>
                </div>
              )}

              {showResponses && result.data && result.status === "success" && (
                <div className="ml-7 p-3 rounded bg-green-900/10 border border-green-500/20">
                  <p className="text-sm text-green-400 mb-2">
                    <strong>Resposta:</strong>
                  </p>
                  <pre className="text-xs text-gray-300 overflow-x-auto bg-gray-900/50 p-2 rounded">
                    {typeof result.data === "string" ? result.data : JSON.stringify(result.data, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          ))}

          {results.length > 0 && (
            <div className="mt-6 p-4 rounded-lg bg-blue-600/10 border border-blue-600/20">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-4 w-4 text-blue-400" />
                <p className="text-sm font-medium text-blue-400">Resumo do Teste</p>
              </div>
              <div className="text-sm text-blue-300">
                <p>✅ Sucessos: {results.filter((r) => r.status === "success").length}</p>
                <p>❌ Erros: {results.filter((r) => r.status === "error").length}</p>
                <p>
                  ⏱️ Tempo médio:{" "}
                  {results.filter((r) => r.responseTime).length > 0
                    ? Math.round(
                        results.filter((r) => r.responseTime).reduce((sum, r) => sum + (r.responseTime || 0), 0) /
                          results.filter((r) => r.responseTime).length,
                      )
                    : 0}
                  ms
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
