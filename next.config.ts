import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    // https://github.com/vercel/next.js/tree/canary/packages/next-mdx
    // Configure pageExtensions to include md and mdx
    pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
    reactStrictMode: true,

    // https://nextjs.org/docs/app/building-your-application/deploying/static-exports
    output: "export",
    webpack: (config, {defaultLoaders}) => {
        // https://stackoverflow.com/q/77805373
        config.module.rules.push({
            test: "/\.mdx$/",
            use: [
                defaultLoaders.babel,
                {loader: "@mdx-js/loader"}
            ]
        });
        return config;
    }
};

// https://github.com/vercel/next.js/tree/canary/packages/next-mdx
/** @type {import("next").NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const withMDX = require("@next/mdx")({
    // Optionally provide remark and rehype plugins
    options: {
        // If you use remark-gfm, you'll need to use next.config.mjs
        // as the package is ESM only
        // https://github.com/remarkjs/remark-gfm#install
        remarkPlugins: [],
        rehypePlugins: [],
    },
});

export default withMDX(nextConfig);
