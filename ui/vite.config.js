import { loadEnv, defineConfig } from 'vite';
import react from '@vitejs/plugin-react'
import { urbitPlugin } from '@urbit/vite-plugin-urbit';

// https://vitejs.dev/config/
export default ({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd()));
  const SHIP_URL = process.env.SHIP_URL || process.env.VITE_SHIP_URL || 'http://localhost:8080';

  return defineConfig({
    plugins: [
      urbitPlugin({ base: 'gapp', target: SHIP_URL }),
      react({ include: /\.((t|j)sx?)|(s?css)$|(html?)/ }),
    ],
    build: {
      rollupOptions: {
        // NOTE: Vite 5+ hashes with captial letters, which Urbit won't accept
        output: {
          hashCharacters: "base36",
          assetFileNames: ({ names, originalFileNames, source }) => {
            return !names?.[0]
              ? `assets/[name]-[hash][extname]`
              : `assets/${(names?.[0].split('.')[0]).toLowerCase()}-[hash][extname]`;
          },
          chunkFileNames: ({ name, moduleIds }) => {
            return `${name.toLowerCase()}-[hash].js`;
          },
          entryFileNames: ({ name, moduleIds }) => {
            return `${name.toLowerCase()}.js`;
          },
        },
      },
    },
  });
};
