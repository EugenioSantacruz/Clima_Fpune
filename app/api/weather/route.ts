// Archivo: /app/api/current-weather/route.ts
import { NextResponse } from "next/server";

const API_KEY = "526e059114aa4a5eae059114aada5eb3";
const STATION_ID = "ICIUDA253";

export async function GET() {
  try {
    const url = `https://api.weather.com/v2/pws/observations/current?stationId=ICIUDA253&format=json&units=s&apiKey=526e059114aa4a5eae059114aada5eb3`;
    const response = await fetch(url, { cache: 'no-store' });


    if (!response.ok) {
      return NextResponse.json(
        { error: "Error al obtener los datos del clima" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error interno del servidor" },
      { status: 500 }
    );
  }
}



