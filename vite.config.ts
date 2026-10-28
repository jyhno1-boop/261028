import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Vite 설정: React와 Tailwind CSS 플러그인을 사용합니다.
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
