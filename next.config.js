/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
	output: 'export',
	images: {
		unoptimized: true,
	},
	trailingSlash: true,

	// Use relative paths for assets
	basePath: '',
	assetPrefix: './',
};

export default config;
