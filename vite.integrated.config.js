import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';
import { monitoringDataPlugin, monitoringDataWatchOptions } from './vite.monitoring-data.js';

const root = process.cwd();

export default defineConfig({
  plugins: [react(), tailwindcss(), monitoringDataPlugin(root)],
  server: { watch: monitoringDataWatchOptions(root) },
  build: {
    outDir: resolve(root, '../../work/integrated-dashboard-build'),
    emptyOutDir: true,
    rollupOptions: { input: resolve(root, 'data-dashboard.html') },
  },
});
