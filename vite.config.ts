import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        outDir: 'build',
    },
    plugins: [
        react({
            babel: {
                plugins: [['babel-plugin-styled-components']],
            },
        }),
        tsconfigPaths(),
    ],
    root: '.',
    server: {
        host: true,
        port: 3000,
    },
});
