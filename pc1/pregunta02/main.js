

async function obtenerDatosAPI() {
  try {
    const url = 'https://api.sampleapis.com/countries/countries';
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error al obtener datos de la API: ${response.statusText}`);
    }

    const datos = await response.json();
    return datos;
  } catch (error) {
    throw new Error(`Error en la función obtenerDatosDeAPI: ${error.message}`);
  }
}

obtenerDatosAPI()
  .then((datos) => {
    console.log('Datos de la API:', datos);
  })
  .catch((error) => {
    console.error(error.message);
  });