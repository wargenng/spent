// @ts-check
import { defineConfig } from "astro/config";

import db from "@astrojs/db";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import node from "@astrojs/node";
import clerk from "@clerk/astro";

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
    adapter: node({ mode: "standalone" }),
    output: "server",
});
