import AutoImport from "unplugin-auto-import/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";

const baseURL =
  process.env.NODE_ENV === "development" ? "/api" : "https://www.truckego.com";

export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      charset: "utf-8",
      viewport:
        "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",
    },
  },
  modules: ["@unocss/nuxt", "nuxtjs-naive-ui", "@nuxtjs/i18n"],
  i18n: {
    locales: [
      { name: "English", code: "en", iso: "en-US", dir: "ltr" },
      {
        name: "中文",
        code: "zh",
        iso: "zh-CN",
        dir: "ltr",
      },
    ],
    defaultLocale: "zh",
    detectBrowserLanguage: false,
    vueI18n: "./locale/i18n.config.ts",
  },
  vite: {
    plugins: [
      AutoImport({
        imports: [
          {
            "naive-ui": [
              "useDialog",
              "useMessage",
              "useNotification",
              "useLoadingBar",
            ],
          },
        ],
      }),
      Components({
        resolvers: [NaiveUiResolver()],
      }),
    ],
  },
  nitro: {
    devProxy: {
      "/api": {
        target: "https://www.truckego.com",
        changeOrigin: true,
      },
    },
  },
  runtimeConfig: {
    public: {
      baseURL: baseURL,
    },
  },
});
