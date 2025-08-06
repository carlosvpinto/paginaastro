import { useEffect, useState } from 'react';

// Componente para mostrar los valores de las divisas
const DolarComponent = () => {
  // CAMBIO: Estados para almacenar los datos de BCV y Euro
  const [bcv, setBcv] = useState(null);
  const [bcvEur, setBcvEur] = useState(null);
  const [loading, setLoading] = useState(true);

  // Efecto que se ejecuta cuando el componente se monta
  useEffect(() => {
    const fetchData = async () => {
      try {
        // CAMBIO: Hacer la solicitud a la URL y endpoint correctos
        const response = await fetch('https://api.dolaraldiavzla.com/api/v1/dollar?page=alcambio');

        const data = await response.json();
        const { monitors } = data;
        // CAMBIO: Extraer 'bcv' y 'bcv_eur' del objeto de monitores
        const { bcv, bcv_eur } = monitors;

        // CAMBIO: Actualizar los nuevos estados con los datos recibidos
        setBcv(bcv);
        setBcvEur(bcv_eur);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []); // El efecto se ejecuta solo una vez

  // Mensaje de carga mientras se obtienen los datos
  if (loading) {
    return <p class="text-white text-center p-10">Cargando tasas de cambio...</p>;
  }

  // CAMBIO: Si no se cargaron los datos, muestra un mensaje de error
  if (!bcv || !bcvEur) {
    return <p class="text-red-500 text-center p-10">No se pudieron cargar los datos.</p>;
  }

  return (
    <div class="p-10 bg-gray-800 text-white rounded-xl mt-6">
      <div class="flex flex-col md:flex-row justify-between items-start gap-10">

        {/* CAMBIO: Tarjeta para mostrar el Dólar BCV */}
        <div class="bg-zinc-900 p-6 rounded-xl shadow-md flex-1 w-full">
          <h2 class="text-3xl font-bold">{bcv.title}</h2>
          <img src={bcv.image} alt={`Logo de ${bcv.title}`} class="w-16 my-3" />
          <p class="text-2xl">Precio: {bcv.price} Bs.</p>
          <p class="text-lg">
            Cambio: <span class={`font-bold text-${bcv.color}`}>{bcv.change} {bcv.symbol}</span>
          </p>
          <p class="text-sm">Porcentaje: {bcv.percent}%</p>
          <p class="text-sm text-gray-400">Última actualización: {bcv.last_update}</p>
        </div>

        {/* CAMBIO: Tarjeta para mostrar el Euro (BCV) */}
        <div class="bg-zinc-900 p-6 rounded-xl shadow-md flex-1 w-full">
          <h2 class="text-3xl font-bold">{bcvEur.title}</h2>
          <img src={bcvEur.image} alt={`Logo de ${bcvEur.title}`} class="w-16 my-3" />
          <p class="text-2xl">Precio: {bcvEur.price} Bs.</p>
          <p class="text-lg">
            Cambio: <span class={`font-bold text-${bcvEur.color}`}>{bcvEur.change} {bcvEur.symbol}</span>
          </p>
          <p class="text-sm">Porcentaje: {bcvEur.percent}%</p>
          <p class="text-sm text-gray-400">Última actualización: {bcvEur.last_update}</p>
        </div>
      </div>
    </div>
  );
};

export default DolarComponent;