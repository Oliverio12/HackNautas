'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Talonario = () => {
  const [ciclo, setCiclo] = useState('I');
  const [selectedMonths, setSelectedMonths] = useState([]);
  const navigation = useRouter();

  const mesesCicloI = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'];
  const mesesCicloII = ['Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const mesPrecio = 55;

  const handleCicloChange = (e) => {
    setCiclo(e.target.value);
    setSelectedMonths([]); // Reset the selected months
  };

  const toggleMonthSelection = (mes) => {
    setSelectedMonths((prevSelected) =>
      prevSelected.includes(mes)
        ? prevSelected.filter((m) => m !== mes)
        : [...prevSelected, mes]
    );
  };

  const total = selectedMonths.length * mesPrecio;

  const handleProcesarPago = () => {
    if (total === 0) {
      alert('Seleccione al menos un mes para pagar.');
    } else {
      if (typeof window !== 'undefined') {
        localStorage.setItem('total', total);
        navigation.push('/pago');
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="w-full bg-red-600 p-4 text-center text-lg font-semibold">
        Talonario
      </nav>
      <div className="p-6">
        <div className="flex justify-end mb-4 text-red-600 text-xl">
          <Link href="/">
            &#8592; Volver a Menu de Transacciones
          </Link>
        </div>
        <div className="mb-4">
          <label className="block text-red-600 mb-2" htmlFor="ciclo">Selecciona el Ciclo:</label>
          <select
            id="ciclo"
            value={ciclo}
            onChange={handleCicloChange}
            className="p-2 bg-black border border-red-600 text-white"
          >
            <option value="I">Ciclo I</option>
            <option value="II">Ciclo II</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {ciclo === 'I' && mesesCicloI.map((mes) => (
            <button
              key={mes}
              onClick={() => toggleMonthSelection(mes)}
              className={`p-4 rounded shadow-lg shadow-red-600 ${selectedMonths.includes(mes) ? 'bg-red-700' : 'bg-red-600'}`}
            >
              {mes}
            </button>
          ))}
          {ciclo === 'II' && mesesCicloII.map((mes) => (
            <button
              key={mes}
              onClick={() => toggleMonthSelection(mes)}
              className={`p-4 rounded shadow-lg shadow-red-600 ${selectedMonths.includes(mes) ? 'bg-red-700' : 'bg-red-600'}`}
            >
              {mes}
            </button>
          ))}
        </div>
        <div className="mt-6">
          <p className="text-lg">Total: ${total}</p>
          <button
            onClick={handleProcesarPago}
            className="mt-4 py-2 px-4 bg-red-600 text-white font-semibold rounded-lg shadow-md shadow-red-600 hover:bg-red-700 focus:outline-none"
          >
            Procesar pago
          </button>
        </div>
      </div>
    </div>
  );
};

export default Talonario;

