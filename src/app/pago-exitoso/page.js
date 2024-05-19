'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const PagoExitoso = () => {
  const [total, setTotal] = useState(0);
  const [fechaPago, setFechaPago] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTotal = localStorage.getItem('total');
      const fechaActual = new Date().toLocaleDateString();

      if (storedTotal) {
        setTotal(storedTotal);
        setFechaPago(fechaActual);
      }
    }
  }, []);

  const handleListo = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="w-full bg-red-600 p-4 text-center text-lg font-semibold">
        Pago Exitoso
      </nav>
      <div className="p-6 text-center">
        <div className="mb-4">
          <p className="text-lg">Fecha de Pago: {fechaPago}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg">Monto Pagado: ${total}</p>
        </div>
        <div className="mt-6">
          <button
            onClick={handleListo}
            className="py-2 px-4 bg-red-600 text-white font-semibold rounded-lg shadow-md shadow-red-600 hover:bg-red-700 focus:outline-none"
          >
            Listo
          </button>
        </div>
      </div>
    </div>
  );
};

export default PagoExitoso;
