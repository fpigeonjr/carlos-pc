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
    title: 'CPU + Motherboard + 32GB DDR5 Bundle',
    subtitle: 'Micro Center Austin 3-in-1 AM5 bundle — biggest savings in the Nov 2026 RAM market',
    icon: 'CPU',
    defaultOptionId: 'mc-7700x-bundle',
    options: [
      {
        id: 'mc-7700x-bundle',
        name: 'AMD Ryzen 7 7700X + B650 ATX Wi-Fi + 32GB DDR5-6000',
        shortName: 'Ryzen 7 7700X Bundle',
        price: 399.99,
        defaultChannel: 'microcenter',
        badge: 'Best Value',
        specs: [
          '8-Core / 16-Thread Zen 4 (AM5)',
          'ATX B650 Motherboard (Gigabyte Gaming X AX v2 or ASUS TUF)',
          '32GB (2×16GB) DDR5-6000 EXPO (G.Skill Flare X5)',
          '2.5GbE Wired Ethernet + Wi-Fi/BT backup + 3× M.2 slots',
        ],
        notes:
          'Leaves maximum budget for a 16GB Radeon GPU while giving 8 strong cores for Valheim, Risk of Rain 2, and multitasking — plus a drop-in AM5 CPU upgrade path years from now.',
        watchOut:
          'Confirm the bundle box includes 32GB (2×16GB), not a 16GB single-stick variant. Micro Center bundles must be returned as a full set.',
        linuxTag: 'AM5 + 2.5GbE Linux-ready',
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
          {
            label: 'Search 7700X Bundle',
            url: 'https://www.microcenter.com/search/search_results.aspx?Ntt=7700X+bundle',
            channel: 'microcenter',
          },
        ],
      },
      {
        id: 'mc-7600x3d-bundle',
        name: 'AMD Ryzen 5 7600X3D / 7500X3D + B650/B850 + 32GB DDR5',
        shortName: 'Ryzen 5 X3D Bundle',
        price: 429.99,
        defaultChannel: 'microcenter',
        badge: 'MC Exclusive X3D',
        specs: [
          '6-Core / 12-Thread with 96MB 3D V-Cache (AM5)',
          'AM5 B650 or B850 Motherboard (Wi-Fi + Wired LAN)',
          '32GB DDR5-6000 (verify vs 16GB $399.99 promo tier)',
          'Super-low power draw & cool temps on air',
        ],
        notes:
          'Micro Center exclusive 3D V-Cache sleeper! Big boost for CPU-heavy Unity games (Valheim mega-bases & late-game Risk of Rain 2) and high-FPS Marvel Rivals if upgrading past 60Hz later.',
        watchOut:
          'The $399.99 7500X3D/7600X3D promos sometimes ship with 16GB RAM or an mATX board (e.g., ASRock B850M-C). Verify RAM capacity and remove unused ATX standoffs if installing an mATX board.',
        linuxTag: '3D V-Cache + cool temps',
        links: [
          {
            label: 'MC AMD Bundles',
            url: 'https://www.microcenter.com/site/content/bundle-and-save.aspx',
            channel: 'microcenter',
          },
          {
            label: 'Search X3D Bundles',
            url: 'https://www.microcenter.com/search/search_results.aspx?Ntt=7600X3D+7500X3D+bundle',
            channel: 'microcenter',
          },
        ],
      },
      {
        id: 'mc-9700x-bundle',
        name: 'AMD Ryzen 7 9700X + B650/B850 ATX + 32GB DDR5-6000',
        shortName: 'Ryzen 7 9700X Bundle',
        price: 449.99,
        defaultChannel: 'microcenter',
        badge: 'Zen 5 Cool',
        specs: [
          '8-Core / 16-Thread Zen 5 (65W TDP efficiency)',
          'ATX B650 / B850 Wi-Fi + 2.5GbE LAN',
          '32GB (2×16GB) DDR5-6000 EXPO',
          'Runs noticeably cooler & quieter than 7700X',
        ],
        notes:
          'Newer Zen 5 silicon with whisper-quiet 65W efficiency — strong backup if the 7700X bundle is out of stock at Micro Center Austin.',
        watchOut: 'Check shelf price in-store; worth grabbing if within $50 of the 7700X bundle.',
        linuxTag: 'Zen 5 + 65W quiet',
        links: [
          {
            label: 'MC AMD Bundles',
            url: 'https://www.microcenter.com/site/content/bundle-and-save.aspx',
            channel: 'microcenter',
          },
          {
            label: 'Search 9700X Bundle',
            url: 'https://www.microcenter.com/search/search_results.aspx?Ntt=9700X+bundle',
            channel: 'microcenter',
          },
        ],
      },
      {
        id: 'mc-7800x3d-bundle',
        name: 'AMD Ryzen 7 7800X3D + B650E/X870 + 32GB DDR5-6000',
        shortName: 'Ryzen 7 7800X3D Bundle',
        price: 599.99,
        defaultChannel: 'microcenter',
        badge: 'Stretch Tier',
        specs: [
          '8-Core / 16-Thread Gaming Legend (96MB 3D V-Cache)',
          'Enthusiast B650E or X870 ATX Motherboard',
          '32GB (2×16GB) DDR5-6000 EXPO',
          'Endgame gaming CPU with years of headroom',
        ],
        notes:
          'Pushes the total over $1,500 when paired with an RX 9070/XT, but included here in case Black Friday Austin pricing dips into the $529–$550 range.',
        watchOut: 'At 4K 60Hz, spending an extra $200 on CPU instead of GPU rarely shows up in frame rate.',
        linuxTag: 'Flagship AM5 X3D',
        links: [
          {
            label: 'Search 7800X3D Bundle',
            url: 'https://www.microcenter.com/search/search_results.aspx?Ntt=7800X3D+bundle',
            channel: 'microcenter',
          },
        ],
      },
    ],
  },
  {
    id: 'gpu',
    title: 'Graphics Card (16GB AMD Radeon)',
    subtitle: 'GPU-first allocation for 4K + frictionless open-source Mesa/RADV Linux drivers',
    icon: 'GPU',
    defaultOptionId: 'rx-9070-16gb',
    options: [
      {
        id: 'rx-9070-16gb',
        name: 'AMD Radeon RX 9070 16GB (RDNA 4)',
        shortName: 'Radeon RX 9070 16GB',
        price: 749.99,
        defaultChannel: 'microcenter',
        badge: 'Under-$1,500 Fit',
        specs: [
          '16GB GDDR6 VRAM — ideal for 4K textures',
          'RDNA 4 architecture + FSR 4 upscaling',
          'DisplayPort 2.1a + HDMI 2.1b (use DisplayPort on Linux!)',
          '~220W TDP — runs cool & quiet on a 750W PSU',
        ],
        notes:
          'Hits right under the $1,500 pre-tax target even in the Nov 2026 GPU market! Crushes 4K 60Hz in Marvel Rivals (with FSR), Valheim, and Risk of Rain 2 with huge headroom.',
        watchOut:
          'Online street pricing is ~$749 due to 2026 memory hikes (launch MSRP was $549). Check Micro Center Austin shelves & the Open-Box glass case for $649–$699 gems!',
        linuxTag: 'Open-source Mesa/RADV',
        links: [
          {
            label: 'MC RX 9070 Stock',
            url: 'https://www.microcenter.com/search/search_results.aspx?Ntt=RX+9070',
            channel: 'microcenter',
          },
          {
            label: 'Newegg RX 9070',
            url: 'https://www.newegg.com/p/pl?d=RX+9070+16GB',
            channel: 'online',
          },
          {
            label: 'PCPartPicker Search',
            url: 'https://pcpartpicker.com/search/?q=RX+9070+16GB',
            channel: 'reference',
          },
        ],
      },
      {
        id: 'rx-9070-xt-16gb',
        name: 'AMD Radeon RX 9070 XT 16GB (PowerColor Hellhound / Reaper / Sapphire)',
        shortName: 'Radeon RX 9070 XT 16GB',
        price: 869.99,
        defaultChannel: 'microcenter',
        badge: '4K Max Power',
        specs: [
          '16GB GDDR6 VRAM — flagship RDNA 4 performance',
          '~15–20% faster than RX 9070 at 4K native/FSR',
          'DisplayPort 2.1a — effortless Linux Wayland/HDR',
          '~304W TDP (750W min; 850W PSU recommended)',
        ],
        notes:
          'Micro Center early Black Friday promos have featured custom cards like the PowerColor Hellhound OC at $869.99 (down from $950+ online). If you spot a base model or Open-Box near $779–$799 in Austin, snap it up!',
        watchOut:
          'Most models (Hellhound/Reaper) use 2× 8-pin PCIe, but heavy OC flagship variants (e.g., Red Devil) can require 3× 8-pin PCIe or 12V-2x6 — verify connector count on the box to match your PSU cables!',
        linuxTag: 'Open-source Mesa/RADV',
        links: [
          {
            label: 'MC RX 9070 XT Stock',
            url: 'https://www.microcenter.com/search/search_results.aspx?Ntt=RX+9070+XT',
            channel: 'microcenter',
          },
          {
            label: 'Newegg RX 9070 XT',
            url: 'https://www.newegg.com/p/pl?d=RX+9070+XT+16GB',
            channel: 'online',
          },
          {
            label: 'PCPartPicker Search',
            url: 'https://pcpartpicker.com/search/?q=RX+9070+XT+16GB',
            channel: 'reference',
          },
        ],
      },
      {
        id: 'rx-9060-xt-16gb',
        name: 'AMD Radeon RX 9060 XT 16GB (In-Store Promo Target Only)',
        shortName: 'Radeon RX 9060 XT 16GB',
        price: 549.99,
        defaultChannel: 'microcenter',
        badge: 'Budget Saver',
        specs: [
          '16GB GDDR6 VRAM (skip the 8GB version for 4K!)',
          'RDNA 4 + FSR 4 upscaling for 4K 60Hz medium/high',
          'Very low ~160W power draw',
          'Saves ~$200 if found near true promo pricing',
        ],
        notes:
          'Only worth choosing if Micro Center Austin has an in-store promo under ~$550 — online scalpers have pushed 16GB units near $729, where the RX 9070 is a massively better buy.',
        watchOut:
          'Never pay $650+ for a 9060 XT 16GB when an RX 9070 16GB is ~$749. Always avoid 8GB cards for a 4K monitor.',
        linuxTag: 'Open-source Mesa/RADV',
        links: [
          {
            label: 'MC RX 9060 XT 16GB',
            url: 'https://www.microcenter.com/search/search_results.aspx?Ntt=RX+9060+XT+16GB',
            channel: 'microcenter',
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
          'The best $38 in PC building. Quietly tames 7700X, 7800X3D, and future AM5 upgrades with zero liquid-cooler pump failure risk.',
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
          'Spacious, forgiving cable-management channels make it ideal for a first build — plus 4 big 140mm fans keep an RX 9070/XT cool even in warm Texas summers.',
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
    id: 'sweet-spot',
    name: 'Under-$1,500 Sweet Spot',
    tagline: '7700X Bundle + RX 9070 16GB + 1TB',
    selections: {
      bundle: 'mc-7700x-bundle',
      gpu: 'rx-9070-16gb',
      ssd: 'sn850x-1tb',
      cooler: 'phantom-spirit-120-se-argb',
      case: 'montech-air-903-max',
      psu: 'psu-750w-gold',
    },
  },
  {
    id: 'two-tb-sweet',
    name: '2TB Upgrade (+$60)',
    tagline: 'Same sweet spot + double SSD capacity',
    selections: {
      bundle: 'mc-7700x-bundle',
      gpu: 'rx-9070-16gb',
      ssd: 'sn850x-2tb',
      cooler: 'phantom-spirit-120-se-argb',
      case: 'montech-air-903-max',
      psu: 'psu-750w-gold',
    },
  },
  {
    id: 'max-4k',
    name: '4K RX 9070 XT Beast',
    tagline: 'Max 4K GPU + 850W PSU (watch MC promos!)',
    selections: {
      bundle: 'mc-7700x-bundle',
      gpu: 'rx-9070-xt-16gb',
      ssd: 'sn850x-1tb',
      cooler: 'phantom-spirit-120-se-argb',
      case: 'montech-air-903-max',
      psu: 'psu-850w-gold',
    },
  },
  {
    id: 'x3d-shooter',
    name: 'X3D Marvel Rivals Rig',
    tagline: 'MC Exclusive 7600X3D + RX 9070 16GB',
    selections: {
      bundle: 'mc-7600x3d-bundle',
      gpu: 'rx-9070-16gb',
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
      'UE5 is GPU-heavy at 4K; an RX 9070 / 9070 XT with FSR Quality/Balanced easily locks 60+ FPS at 4K High (and 120+ FPS if upgrading to a 144Hz monitor later).',
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
      'Runs effortlessly at 4K 60Hz on a 16GB Radeon. Large player-built bases are CPU-sensitive, so the 7700X / 7600X3D + 32GB DDR5 keeps frame times silky.',
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
        id: 'verify-32gb',
        text: 'Double-check the bundle RAM kit is 32GB (2×16GB) DDR5-6000',
        tip: 'Some budget promos swap in a single 16GB stick — confirm before checking out.',
      },
      {
        id: 'check-open-box',
        text: 'Walk past the Open-Box GPU & Case glass shelves in Austin',
        tip: 'Micro Center Open-Box GPUs keep full 30-day return coverage and can knock $60–$120 off an RX 9070 XT.',
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
        text: 'Drop the AM5 Ryzen CPU gently into the socket matching the gold triangle — zero downward force',
        tip: 'Leave the black plastic socket cover on the retention bracket; it pops off automatically when you close the lever!',
      },
      {
        id: 'install-nvme',
        text: 'Install the NVMe SSD in the top M.2_1 slot (closest to the CPU) and peel the heatsink thermal-pad film',
      },
      {
        id: 'install-ram',
        text: 'Click both DDR5 sticks firmly into slots A2 and B2 (2nd and 4th from CPU)',
        tip: 'DDR5 takes firmer pressure than you expect — verify both top/bottom latches click flat.',
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
        text: 'Remove rear PCIe slot covers, click the Radeon RX 9070 / XT into the top PCIe x16 slot, screw bracket, and plug separate PCIe power cables',
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
