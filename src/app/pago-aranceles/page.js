'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const PagoAranceles = () => {
  const [nombreEstudiante, setNombreEstudiante] = useState('');
  const [nombreMateria, setNombreMateria] = useState('');
  const [nombreCatedratico, setNombreCatedratico] = useState('');
  const monto = 20;
  const router = useRouter();

  const handlePagar = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('total', monto);
    }
    router.push('/pago');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="w-full bg-red-600 p-4 text-center text-lg font-semibold">
        Pago de Aranceles Diferidos
      </nav>
      <div className="p-6">
        <div className="flex justify-start mb-4 text-red-600 text-xl">
          <button onClick={handleBack}>
            &#8592; Volver
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-red-600 mb-2" htmlFor="nombreEstudiante">Nombre del Estudiante:</label>
          <input
            id="nombreEstudiante"
            value={nombreEstudiante}
            onChange={(e) => setNombreEstudiante(e.target.value)}
            className="p-2 bg-black border border-red-600 text-white w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-red-600 mb-2" htmlFor="nombreMateria">Nombre de la Materia:</label>
          <input
            id="nombreMateria"
            value={nombreMateria}
            onChange={(e) => setNombreMateria(e.target.value)}
            className="p-2 bg-black border border-red-600 text-white w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-red-600 mb-2" htmlFor="nombreCatedratico">Nombre del Catedrático:</label>
          <input
            id="nombreCatedratico"
            value={nombreCatedratico}
            onChange={(e) => setNombreCatedratico(e.target.value)}
            className="p-2 bg-black border border-red-600 text-white w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-red-600 mb-2" htmlFor="monto">Monto:</label>
          <input
            id="monto"
            value={`$${monto}`}
            readOnly
            className="p-2 bg-black border border-red-600 text-white w-full"
          />
        </div>
        <div className="mt-6">
          <button
            onClick={handlePagar}
            className="py-2 px-4 bg-red-600 text-white font-semibold rounded-lg shadow-md shadow-red-600 hover:bg-red-700 focus:outline-none"
          >
            Pagar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PagoAranceles;
