"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sun,
  Moon,
  Cloud,
  CloudRain,
  Wind,
  Droplets,
  Sunrise,
  Sunset,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface WeatherData {
  dayOfWeek: string;
  dateStr: string;
  tempMax: number;
  tempMin: number;
  narrative: string;
  sunrise: string;
  sunset: string;
  moonPhase: string;
  precipitation: {
    chance: number;
    amount: number;
  };
  conditions: {
    description: string;
    icon: string;
    humidity: number;
    windSpeed: number;
    windDirection: string;
    uvIndex: number;
  };
}

export function FiveDayForecast() {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Reemplaza esta URL por la de tu API
      const res = await fetch("/api/forecast");
      const data = await res.json();

      // Suponiendo que todos los arrays tienen la misma longitud
      const totalDias = data.dayOfWeek.length;
      const diasAMostrar = Math.min(totalDias, 5);

      const diasTransformados: WeatherData[] = [];

      for (let i = 0; i < diasAMostrar; i++) {
        // Para obtener los datos de condiciones (narrativa, icono, humedad, etc.)
        // usamos el array 'daypart'. Suponiendo que la parte diurna está en el índice:
        // Día 1: índice 2, Día 2: índice 4, Día 3: índice 6, etc.
        const dayPartIndex = 2 * i + 2;

        diasTransformados.push({
          dayOfWeek: data.dayOfWeek[i],
          // Formateamos la fecha a "18 feb" usando validTimeLocal
          dateStr: new Date(data.validTimeLocal[i]).toLocaleDateString("es-ES", {
            day: "numeric",
            month: "short",
          }),
          tempMax: data.calendarDayTemperatureMax[i],
          tempMin: data.calendarDayTemperatureMin[i],
          narrative: data.narrative[i],
          sunrise: new Date(data.sunriseTimeLocal[i]).toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          sunset: new Date(data.sunsetTimeLocal[i]).toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          moonPhase: data.moonPhase[i],
          precipitation: {
            chance: data.daypart[0].precipChance[dayPartIndex] || 0,
            amount: data.qpf[i] || 0,
          },
          conditions: {
            description: data.daypart[0].wxPhraseLong[dayPartIndex] || "",
            icon: getIconFromCode(data.daypart[0].iconCode[dayPartIndex]),
            humidity: data.daypart[0].relativeHumidity[dayPartIndex] || 0,
            windSpeed: data.daypart[0].windSpeed[dayPartIndex] || 0,
            windDirection: data.daypart[0].windDirectionCardinal[dayPartIndex] || "",
            uvIndex: data.daypart[0].uvIndex[dayPartIndex] || 0,
          },
        });
      }

      setWeatherData(diasTransformados);
    };

    fetchData();
  }, []);

  // Función para mapear el iconCode de la API a un string que use tu componente getWeatherIcon
  const getIconFromCode = (code: number): string => {
    if (code === 27 || code === 26) return "cloudy";
    if (code === 37) return "rain";
    if (code === 30 || code === 34 || code === 33) return "clear";
    return "clear";
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "clear":
        return <Sun className="h-8 w-8 text-yellow-500" />;
      case "cloudy":
        return <Cloud className="h-8 w-8 text-gray-500" />;
      case "rain":
        return <CloudRain className="h-8 w-8 text-blue-500" />;
      default:
        return <Sun className="h-8 w-8 text-yellow-500" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-[#003366] mb-6">
        Pronóstico de 5 días
      </h2>

      <div className="space-y-4">
        {weatherData.map((day, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-0">
              <Accordion type="single" collapsible>
                <AccordionItem value={`day-${index}`}>
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-4">
                        {getWeatherIcon(day.conditions.icon)}
                        <div className="text-left">
                          <h3 className="font-semibold">{day.dayOfWeek}</h3>
                          <p className="text-sm text-gray-500">{day.dateStr}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <span className="text-lg font-bold">
                            {day.tempMax}°
                          </span>
                          <span className="text-gray-500 mx-1">/</span>
                          <span className="text-gray-500">
                            {day.tempMin}°
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Droplets className="h-4 w-4 text-blue-500" />
                          <span>{day.precipitation.chance}%</span>
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent>
                    <div className="px-6 py-4 bg-gray-50">
                      <p className="text-gray-600 mb-4">{day.narrative}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <Sunrise className="h-5 w-5 text-orange-500" />
                          <div>
                            <p className="text-sm text-gray-500">Amanecer</p>
                            <p className="font-medium">{day.sunrise}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Sunset className="h-5 w-5 text-orange-500" />
                          <div>
                            <p className="text-sm text-gray-500">Atardecer</p>
                            <p className="font-medium">{day.sunset}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Moon className="h-5 w-5 text-gray-600" />
                          <div>
                            <p className="text-sm text-gray-500">Fase lunar</p>
                            <p className="font-medium">{day.moonPhase}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Wind className="h-5 w-5 text-blue-500" />
                          <div>
                            <p className="text-sm text-gray-500">Viento</p>
                            <p className="font-medium">
                              {day.conditions.windSpeed} m/s{" "}
                              {day.conditions.windDirection}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="bg-white p-3 rounded-lg shadow-sm">
                          <p className="text-sm text-gray-500">Humedad</p>
                          <p className="text-lg font-medium">
                            {day.conditions.humidity}%
                          </p>
                        </div>

                        <div className="bg-white p-3 rounded-lg shadow-sm">
                          <p className="text-sm text-gray-500">
                            Precipitación
                          </p>
                          <p className="text-lg font-medium">
                            {day.precipitation.amount} mm
                          </p>
                        </div>

                        <div className="bg-white p-3 rounded-lg shadow-sm">
                          <p className="text-sm text-gray-500">Índice UV</p>
                          <p className="text-lg font-medium">
                            {day.conditions.uvIndex}
                          </p>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

