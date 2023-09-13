const geograf= 'https://apis.datos.gob.ar/georef/api/'

export const fetchDepartamentos = async () => {
  try {
    const response = await fetch(`${geograf}departamentos?provincia=54&campos=id,nombre&max=17`);
    const data = await response.json();
    console.log('Departamentos Response:', data);
    // console.log('Parsed Data:', data);
    return data.departamentos || [];
  } catch (error) {
    console.error('Error fetching departamentos:', error); // Log the error
    return [];
  }
};

export const fetchLocalidades = async (departamentoId) => {
  try {
    const response = await fetch(`${geograf}localidades?departamento=${departamentoId}&campos=id,nombre`);
    const data = await response.json();
    // console.log('Localidades Response:', data);
    return data.localidades || [];
  } catch (error) {
    console.error('Error fetching localidades:', error); // Log the error
    return [];
  }
};