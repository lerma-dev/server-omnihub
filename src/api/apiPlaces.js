// src/api/apiPlaces.js
export const fetchNearbyPlaces = async (lat, lng) => {
  try {
    const apiKey = process.env.API_KEY_FOURSQUARE;
    const radio = '2000';
    const url = `https://places-api.foursquare.com/places/search?ll=${lat},${lng}&radius=${radio}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${apiKey.trim()}`, 
        'X-Places-Api-Version': '2025-06-17' 
      }
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ Error de Foursquare:", data);
      throw new Error(data.message || `Error ${response.status}`);
    }

    return data.results; 
  } catch (error) {
    console.error('🔴 Fallo en apiPlaces:', error.message);
    throw error;
  }
};