'use client'

import { useChat } from 'ai/react';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat'
  })

  return (
      

    <div>
      <ul className='chat'>
        {messages.map((m, index) => (
          <li className='chatMessage' key={index}>
            <div className='border border-secondary rounded rounded-1.1 shadow m-auto'>
            {m.role === 'user' ? 'User: ' : 'AI: '}
            {m.content}</div>
          </li>
        ))}
      </ul>

      <form className='sentDeConsultas' onSubmit={handleSubmit}>
        <div className='d-flex flex-nowrap justify-content-center'>
          <input className='border border-secondary rounded rounded-1.1 shadow m-auto inputChat' value={input} onChange={handleInputChange} />
          <button className='buttonChat my-auto mx-2' type="submit"><FontAwesomeIcon icon={faPaperPlane} style={{color: "#ffffff",}} /></button>
        </div>
      </form>
    </div>
  )
}