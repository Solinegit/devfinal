const apiKey = 'ebc3093380409ffdf7375b5977ba4c6b'

document.getElementById("getWeatherBtn")?.addEventListener("click", () => {
  const city = (document.getElementById("cityInput") as HTMLInputElement).value;
  if (city) {
    getWeather(city);
  }
});

async function getWeather(city: string) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=fr`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      throw new Error(data.message);
    }

    const result = `
      <h2>${data.name}</h2>
      <p>Température : ${data.main.temp}°C</p>
      <p> Météo : ${data.weather[0].description}</p>
      <p> Vent : ${data.wind.speed} m/s</p>
    `;
    (document.getElementById("weatherResult") as HTMLElement).innerHTML = result;
  } catch (error: any) {
    (document.getElementById("weatherResult") as HTMLElement).innerHTML =
      `<p style="color:red;">Erreur : ${error.message}</p>`;
  }
}
