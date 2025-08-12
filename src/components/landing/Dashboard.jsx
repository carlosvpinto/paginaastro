// src/components/landing/Dashboard.jsx
import React, { useState, useEffect } from 'react';

const firebaseProjectId = import.meta.env.PUBLIC_FIREBASE_PROJECT_ID;

export default function Dashboard() {
  const [analyticsData, setAnalyticsData] = useState({
    activeUsers: '...',
    newUsers: '...',
    screenPageViews: '...',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const firebaseProjectUrl = `https://console.firebase.google.com/project/${firebaseProjectId}/analytics/dashboard`;

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await fetch('/api/analytics');
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'No se pudieron cargar las métricas.');
        }

        const data = await response.json();
        setAnalyticsData(data);

      } catch (err) {
        console.error("Error al obtener datos de Analytics:", err);
        setError(err.message);
        setAnalyticsData({ activeUsers: 'Error', newUsers: 'Error', screenPageViews: 'Error' });
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  // --- PARTE DEL RETURN QUE FALTABA ---
  return (
    <div style={{ padding: '40px', color: 'white', background: '#1a202c', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '2.5em' }}>Dashboard de Analíticas</h1>
      <p style={{ marginTop: '10px', color: '#a0aec0', marginBottom: '40px' }}>
        Bienvenido, desoftsis. Aquí tienes un resumen de las métricas clave de los últimos 28 días.
      </p>

      {error && <p style={errorStyle}>{error}</p>}
      
      <ul style={listStyle}>
        <MetricCard title="Usuarios Activos" value={analyticsData.activeUsers} loading={loading} />
        <MetricCard title="Nuevos Usuarios" value={analyticsData.newUsers} loading={loading} />
        <MetricCard title="Vistas de Pantalla" value={analyticsData.screenPageViews} loading={loading} />
      </ul>
      
      <a href={firebaseProjectUrl} target="_blank" rel="noopener noreferrer" style={linkStyle}>
        Ver Dashboard Detallado en Firebase
      </a>
    </div>
  );
}

// Componente auxiliar para las tarjetas de métricas
function MetricCard({ title, value, loading }) {
  return (
    <li style={cardStyle}>
      <h3 style={cardTitleStyle}>{title}</h3>
      <p style={cardValueStyle}>
        {loading ? "..." : value}
      </p>
    </li>
  );
}

// --- ESTILOS ---
const listStyle = { listStyle: 'none', padding: 0, display: 'flex', gap: '20px', flexWrap: 'wrap' };
const cardStyle = { background: '#2d3748', padding: '25px', borderRadius: '8px', flex: 1, minWidth: '200px', textAlign: 'center' };
const cardTitleStyle = { margin: 0, color: '#a0aec0', fontSize: '1em', fontWeight: 'normal' };
const cardValueStyle = { margin: '10px 0 0', fontSize: '2.5em', fontWeight: 'bold' };
const linkStyle = { display: 'inline-block', marginTop: '40px', padding: '12px 24px', background: '#3182ce', color: 'white', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold', transition: 'background 0.2s' };
const errorStyle = { color: '#e53e3e', background: '#2d3748', padding: '15px', borderRadius: '8px', maxWidth: '800px' };