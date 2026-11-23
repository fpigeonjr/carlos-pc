# First Gaming PC — $1,500 AM5 & 4K Build Planner

Interactive Astro + Tailwind CSS static dashboard (Catppuccin Mocha theme) hosted on GitHub Pages.

## Build Summary
- **Target Budget:** ~$1,500 pre-tax (tower only)
- **Platform:** Full Team Red — AMD AM5 Micro Center Austin 3-in-1 Bundle + 16GB AMD Radeon RDNA 4 GPU
- **Target Games:** Marvel Rivals, Valheim, Risk of Rain 2 (all Linux/Proton friendly)
- **Display & Network:** Existing 4K 60Hz monitor (via DisplayPort) + Wired Ethernet
- **Aesthetics & Cooling:** Black ATX mesh mid-tower with tempered glass, standard 5V ARGB fans (OpenRGB-friendly), dual-tower air cooler
- **Storage:** Starting at 1TB NVMe SSD with live 1TB vs. 2TB Black Friday $/TB math

## Features
- **Interactive Configurator:** Swap Micro Center AM5 bundles, 16GB Radeon GPUs, SSDs, cases, coolers, and PSUs.
- **In-Store Live Price Mode:** Edit any part's price directly in the browser (persisted in `localStorage`) while standing in Micro Center Austin to see instant pre-tax and TX 8.25% out-the-door totals.
- **Shareable Build URLs:** Copy a link encoding part picks, custom shelf prices, store splits, and tax rate.
- **Micro Center Austin vs. Online Split:** Toggle each part between Austin pickup and online ordering with interactive cart checkboxes.
- **1TB vs. 2TB Live Analyzer & 4K Linux Matrix:** Automatic $/TB verdict + game compatibility notes.
- **First-Time Build-Day Checklist:** Step-by-step progress tracker from pre-trip reservation through BIOS setup.

## Local Development

```bash
npm install
npm run dev
```

## Updating Baseline Prices
Edit [`src/data/buildData.ts`](./src/data/buildData.ts) and push to `main` — GitHub Actions automatically rebuilds and publishes to GitHub Pages.

## Deploying to GitHub Pages
1. Create your GitHub repository and push `main`:
   ```bash
   git init
   git add .
   git commit -m "Initial PC build planner"
   git branch -M main
   git remote add origin https://github.com/fpigeonjr/carlos-pc.git
   git push -u origin main
   ```
2. In GitHub, open **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
3. The workflow in [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) deploys automatically to GitHub Pages.
