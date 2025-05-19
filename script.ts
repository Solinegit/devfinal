interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  windSpeed: number;
}

async function getWeather(city: string, apiKey: string): Promise<WeatherData | null> {
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&lang=fr`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Erreur inconnue');
    }

    const data = await response.json();

    const weather: WeatherData = {
      city: data.location.name,
      temperature: data.current.temp_c,
      description: data.current.condition.text,
      windSpeed: data.current.wind_kph,
    };

    return weather;
  } catch (error: any) {
    console.error("Erreur getWeather:", error.message || error);
    return null;
  }
}


