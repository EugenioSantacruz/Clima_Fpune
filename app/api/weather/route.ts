import { NextResponse } from "next/server"

const API_KEY = "526e059114aa4a5eae059114aada5eb3"
const STATION_ID = "ICIUDA253"
const BASE_URL = "https://api.weather.com/v2/pws/observations/current"

export async function GET() {
  try {
    const url = `${BASE_URL}?stationId=${STATION_ID}&format=json&units=s&apiKey=${API_KEY}`
    const response = await fetch(url)
    console.log()

    if (!response.ok) {
      throw new Error("Failed to fetch weather data")
    }

    const data = await response.json()
    console.log(data)
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Error fetching weather data" }, { status: 500 })
  }
}

