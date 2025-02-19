export function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleString("es-PY", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getWindDirection(degrees: number): string {
  const directions = [
    "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
    "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"
  ];
  const index = Math.round(((degrees %= 360) < 0 ? degrees + 360 : degrees) / 22.5) % 16;
  return directions[index];
}

export function cn(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

interface RawWeatherData {
  dayOfWeek: string[]
  calendarDayTemperatureMax: number[]
  calendarDayTemperatureMin: number[]
  narrative: string[]
  sunriseTimeLocal: string[]
  sunsetTimeLocal: string[]
  moonPhase: string[]
  qpf: number[]
  daypart: [
    {
      precipChance: (number | null)[]
      relativeHumidity: (number | null)[]
      windSpeed: (number | null)[]
      windDirectionCardinal: (string | null)[]
      uvIndex: (number | null)[]
      wxPhraseLong: (string | null)[]
    },
  ]
}

export function processWeatherData(data: RawWeatherData) {
  return data.dayOfWeek.map((day, index) => {
    const dateObj = new Date()
    dateObj.setDate(dateObj.getDate() + index)

    return {
      dayOfWeek: day,
      dateStr: dateObj.toLocaleDateString("es-ES", { day: "2-digit", month: "short" }),
      tempMax: data.calendarDayTemperatureMax[index],
      tempMin: data.calendarDayTemperatureMin[index],
      narrative: data.narrative[index],
      sunrise: new Date(data.sunriseTimeLocal[index]).toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sunset: new Date(data.sunsetTimeLocal[index]).toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      moonPhase: data.moonPhase[index],
      precipitation: {
        chance: data.daypart[0].precipChance[index * 2 + 1] ?? 0,
        amount: data.qpf[index],
      },
      conditions: {
        description: data.daypart[0].wxPhraseLong[index * 2 + 1] ?? "",
        icon: getWeatherIcon(data.daypart[0].wxPhraseLong[index * 2 + 1] ?? ""),
        humidity: data.daypart[0].relativeHumidity[index * 2 + 1] ?? 0,
        windSpeed: data.daypart[0].windSpeed[index * 2 + 1] ?? 0,
        windDirection: data.daypart[0].windDirectionCardinal[index * 2 + 1] ?? "",
        uvIndex: data.daypart[0].uvIndex[index * 2 + 1] ?? 0,
      },
    }
  })
}

function getWeatherIcon(condition: string): string {
  if (condition.includes("lluvia") || condition.includes("tormenta")) return "rain"
  if (condition.includes("nublado")) return "cloudy"
  if (condition.includes("soleado") || condition.includes("despejado")) return "clear"
  return "clear"
}
