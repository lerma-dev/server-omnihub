import { fetchWeatherData } from '../api/openWeather.js';

export const GetClima = async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ ok: false, message: "Faltan lat/lon" });
  }

  try {
    const data = await fetchWeatherData(lat, lon);

    let cityFinal = data.city?.name || data.name || "Ciudad Juárez";
    let paisFinal = data.city?.country || data.sys?.country || "MX";

    const isFrontera = lat.toString().startsWith('31');
    const ciudadesFalsas = ["San Elizario", "Socorro", "Fabens", "El Paso", "Horizon City", "Desierto"];

    if (isFrontera  && (paisFinal === "US" || ciudadesFalsas.includes(cityFinal))) {
      cityFinal = "Ciudad Juárez";
      paisFinal = "MX";
    }
    
    const actual = data.list[0];

    const pronosticoExtendido = data.list.filter(item => item.dt_txt.includes("12:00:00")).map(dia => ({
      fecha: dia.dt_txt,
      temp: Math.round(dia.main.temp),
      temp_min: Math.round(dia.main.temp_min),
      temp_max: Math.round(dia.main.temp_max),
      descripcion: dia.weather[0].description,
      icono: `https://openweathermap.org/img/wn/${dia.weather[0].icon}@2x.png`,
      humedad: dia.main.humidity
    }));

    const respuestaLimpia = {
      ok: true,
      ciudad: cityFinal,
      pais: paisFinal,
      // Clima Actual
      actual: {
        temp: Math.round(actual.main.temp),
        descripcion: actual.weather[0].description,
        humedad: actual.main.humidity,
        viento: actual.wind.speed,
        icono: `https://openweathermap.org/img/wn/${actual.weather[0].icon}@4x.png`
      },
      // Array de los próximos 5 días
      proximos_dias: pronosticoExtendido
    };

    res.status(200).json(respuestaLimpia);

  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};