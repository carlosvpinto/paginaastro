// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  site: 'https://www.dolaraldiavzla.com', // Tu dominio principal
  base: '/paginaastro', // El nombre de tu repositorio en GitHub
});
