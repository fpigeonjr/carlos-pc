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
    subtitle: 'Live Micro Center Austin Top Deals (Nov 23) — 2TB jumps +$180 right now, so 1TB wins easily!',
    icon: 'SSD',
    defaultOptionId: 'inland-tn320-1tb',
    options: [
      {
        id: 'inland-tn320-1tb',
        name: 'Inland TN320 1TB PCIe Gen 3.0 x4 3D TLC NVMe (SKU 529776)',
        shortName: 'Inland TN320 1TB (MC)',
        price: 169.99,
        capacityTb: 1,
        defaultChannel: 'microcenter',
        badge: 'Best MC 1TB TLC',
        specs: [
          'SKU 529776 · 25+ in stock at Austin ($169.99, reg $399.99)',
          '1TB 3D TLC NAND (skip the $179.99 QLC QN450 right next to it!)',
          'PCIe Gen 3 ×4 (~3,200 MB/s — virtually identical game load times to Gen 4)',
          'Saves $180 vs Austin’s cheapest 2TB drive ($349.99)',
        ],
        notes:
          'Cheapest live 1TB TLC drive in Austin’s Top Deals. Plenty of space for Linux + Marvel Rivals + Valheim + Risk of Rain 2 (~96GB total, leaving ~835GB free), and you can add a second M.2 drive later once 2026 NAND prices cool down.',
        watchOut:
          'Check Amazon/Best Buy tonight too — if you spot a 1TB TLC Gen 4 drive around $115–$140 online, type that into the Online option below!',
        linuxTag: 'NVMe + TLC native',
        links: [
          {
            label: 'MC SKU 529776',
            url: 'https://www.microcenter.com/search/search_results.aspx?Ntt=529776',
            channel: 'microcenter',
          },
          {
            label: 'MC SSD Top Deals',
            url: 'https://www.microcenter.com/search/search_results.aspx?Ntt=1TB+NVMe+M.2+SSD',
            channel: 'microcenter',
          },
        ],
      },
      {
        id: 'klevv-c925g-1tb',
        name: 'KLEVV Cras C925G 1TB PCIe Gen 4.0 x4 3D TLC NVMe (SKU 971549)',
        shortName: 'KLEVV 1TB Gen4 (MC)',
        price: 199.99,
        capacityTb: 1,
        defaultChannel: 'microcenter',
        badge: 'MC Gen 4 TLC',
        specs: [
          'SKU 971549 · 6 in stock at Austin ($199.99, reg $499.99)',
          '1TB PCIe Gen 4 ×4 3D TLC NAND',
          'Same-day Austin pickup if you specifically want Gen 4 speeds',
        ],
        notes:
          '+$30 over the Inland TN320 for PCIe 4.0 speeds in-store. For gaming, real-world load-time difference is under a second, so the $169.99 Inland TLC is the smarter value.',
        linuxTag: 'NVMe Gen 4 + TLC',
        links: [
          {
            label: 'MC SKU 971549',
            url: 'https://www.microcenter.com/search/search_results.aspx?Ntt=971549',
            channel: 'microcenter',
          },
        ],
      },
      {
        id: 'crucial-p510-2tb',
        name: 'Crucial P510 2TB PCIe Gen 5.0 x4 3D TLC NVMe (SKU 843102)',
        shortName: 'Crucial P510 2TB (MC)',
        price: 349.99,
        capacityTb: 2,
        defaultChannel: 'microcenter',
        badge: 'Austin 2TB Floor',
        specs: [
          'SKU 843102 · 25+ in stock at Austin ($349.99, reg $449.99)',
          '2TB PCIe Gen 5 ×4 3D TLC (Samsung 9100 PRO 2TB SKU 815258 also $349.99)',
          '+$180 over 1TB — ~$175/TB (actually MORE per TB than 1TB right now!)',
        ],
        notes:
          'Included so you can see the real Nov 2026 Austin 2TB floor ($349.99). Because 2TB costs MORE than 2× the $169.99 1TB drive, sticking with 1TB today is a no-brainer.',
        watchOut: 'Wait for NAND prices to normalize before adding a 2TB drive in M.2 slot #2.',
        linuxTag: 'NVMe Gen 5 + TLC',
        links: [
          {
            label: 'MC SKU 843102',
            url: 'https://www.microcenter.com/search/search_results.aspx?Ntt=843102',
            channel: 'microcenter',
          },
        ],
      },
      {
        id: 'online-1tb-hunt',
        name: 'Online 1TB Gen 4 NVMe Deal Target (WD SN850X / Crucial / Teamgroup)',
        shortName: 'Online 1TB Deal Hunt',
        price: 129.99,
        capacityTb: 1,
        defaultChannel: 'online',
        badge: 'Save ~$40 Online',
        specs: [
          'Check Amazon / Best Buy / Newegg Black Friday flash sales',
          'Target $105–$135 for a 1TB TLC Gen 4 drive',
          'Edit the price box with whatever live online deal you find',
        ],
        notes:
          'If you find a 1TB TLC Gen 4 SSD online around $115–$135 with 2-day shipping, ordering it online saves ~$35–$55 vs Austin’s $169.99 shelf price.',
        linuxTag: 'Standard NVMe',
        links: [
          {
            label: 'Amazon 1TB NVMe',
            url: 'https://www.amazon.com/s?k=1TB+PCIe+4.0+NVMe+SSD',
            channel: 'online',
          },
        ],
      },
    ],
  },
  {
    id: 'cooler',
    title: 'CPU Air Cooler (Thermalright AM5)',
    subtitle: 'Austin actually stocks Thermalright! Compare same-day pickup vs saving $22 online',
    icon: 'FAN',
    defaultOptionId: 'assassin-x-120r-mc',
    options: [
      {
        id: 'assassin-x-120r-mc',
        name: 'Thermalright Assassin X 120R Digital - Black (SKU 959528)',
        shortName: 'Assassin X 120R Digital',
        price: 32.99,
        defaultChannel: 'microcenter',
        badge: '1-Stop MC Pick',
        specs: [
          'SKU 959528 · 4 in stock at Austin ($32.99)',
          'Clean black tower cooler with digital top readout — zero shipping wait',
          'Easily cools 65W AM5 chips (7500X3D & 9700X) quietly',
          'Leaves zero RAM clearance conflict with any DDR5 stick height',
        ],
        notes:
          'Best same-day Austin cooler value: lets you walk out with 100% of the PC in one trip for $32.99 while staying right at $1,500 pre-tax.',
        watchOut: 'Peel the clear protective plastic film off the cold plate before mounting!',
        linuxTag: 'AM5 PWM native',
        links: [
          {
            label: 'MC SKU 959528',
            url: 'https://www.microcenter.com/search/search_results.aspx?Ntt=959528',
            channel: 'microcenter',
          },
        ],
      },
      {
        id: 'phantom-spirit-online',
        name: 'Thermalright Phantom Spirit 120 SE ARGB (Order Online)',
        shortName: 'Phantom Spirit (Online)',
        price: 37.9,
        defaultChannel: 'online',
        badge: 'Saves $22 vs MC',
        specs: [
          '7× 6mm heatpipes + dual 120mm PWM 5V ARGB fans (OpenRGB-friendly)',
          '154mm height — fits Lancool 207 & Montech ATX cases easily',
          'Saves $22 vs Micro Center Austin’s $59.99 shelf price (SKU 959296)',
          'Includes TF7 thermal paste in the box',
        ],
        notes:
          'The undisputed air-cooling king if you don’t mind ordering online for 2-day delivery. Easily handles future high-wattage AM5 X3D upgrades too.',
        watchOut: 'Clears low-profile G.Skill Flare X5 (33mm) effortlessly; always peel the cold-plate plastic film!',
        linuxTag: 'OpenRGB 5V ARGB native',
        links: [
          {
            label: 'Amazon Phantom Spirit',
            url: 'https://www.amazon.com/s?k=Thermalright+Phantom+Spirit+120+SE+ARGB',
            channel: 'online',
          },
        ],
      },
      {
        id: 'phantom-spirit-mc',
        name: 'Thermalright Phantom Spirit 120 SE ARGB — Austin In-Store (SKU 959296)',
        shortName: 'Phantom Spirit ARGB (MC)',
        price: 59.99,
        defaultChannel: 'microcenter',
        badge: 'In-Stock ARGB',
        specs: [
          'SKU 959296 · 10 in stock at Austin ($59.99)',
          'Dual-tower 7-heatpipe flagship air cooler + standard 5V ARGB',
          'Same-day pickup (non-ARGB SKU 959304 is $54.99, 25+ in stock)',
        ],
        notes:
          'Costs $22 more than Amazon, but if you snag the $647.96 Open-Box GPU, you can grab this in-store for zero shipping wait and STILL stay under $1,460!',
        linuxTag: 'OpenRGB 5V ARGB native',
        links: [
          {
            label: 'MC SKU 959296',
            url: 'https://www.microcenter.com/search/search_results.aspx?Ntt=959296',
            channel: 'microcenter',
          },
        ],
      },
      {
        id: 'peerless-assassin-mc',
        name: 'Thermalright Peerless Assassin 120 SE — Austin In-Store (SKU 959262)',
        shortName: 'Peerless Assassin (MC)',
        price: 49.99,
        defaultChannel: 'microcenter',
        specs: [
          'SKU 959262 · 6 in stock at Austin ($49.99)',
          '6-heatpipe dual-tower black air cooler (non-ARGB)',
          '$10 less than Phantom Spirit ARGB in-store',
        ],
        notes: 'Clean stealth dual-tower alternative in stock right on the Austin shelves.',
        linuxTag: 'AM5 PWM native',
        links: [
          {
            label: 'MC SKU 959262',
            url: 'https://www.microcenter.com/search/search_results.aspx?Ntt=959262',
            channel: 'microcenter',
          },
        ],
      },
    ],
  },
  {
    id: 'case',
    title: 'ATX Mid-Tower Mesh Case (Tempered Glass + ARGB)',
    subtitle: 'Live Micro Center Austin stock (Montech Air 903 Max isn’t stocked in Austin — Lancool 207 is!)',
    icon: 'CASE',
    defaultOptionId: 'lancool-207-black',
    options: [
      {
        id: 'lancool-207-black',
        name: 'Lian Li Lancool 207 Tempered Glass ATX Mid-Tower - Black (SKU 732115)',
        shortName: 'Lancool 207 Black',
        price: 99.99,
        defaultChannel: 'microcenter',
        badge: 'Top GPU Temps',
        specs: [
          'SKU 732115 · 3 in stock at Austin ($99.99, In Store Only)',
          '4× included fans (2× 140mm front ARGB + 2× 120mm bottom GPU intake)',
          'Fits 340mm RX 9070 GRE Hellhound easily (375mm max GPU clearance)',
          'Compact footprint + standard 5V ARGB fans (OpenRGB-friendly)',
        ],
        notes:
          'One of the best-cooling ATX mesh cases made — and physically on the floor in Austin to inspect in person. Pairs seamlessly with the compact 140mm MSI A750GL PSU.',
        watchOut:
          'Only 3 in stock at Austin — reserve online before driving up! Front-mounted PSU uses compact PSUs ≤160mm (all PSU picks below fit easily).',
        linuxTag: 'Standard 5V ARGB',
        links: [
          {
            label: 'MC SKU 732115',
            url: 'https://www.microcenter.com/search/search_results.aspx?Ntt=732115',
            channel: 'microcenter',
          },
        ],
      },
      {
        id: 'montech-sky3-black',
        name: 'Montech SKY 3 RGB Tempered Glass ATX - Black (SKU 969766)',
        shortName: 'Montech SKY 3 Black',
        price: 79.99,
        defaultChannel: 'microcenter',
        badge: '9 In Stock (MC)',
        specs: [
          'SKU 969766 · 9 in stock at Austin ("Add to Cart to see price")',
          'Black ATX mid-tower with tempered glass & RGB fans',
          'Strong backup if the 3 Black Lancool 207 units sell out',
        ],
        notes:
          'Verify the live "Add to Cart" price in Austin (Montech TG3 White SKU 033365 is $79.99; Montech XR Black SKU 714493 has 1 in stock too). Edit the price box with the exact cart tag.',
        linuxTag: 'Standard 5V ARGB',
        links: [
          {
            label: 'MC SKU 969766',
            url: 'https://www.microcenter.com/search/search_results.aspx?Ntt=969766',
            channel: 'microcenter',
          },
        ],
      },
      {
        id: 'lancool-207-white',
        name: 'Lian Li Lancool 207 Tempered Glass ATX - White (SKU 732123)',
        shortName: 'Lancool 207 White',
        price: 89.99,
        defaultChannel: 'microcenter',
        badge: '$10 Less Than Black',
        specs: [
          'SKU 732123 · 2 in stock at Austin ($89.99, In Store Only)',
          'Identical class-leading Lancool 207 cooling layout for $10 less than Black',
          '4× included fans (2× 140mm ARGB front + 2× 120mm GPU bottom intake)',
        ],
        notes: 'Rare reverse "white discount" at Austin — worth a look on the floor if a black-and-white stormtrooper look appeals!',
        linuxTag: 'Standard 5V ARGB',
        links: [
          {
            label: 'MC SKU 732123',
            url: 'https://www.microcenter.com/search/search_results.aspx?Ntt=732123',
            channel: 'microcenter',
          },
        ],
      },
      {
        id: 'montech-air-903-online',
        name: 'Montech Air 903 Max / Phanteks XT Pro Ultra (Order Online)',
        shortName: 'Air 903 Max (Online)',
        price: 79.99,
        defaultChannel: 'online',
        specs: [
          '4× 140mm PWM/ARGB fans, huge 400mm+ GPU clearance',
          'Not stocked in Austin right now — online alternative if you prefer extra room',
        ],
        notes: 'Great online fallback if you want traditional bottom-rear PSU cable routing at ~$80.',
        linuxTag: 'Standard 5V ARGB',
        links: [
          {
            label: 'Amazon Air 903 Max',
            url: 'https://www.amazon.com/s?k=Montech+Air+903+Max+Black',
            channel: 'online',
          },
        ],
      },
    ],
  },
  {
    id: 'psu',
    title: 'Power Supply (ATX 3.1, 80+ Gold, Modular)',
    subtitle: 'Austin Holiday Deal beats online! MSI MAG A750GL is $79.99 with 25+ in stock',
    icon: 'PSU',
    defaultOptionId: 'msi-a750gl-mc',
    options: [
      {
        id: 'msi-a750gl-mc',
        name: 'MSI MAG A750GL PCIE5 750W 80+ Gold Fully Modular ATX 3.1 (SKU 596676)',
        shortName: 'MSI A750GL 750W (MC)',
        price: 79.99,
        defaultChannel: 'microcenter',
        badge: 'Holiday Deal!',
        specs: [
          'SKU 596676 · 25+ in stock at Austin ($79.99, down from $109.99!)',
          '750W 80+ Gold · ATX 3.1 / PCIe 5.1 · Fully Modular',
          'Compact 140mm length — ideal fit inside Lian Li Lancool 207',
          'Exceeds PowerColor’s 700W min PSU spec for RX 9070 GRE (use 2 separate 8-pin leads)',
        ],
        notes:
          'Absolute steal in Austin’s Holiday Deals — $10 cheaper in-store than typical online pricing, with 25+ units ready for pickup tomorrow.',
        watchOut:
          'Use two separate 8-pin PCIe cables from the PSU to the RX 9070 GRE Hellhound rather than a single daisy-chained pigtail.',
        linuxTag: 'No software needed',
        links: [
          {
            label: 'MC SKU 596676',
            url: 'https://www.microcenter.com/search/search_results.aspx?Ntt=596676',
            channel: 'microcenter',
          },
        ],
      },
      {
        id: 'corsair-rm750e-mc',
        name: 'Corsair RM750e 750W Cybenetics Gold Modular ATX 3.1 (SKU 790600)',
        shortName: 'Corsair RM750e (MC)',
        price: 89.99,
        defaultChannel: 'microcenter',
        badge: '25+ In Stock',
        specs: [
          'SKU 790600 · 25+ in stock at Austin ($89.99, down from $114.99)',
          '750W Cybenetics Gold · ATX 3.1 · Compact 140mm chassis',
          'Super Flower Combat FG 750W (SKU 730358) also $89.99 in-store',
        ],
        notes: 'Rock-solid quiet backup if the $79.99 MSI A750GL sells out.',
        linuxTag: 'No software needed',
        links: [
          {
            label: 'MC SKU 790600',
            url: 'https://www.microcenter.com/search/search_results.aspx?Ntt=790600',
            channel: 'microcenter',
          },
        ],
      },
      {
        id: 'montech-century-850-mc',
        name: 'Montech CENTURY II 850W 80+ Gold Modular ATX 3.1 (SKU 987511)',
        shortName: 'Montech 850W (MC)',
        price: 99.99,
        defaultChannel: 'microcenter',
        badge: '850W Headroom',
        specs: [
          'SKU 987511 · 15 in stock at Austin ("Add to Cart to see price")',
          '850W 80+ Gold · ATX 3.1 · Fully Modular (4.9★ rated)',
          'Extra headroom if upgrading to an RX 9070 XT or future flagship GPU',
        ],
        notes: 'Check the exact "Add to Cart" tag in Austin — often ~$89–$99, making it an easy 850W upgrade.',
        linuxTag: 'No software needed',
        links: [
          {
            label: 'MC SKU 987511',
            url: 'https://www.microcenter.com/search/search_results.aspx?Ntt=987511',
            channel: 'microcenter',
          },
        ],
      },
    ],
  },
];

