import type { Config } from "tailwindcss";

/* I want text-title to be text-4xl md:text-6xl */

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        glassmorphism: "rgba(255, 255, 255, 0.2)", // Opacidad blanca
      },
      backdropBlur: {
        lg: "15px", // Desenfoque personalizado
      },
      keyframes: {
        smokeEffect: {
          "0%": {
            transform: "scale(1) translateY(0)",
            opacity: "0.4", // Comienza más tenue
          },
          "25%": {
            transform: "scale(1.02) ", // Agregamos un leve desplazamiento hacia arriba
            opacity: "0.4", // Se hace más visible
          },
          "50%": {
            transform: "scale(1.4) ", // Un desplazamiento vertical mayor
            opacity: "0.4", // Baja un poco la opacidad
          },
          "75%": {
            transform: "scale(1.02) ", // Vuelve al desplazamiento intermedio
            opacity: "0.4", // Se estabiliza en opacidad media
          },
          "100%": {
            transform: "scale(1) translateY(0)", // Regresa a su tamaño original
            opacity: "0.4", // Y vuelve a ser tenue
          },
        },
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#70C5FB",
        secondary: "#001E49",
        accent: "#00EF91",
        dark: "#0A0A0A",
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        smoke: "smokeEffect 6s infinite ease-in-out", // Usamos el nombre 'smoke' para la animación
        fadeIn: "fadeIn 0.5s ease-in-out",
        fadeOut: "fadeOut 0.5s ease-in-out",
      },
      fontSize: {},
    },
  },
  plugins: [],
} satisfies Config;
