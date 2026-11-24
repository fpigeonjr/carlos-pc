export type BuyChannel = 'microcenter' | 'online';

export type SlotId = 'bundle' | 'gpu' | 'ssd' | 'cooler' | 'case' | 'psu';

export interface ExternalLink {
  label: string;
  url: string;
  channel: BuyChannel | 'reference';
}

export interface PartOption {
  id: string;
  name: string;
  shortName: string;
  price: number;
  defaultChannel: BuyChannel;
  badge?: string;
  specs: string[];
  notes: string;
  watchOut?: string;
  linuxTag: string;
  links: ExternalLink[];
  capacityTb?: number;
}

export interface PartSlot {
  id: SlotId;
  title: string;
  subtitle: string;
  icon: string;
  defaultOptionId: string;
  options: PartOption[];
}

export interface BuildPreset {
  id: string;
  name: string;
  tagline: string;
  selections: Record<SlotId, string>;
}

export interface ChecklistItem {
  id: string;
  text: string;
  tip?: string;
}

export interface ChecklistPhase {
  id: string;
  title: string;
  timing: string;
  items: ChecklistItem[];
}

export interface GameProfile {
  title: string;
  engine: string;
  linuxStatus: string;
  linuxBadgeTone: 'green' | 'teal' | 'yellow';
  storageGb: number;
  fourKNotes: string;
  protonTip: string;
}

export const BUILD_META = {
  budgetTarget: 1500,
  defaultTaxRate: 0.0825, // TX 8.25% sales tax
  lastVerified: '2026-11-23',
  marketContext: 'Nov 2026 Black Friday Window ("RAMageddon" DDR5 & NAND surge)',
  monitor: 'Existing 4K 60Hz Monitor (DisplayPort)',
  network: 'Wired Ethernet (Gigabit / 2.5GbE)',
};

export const MICRO_CENTER_AUSTIN = {
  name: 'Micro Center — Austin, TX',
  address: '12707 N. Mopac Expy, Austin, TX 78727-4229',
  hoursMonSat: 'Mon–Sat: 10:00 AM – 9:00 PM',
  hoursSun: 'Sun: 11:00 AM – 6:00 PM',
  storeUrl: 'https://www.microcenter.com/site/stores/austin.aspx',
  bundlesUrl: 'https://www.microcenter.com/site/content/bundle-and-save.aspx',
  comboBuilderUrl: 'https://www.microcenter.com/site/content/custom-pc-builder.aspx',
  mapsUrl: 'https://maps.google.com/?q=Micro+Center+12707+N+Mopac+Expy+Austin+TX+78727',
};

