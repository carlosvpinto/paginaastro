import { useEffect, useState } from 'react';

// Interface para representar la estructura de datos
const DolarRates = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Efecto para realizar la petición a la API cuando el componente se monta
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://pydolarve.org/api/v1/dollar?page=criptodolar', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer 2x9Qjpxl5F8CoKK6T395KA',
          },
        });

        if (!response.ok) {
          throw new Error('Error fetching data');
        }

        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!data) {
    return <p>No se han encontrado datos</p>;
  }

  const { monitors } = data;

  return (
    <section id="paginas" className="scroll-mt-20">
      <div className="p-10 bg-gray-800 text-white rounded-xl mt-6">
        {/* Fecha y Hora de la actualización */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">Valor del dólar en Páginas</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mostrar cada monitor de tasas de cambio en columnas */}
          {Object.values(monitors).map((monitor, index) => (
            <div key={index} className="bg-zinc-900 p-6 rounded-xl shadow-md">
              <h2 className="text-3xl font-bold">{monitor.title}</h2>
              <img src={monitor.image} alt={`${monitor.title} logo`} className="w-16 my-3" />
              <p className="text-2xl">Precio: {monitor.price} Bs.</p>
              <p className="text-lg">
                Cambio: <span className={`font-bold text-${monitor.color}`}>{monitor.change} {monitor.symbol}</span>
              </p>
              <p className="text-sm">Porcentaje: {monitor.percent}%</p>
              <p className="text-sm">Precio anterior: {monitor.price_old} Bs.</p>
              <p className="text-sm text-gray-400">Última actualización: {monitor.last_update}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DolarRates;
