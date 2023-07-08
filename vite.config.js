import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    template: {
        transformAssetUrls: {
            includeAbsolute: true,
        },
    },
    plugins: [vue(), viteCompression()],
    server: {
        host: 'archon-ui.test',
        port: 3007,
        strictPort: true,
    },
    build: {
        chunkSizeWarningLimit: 1024,
        assetsInlineLimit: 8192,
        modulePreload: { polyfill: true },
        sourcemap: true,
        manifest: true,
        extend(config) {
            config.module.rules.push({
                test: /\.worker\.js$/,
                use: { loader: 'worker-loader' },
            });
        },
    },
});
