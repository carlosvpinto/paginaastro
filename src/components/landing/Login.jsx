// src/components/landing/Login.jsx
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebaseConfig'; // Ruta corregida
import { isLoggedIn } from '../../stores/authStore';   // Ruta corregida

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault(); // Evita que la página se recargue
    setError('');
    setLoading(true);

    try {
      // Usamos la función de Firebase para iniciar sesión
      await signInWithEmailAndPassword(auth, email, password);
      
      // Si el login es exitoso:
      // 1. Actualizamos nuestro store global
      isLoggedIn.set(true);
      
      // 2. Redirigimos al usuario al dashboard
      window.location.href = '/dashboard';

    } catch (err) {
      // Si hay un error, lo mostramos
      setError('Correo o contraseña incorrectos. Por favor, inténtalo de nuevo.');
      console.error("Error de autenticación:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ color: 'white', textAlign: 'center' }}>Acceso de Administrador</h2>
      <form onSubmit={handleLogin} style={formStyle}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          required
          style={inputStyle}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
          style={inputStyle}
        />
        {error && <p style={errorStyle}>{error}</p>}
        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
}

// --- ESTILOS (puedes moverlos a un archivo CSS si prefieres) ---
const containerStyle = { background: '#2d3748', padding: '40px', borderRadius: '8px', maxWidth: '400px', margin: '50px auto' };
const formStyle = { display: 'flex', flexDirection: 'column', gap: '15px' };
const inputStyle = { padding: '12px', borderRadius: '4px', border: 'none', fontSize: '1em' };
const buttonStyle = { padding: '12px', borderRadius: '4px', border: 'none', background: '#3182ce', color: '#12552', fontWeight: 'bold', cursor: 'pointer' };
const errorStyle = { color: '#e53e3e', background: '#4a5568', padding: '10px', borderRadius: '4px', textAlign: 'center' };