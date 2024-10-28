export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class", "class"],
  theme: {
  	extend: {
  		fontSize: {
  			xs: ["0.75rem", { lineHeight: "1rem" }],
  			sm: ["0.875rem", { lineHeight: "1.25rem" }],
  			base: ["1rem", { lineHeight: "1.5rem" }],
  			lg: ["1.125rem", { lineHeight: "1.75rem" }],
  			xl: ["1.25rem", { lineHeight: "1.75rem" }],
  			'2xl': ["1.5rem", { lineHeight: "2rem" }],
  			'3xl': ["1.875rem", { lineHeight: "2.25rem" }],
  			'4xl': ["2.25rem", { lineHeight: "2.5rem" }],
  			'5xl': ["3rem", { lineHeight: "1" }],
  			'6xl': ["3.75rem", { lineHeight: "1" }],
  			'7xl': ["4.5rem", { lineHeight: "1.1" }],
  			'8xl': ["6rem", { lineHeight: "1.2" }],
  			'9xl': ["8rem", { lineHeight: "1.3" }]
  		},
  		colors: {
  			primary: {
  				light: '#c0d330',
  				dark: '#aabb22',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			background: 'hsl(var(--background))',
  			text: {
  				light: '#000000',
  				dark: '#ffffff'
  			},
  			secondary: {
  				light: '#f0f0f0',
  				dark: '#2d3748',
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			accent: {
  				light: '#ff6347',
  				dark: '#dd6b20',
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			muted: {
  				light: '#e2e8f0',
  				dark: '#4a5568',
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderColor: {
  			DEFAULT: '#e2e8f0',
  			light: '#e2e8f0',
  			dark: '#4a5568'
  		},
  		ringColor: {
  			DEFAULT: '#cbd5e0',
  			light: '#cbd5e0',
  			dark: '#2d3748'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
