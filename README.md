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

### 🚀 Déploiement Gratuit (Recommandé : Vercel)

#### Option 1 : Vercel (5 minutes) ⭐

1. **Préparer le code**
   ```bash
   npm run build
   git push origin main
   ```

2. **Connecter à Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Connectez-vous avec GitHub
   - Importez votre dépôt `autolink`
   - Cliquez sur "Deploy"

3. **C'est tout !** 
   - Votre site sera en ligne en quelques minutes
   - URL : `https://votre-projet.vercel.app`

**Avantages Vercel :**
- ✅ 100% gratuit
- ✅ Optimisé pour Next.js
- ✅ HTTPS automatique
- ✅ CDN global
- ✅ Déploiements automatiques

#### Option 2 : Netlify

1. Allez sur [netlify.com](https://www.netlify.com)
2. Importez votre dépôt GitHub
3. Build command: `npm run build`
4. Publish directory: `.next`

#### Option 3 : Railway

1. Allez sur [railway.app](https://railway.app)
2. Créez un nouveau projet
3. Connectez votre dépôt GitHub
4. Déploiement automatique

### 📚 Documentation Complète

- **Guide détaillé** : Voir [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Démarrage rapide** : Voir [DEPLOYMENT_QUICK_START.md](./DEPLOYMENT_QUICK_START.md)

### Build local pour production

```bash
npm run build
npm start
```

Les fichiers de build seront dans le dossier `.next`.

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