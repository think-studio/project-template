import presetUno from "@unocss/preset-uno";
import {
  defineConfig,
  presetAttributify,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  rules: [
    [
      "shadow",
      {
        "box-shadow": "0 0 0.3rem 0 rgba(0, 0, 0, 0.08);",
      },
    ],
  ],
  presets: [presetAttributify({}), presetUno()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
