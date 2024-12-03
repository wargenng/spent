// @ts-check
import { defineConfig } from "astro/config";

import db from "@astrojs/db";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import clerk from "@clerk/astro";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
    integrations: [
        db(),
        tailwind({
            applyBaseStyles: false,
        }),
        clerk(),
        react(),
    ],
    adapter: vercel(),
    output: "server",
});
