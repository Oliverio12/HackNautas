"use client";
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const PagoMiscelaneos = () => {
  const [precio, setPrecio] = useState('');
  const [escaneoCompletado, setEscaneoCompletado] = useState(false);
  const [redireccionado, setRedireccionado] = useState(false); // Nuevo estado para controlar la redirección
  const videoRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (escaneoCompletado && !redireccionado) {
      const timer = setTimeout(() => {
        localStorage.setItem('total', '15');
        router.push('/pago');
        router.refresh(); // Recargar la página antes de redirigir
        setRedireccionado(true); // Marcar que la redirección ha ocurrido
        // Ocultar el elemento de video una vez que se complete el escaneo y se inicie la redirección
        if (videoRef.current) {
          videoRef.current.style.display = 'none';
        }
        
      }, 5000); // Redirigir al usuario a la página de pago después de 5 segundos
      
      return () => clearTimeout(timer); // Limpiar el temporizador al desmontar el componente
    }
  }, [escaneoCompletado, redireccionado, router]);

  // Función para iniciar la cámara y mostrar el video
  const iniciarCamara = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
    }
  };

  // Función para manejar el escaneo manual del precio
  const handlePagar = () => {
    if (precio.trim() !== '') {
      localStorage.setItem('total', precio);
      router.push('/pago');
    }
  };

  // Simulación de escaneo de QR
  const handleScan = (e) => {
    if (e.key === 'Enter' && precio.trim() !== '') {
      setEscaneoCompletado(true);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="w-full bg-red-600 p-4 text-center text-lg font-semibold">
        Pago Misceláneos
      </nav>
      <div className="p-6">
        <div className="flex justify-start mb-4 text-red-600 text-xl">
          <button onClick={() => router.back()}>
            &#8592; Volver
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-red-600 mb-2" htmlFor="precio">Precio:</label>
          <input
            id="precio"
            type="number"
            placeholder="Ingrese el precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            onKeyPress={handleScan}
            className="p-2 bg-black border border-red-600 text-white w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-red-600 mb-2">Escanear QR:</label>
          <div className="flex justify-center items-center h-64 bg-gray-800">
            {escaneoCompletado ? (
              <div className="text-white text-lg">Escaneo completo. Redirigiendo...</div>
            ) : (
              <video ref={videoRef} className="w-full h-full" autoPlay playsInline></video>
            )}
          </div>
          <button
            onClick={() => {
              iniciarCamara();
              setTimeout(() => {
                setEscaneoCompletado(true);
              }, 5000); // Simular el escaneo completo después de 5 segundos
            }}
            className="mt-4 py-2 px-4 bg-red-600 text-white font-semibold rounded-lg shadow-md shadow-red-600 hover:bg-red-700 focus:outline-none"
          >
            Abrir Cámara
          </button>
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

export default PagoMiscelaneos;
