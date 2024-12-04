// @ts-check
import { defineConfig } from "astro/config";
import db from "@astrojs/db";
import tailwind from "@astrojs/tailwind";
import clerk from "@clerk/astro";
import vercel from "@astrojs/vercel/serverless";
import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
    integrations: [db(), tailwind({
        applyBaseStyles: false,
    }), clerk(), solidJs()],
    adapter: vercel(),
    output: "server",
});