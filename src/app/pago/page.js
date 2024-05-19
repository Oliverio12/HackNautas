'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const MontoAPagar = () => {
  const [total, setTotal] = useState(0);
  const [pin, setPin] = useState('');
  const saldoCuenta = 1000;
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const storedTotal = localStorage.getItem('total');
    if (storedTotal) {
      setTotal(parseInt(storedTotal));
    }
    router.refresh();
  }, []);

  const handleConfirm = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setShowError(false);
    setPin('');
    setAttemptCount(0);
  };

  const handlePayment = () => {
    if (pin === '1234') {
      router.push('/pago-exitoso');
    } else {
      setAttemptCount(attemptCount + 1);
      setShowError(true);
      if (attemptCount >= 2) {
        localStorage.setItem('total', '0');
        router.push('/');
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="w-full bg-red-600 p-4 text-center text-lg font-semibold">
        Monto a Pagar
      </nav>
      <div className="p-6">
        <div className="flex justify-start mb-4 text-red-600 text-xl">
          <button onClick={() => router.back()}>
            &#8592; Volver
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-red-600 mb-2" htmlFor="total">Total:</label>
          <input
            id="total"
            value={`$${total}`}
            readOnly
            className="p-2 bg-black border border-red-600 text-white w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-red-600 mb-2" htmlFor="saldoCuenta">Saldo de Cuenta:</label>
          <input
            id="saldoCuenta"
            value={`$${saldoCuenta}`}
            readOnly
            className="p-2 bg-black border border-red-600 text-white w-full"
          />
        </div>
        {showError && (
          <div className="mb-4 text-center text-red-600">
            PIN incorrecto. Intento {attemptCount + 1} de 3.
          </div>
        )}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
            <div className="bg-white p-6 rounded-md">
              <h2 className="text-red-600 text-lg font-semibold mb-4">Confirmar Pago</h2>
              <input
                type="password"
                placeholder="Ingrese su PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="p-2 bg-black border border-red-600 text-white w-full mb-4"
              />
              <button
                onClick={handlePayment}
                className="py-2 px-4 bg-red-600 text-white font-semibold rounded-lg shadow-md shadow-red-600 hover:bg-red-700 focus:outline-none mr-2"
              >
                Confirmar
              </button>
              <button
                onClick={handleModalClose}
                className="py-2 px-4 bg-gray-600 text-white font-semibold rounded-lg shadow-md shadow-gray-600 hover:bg-gray-700 focus:outline-none"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
        {!showModal && (
          <div className="mt-6">
            <button
              onClick={handleConfirm}
              className="py-2 px-4 bg-red-600 text-white font-semibold rounded-lg shadow-md shadow-red-600 hover:bg-red-700 focus:outline-none"
            >
              Confirmar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MontoAPagar;