export const PART_SLOTS: PartSlot[] = [
  {
    id: 'bundle',
    title: 'CPU + Motherboard + DDR5 Bundle',
    subtitle: 'Live Micro Center Austin bundles (Nov 23 snapshot — huge savings off $249.99–$569.99 standalone DDR5)',
    icon: 'CPU',
    defaultOptionId: 'mc-7500x3d-b850m',
    options: [
      {
        id: 'mc-7500x3d-b850m',
        name: 'AMD Ryzen 5 7500X3D (Pre-installed) + ASRock B850M-C mATX + 16GB DDR5-6000',
        shortName: '7500X3D + B850M (16GB)',
        price: 399.99,
        defaultChannel: 'microcenter',
        badge: 'Under-$1,500 Pick',
        specs: [
          'SKU 521980 ($399.98 reg): Ryzen 5 7500X3D (3D V-Cache) pre-installed on ASRock B850M-C AM5',
          'SKU 784686 ($249.99 reg): G.Skill Flare X5 16GB (1×16GB) DDR5-6000',
          'Bundle Reg. $649.97 → Save $249.98 · Micro Center Featured Exclusive',
          'Zero bent-pin risk (CPU pre-seated) + easy future 2nd 16GB stick upgrade',
        ],
        notes:
          'The key to fitting a fast Navi 48 RX 9070 GRE (and even a 2TB SSD!) strictly under $1,500 pre-tax. 3D V-Cache shines in Valheim, Risk of Rain 2, and Marvel Rivals while minimizing single-channel RAM penalty, and Linux uses far less idle RAM than Windows.',
        watchOut:
          'This is a Micro-ATX board (ASRock B850M-C) — when mounting in an ATX case, match standoffs to mATX holes and remove any unused metal ATX standoffs behind the board!',
        linuxTag: '3D V-Cache + B850 AM5',
        links: [
          {
            label: 'MC AMD Bundles',
            url: 'https://www.microcenter.com/site/content/bundle-and-save.aspx',
            channel: 'microcenter',
          },
          {
            label: 'MC Combo Builder',
            url: 'https://www.microcenter.com/site/content/custom-pc-builder.aspx',
            channel: 'microcenter',
          },
        ],
      },
      {
        id: 'mc-9700x-b650',
        name: 'AMD Ryzen 7 9700X + Gigabyte B650 Gaming X AX V2 + 32GB DDR5-6000',
        shortName: '9700X + B650 (32GB)',
        price: 599.99,
        defaultChannel: 'microcenter',
        badge: 'Best 32GB Value',
        specs: [
          'CPU SKU 721217 ($249.99 reg): Ryzen 7 9700X 8C/16T Zen 5 (65W)',
          'RAM SKU 440792 ($569.99 reg): G.Skill Flare X5 32GB (2×16GB) DDR5-6000',
          'Mobo SKU 660753 ($169.99 reg): Gigabyte B650 Gaming X AX V2 ATX',
          'Bundle Reg. $989.97 → Save $389.98 · 2.5GbE LAN + Wi-Fi 6E + 3× M.2',
        ],
        notes:
          'Unbeatable 32GB dual-channel value in the 2026 memory market: standalone 32GB DDR5 is $569.99, so you basically get the 8-core Zen 5 CPU + full ATX board for $30 extra. Pairs great with the $647.96 Open-Box RX 9070 GRE if flexing ~$65 over $1,500.',
        watchOut:
          'Skip the $479.99 7600X3D bundle (still only 16GB RAM) — either stick with the $399.99 7500X3D or jump straight here for 32GB dual-channel + 8 cores.',
        linuxTag: 'Zen 5 + 32GB + 2.5GbE',
        links: [
          {
            label: 'MC AMD Bundles',
            url: 'https://www.microcenter.com/site/content/bundle-and-save.aspx',
            channel: 'microcenter',
          },
          {
            label: 'MC Combo Builder',
            url: 'https://www.microcenter.com/site/content/custom-pc-builder.aspx',
            channel: 'microcenter',
          },
        ],
      },
      {
        id: 'mc-9700x-b850',
        name: 'AMD Ryzen 7 9700X + Gigabyte B850 Gaming X WiFi6E + 32GB DDR5-6000',
        shortName: '9700X + B850 (32GB)',
        price: 629.99,
        defaultChannel: 'microcenter',
        badge: '+$30 B850',
        specs: [
          'CPU SKU 721217 ($249.99 reg): Ryzen 7 9700X 8C/16T Zen 5',
          'RAM SKU 440792 ($569.99 reg): G.Skill Flare X5 32GB DDR5-6000',
          'Mobo SKU 792820 ($209.99 reg): Gigabyte B850 Gaming X WiFi6E ATX',
          'Bundle Reg. $1,029.97 → Save $399.98 · Newer B850 chipset + PCIe 5.0',
        ],
        notes:
          'Only +$30 over the B650 combo to step up to the newer Gigabyte B850 Gaming X WiFi6E board ($40 higher regular price, saving $399.98 total).',
        watchOut: 'Worth the $30 bump for PCIe 5.0 GPU slot longevity; skip if keeping every dollar under budget.',
        linuxTag: 'Zen 5 + B850 PCIe 5.0',
        links: [
          {
            label: 'MC AMD Bundles',
            url: 'https://www.microcenter.com/site/content/bundle-and-save.aspx',
            channel: 'microcenter',
          },
        ],
      },
      {
        id: 'mc-7700x3d-b650',
        name: 'AMD Ryzen 7 7700X3D + Gigabyte B650 Gaming X AX V2 + 32GB DDR5-6000',
        shortName: '7700X3D + B650 (32GB)',
        price: 649.99,
        defaultChannel: 'microcenter',
        badge: '8-Core X3D',
        specs: [
          'CPU SKU 061077 ($279.99 reg): AMD Ryzen 7 7700X3D (3D V-Cache)',
          'RAM SKU 440792 ($569.99 reg): G.Skill Flare X5 32GB DDR5-6000',
          'Mobo SKU 660753 ($169.99 reg): Gigabyte B650 Gaming X AX V2 ATX',
          'Bundle Reg. $1,019.97 → Save $369.98 · Huge gaming cache boost',
        ],
        notes:
          'Only +$50 over the 9700X bundle to get 8-core 3D V-Cache + 32GB DDR5 — awesome for CPU-heavy Valheim mega-bases, late-game Risk of Rain 2, and high-FPS Marvel Rivals.',
        watchOut: 'At 4K 60Hz, prioritize GPU tier first; Micro Center bundles must be returned as a complete 3-in-1 set.',
        linuxTag: '8-Core X3D + 32GB',
        links: [
          {
            label: 'MC AMD Bundles',
            url: 'https://www.microcenter.com/site/content/bundle-and-save.aspx',
            channel: 'microcenter',
          },
        ],
      },
    ],
  },
  {
    id: 'gpu',
    title: 'Graphics Card (AMD Radeon RDNA 4)',
    subtitle: 'Live Micro Center Austin GPU stock (Nov 23) — open-source Mesa/RADV Linux drivers',
    icon: 'GPU',
    defaultOptionId: 'rx-9070-gre-hellhound',
    options: [
      {
        id: 'rx-9070-gre-hellhound',
        name: 'PowerColor AMD Radeon RX 9070 GRE Hellhound OC Triple-Fan 12GB (SKU 043349)',
        shortName: 'RX 9070 GRE Hellhound',
        price: 719.99,
        defaultChannel: 'microcenter',
        badge: 'Best Live Buy',
        specs: [
          'SKU 043349 · 9 in stock at Austin ($719.99, down from $729.99)',
          'Bigger Navi 48 die · 48 Ray Accelerators · 12GB GDDR6 · PCIe 5.0',
          '327mm card (340mm w/ bracket) · 2× 8-pin PCIe · 700W min PSU',
          '~15–25% faster than RX 9060 XT 16GB at the exact same $719.99 price!',
        ],
        notes:
          'Clear standout in Austin’s live stock: costs the exact same $719.99 as the dual-fan ASRock RX 9060 XT 16GB, but uses the much faster Navi 48 die with quiet triple-fan cooling. Crushes 1080p/1440p and 4K w/ FSR on Linux Mesa/RADV.',
        watchOut:
          'Use two separate 8-pin PCIe cables from the PSU (not one daisy-chained pigtail). Clears all 3 cases easily (340mm vs 375–415mm clearance). Check the 1 Open-Box unit at $647.96!',
        linuxTag: 'Open-source Mesa/RADV',
        links: [
          {
            label: 'MC SKU 043349',
            url: 'https://www.microcenter.com/search/search_results.aspx?Ntt=043349',
            channel: 'microcenter',
          },
          {
            label: 'MC RX 9070 Stock',
            url: 'https://www.microcenter.com/search/search_results.aspx?Ntt=RX+9070',
            channel: 'microcenter',
          },
        ],
      },
      {
        id: 'rx-9070-gre-openbox',
        name: 'PowerColor RX 9070 GRE Hellhound OC 12GB — Austin Open Box (SKU 043349)',
        shortName: 'RX 9070 GRE Open Box',
        price: 647.96,
        defaultChannel: 'microcenter',
        badge: '1 Open Box!',
        specs: [
          'SKU 043349 · 1 Open Box listed at Austin from $647.96 ($72 off new!)',
          'Same Navi 48 triple-fan Hellhound OC 12GB + 48 Ray Accelerators',
          'Includes Micro Center’s full 30-day return coverage — inspect box at pickup',
          'Brings 7500X3D build to $1,366 or 9700X 32GB build to $1,566!',
        ],
        notes:
          'Best deal in the entire Austin store right now if still available tomorrow morning! Reserve immediately or check the Open-Box GPU glass case as soon as you walk in.',
        watchOut:
          'Only 1 Open-Box unit listed — reserve it online before driving up, and verify the card looks clean & complete at the counter.',
        linuxTag: 'Open-source Mesa/RADV',
        links: [
          {
            label: 'MC SKU 043349',
            url: 'https://www.microcenter.com/search/search_results.aspx?Ntt=043349',
            channel: 'microcenter',
          },
        ],
      },
      {
        id: 'rx-9060-xt-challenger-16gb',
        name: 'ASRock AMD Radeon RX 9060 XT Challenger OC Dual Fan 16GB (SKU 873026)',
        shortName: 'RX 9060 XT 16GB',
        price: 719.99,
        defaultChannel: 'microcenter',
        badge: '16GB VRAM Alt',
        specs: [
          'SKU 873026 · 25+ in stock at Austin ($719.99, reg $799.99)',
          '16GB GDDR6 VRAM · Leaner Navi 44 die (~160W low power)',
          'Cheapest 16GB Radeon in Austin ($80 less than $799.99 ASUS/Gigabyte models)',
          'Requires FSR upscaling at 4K for demanding UE5 titles',
        ],
        notes:
          'Solid backup if the RX 9070 GRE cards sell out or if you strongly prioritize 16GB VRAM over raw 4K framerate. Avoid paying $799.99 for the ASUS/Gigabyte 9060 XT models when this Challenger OC is $80 less.',
        watchOut:
          'At the same $719.99 price, the PowerColor RX 9070 GRE Hellhound delivers ~15–25% higher 4K performance and triple-fan cooling.',
        linuxTag: 'Open-source Mesa/RADV',
        links: [
          {
            label: 'MC SKU 873026',
            url: 'https://www.microcenter.com/search/search_results.aspx?Ntt=873026',
            channel: 'microcenter',
          },
          {
            label: 'PCPartPicker Search',
            url: 'https://pcpartpicker.com/search/?q=RX+9060+XT+16GB',
            channel: 'reference',
          },
        ],
      },
      {
        id: 'rx-9070-xt-16gb',
        name: 'AMD Radeon RX 9070 XT 16GB (Stretch / Check Austin Stock)',
        shortName: 'RX 9070 XT 16GB',
        price: 869.99,
        defaultChannel: 'microcenter',
        badge: '4K Max Stretch',
        specs: [
          '16GB GDDR6 VRAM — full Navi 48 flagship RDNA 4 performance',
          'DisplayPort 2.1a — effortless Linux Wayland/HDR',
          '~304W TDP (750W min; 850W PSU recommended)',
          'Check Austin shelves & Open-Box case for sub-$820 drops',
        ],
        notes:
          'Flagship 16GB RDNA 4 tier if flexing past $1,500 or spotting an Open-Box drop. Pairs best with the 850W PSU.',
        watchOut:
          'Most models (Hellhound/Reaper) use 2× 8-pin PCIe, but heavy OC flagship variants can require 3× 8-pin PCIe or 12V-2x6 — verify connector count on the box!',
        linuxTag: 'Open-source Mesa/RADV',
        links: [
          {
            label: 'MC RX 9070 XT Stock',
            url: 'https://www.microcenter.com/search/search_results.aspx?Ntt=RX+9070+XT',
            channel: 'microcenter',
          },
          {
            label: 'PCPartPicker Search',
            url: 'https://pcpartpicker.com/search/?q=RX+9070+XT+16GB',
            channel: 'reference',
          },
        ],
      },
    ],
  },
  {
    id: 'ssd',
    title: 'NVMe SSD Storage (1TB vs. 2TB)',
    subtitle: 'Starting at 1TB — compare live Black Friday $/TB math to see if 2TB is worth the small jump',
    icon: 'SSD',
    defaultOptionId: 'sn850x-1tb',
    options: [
      {
        id: 'sn850x-1tb',
        name: 'WD_BLACK SN850X 1TB PCIe 4.0 NVMe (with DRAM)',
        shortName: 'WD SN850X 1TB',
        price: 109.99,
        capacityTb: 1,
        defaultChannel: 'online',
        badge: 'Default 1TB',
        specs: [
          '1TB PCIe Gen 4 ×4 NVMe (up to 7,300 MB/s)',
          'Dedicated DRAM cache for fast Linux boot & Steam installs',
          'Leaves 2 extra M.2 slots open on the B650 board for easy expansion',
        ],
        notes:
          'Black Friday 2026 promos pull the 1TB SN850X down to ~$100–$115 (despite 2026 NAND inflation). Plenty of room for Linux + Marvel Rivals + Valheim + Risk of Rain 2 + 10–15 more Steam games.',
        watchOut:
          'Also check Micro Center Austin’s Inland house-brand 1TB Gen 4 promos in-store — if an Inland Performance Plus 1TB is $85–$95, grab it there!',
        linuxTag: 'NVMe + TRIM native',
        links: [
          {
            label: 'Amazon SN850X 1TB',
            url: 'https://www.amazon.com/s?k=WD+Black+SN850X+1TB',
            channel: 'online',
          },
          {
            label: 'MC 1TB NVMe Deals',
            url: 'https://www.microcenter.com/search/search_results.aspx?Ntt=1TB+NVMe+Gen4',
            channel: 'microcenter',
          },
        ],
      },
      {
        id: 'sn850x-2tb',
        name: 'WD_BLACK SN850X 2TB PCIe 4.0 NVMe (Black Friday Promo)',
        shortName: 'WD SN850X 2TB',
        price: 169.99,
        capacityTb: 2,
        defaultChannel: 'online',
        badge: 'Best $/TB Value',
        specs: [
          '2TB PCIe Gen 4 ×4 NVMe (up to 7,300 MB/s)',
          'Dedicated DRAM cache (~$85/TB vs ~$110/TB on 1TB)',
          'Huge headroom for future AAA games or a Windows dual-boot',
        ],
        notes:
          'If Black Friday brings the 2TB SN850X into the $150–$175 window (+$50–$65 over 1TB), it drops cost per TB by ~23% and saves you from ever running low on game space.',
        watchOut:
          'Skip if 2TB jumps back above $210+ after Black Friday — stick with 1TB and add a second M.2 drive later.',
        linuxTag: 'NVMe + DRAM cache',
        links: [
          {
            label: 'Amazon SN850X 2TB',
            url: 'https://www.amazon.com/s?k=WD+Black+SN850X+2TB',
            channel: 'online',
          },
          {
            label: 'MC 2TB NVMe Deals',
            url: 'https://www.microcenter.com/search/search_results.aspx?Ntt=2TB+NVMe+Gen4',
            channel: 'microcenter',
          },
        ],
      },
      {
        id: 'inland-1tb-mc',
        name: 'Inland Performance Plus / TN470 1TB PCIe 4.0 (MC In-Store)',
        shortName: 'Inland 1TB Gen4 (MC)',
        price: 94.99,
        capacityTb: 1,
        defaultChannel: 'microcenter',
        badge: 'MC House Special',
        specs: [
          '1TB PCIe Gen 4 ×4 NVMe (Micro Center house brand)',
          'Strong TLC endurance & 5-year warranty',
          'Easy same-trip pickup at Micro Center Austin',
        ],
        notes:
          'Micro Center frequently runs in-store loss-leader pricing on Inland NVMe drives that undercuts online NAND inflation.',
        watchOut: 'Prefer TLC models (Performance Plus / TN470) over QLC (QN450) for a primary OS drive.',
        linuxTag: 'Standard NVMe',
        links: [
          {
            label: 'MC Inland 1TB Gen4',
            url: 'https://www.microcenter.com/search/search_results.aspx?Ntt=Inland+1TB+NVMe+PCIe+4.0',
            channel: 'microcenter',
          },
        ],
      },
      {
        id: 'crucial-t500-2tb',
        name: 'Crucial T500 2TB PCIe 4.0 NVMe (with DRAM)',
        shortName: 'Crucial T500 2TB',
        price: 229.99,
        capacityTb: 2,
        defaultChannel: 'online',
        specs: [
          '2TB PCIe Gen 4 ×4 NVMe (7,400 MB/s)',
          'Low power & cool temps, dedicated DRAM cache',
          'Alternative if WD SN850X 2TB sells out',
        ],
        notes: 'Excellent Gen 4 drive, though at $229+ it widens the gap over 1TB compared to a $169 SN850X sale.',
        linuxTag: 'NVMe + cool running',
        links: [
          {
            label: 'Amazon Crucial T500 2TB',
            url: 'https://www.amazon.com/s?k=Crucial+T500+2TB',
            channel: 'online',
          },
        ],
      },
    ],
  },
  {
    id: 'cooler',
    title: 'CPU Air Cooler (5V ARGB)',
    subtitle: 'Zero-maintenance dual-tower air cooling — beats $100 AIOs & uses standard OpenRGB headers',
    icon: 'FAN',
    defaultOptionId: 'phantom-spirit-120-se-argb',
    options: [
      {
        id: 'phantom-spirit-120-se-argb',
        name: 'Thermalright Phantom Spirit 120 SE ARGB',
        shortName: 'Phantom Spirit 120 SE ARGB',
        price: 37.9,
        defaultChannel: 'online',
        badge: 'Undisputed King',
        specs: [
          '7× 6mm heatpipes + dual 120mm PWM ARGB fans',
          '154mm height — fits easily inside all ATX mesh cases below',
          'Standard 3-pin 5V ARGB header (zero proprietary software)',
          'Includes thermal paste (TF7) in the box',
        ],
        notes:
          'The best $38 in PC building. Quietly tames 7500X3D, 9700X, 7700X3D, and future AM5 upgrades with zero liquid-cooler pump failure risk.',
        watchOut:
          'Micro Center rarely stocks Thermalright — order online a few days before build day. Clears low-profile G.Skill Flare X5 (33mm) easily; taller RGB RAM just means clipping the front fan ~5mm higher. Always peel the clear plastic film off the cold plate!',
        linuxTag: 'OpenRGB 5V ARGB native',
        links: [
          {
            label: 'Amazon Phantom Spirit',
            url: 'https://www.amazon.com/s?k=Thermalright+Phantom+Spirit+120+SE+ARGB',
            channel: 'online',
          },
          {
            label: 'PCPartPicker',
            url: 'https://pcpartpicker.com/search/?q=Thermalright+Phantom+Spirit+120+SE+ARGB',
            channel: 'reference',
          },
        ],
      },
      {
        id: 'peerless-assassin-120-se-argb',
        name: 'Thermalright Peerless Assassin 120 SE ARGB',
        shortName: 'Peerless Assassin 120 SE',
        price: 34.9,
        defaultChannel: 'online',
        specs: [
          '6× 6mm heatpipes + dual 120mm PWM ARGB fans',
          '155mm height, standard 3-pin 5V ARGB',
          'Great backup if Phantom Spirit is out of stock',
        ],
        notes: 'Within 1–2°C of the Phantom Spirit for ~$3 less. Same rock-solid mounting and Linux-friendly ARGB.',
        linuxTag: 'OpenRGB 5V ARGB native',
        links: [
          {
            label: 'Amazon Peerless Assassin',
            url: 'https://www.amazon.com/s?k=Thermalright+Peerless+Assassin+120+SE+ARGB',
            channel: 'online',
          },
        ],
      },
    ],
  },
  {
    id: 'case',
    title: 'ATX Mid-Tower Mesh Case (Black + ARGB)',
    subtitle: 'Hands-on pick at Micro Center Austin — great airflow & easy first-time cable routing',
    icon: 'CASE',
    defaultOptionId: 'montech-air-903-max',
    options: [
      {
        id: 'montech-air-903-max',
        name: 'Montech Air 903 Max (Black, Mesh + Glass)',
        shortName: 'Montech Air 903 Max',
        price: 79.99,
        defaultChannel: 'microcenter',
        badge: 'Easiest 1st Build',
        specs: [
          'Includes 4× 140mm fans (3× front ARGB + 1× rear) + built-in PWM/ARGB hub',
          'Fits GPUs up to 400mm & CPU coolers up to 180mm',
          'Full mesh front + tempered glass side + USB-C front port',
          'Standard 5V ARGB hub connects straight to motherboard (or LED button)',
        ],
        notes:
          'Spacious, forgiving cable-management channels make it ideal for a first build — plus 4 big 140mm fans keep an RX 9070 GRE / XT cool even in warm Texas summers.',
        watchOut: 'Larger mid-tower footprint (~478mm deep); double-check desk depth if placing on top of the desk.',
        linuxTag: '5V ARGB hub / LED button',
        links: [
          {
            label: 'MC Air 903 Max',
            url: 'https://www.microcenter.com/search/search_results.aspx?Ntt=Montech+Air+903+Max',
            channel: 'microcenter',
          },
          {
            label: 'Amazon / Newegg',
            url: 'https://www.amazon.com/s?k=Montech+Air+903+Max+Black',
            channel: 'online',
          },
        ],
      },
      {
        id: 'phanteks-xt-pro-ultra',
        name: 'Phanteks XT Pro Ultra (Black, 4× 140mm D-RGB)',
        shortName: 'Phanteks XT Pro Ultra',
        price: 79.99,
        defaultChannel: 'online',
        badge: 'Clean & Roomy',
        specs: [
          '4× pre-installed 140mm M25 D-RGB fans',
          'Supports GPUs up to 415mm & air coolers up to 184mm',
          'USB-C 3.2 Gen 2 front panel + mesh airflow front',
          'Daisy-chained standard 3-pin 5V ARGB',
        ],
        notes:
          'Neck-and-neck with the Air 903 Max — sleek understated black look with huge interior space and awesome stock fan value.',
        linuxTag: 'Standard 5V D-RGB',
        links: [
          {
            label: 'Newegg XT Pro Ultra',
            url: 'https://www.newegg.com/p/pl?d=Phanteks+XT+Pro+Ultra+Black',
            channel: 'online',
          },
          {
            label: 'MC Phanteks Cases',
            url: 'https://www.microcenter.com/search/search_results.aspx?Ntt=Phanteks+XT+Pro+Ultra',
            channel: 'microcenter',
          },
        ],
      },
      {
        id: 'lian-li-lancool-207',
        name: 'Lian Li Lancool 207 (Black, Compact Mesh + ARGB)',
        shortName: 'Lian Li Lancool 207',
        price: 79.99,
        defaultChannel: 'microcenter',
        badge: 'Top GPU Temps',
        specs: [
          '4× included fans (2× 140mm front ARGB + 2× 120mm bottom GPU intake)',
          'Shorter desk footprint thanks to front-mounted PSU layout',
          'Usually stocked right on the floor at Micro Center Austin',
        ],
        notes:
          'One of the highest-rated thermal cases on the market for ~$80, and Micro Center almost always has it on display to inspect in person.',
        watchOut:
          'Front-mounted PSU leaves slightly tighter rear cable room — keep PSU length ≤ 160mm (both PSU picks below fit easily!).',
        linuxTag: 'Standard 5V ARGB',
        links: [
          {
            label: 'MC Lancool 207',
            url: 'https://www.microcenter.com/search/search_results.aspx?Ntt=Lian+Li+Lancool+207',
            channel: 'microcenter',
          },
          {
            label: 'Amazon Lancool 207',
            url: 'https://www.amazon.com/s?k=Lian+Li+Lancool+207+Black',
            channel: 'online',
          },
        ],
      },
    ],
  },
  {
    id: 'psu',
    title: 'Power Supply (ATX 3.1, 80+ Gold, Modular)',
    subtitle: 'Never skimp here — clean modular cables make a first-time build 2× easier',
    icon: 'PSU',
    defaultOptionId: 'psu-750w-gold',
    options: [
      {
        id: 'psu-750w-gold',
        name: '750W ATX 3.1 80+ Gold Fully Modular (MSI MAG A750GL / Corsair RM750e)',
        shortName: '750W ATX 3.1 Gold',
        price: 89.99,
        defaultChannel: 'online',
        badge: 'Sweet Spot',
        specs: [
          '750W 80+ Gold efficiency, ATX 3.1 / PCIe 5.1 compliant',
          'Fully modular cables (only plug in what you use!)',
          'Compact 140mm length (fits Lancool 207 & Air 903 Max effortlessly)',
          '7–10 year manufacturer warranty',
        ],
        notes:
          'Plenty of clean headroom for an AM5 Ryzen + RX 9070 (~350W total system load in gaming), and handles standard 2× 8-pin RX 9070 XT models too.',
        watchOut:
          'Verify the PSU includes at least two separate 8-pin PCIe GPU cables (or 3× 8-pin / 12V-2x6 if buying a flagship OC RX 9070 XT). Avoid daisy-chaining a single pigtail cable when two separate leads are available.',
        linuxTag: 'No software needed',
        links: [
          {
            label: 'Amazon MSI A750GL',
            url: 'https://www.amazon.com/s?k=MSI+MAG+A750GL+PCIE5',
            channel: 'online',
          },
          {
            label: 'MC 750W Gold PSUs',
            url: 'https://www.microcenter.com/search/search_results.aspx?Ntt=750W+Gold+Modular+ATX+3.1',
            channel: 'microcenter',
          },
        ],
      },
      {
        id: 'psu-850w-gold',
        name: '850W ATX 3.1 80+ Gold Fully Modular (MSI MAG A850GL / Montech Century / RM850e)',
        shortName: '850W ATX 3.1 Gold',
        price: 109.99,
        defaultChannel: 'online',
        badge: 'RX 9070 XT Pick',
        specs: [
          '850W 80+ Gold, ATX 3.1 / PCIe 5.1 (12V-2x6 + multiple 8-pin PCIe leads)',
          'Fully modular, compact 140–150mm chassis',
          'Extra quiet fan curve under load + future GPU upgrade buffer',
        ],
        notes:
          'Recommended +$20 upgrade if grabbing an RX 9070 XT 16GB (304W card, especially 3× 8-pin OC models) or wanting zero PSU worries for the next 7–10 years.',
        linuxTag: 'No software needed',
        links: [
          {
            label: 'Amazon MSI A850GL',
            url: 'https://www.amazon.com/s?k=MSI+MAG+A850GL+PCIE5',
            channel: 'online',
          },
          {
            label: 'MC 850W Gold PSUs',
            url: 'https://www.microcenter.com/search/search_results.aspx?Ntt=850W+Gold+Modular+ATX+3.1',
            channel: 'microcenter',
          },
        ],
      },
    ],
  },
];

