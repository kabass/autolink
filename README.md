# AutoLink - Car Sales & Rental Website

A modern, responsive car sales and rental website built with Next.js 14, TypeScript, and shadcn/ui.

## Features

- 🚗 **Car Listings**: Browse cars for sale and rental
- 🔍 **Advanced Search**: Filter cars by make, model, price, year, fuel type, and more
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- 🎨 **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- ⚡ **Fast Performance**: Optimized with Next.js 14 and App Router
- 🔒 **Type Safety**: Full TypeScript support

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Image Optimization**: Next.js Image component

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd autolink
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── car/              # Car-related components
│   │   └── car-card.tsx  # Car listing card
│   ├── layout/           # Layout components
│   │   ├── header.tsx    # Site header
│   │   └── footer.tsx    # Site footer
│   ├── search/           # Search components
│   │   └── search-filters.tsx
│   └── ui/               # shadcn/ui components
└── lib/                   # Utility functions
    └── utils.ts          # Common utilities
```

## Components

### CarCard
Displays individual car listings with:
- Car image
- Make, model, year
- Price (sale or rental)
- Key specifications (fuel type, transmission, seats, mileage)
- Action buttons

### SearchFilters
Advanced filtering system with:
- Vehicle type (sale/rental/all)
- Make and model search
- Price range
- Year range
- Fuel type selection
- Transmission type

### Header
Site navigation with:
- Logo and branding
- Main navigation links
- User actions (favorites, cart, profile)
- Mobile-responsive menu

### Footer
Site footer with:
- Company information
- Quick links
- Services
- Support links
- Contact information

## Customization

### Adding New Components

To add new shadcn/ui components:

```bash
npx shadcn@latest add [component-name]
```

### Styling

The project uses Tailwind CSS with custom CSS variables for theming. Colors and other design tokens can be modified in:

- `src/app/globals.css` - CSS variables
- `tailwind.config.ts` - Tailwind configuration

### Adding New Pages

Create new pages in the `src/app` directory following Next.js App Router conventions:

```
src/app/
├── cars/
│   └── page.tsx          # /cars route
├── rentals/
│   └── page.tsx          # /rentals route
└── sell/
    └── page.tsx          # /sell route
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

Build the project for production:

```bash
npm run build
```

The built files will be in the `.next` directory.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact us at info@autolink.com or create an issue in the repository.