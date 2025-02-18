"use client"

import {
  Bell,
  Book,
  Calendar,
  Cloud,
  CloudRain,
  Droplets,
  GraduationCap,
  Info,
  MapPin,
  Menu,
  Sun,
  Thermometer,
  Wind,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"

export default function WeatherDashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
            <div className="hidden md:flex items-center space-x-4 text-sm">
              <a href="#" className="hover:text-[#ffd700]">
                Campus Virtual
              </a>
              <a href="#" className="hover:text-[#ffd700]">
                Biblioteca
              </a>
              <a href="#" className="hover:text-[#ffd700]">
                Contacto
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Navegación Principal */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-NYBBYfCulkeXwgnWC8AfnAjHLZniDx.png"
                alt="FPUNE Logo"
                width={60}
                height={60}
                className="object-contain"
              />
              <div className="hidden md:block">
                <h1 className="text-[#003876] text-xl font-bold">Universidad Nacional del Este</h1>
                <h2 className="text-[#003876] text-lg">Facultad Politécnica</h2>
              </div>
            </div>
            <div className="flex items-center">
              <Button variant="ghost" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <Menu className="h-6 w-6" />
              </Button>
              <div className="hidden md:flex items-center space-x-6">
                <NavLink href="#" icon={<Info className="h-4 w-4" />} text="Institucional" />
                <NavLink href="#" icon={<Book className="h-4 w-4" />} text="Académico" />
                <NavLink href="#" icon={<GraduationCap className="h-4 w-4" />} text="Investigación" />
                <NavLink href="#" icon={<Bell className="h-4 w-4" />} text="Noticias" />
              </div>
            </div>
          </div>
        </div>
        {/* Menú móvil */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="container mx-auto px-4 py-2 space-y-2">
              <MobileNavLink href="#" text="Institucional" />
              <MobileNavLink href="#" text="Académico" />
              <MobileNavLink href="#" text="Investigación" />
              <MobileNavLink href="#" text="Noticias" />
            </div>
          </div>
        )}
      </nav>

      {/* Contenido Principal */}
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Encabezado del Clima */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <h2 className="text-2xl font-bold text-[#003876]">Estación Meteorológica FPUNE</h2>
                <div className="flex items-center justify-center md:justify-start text-gray-600 mt-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>Ciudad del Este, Paraguay</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Última Actualización: {new Date().toLocaleTimeString()}</p>
              </div>
              <div className="text-center">
                <div className="text-6xl font-bold text-[#003876]">28.8°C</div>
                <p className="text-lg text-gray-600">Parcialmente Nublado</p>
              </div>
            </div>
          </div>

          {/* Métricas del Clima */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <WeatherMetricCard
              icon={<Thermometer className="h-8 w-8 text-[#003876]" />}
              label="Sensación Térmica"
              value="33°C"
            />
            <WeatherMetricCard
              icon={<Wind className="h-8 w-8 text-[#003876]" />}
              label="Velocidad del Viento"
              value="0 m/s"
            />
            <WeatherMetricCard icon={<Sun className="h-8 w-8 text-[#003876]" />} label="Índice UV" value="0" />
            <WeatherMetricCard
              icon={<Droplets className="h-8 w-8 text-[#003876]" />}
              label="Presión Atmosférica"
              value="1009.14 mbar"
            />
          </div>

          {/* Tabs de Información */}
          <Tabs defaultValue="pronostico" className="bg-white rounded-lg shadow-md p-6">
            <TabsList className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-transparent">
              <TabsTrigger
                value="pronostico"
                className="data-[state=active]:bg-[#003876] data-[state=active]:text-white"
              >
                Pronóstico
              </TabsTrigger>
              <TabsTrigger
                value="historico"
                className="data-[state=active]:bg-[#003876] data-[state=active]:text-white"
              >
                Datos Históricos
              </TabsTrigger>
              <TabsTrigger value="alertas" className="data-[state=active]:bg-[#003876] data-[state=active]:text-white">
                Alertas Meteorológicas
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pronostico" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <ForecastCard
                    key={i}
                    day={new Date(Date.now() + 86400000 * (i + 1)).toLocaleDateString("es-ES", { weekday: "long" })}
                    icon={<Cloud className="h-12 w-12 text-[#003876]" />}
                    maxTemp="29°C"
                    minTemp="19°C"
                    precipitation="20%"
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="historico" className="mt-6">
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-[#003876]">Registros Históricos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <HistoricalDataCard
                    title="Temperatura Promedio Mensual"
                    data={[
                      { label: "Enero", value: "32°C" },
                      { label: "Febrero", value: "31°C" },
                      { label: "Marzo", value: "29°C" },
                    ]}
                  />
                  <HistoricalDataCard
                    title="Precipitaciones Mensuales"
                    data={[
                      { label: "Enero", value: "150mm" },
                      { label: "Febrero", value: "140mm" },
                      { label: "Marzo", value: "130mm" },
                    ]}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="alertas" className="mt-6">
              <div className="space-y-4">
                <WeatherAlert
                  type="info"
                  title="Pronóstico de Lluvias"
                  description="Se esperan precipitaciones moderadas durante la tarde"
                  time="14:00 - 18:00"
                />
                <WeatherAlert
                  type="warning"
                  title="Alerta de Calor"
                  description="Se prevén temperaturas superiores a 35°C"
                  time="12:00 - 16:00"
                />
              </div>
            </TabsContent>
          </Tabs>

          {/* Información Adicional */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#003876] flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Eventos Académicos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <AcademicEvent
                    time="09:00"
                    title="Defensa de Tesis"
                    location="Sala de Conferencias"
                    department="Ingeniería"
                  />
                  <AcademicEvent
                    time="14:00"
                    title="Seminario de Investigación"
                    location="Auditorio Principal"
                    department="Informática"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[#003876] flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Recomendaciones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <WeatherRecommendation
                    icon={<CloudRain className="h-5 w-5" />}
                    title="Actividades al Aire Libre"
                    description="Condiciones favorables para actividades en el campus"
                  />
                  <WeatherRecommendation
                    icon={<Sun className="h-5 w-5" />}
                    title="Protección Solar"
                    description="Se recomienda usar protector solar y gorra"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#003876] text-white mt-8">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold text-lg mb-2">Contacto</h3>
              <p className="text-sm">Km 8 Acaray, Ciudad del Este</p>
              <p className="text-sm">Paraguay</p>
              <p className="text-sm">Tel: (061) 575.112/3</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Enlaces Rápidos</h3>
              <ul className="text-sm space-y-1">
                <li>
                  <a href="#" className="hover:text-[#ffd700]">
                    Campus Virtual
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#ffd700]">
                    Biblioteca
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#ffd700]">
                    Investigación
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Síguenos</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-[#ffd700]">
                  Facebook
                </a>
                <a href="#" className="hover:text-[#ffd700]">
                  Twitter
                </a>
                <a href="#" className="hover:text-[#ffd700]">
                  Instagram
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-6 pt-6 text-center text-sm">
            © {new Date().getFullYear()} Facultad Politécnica UNE. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}

function NavLink({ href, icon, text }) {
  return (
    <a href={href} className="flex items-center space-x-1 text-[#003876] hover:text-[#ffd700] transition-colors">
      {icon}
      <span>{text}</span>
    </a>
  )
}

function MobileNavLink({ href, text }) {
  return (
    <a href={href} className="block py-2 text-[#003876] hover:text-[#ffd700] transition-colors">
      {text}
    </a>
  )
}

function WeatherMetricCard({ icon, label, value }) {
  return (
    <Card className="bg-white">
      <CardContent className="flex items-center p-6">
        <div className="mr-4">{icon}</div>
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-xl font-bold text-[#003876]">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function ForecastCard({ day, icon, maxTemp, minTemp, precipitation }) {
  return (
    <Card>
      <CardContent className="text-center p-6">
        <h3 className="text-lg font-semibold text-[#003876] capitalize mb-4">{day}</h3>
        <div className="mb-4">{icon}</div>
        <div className="space-y-2">
          <p className="text-2xl font-bold text-[#003876]">{maxTemp}</p>
          <p className="text-gray-600">{minTemp}</p>
          <p className="text-sm text-gray-500">Lluvia: {precipitation}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function HistoricalDataCard({ title, data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[#003876]">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-gray-600">{item.label}</span>
              <span className="font-semibold text-[#003876]">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function WeatherAlert({ type, title, description, time }) {
  const bgColor = type === "warning" ? "bg-yellow-50" : "bg-blue-50"
  const borderColor = type === "warning" ? "border-yellow-400" : "border-blue-400"
  const textColor = type === "warning" ? "text-yellow-800" : "text-blue-800"

  return (
    <div className={`${bgColor} ${borderColor} border-l-4 p-4 rounded-r-lg`}>
      <h4 className={`font-semibold ${textColor}`}>{title}</h4>
      <p className="text-gray-600 mt-1">{description}</p>
      <p className="text-sm text-gray-500 mt-1">{time}</p>
    </div>
  )
}

function AcademicEvent({ time, title, location, department }) {
  return (
    <div className="flex items-start space-x-4">
      <div className="bg-[#003876] text-white px-3 py-1 rounded text-sm">{time}</div>
      <div>
        <h4 className="font-semibold text-[#003876]">{title}</h4>
        <p className="text-sm text-gray-600">{location}</p>
        <p className="text-sm text-gray-500">{department}</p>
      </div>
    </div>
  )
}

function WeatherRecommendation({ icon, title, description }) {
  return (
    <div className="flex items-start space-x-4">
      <div className="text-[#003876]">{icon}</div>
      <div>
        <h4 className="font-semibold text-[#003876]">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  )
}

