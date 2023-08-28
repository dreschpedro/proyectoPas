import React from 'react'
import Image from 'next/image'

function adminHome() {
  return (
    <div className='d-flex align-self-center justify-content-center' style={{ marginTop: '10rem' }}>

      <Image
        src="/img/logoPasColor.svg"
        width={330}
        height={300}
        alt="Picture of the author"
      />

    </div>
  )
}

export default adminHome