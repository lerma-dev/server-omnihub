// src/api/openWeather.js
export const fetchWeatherData = async (lat, lon) => {
  const apiKey = process.env.API_KEY_OPENWEATHERMAP;
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('🔴 Error al conectar con OpenWeather Forecast');
    console.error('🔴 Error OpenWeatherMap');
  }
  return await response.json();
};