export const BUILD_PRESETS: BuildPreset[] = [
  {
    id: 'under-1500',
    name: 'Under-$1,500 Winner ($1,438)',
    tagline: '7500X3D ($400) + RX 9070 GRE ($720) + 1TB',
    selections: {
      bundle: 'mc-7500x3d-b850m',
      gpu: 'rx-9070-gre-hellhound',
      ssd: 'sn850x-1tb',
      cooler: 'phantom-spirit-120-se-argb',
      case: 'montech-air-903-max',
      psu: 'psu-750w-gold',
    },
  },
  {
    id: 'under-1500-2tb',
    name: '2TB Still Under $1,500 ($1,498)',
    tagline: '7500X3D + RX 9070 GRE + 2TB SN850X',
    selections: {
      bundle: 'mc-7500x3d-b850m',
      gpu: 'rx-9070-gre-hellhound',
      ssd: 'sn850x-2tb',
      cooler: 'phantom-spirit-120-se-argb',
      case: 'montech-air-903-max',
      psu: 'psu-750w-gold',
    },
  },
  {
    id: 'openbox-value',
    name: 'Open-Box Value ($1,366)',
    tagline: '7500X3D + Austin Open-Box Hellhound ($648)',
    selections: {
      bundle: 'mc-7500x3d-b850m',
      gpu: 'rx-9070-gre-openbox',
      ssd: 'sn850x-1tb',
      cooler: 'phantom-spirit-120-se-argb',
      case: 'montech-air-903-max',
      psu: 'psu-750w-gold',
    },
  },
  {
    id: 'openbox-32gb',
    name: '32GB ATX + Open-Box ($1,566)',
    tagline: '9700X 32GB ($600) + Open-Box Hellhound ($648)',
    selections: {
      bundle: 'mc-9700x-b650',
      gpu: 'rx-9070-gre-openbox',
      ssd: 'sn850x-1tb',
      cooler: 'phantom-spirit-120-se-argb',
      case: 'montech-air-903-max',
      psu: 'psu-750w-gold',
    },
  },
];

