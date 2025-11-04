import type { Config } from "tailwindcss"

const config: Config = 
{
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
		maxWidth: {
        '7.5xl': '84rem', // between 7xl and 8xl
      	},
		clipPath: {
        hex: "polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)",
      },
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			'subtle-flow': {
  				'0%, 100%': {
  					'background-size': '200% 200%',
  					'background-position': 'left center'
  				},
  				'50%': {
  					'background-size': '200% 200%',
  					'background-position': 'right center'
  				}
  			},
  			'gradient-flow': {
  				'0%, 100%': {
  					'background-size': '300% 300%',
  					'background-position': '0% 0%'
  				},
  				'25%': {
  					'background-size': '300% 300%',
  					'background-position': '100% 0%'
  				},
  				'50%': {
  					'background-size': '300% 300%',
  					'background-position': '100% 100%'
  				},
  				'75%': {
  					'background-size': '300% 300%',
  					'background-position': '0% 100%'
  				}
  			},
  			'gradient-x': {
  				'0%, 100%': {
  					'background-size': '200% 200%',
  					'background-position': 'left center'
  				},
  				'50%': {
  					'background-size': '200% 200%',
  					'background-position': 'right center'
  				}
  			},
  			'gradient-y': {
  				'0%, 100%': {
  					'background-size': '400% 400%',
  					'background-position': 'center top'
  				},
  				'50%': {
  					'background-size': '200% 200%',
  					'background-position': 'center center'
  				}
  			},
  			'water-flow': {
  				'0%, 100%': {
  					'background-size': '200% 200%',
  					'background-position': 'left center'
  				},
  				'50%': {
  					'background-size': '200% 200%',
  					'background-position': 'right center'
  				}
  			},
  			'water-wave': {
  				'0%, 100%': {
  					'background-size': '400% 400%',
  					'background-position': 'center top'
  				},
  				'50%': {
  					'background-size': '200% 200%',
  					'background-position': 'center center'
  				}
  			},
  			'flowing-gradient': {
  				'0%': {
  					'background-position': '0% 50%'
  				},
  				'50%': {
  					'background-position': '100% 50%'
  				},
  				'100%': {
  					'background-position': '0% 50%'
  				}
  			},
  			shimmer: {
  				'0%': {
  					transform: 'translateX(-100%)'
  				},
  				'100%': {
  					transform: 'translateX(100%)'
  				}
  			},
			marquee: {
				'0%' : {
					transform : 'translateX(0%)'
				},
				'100%' : {
					transform : 'translateX(-50%)'
				},
			},
			'gradient-xx': {
			'0%': { 'background-position': '0% 50%' },
			'50%': { 'background-position': '100% 50%' },
			'100%': { 'background-position': '0% 50%' },
			},
			'fade-slide-up': {
			'0%': { opacity: '1', transform: 'translateY(0)' },
			'100%': { opacity: '0', transform: 'translateY(-20px)' },
			},
			fly: {
				'0%, 100%': { transform: 'translateY(0)' },
				'50%': { transform: 'translateY(-15px)' },
				},
			 fadeInUp: {
				'0%': { opacity: '0', transform: 'translateY(20px)' },
				'100%': { opacity: '1', transform: 'translateY(0)' },
				},

						
			'bg-pan': {
				'0%': { 'background-position': '0% 50%', 'background-size': '110%' },
				'10%': { 'background-position': '20% 50%', 'background-size': '110%' },
				'20%': { 'background-position': '40% 50%', 'background-size': '110%' },
				'30%': { 'background-position': '60% 50%', 'background-size': '110%' },
				'40%': { 'background-position': '80% 50%', 'background-size': '110%' },
				'50%': { 'background-position': '100% 50%', 'background-size': '110%' },
				'60%': { 'background-position': '80% 50%', 'background-size': '110%' },
				'70%': { 'background-position': '60% 50%', 'background-size': '110%' },
				'80%': { 'background-position': '40% 50%', 'background-size': '110%' },
				'90%': { 'background-position': '20% 50%', 'background-size': '110%' },
				'100%': { 'background-position': '0% 50%', 'background-size': '110%' },
			},

		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'subtle-flow': 'subtle-flow 15s ease infinite',
  			'gradient-flow': 'gradient-flow 8s ease infinite',
  			'gradient-x': 'gradient-x 15s ease infinite',
  			'gradient-y': 'gradient-y 10s ease infinite',
  			'water-flow': 'water-flow 15s ease infinite',
  			'water-wave': 'water-wave 10s ease infinite',
  			'flowing-gradient': 'flowing-gradient 15s ease infinite',
  			shimmer: 'shimmer 2s infinite',
			marquee: 'marquee 80s linear infinite',
			'gradient-xx': 'gradient-x 5s linear infinite',
        	'fade-slide-up': 'fade-slide-up 0.3s ease forwards',
			 'spin-slow': 'spin 10s linear infinite',
			 fly: 'fly 2s ease-in-out infinite',
			'bg-pan': 'bg-pan 80s linear infinite',
			'fade-in-up': 'fadeInUp 0.5s forwards',
  	}
  },
  plugins: [require("tailwindcss-animate"), require('tailwindcss-filters')],
}} satisfies Config

export default config