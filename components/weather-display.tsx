"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Droplets, ThermometerSun, Wind, Sun } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDate, getWindDirection } from "@/lib/utils"
import Image from "next/image"

interface MetricSi {
  temp: number
  heatIndex: number
  dewpt: number
  windChill: number
  windSpeed: number
  windGust: number
  pressure: number
  precipRate: number
  precipTotal: number
  elev: number
}

interface WeatherData {
  observations: [
    {
      stationID: string
      obsTimeUtc: string
      obsTimeLocal: string
      neighborhood: string
      country: string
      lon: number
      lat: number
      uv: number
      winddir: number
      humidity: number
      metric_si: MetricSi
    },
  ]
}

export default function WeatherDisplay() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await fetch("/api/weather")
        if (!response.ok) throw new Error("Error al cargar datos meteorológicos")
        const data = await response.json()
        setWeather(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido")
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
    const interval = setInterval(fetchWeather, 300000) // Actualizar cada 5 minutos
    return () => clearInterval(interval)
  }, [])

  if (error) {
    return <div className="p-4 bg-red-50 text-red-600 rounded-lg">{error}</div>
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Header Principal */}
      <header className="bg-[#003876] text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-2 text-sm">
              <span>Email: secretaria@fpune.edu.py</span>
              <span>|</span>
              <span>Tel: (061) 575.112/3</span>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Encabezado Institucional */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-NYBBYfCulkeXwgnWC8AfnAjHLZniDx.png"
              alt="FPUNE Logo"
              width={100}
              height={100}
              className="object-contain"
            />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#003876]">Universidad Nacional del Este</h1>
              <h2 className="text-xl md:text-2xl text-[#003876]">Facultad Politécnica</h2>
              <p className="text-gray-600">Estación Meteorológica</p>
            </div>
          </div>

          {/* Panel Principal del Clima */}
          <Card className="bg-white shadow-lg">
            <CardContent className="p-6">
              {loading ? (
                <LoadingState />
              ) : weather ? (
                <div className="space-y-6">
                  {/* Tiempo de Observación */}
                  <div className="text-center text-gray-600">
                    <p>Última Actualización: {formatDate(weather.observations[0].obsTimeLocal)}</p>
                    <p className="text-sm">
                      {weather.observations[0].neighborhood}, {weather.observations[0].country}
                    </p>
                  </div>

                  {/* Temperatura Principal */}
                  <div className="text-center">
                    <h3 className="text-6xl font-bold text-[#003876]">
                      {weather.observations[0].metric_si.temp.toFixed(1)}°C
                    </h3>
                    <p className="text-xl text-gray-600 mt-2">
                      Sensación Térmica: {weather.observations[0].metric_si.heatIndex.toFixed(1)}°C
                    </p>
                  </div>

                  {/* Métricas Detalladas */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <MetricCard
                      icon={<ThermometerSun className="h-6 w-6 text-[#003876]" />}
                      label="Humedad"
                      value={`${weather.observations[0].humidity}%`}
                      subValue={`Punto de rocío: ${weather.observations[0].metric_si.dewpt.toFixed(1)}°C`}
                    />
                    <MetricCard
                      icon={<Wind className="h-6 w-6 text-[#003876]" />}
                      label="Viento"
                      value={`${weather.observations[0].metric_si.windSpeed.toFixed(1)} m/s`}
                      subValue={`Dirección: ${getWindDirection(weather.observations[0].winddir)}`}
                    />
                    <MetricCard
                      icon={<Droplets className="h-6 w-6 text-[#003876]" />}
                      label="Presión"
                      value={`${weather.observations[0].metric_si.pressure.toFixed(1)} hPa`}
                      subValue={`Elevación: ${weather.observations[0].metric_si.elev}m`}
                    />
                    <MetricCard
                      icon={<Sun className="h-6 w-6 text-[#003876]" />}
                      label="Índice UV"
                      value={weather.observations[0].uv.toString()}
                      subValue="Radiación solar: 0 W/m²"
                    />
                  </div>

                  {/* Datos Adicionales */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="text-[#003876] font-semibold mb-2">Precipitación</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Tasa actual:</span>
                            <span>{weather.observations[0].metric_si.precipRate.toFixed(1)} mm/h</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total acumulado:</span>
                            <span>{weather.observations[0].metric_si.precipTotal.toFixed(1)} mm</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="text-[#003876] font-semibold mb-2">Ubicación</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Latitud:</span>
                            <span>{weather.observations[0].lat.toFixed(6)}°</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Longitud:</span>
                            <span>{weather.observations[0].lon.toFixed(6)}°</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>

          {/* Recomendaciones */}
          {!loading && weather && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-[#003876] mb-4">Recomendaciones</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <WeatherAdvice
                    temp={weather.observations[0].metric_si.temp}
                    humidity={weather.observations[0].humidity}
                    uv={weather.observations[0].uv}
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#003876] text-white mt-8">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <p>© {new Date().getFullYear()} Facultad Politécnica UNE</p>
            <p className="text-sm mt-2">Km 8 Acaray, Ciudad del Este - Paraguay</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-16 w-32" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    </div>
  )
}

interface MetricCardProps {
  icon: React.ReactNode
  label: string
  value: string
  subValue?: string
}

function MetricCard({ icon, label, value, subValue }: MetricCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 flex items-start space-x-4">
      {icon}
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-lg font-semibold text-[#003876]">{value}</p>
        {subValue && <p className="text-xs text-gray-500 mt-1">{subValue}</p>}
      </div>
    </div>
  )
}

function WeatherAdvice({ temp, humidity, uv }) {
  const recommendations = []

  if (temp > 30) {
    recommendations.push({
      title: "Temperatura Alta",
      advice: "Se recomienda mantenerse hidratado y evitar actividades al aire libre prolongadas.",
    })
  }

  if (humidity > 70) {
    recommendations.push({
      title: "Humedad Alta",
      advice: "La sensación térmica puede ser mayor. Tome precauciones adicionales.",
    })
  }

  if (uv >= 6) {
    recommendations.push({
      title: "Índice UV Alto",
      advice: "Use protector solar y busque áreas con sombra.",
    })
  }

  if (recommendations.length === 0) {
    recommendations.push({
      title: "Condiciones Favorables",
      advice: "Clima adecuado para actividades normales en el campus.",
    })
  }

  return (
    <>
      {recommendations.map((rec, index) => (
        <div key={index} className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-[#003876]">{rec.title}</h4>
          <p className="text-gray-600 text-sm mt-1">{rec.advice}</p>
        </div>
      ))}
    </>
  )
}