export const GAME_MATRIX: GameProfile[] = [
  {
    title: 'Marvel Rivals',
    engine: 'Unreal Engine 5 (Hero Shooter)',
    linuxStatus: 'Works via Steam Proton',
    linuxBadgeTone: 'green',
    storageGb: 65,
    fourKNotes:
      'UE5 is GPU-heavy at 4K; an RX 9070 GRE / 9070 XT with FSR Quality/Balanced easily locks 60+ FPS at 4K High (and 120+ FPS if upgrading to a 144Hz monitor later).',
    protonTip:
      'Use Steam Proton Hotfix or Proton Experimental — NetEase season patches occasionally need Valve’s quick Proton Hotfix updates.',
  },
  {
    title: 'Valheim',
    engine: 'Unity (Survival / Base Building)',
    linuxStatus: 'Native Linux + Vulkan',
    linuxBadgeTone: 'teal',
    storageGb: 2,
    fourKNotes:
      'Runs effortlessly at 4K 60Hz on an RDNA 4 Radeon. Large player-built bases are CPU-sensitive, so the 7500X3D / 9700X / 7700X3D keeps frame times silky.',
    protonTip: 'Select the Vulkan renderer in Steam launch options for smoothest frame pacing on AMD Mesa/RADV.',
  },
  {
    title: 'Risk of Rain 2',
    engine: 'Unity (Roguelike Action)',
    linuxStatus: 'Proton Platinum',
    linuxBadgeTone: 'green',
    storageGb: 4,
    fourKNotes:
      'Butter-smooth 4K 60Hz out of the gate; late-game 90-minute god runs spawn hundreds of entities where AM5 single-core speed shines.',
    protonTip: 'Click-and-play via Steam Proton; supports mods easily via r2modman on Linux.',
  },
];

