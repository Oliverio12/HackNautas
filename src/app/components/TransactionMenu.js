'use client';

import React from 'react';
import Link from 'next/link';

const TransactionMenu = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-black text-white">
      <nav className="w-full bg-red-600 p-4 text-center text-lg font-semibold">
        Menu de transacciones
      </nav>
      <div className="mt-10 p-6 bg-black border-2 border-red-600 shadow-lg shadow-red-600 rounded-lg">
        <Link href="/talonario">
          <div className="w-full mb-4 py-2 px-4 bg-red-600 text-white font-semibold rounded-lg shadow-md shadow-red-600 hover:bg-red-700 focus:outline-none cursor-pointer text-center">
            Pagos Mensuales
          </div>
        </Link>
        <Link href="/pago-aranceles">
          <div className="w-full mb-4 py-2 px-4 bg-red-600 text-white font-semibold rounded-lg shadow-md shadow-red-600 hover:bg-red-700 focus:outline-none cursor-pointer text-center">
            Pago de Aranceles Diferidos
          </div>
        </Link>
        <Link href="/pago-micelaneos">
          <div className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-lg shadow-md shadow-red-600 hover:bg-red-700 focus:outline-none cursor-pointer text-center">
            Pagos Misceláneos
          </div>
        </Link>
      </div>
    </div>
  );
};

export default TransactionMenu;
