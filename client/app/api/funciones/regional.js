import instance from "@/app/axiosConfig";
const geograf = 'https://apis.datos.gob.ar/georef/api/';

export const fetchDepartamentos = async () => {
  try {
    const response = await instance.get(`${geograf}departamentos?provincia=54&campos=id,nombre&max=17`);
    console.log('Departamentos Response:', response.data);
    return response.data.departamentos || [];
  } catch (error) {
    console.error('Error fetching departamentos:', error);
    return [];
  }
};

export const fetchLocalidades = async (departamentoId) => {
  try {
    const response = await instance.get(`${geograf}localidades?departamento=${departamentoId}&campos=id,nombre`);
    console.log('Localidades Response:', response.data);
    return response.data.localidades || [];
  } catch (error) {
    console.error('Error fetching localidades:', error);
    return [];
  }
};
