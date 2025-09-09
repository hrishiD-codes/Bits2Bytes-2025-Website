/** @type {import('tailwindcss').Config} */
module.exports = {
	jit: true,
	content: ["./src/**/*.{js,ts,jsx,tsx}"],

	theme: {
		extend: {
			fontFamily: {
				clash: ["var(--font-clash-display)"],
				chakra: ["var(--font-chakra)"],
				ibm: ["var(--font-ibm)"],
				bebas: ["var(--font-bebas)"],
			},
			colors: {
				primary: "#1E0B37",
				secondary: "#9747FF",
				accent: "#6c5da1",
				dark: "#0E1111",
				footer: "#1B1B1B",

				main_primary: "#9747FF",
				soothing_black: "#0E1111",
				darkPurple: "#1E0B37",

				gray: {
					DEFAULT: "#9ca3af",
					50: "#f9fafb",
					100: "#f3f4f6",
					200: "#e5e7eb",
					300: "#d1d5db",
					400: "#9ca3af",
					500: "#6b7280",
					600: "#4b5563",
					700: "#374151",
					800: "#1f2937",
					900: "#111827",
				},

				purple: {
					50: "#faf5ff",
					100: "#f3e8ff",
					200: "#e9d5ff",
					300: "#d8b4fe",
					400: "#c084fc",
					500: "#a855f7",
					600: "#9333ea",
					700: "#7c3aed",
					800: "#6b21a8",
					900: "#581c87",
				},

				turquoise: "#bfe4f5",
				turquise: "#bfe4f5",
				metalBlue: "#2a357d",

				facebookColor: "#1877F2",
				youtubeColor: "#FF0000",
			},
			screens: {
				sm: "496px",
				md: "712px",
				lg: "900px",
				xl: "1142px",
				"2xl": "1536px",
			},
			boxShadow: {
				"3xl": "0 0px 5px 5px rgba(0, 0, 0, 0.3)",
			},
		},
	},
	plugins: [],
};
