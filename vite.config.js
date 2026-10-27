import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { monitoringDataPlugin, monitoringDataWatchOptions } from './vite.monitoring-data.js';

const root = process.cwd();

export default defineConfig({
  plugins: [react(), tailwindcss(), monitoringDataPlugin(root)],
  server: { watch: monitoringDataWatchOptions(root) },
});
