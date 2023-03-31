// vite.config.ts
import UnoCSS from 'unocss/vite'
import presetUno from "@unocss/preset-uno";
import presetIcons  from "@unocss/preset-icons";
export default {
  plugins: [
    UnoCSS({
      presets: [
        presetUno(),
        presetIcons({
          /* options */
        }),
],  // disable default preset
      rules: [
        // your custom rules
      ]
    }),
  ],
}