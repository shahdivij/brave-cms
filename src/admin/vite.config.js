import { defineConfig, mergeConfig } from "vite";

export default defineConfig((config) => {
  return mergeConfig(config, {
    server: {
      allowedHosts: ["cms.brave.tech"],
    },
  });
});
