import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

const ReactCompilerConfig = {
    // Definiert, in welche React-Version die Komponenten kompiliert werden sollen
    target: '19',
};

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react({
            babel: {
                plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
            },
        }),
    ],
    build: {
        rollupOptions: {
            external: ['react-compiler-runtime'],
        },
    },
});
