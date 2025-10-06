// tailwind.config.js (Versión corregida)

module.exports = {
  content: [
    // 🛑 CORRECCIÓN: Usar la estructura general de Next.js App Router para asegurar cobertura
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",

    // Si tienes archivos fuera de /src, añade también:
    // "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: { extend: {} },
  plugins: [require("daisyui")],

  // 🛑 RECOMENDACIÓN: Agregar configuraciones básicas de DaisyUI para el tema
  daisyui: {
    themes: ["light", "dark"], // o los temas que uses
    // themeRoot: ":root", // Puedes agregar esto si tienes problemas de tematizado
  },
};
