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


const apiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(apiConfig)

// Build a prompt from the messages
function buildPrompt(messages) {
  return (
    messages
      .map(({ content, role }) => {
        if (role === 'user') {
          return `Human: ${usersJSON}, ${content}`;
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
