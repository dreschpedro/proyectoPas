'use client'

import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat'
  })

  return (


    <div className='bordesito'>
      <ul>
        {messages.map((m, index) => (
          <li key={index}>
            {m.role === 'user' ? 'User: ' : 'AI: '}
            {m.content}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <div className='d-flex flex-nowrap justify-content-center'>
          <input className='border border-secondary rounded rounded-1.1 shadow' value={input} onChange={handleInputChange} />
          <button className='buttonRegistrar my-auto mx-3' type="submit">enviar</button>
        </div>
      </form>
    </div>
  )
}