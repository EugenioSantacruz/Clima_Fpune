// Archivo: /app/api/forecast/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const apiUrl =
    "https://api.weather.com/v3/wx/forecast/daily/5day?geocode=-25.484386,-54.671117&format=json&units=s&language=es-ES&apiKey=526e059114aa4a5eae059114aada5eb3";

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      return NextResponse.json(
        { error: "Error al obtener los datos del clima" },
        { status: response.status }
      );
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
