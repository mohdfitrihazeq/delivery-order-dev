import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';

// 用动态 import 解决 ESM only
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
                '@': new URL('./src', import.meta.url).pathname
            }
        }
    };
});
