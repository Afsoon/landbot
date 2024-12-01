import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		open: true,
		// biome-ignore lint/nursery/noProcessEnv: Its ok to use process.env here
		port: Number(process.env.PORT || 3000),
	},
	css: {
		modules: {
			localsConvention: "camelCaseOnly",
		},
	},
})
