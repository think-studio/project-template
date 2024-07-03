export default defineI18nConfig(() => ({
  legacy: false,
  // 👇 Add translations
  messages: {
    en: {
      header: "I am Header",
      main: "hello",
      footer: "I am footer",
    },
    zh: {
      header: "我是头",
      main: "你好",
      footer: "我是脚",
    },
  },
}));
