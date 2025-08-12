// src/components/Login.jsx
import React, { useState } from 'react';
import { useStore } from '@nanostores/react';
import { isLoggedIn, attemptLogin } from '../../../stores/authStore';

export default function Login() {
  const $isLoggedIn = useStore(isLoggedIn);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const success = attemptLogin(username, password);
    if (!success) {
      setError('Usuario o contraseña incorrectos.');
    }
  };
  
  // Si el store dice que el usuario ya está logueado, lo redirigimos
  if ($isLoggedIn && typeof window !== 'undefined') {
    window.location.href = '/dashboard';
    return null; // No renderizamos nada mientras redirige
  }

  // El JSX del formulario es idéntico al ejemplo anterior
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#1a202c' }}>
      <form onSubmit={handleLogin} style={{ padding: '40px', background: '#2d3748', borderRadius: '8px', color: 'white', width: '320px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '25px', fontSize: '1.5rem' }}>Acceso al Dashboard</h2>
        <div>
          <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>Usuario</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: 'none', color: 'black' }}
          />
        </div>
        <div style={{ marginTop: '15px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: 'none', color: 'black' }}
          />
        </div>
        {error && <p style={{ color: '#e53e3e', marginTop: '15px', textAlign: 'center' }}>{error}</p>}
        <button type="submit" style={{ width: '100%', padding: '12px', marginTop: '25px', background: '#3182ce', border: 'none', color: 'white', cursor: 'pointer', borderRadius: '4px', fontSize: '1rem' }}>
          Entrar
        </button>
      </form>
    </div>
  );
}