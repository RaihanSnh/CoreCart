import react from "@vitejs/plugin-react";
import tailwind from "tailwindcss";
import { defineConfig } from "vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  css: {
    postcss: {
      plugins: [tailwind()],
    },
  },
  resolve: {
    alias: {
      "@radix-ui/react-scroll-area": path.resolve(__dirname, "./node_modules/@radix-ui/react-scroll-area"),
      "@radix-ui/react-separator": path.resolve(__dirname, "./node_modules/@radix-ui/react-separator"),
      "@radix-ui/react-dialog": path.resolve(__dirname, "./node_modules/@radix-ui/react-dialog"),
      "@radix-ui/react-toast": path.resolve(__dirname, "./node_modules/@radix-ui/react-toast"),
      "@radix-ui/react-select": path.resolve(__dirname, "./node_modules/@radix-ui/react-select"),
      "@radix-ui/react-tabs": path.resolve(__dirname, "./node_modules/@radix-ui/react-tabs"),
      "@radix-ui/react-label": path.resolve(__dirname, "./node_modules/@radix-ui/react-label"),
      "@radix-ui/react-radio-group": path.resolve(__dirname, "./node_modules/@radix-ui/react-radio-group"),
      "@radix-ui/react-switch": path.resolve(__dirname, "./node_modules/@radix-ui/react-switch"),
    },
  },
  build: {
    rollupOptions: {
      preserveSymlinks: true,
    },
  },
});
