"use client"
import Link from 'next/link';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Redireccionar a /servicios después de un breve retraso (por ejemplo, 1 segundo)
    const timer = setTimeout(() => {
      window.location.href = '/admin/servicios';
    }, 1000);

    return () => clearTimeout(timer); // Limpieza al desmontar el componente
  }, []);

  return (
    <div>
      <h1>Home page</h1>
      <p>Redirigiendo a Servicios...</p>
    </div>
  );
}
