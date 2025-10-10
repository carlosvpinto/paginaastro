// src/pages/api/analytics.js

import { GoogleAuth } from 'google-auth-library';
import { promises as fs } from 'fs';
import path from 'path';

const propertyId = import.meta.env.PUBLIC_GA_PROPERTY_ID;

export async function GET() {
  try {
    // --- VERIFICACIÓN CLAVE AQUÍ ---
    // Nos aseguramos de que el código esté solicitando el permiso correcto.
    const auth = new GoogleAuth({
      keyFile: path.join(process.cwd(), 'service-account-key.json'),
      // Esta línea es la que solicita explícitamente el permiso de lectura de Analytics.
      scopes: 'https://www.googleapis.com/auth/analytics.readonly', 
    });
    
    const client = await auth.getClient();
    const accessToken = (await client.getAccessToken()).token;

    const response = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        metrics: [
          { name: 'activeUsers' },
          { name: 'newUsers' },
          { name: 'screenPageViews' },
        ],
        dateRanges: [{ startDate: '28daysAgo', endDate: 'today' }],
      }),
    });

    const data = await response.json();
    if (!response.ok || data.error) {
        throw new Error(data.error?.message || 'Error en la respuesta de la API de Google');
    }

    const activeUsers = data.rows?.[0]?.metricValues?.[0]?.value ?? '0';
    const newUsers = data.rows?.[0]?.metricValues?.[1]?.value ?? '0';
    const screenPageViews = data.rows?.[0]?.metricValues?.[2]?.value ?? '0';

    return new Response(
      JSON.stringify({ activeUsers, newUsers, screenPageViews }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error en el endpoint /api/analytics:', error);
    return new Response(
      JSON.stringify({ message: `Error del servidor: ${error.message}` }),
      { status: 500 }
    );
  }
}