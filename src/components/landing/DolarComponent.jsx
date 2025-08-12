import { useEffect, useState } from 'react';

const DolarComponent = () => {
  const [currentUsd, setCurrentUsd] = useState(null);
  const [currentEur, setCurrentEur] = useState(null);
  const [futureUsd, setFutureUsd] = useState(null);
  const [futureEur, setFutureEur] = useState(null);
  const [isFutureUpdateAvailable, setIsFutureUpdateAvailable] = useState(false);
  const [showFutureRates, setShowFutureRates] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.dolaraldiavzla.com/api/v1/tipo-cambio');
        const data = await response.json();
        const { monitors } = data;
        const { usd: futureUsdData, eur: futureEurData } = monitors;

        const apiDateString = futureUsdData.last_update.split(',')[0];
        const [day, month, year] = apiDateString.split('/').map(Number);
        const apiDate = new Date(year, month - 1, day);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const isFutureUpdate = apiDate > today;
        setIsFutureUpdateAvailable(isFutureUpdate);

        setFutureUsd(futureUsdData);
        setFutureEur(futureEurData);

        const currentUsdData = {
          ...futureUsdData,
          price: futureUsdData.price_old,
          change: futureUsdData.change_old,
          percent: futureUsdData.percent_old,
          last_update: futureUsdData.last_update_old,
          symbol: futureUsdData.change_old > 0 ? '▲' : (futureUsdData.change_old < 0 ? '▼' : ''),
          color: futureUsdData.change_old > 0 ? 'green' : (futureUsdData.change_old < 0 ? 'red' : 'neutral')
        };
        const currentEurData = {
          ...futureEurData,
          price: futureEurData.price_old,
          change: futureEurData.change_old,
          percent: futureEurData.percent_old,
          last_update: futureEurData.last_update_old,
          symbol: futureEurData.change_old > 0 ? '▲' : (futureEurData.change_old < 0 ? '▼' : ''),
          color: futureEurData.change_old > 0 ? 'green' : (futureEurData.change_old < 0 ? 'red' : 'neutral')
        };
        setCurrentUsd(currentUsdData);
        setCurrentEur(currentEurData);

        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const usd = showFutureRates ? futureUsd : currentUsd;
  const eur = showFutureRates ? futureEur : currentEur;

  const handleToggle = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setShowFutureRates(prevState => !prevState);
      setIsAnimating(false);
    }, 250);
  };

  if (loading) {
    return <p className="text-white text-center p-10">Cargando tasas de cambio...</p>;
  }

  if (!currentUsd || !currentEur) {
    return <p className="text-red-500 text-center p-10">No se pudieron cargar los datos.</p>;
  }

  return (
    <div className="p-10 bg-gray-800 text-white rounded-xl mt-6">
      
      {isFutureUpdateAvailable && (
        <div className="rate-toggle-container">
          <span>Tasa Actual</span>
          <label className="switch">
            <input type="checkbox" checked={showFutureRates} onChange={handleToggle} />
            <span className="slider round"></span>
          </label>
          <span>Próxima Actualización</span>
        </div>
      )}

      <div className={`flex flex-col md:flex-row justify-between items-start gap-10 mt-6 rate-cards-container ${isAnimating ? 'flipping' : ''}`}>
        <div className="bg-zinc-900 p-6 rounded-xl shadow-md flex-1 w-full">
          <h2 className="text-3xl font-bold">{usd.title}</h2>
          <img src={usd.image} alt={`Logo de ${usd.title}`} className="w-16 my-3" />
          <p className="text-2xl">Precio: {usd.price} Bs.</p>
          <p className="text-lg">
            Cambio: <span className={`font-bold text-${usd.color}`}>{usd.change} {usd.symbol}</span>
          </p>
          <p className="text-sm">Porcentaje: {usd.percent}%</p>
          {/* --- CORRECCIÓN AQUÍ --- */}
          {/* Usamos .split(',')[0] para tomar solo la parte antes de la coma */}
          {/* Usamos '?' (optional chaining) por seguridad, por si el dato viniera nulo */}
          <p className="text-sm text-gray-400">Última actualización: {usd.last_update?.split(',')[0]}</p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl shadow-md flex-1 w-full">
          <h2 className="text-3xl font-bold">{eur.title}</h2>
          <img src={eur.image} alt={`Logo de ${eur.title}`} className="w-16 my-3" />
          <p className="text-2xl">Precio: {eur.price} Bs.</p>
          <p className="text-lg">
            Cambio: <span className={`font-bold text-${eur.color}`}>{eur.change} {eur.symbol}</span>
          </p>
          <p className="text-sm">Porcentaje: {eur.percent}%</p>
          {/* --- CORRECCIÓN AQUÍ --- */}
          <p className="text-sm text-gray-400">Última actualización: {eur.last_update?.split(',')[0]}</p>
        </div>
      </div>
    </div>
  );
};

export default DolarComponent;