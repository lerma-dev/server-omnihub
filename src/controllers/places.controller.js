// src/controllers/places.controller.js
import { fetchNearbyPlaces } from '../api/apiPlaces.js';

export const getNearby = async (req, res) => {
  try {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'La ubicación (latitud y longitud) es obligatoria para la búsqueda.' 
      });
    }

    const places = await fetchNearbyPlaces(lat, lng);
    res.status(200).json({
      status: 'success',
      results: places.length,
      data: places
    });

  } catch (error) {
    console.error('🔴 Error en getNearby controller:', error.message);
    res.status(500).json({ 
      status: 'error', 
      message: 'No se pudieron obtener lugares cercanos. Revisa la configuración del servidor.' 
    });
  }
};