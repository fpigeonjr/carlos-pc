# First Gaming PC — $1,500 AM5 & 4K Build Planner

Interactive Astro + Tailwind CSS static dashboard (Catppuccin Mocha theme) hosted on GitHub Pages.

## Build Summary
- **Target Budget:** ~$1,500 pre-tax (tower only)
- **Platform:** Full Team Red — Micro Center Austin AMD Bundle (`5600X3D` / `7500X3D` / `7600X3D` / `7700X3D`) + AMD Radeon RDNA 4 GPU (`RX 9060 XT 16GB` / `RX 9070 GRE` / `RX 9070 XT`)
- **Target Games:** Marvel Rivals, Valheim, Risk of Rain 2 (all Linux/Proton friendly)
- **Display & Network:** Existing 4K 60Hz monitor via DisplayPort (supports 1080p 4:1 integer scale, 1440p, or 4K w/ FSR) + Wired Ethernet
- **Aesthetics & Cooling:** Black ATX mesh mid-tower with tempered glass, standard 5V ARGB fans (OpenRGB-friendly), Thermalright air cooler
- **Storage:** Starting at 1TB NVMe SSD with live 1TB vs. 2TB Black Friday $/TB math

## Features
- **Interactive Configurator:** Swap live Micro Center Austin AM5 bundles, RDNA 4 Radeon GPUs, SSDs, cases, coolers, and PSUs.
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

## Purchase & Black Friday Price Protection Log
- **2026-11-24 — Micro Center Austin Pickup (`215-WP-29980`, Insider Credit Card, $1,564.14 OTD w/ $1.99 bag):**
  - Bundle `5007445`: Ryzen 5 7600X3D ($159.30, return by `12/09/2026`) + Gigabyte B650 Gaming X AX V2 ATX ($110.71, return by `12/09/2026`) + G.Skill Flare X5 16GB DDR5-6000 ($209.98, return by `01/15/2027`) = **$479.99**
  - ASRock RX 9060 XT Challenger OC 16GB (`SKU 873026`): **$599.99** *(return by `01/15/2027`)*
  - Inland TN320 1TB TLC NVMe (`SKU 529776`): **$149.99** *(return by `01/15/2027`)*
  - Thermalright Assassin X 120R Digital Black (`SKU 959528`): **$32.99** *(return by `01/15/2027`)*
  - Lian Li Lancool 207 Black (`SKU 732115`): **$99.99 → $79.99** *(return by `01/15/2027`)*
  - MSI MAG A750GL 750W 80+ Gold Modular (`SKU 596676`): **$79.99 → $69.99** *(return by `01/15/2027`)*
- **2026-11-27 — Black Friday Remote Price Protection Approved (Ticket `#8919016` / `[Z4JX7K-D4VEM]`):**
  - Home Office approved remote credits to the Micro Center Insider Credit Card on Order `215-WP-29980`: **-$20.00** (`SKU 732115`) + **-$10.00** (`SKU 596676`) = **-$30.00 pre-tax (~$32.48 w/ 8.25% TX tax)** → net tower cost **$1,412.94 pre-tax (~$1,531.66 OTD)**. Verify both credits post in 3–5 business days.
  - Note on Order `215-PO-29989` (same-day Austin store trip, Debit Card): ASUS TUF Gaming VG27AQE5A 27" QHD 165Hz Monitor (`SKU 098384`) dropped **$179.99 → $149.99 (-$30.00)**, but debit-card price protection is in-store only with the original card (eligible within 30 days / through `12/24/2026` if price remains lower).

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