export const BUILD_PRESETS: BuildPreset[] = [
  {
    id: 'one-stop-austin',
    name: '1-Stop Austin ($1,503)',
    tagline: '100% In-Stock Tomorrow · New RX 9070 GRE',
    selections: {
      bundle: 'mc-7500x3d-b850m',
      gpu: 'rx-9070-gre-hellhound',
      ssd: 'inland-tn320-1tb',
      cooler: 'assassin-x-120r-mc',
      case: 'lancool-207-black',
      psu: 'msi-a750gl-mc',
    },
  },
  {
    id: 'openbox-one-stop',
    name: 'Open-Box Austin ($1,431)',
    tagline: '$69 Under Budget · 100% Austin Pickup!',
    selections: {
      bundle: 'mc-7500x3d-b850m',
      gpu: 'rx-9070-gre-openbox',
      ssd: 'inland-tn320-1tb',
      cooler: 'assassin-x-120r-mc',
      case: 'lancool-207-black',
      psu: 'msi-a750gl-mc',
    },
  },
  {
    id: 'openbox-phantom-argb',
    name: 'Open-Box + ARGB Cooler ($1,458)',
    tagline: 'Still Under $1,500 w/ Phantom Spirit ARGB',
    selections: {
      bundle: 'mc-7500x3d-b850m',
      gpu: 'rx-9070-gre-openbox',
      ssd: 'inland-tn320-1tb',
      cooler: 'phantom-spirit-mc',
      case: 'lancool-207-black',
      psu: 'msi-a750gl-mc',
    },
  },
  {
    id: '32gb-atx-openbox',
    name: '32GB ATX + Open-Box ($1,631)',
    tagline: '9700X 32GB ($600) + Open-Box Hellhound',
    selections: {
      bundle: 'mc-9700x-b650',
      gpu: 'rx-9070-gre-openbox',
      ssd: 'inland-tn320-1tb',
      cooler: 'assassin-x-120r-mc',
      case: 'lancool-207-black',
      psu: 'msi-a750gl-mc',
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
        text: 'PEEL the clear plastic film off the Thermalright cooler cold plate, apply pea-sized paste, and mount cooler',
        tip: 'Plug the CPU fan into CPU_FAN1. If using Phantom Spirit ARGB, plug the 3-pin cable into 5V ARGB (never 12V 4-pin RGB!); if using Assassin X 120R Digital, plug its USB cable into an internal 9-pin USB 2.0 header.',
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
