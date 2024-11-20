
import { useEffect, useState } from 'react';

// Componente para mostrar los valores del dólar
const DolarComponent = () => {
  // Estados para almacenar los datos del BCV y EnParaleloVzla
  const [bcv, setBcv] = useState(null);
  const [enparalelovzla, setEnparaleloVzla] = useState(null);
  const [loading, setLoading] = useState(true);

  // Efecto que se ejecuta cuando el componente se monta
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Hacer la solicitud a la API
        const response = await fetch('https://pydolarve.org/api/v1/dollar', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer 2x9Qjpxl5F8CoKK6T395KA',
          },
        });

        const data = await response.json();
        const { monitors } = data;
        const { bcv, enparalelovzla } = monitors;

        // Actualizar los estados con los datos recibidos
        setBcv(bcv);
        setEnparaleloVzla(enparalelovzla);
        setLoading(false); // Cambiar el estado de carga
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        setLoading(false); // Asegurar que se actualice el estado de carga si hay error
      }
    };

    fetchData();
  }, []); // [] significa que este efecto se ejecuta solo una vez al montar el componente

  if (loading) {
    return <p>Cargando datos del dólar...</p>; // Mostrar un mensaje de carga mientras se obtienen los datos
  }

  return (
    <div class="p-10 bg-gray-800 text-white rounded-xl mt-6">
      <div class="flex flex-col md:flex-row justify-between items-center gap-10">

        {/* Dólar BCV */}
        <div class="bg-zinc-900 p-6 rounded-xl shadow-md flex-1">
          <h2 class="text-3xl font-bold">Dólar BCV</h2>
          <img src="/bcv.jpg" alt="BCV Image" class="w-16 my-3" />
          <p class="text-2xl">Precio: {bcv.price} Bs.</p>
          <p class="text-lg">
            Cambio: <span class={`font-bold text-${bcv.color}`}>{bcv.change} {bcv.symbol}</span>
          </p>
          <p class="text-sm">Porcentaje: {bcv.percent}%</p>
          <p class="text-sm text-gray-400">Última actualización: {bcv.last_update}</p>
        </div>

        {/* Dólar Paralelo */}
        <div class="bg-zinc-900 p-6 rounded-xl shadow-md flex-1">
          <h2 class="text-3xl font-bold">{enparalelovzla.title}</h2>
          <img src={enparalelovzla.image} alt="EnParaleloVzla Image" class="w-16 my-3" />
          <p class="text-2xl">Precio: {enparalelovzla.price} Bs.</p>
          <p class="text-lg">
            Cambio: <span class={`font-bold text-${enparalelovzla.color}`}>{enparalelovzla.change} {enparalelovzla.symbol}</span>
          </p>
          <p class="text-sm">Porcentaje: {enparalelovzla.percent}%</p>
          <p class="text-sm text-gray-400">Última actualización: {enparalelovzla.last_update}</p>
        </div>
      </div>
    </div>
  );
};

export default DolarComponent;