export const CHECKLIST_PHASES: ChecklistPhase[] = [
  {
    id: 'pre-trip',
    title: '1. Before Driving to Micro Center Austin',
    timing: 'Night before / morning of trip',
    items: [
      {
        id: 'reserve-pickup',
        text: 'Reserve your AM5 Bundle + GPU online for 18-minute In-Store Pickup at Austin',
        tip: 'Locks Black Friday stock before the drive. No charge until you pick up.',
      },
      {
        id: 'verify-bundle',
        text: 'Confirm your exact bundle tier at pickup: 7500X3D (1×16GB, mATX, CPU pre-installed) vs. 9700X/7700X3D (2×16GB, ATX)',
        tip: 'Also note the bundle board size (mATX vs. ATX) so you set case standoffs properly on build day.',
      },
      {
        id: 'check-open-box',
        text: 'Walk past the Open-Box GPU & Case glass shelves in Austin',
        tip: 'Micro Center Open-Box GPUs keep full 30-day return coverage (like the $647.96 Open-Box RX 9070 GRE Hellhound).',
      },
      {
        id: 'check-dp-cable',
        text: 'Confirm you have a DisplayPort cable + Cat5e/Cat6 Ethernet patch cable ready at home',
        tip: 'Use DisplayPort (not HDMI) on the 4K monitor for the cleanest AMD Linux display support.',
      },
    ],
  },
  {
    id: 'prep',
    title: '2. Build-Day Workspace & Tools',
    timing: '15 minutes',
    items: [
      {
        id: 'tools-ready',
        text: 'Gather a Phillips #2 magnetic screwdriver, zip ties/Velcro straps, and a small bowl for screws',
        tip: 'No power drills! Build on a wood/dining table — avoid standing on plush carpet.',
      },
      {
        id: 'usb-ready',
        text: 'Keep an 8GB+ USB flash drive handy for whichever Linux ISO you pick post-build',
      },
      {
        id: 'ground-self',
        text: 'Touch a plugged-in (switched OFF) metal PSU frame occasionally to stay static-safe',
      },
    ],
  },
  {
    id: 'bench',
    title: '3. Outside-the-Case Motherboard Assembly',
    timing: '30–45 minutes',
    items: [
      {
        id: 'mobo-box',
        text: 'Place the motherboard on top of its cardboard box (never on top of the anti-static bag)',
      },
      {
        id: 'install-cpu',
        text: 'CPU step: If you bought the 7500X3D Featured Bundle, SKIP seating — the CPU is already pre-installed! Otherwise drop the AM5 CPU in gently matching the gold triangle',
        tip: 'Do not unlatch a pre-installed 7500X3D. For loose CPUs (9700X / 7700X3D), leave the black socket cover on the bracket — it pops off automatically when you close the lever.',
      },
      {
        id: 'install-nvme',
        text: 'Install the NVMe SSD in the top M.2_1 slot (closest to the CPU) and peel the heatsink thermal-pad film',
      },
      {
        id: 'install-ram',
        text: 'Install DDR5 RAM: 1 stick (7500X3D bundle) goes in slot A2 only; 2 sticks (9700X/7700X3D) go in slots A2 and B2',
        tip: 'Per the ASRock B850M-C manual, a single DIMM must go in A2 (2nd slot from CPU — not B2). Verify top/bottom latches click flat.',
      },
      {
        id: 'install-cooler',
        text: 'PEEL the clear plastic film off the Phantom Spirit copper base, apply pea-sized paste, and mount cooler',
        tip: 'Plug CPU fans into CPU_FAN1 and the 3-pin ARGB cable into a 5V 3-pin ARGB header (never 12V 4-pin RGB!).',
      },
    ],
  },
  {
    id: 'case-install',
    title: '4. Case Install, PSU & GPU',
    timing: '45–60 minutes',
    items: [
      {
        id: 'pre-route-psu',
        text: 'Attach only needed PSU cables first: 24-pin ATX, 8-pin CPU (EPS), and separate PCIe GPU cables matching the card box',
        tip: 'Install the PSU fan-side facing the case’s filtered intake mesh.',
      },
      {
        id: 'mount-mobo',
        text: 'Match case standoffs strictly to your board’s mounting holes (9 for ATX, 6–8 for mATX), remove any unused metal standoffs, and fasten screws snug',
        tip: 'Important safety check: leaving an unused ATX standoff behind a Micro-ATX board can short out the motherboard.',
      },
      {
        id: 'connect-headers',
        text: 'Plug in CPU 8-pin (top-left), 24-pin ATX, front-panel power switch, USB-C/USB 3.0, HD Audio, and case fan/ARGB hub',
      },
      {
        id: 'install-gpu',
        text: 'Remove rear PCIe slot covers, click the Radeon RX 9070 GRE / XT into the top PCIe x16 slot, screw bracket, and plug two separate 8-pin PCIe power cables',
        tip: 'Use the GPU anti-sag bracket if one comes in the GPU or case box.',
      },
    ],
  },
  {
    id: 'first-boot',
    title: '5. First Boot & BIOS Setup (Before Linux)',
    timing: '20 minutes',
    items: [
      {
        id: 'dp-to-gpu',
        text: 'Plug the 4K DisplayPort cable into the GRAPHICS CARD (lower horizontal ports), NOT the motherboard!',
        tip: 'Flip the PSU rear switch to “I” (ON) and press the case power button.',
      },
      {
        id: 'memory-train',
        text: 'Be patient on the very first AM5 boot — DDR5 memory training can take 45–90 seconds before display lights up',
      },
      {
        id: 'bios-settings',
        text: 'In BIOS: verify CPU/RAM/NVMe detected, check idle CPU temp (~35–48°C), enable AMD EXPO (6000 MT/s) & Resizable BAR / Above 4G Decoding',
      },
      {
        id: 'ethernet-check',
        text: 'Plug in your wired Ethernet cable — ready to pick & install your Linux distro when you’re set!',
        tip: 'Standard DHCP & local DNS filtering work automatically over Ethernet on Linux with zero client software.',
      },
    ],
  },
];
