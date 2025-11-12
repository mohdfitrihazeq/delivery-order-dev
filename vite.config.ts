import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig(async () => {
    const { PrimeVueResolver } = await import('@primevue/auto-import-resolver');

    return {
        plugins: [
            vue(),
            Components({
                resolvers: [PrimeVueResolver()]
            })
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
                '@qubit/prosync': fileURLToPath(new URL('../ui-component-kit/dist', import.meta.url))
            }
        }
    };
});
