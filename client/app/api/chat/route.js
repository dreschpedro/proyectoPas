// app/api/chat/route.js

import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'





const users = [
  {
    nombre: 'Juan',
    apellido: 'Pérez',
    dni: '12345678',
    asistencias: [true, false, true, true, false],
  },
  {
    nombre: 'María',
    apellido: 'González',
    dni: '23456789',
    asistencias: [true, true, true, false, false],
  },

  {
    nombre: 'Adriana',
    apellido: 'Vega',
    dni: '40817159',
    asistencias: [true, true, true, false, false],
  },
  {
    nombre: 'Pedro',
    apellido: 'Rodríguez',
    dni: '34567890',
    asistencias: [false, false, true, true, true],
  },
  {
    nombre: 'Lucía',
    apellido: 'Fernández',
    dni: '45678901',
    asistencias: [true, true, false, false, true],
  },
  {
    nombre: 'Sofía',
    apellido: 'López',
    dni: '56789012',
    asistencias: [false, false, false, true, true],
  },
];

const usersJSON = JSON.stringify(users);
console.log(usersJSON);


const servicios = [
  {
    nombreServicio: 'Odontología',
    lugar: 'Hospital Central',
    fecha: '2023-07-21',
    hora: '10:00 AM',
    registradoPor: 'Marta Martínez',
    descripcion: 'Revisión de rutina y limpieza dental.',
  },
  {
    nombreServicio: 'Oftalmología',
    lugar: 'Clínica Vista Clara',
    fecha: '2023-07-22',
    hora: '3:30 PM',
    registradoPor: 'Carlos Sánchez',
    descripcion: 'Examen de la vista y ajuste de anteojos.',
  },
  {
    nombreServicio: 'Denuncias Policiales',
    lugar: 'Comisaría 8ª',
    fecha: '2023-07-23',
    hora: '9:15 AM',
    registradoPor: 'Ana González',
    descripcion: 'Registro de denuncia por robo de bicicleta.',
  },
  {
    nombreServicio: 'Registro DNI',
    lugar: 'Oficina de Registro Civil',
    fecha: '2023-07-24',
    hora: '11:30 AM',
    registradoPor: 'José Rodríguez',
    descripcion: 'Trámite de renovación de DNI.',
  },
  {
    nombreServicio: 'Odontología',
    lugar: 'Consultorio Dental Sonrisa Feliz',
    fecha: '2023-07-25',
    hora: '2:00 PM',
    registradoPor: 'Laura Fernández',
    descripcion: 'Tratamiento de caries y extracción de muelas.',
  },
  {
    nombreServicio: 'Registro DNI',
    lugar: 'Centro de Documentación Rápida',
    fecha: '2023-07-26',
    hora: '10:45 AM',
    registradoPor: 'Juan Pérez',
    descripcion: 'Solicitud de duplicado de DNI por extravío.',
  },
  {
    nombreServicio: 'Consulta Médica',
    lugar: 'Centro Médico San Juan',
    fecha: '2023-07-27',
    hora: '9:30 AM',
    registradoPor: 'María López',
    descripcion: 'Consulta médica general y control de presión arterial.',
  },
  {
    nombreServicio: 'Asesoría Legal',
    lugar: 'Estudio Jurídico Justicia Legal',
    fecha: '2023-07-28',
    hora: '4:00 PM',
    registradoPor: 'Luis González',
    descripcion: 'Asesoramiento legal en caso de conflicto laboral.',
  },
  {
    nombreServicio: 'Vacunación',
    lugar: 'Centro de Vacunación Municipal',
    fecha: '2023-07-29',
    hora: '11:15 AM',
    registradoPor: 'Ana Martínez',
    descripcion: 'Vacunación contra la influenza y el tétanos.',
  },
  {
    nombreServicio: 'Psicoterapia',
    lugar: 'Consultorio Psicológico Emociones',
    fecha: '2023-07-30',
    hora: '2:30 PM',
    registradoPor: 'Laura Rodríguez',
    descripcion: 'Sesión de terapia para manejo del estrés y la ansiedad.',
  },



  // Agrega más ejemplos de servicios aquí...
];

const serviciosJSON = JSON.stringify(servicios);

const apiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

let enviarContenido = true;
const openai = new OpenAIApi(apiConfig)

// Build a prompt from the messages
function buildPrompt(messages) {
  return (
    messages
      .map(({ content, role }) => {

        if (role === 'user') {
          if (enviarContenido) {
            return `Human: ${serviciosJSON} ${usersJSON} ${content} `
          } else {
            return `Human: ${content}`;
          };
          
        } else {
          return `Assistant: ${content}`;
        }
        
      })
      .join('\n\n') + 'Assistant:'
  );
}



export async function POST(req) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    stream: true,
    prompt: buildPrompt(messages),
    max_tokens: 200,
    temperature: 0.5,
    top_p: 1,
  })

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response)

  // Respond with the stream
  return new StreamingTextResponse(stream)
}
