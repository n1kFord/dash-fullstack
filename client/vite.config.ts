import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {esbuildCommonjs} from '@originjs/vite-plugin-commonjs';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    optimizeDeps: {
        esbuildOptions: {
            plugins: [esbuildCommonjs(['react-moment'])],
        },
    },
    server: {
        host: '0.0.0.0',
        port: 3000,
        watch: {
            usePolling: true,
        },
    },
})
