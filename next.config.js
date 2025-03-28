/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
	basePath: "/mc-mapconv",  // Must match the repo name for GitHub Pages
	assetPrefix: "/mc-mapconv/",  // Ensures correct asset paths
	trailingSlash: true,  // Ensures all routes work correctly
};

export default config;
