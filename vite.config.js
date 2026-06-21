import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: "ui",
  plugins: [react()],
  build: {
    outDir: "../dist/ui",
    emptyOutDir: true,
    assetsInlineLimit: 100000000,
    cssCodeSplit: false,
    codeSplitting: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});
