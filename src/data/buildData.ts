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
  lastVerified: '2026-11-24',
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
    title: 'CPU + Motherboard + RAM Bundle (5 Live In-Stock Austin Options)',
    subtitle: 'Verified IN STOCK at Austin (Nov 24) — 7600X3D Full-ATX AM5 bundle reserved; compare all 5 live options!',
    icon: 'CPU',
    defaultOptionId: 'mc-7600x3d-b650',
    options: [
      {
        id: 'mc-5600x3d-16gb',
        name: 'AMD Ryzen 5 5600X3D + ASUS Prime B550-Plus ATX + 16GB (2×8GB) DDR4-3200',
        shortName: '1. 5600X3D · 16GB DDR4',
        price: 269.99,
        defaultChannel: 'microcenter',
        badge: 'Lowest Total',
        specs: [
          'Bundle 5007538 · 7 NEW IN STOCK at Austin ($269.99, save $154.98)',
          'Ryzen 5 5600X3D (6C/12T, 96MB 3D V-Cache) + 16GB (2×8GB) Dual-Channel DDR4-3200',
          'ASUS Prime B550-Plus AC-HES Full ATX: Front USB-C + 2× 5V ARGB + 2× M.2',
          'Keeps the whole PC around $1,335 even AFTER TX 8.25% sales tax!',
        ],
        notes:
          'Strong value in 2026’s DDR5 crisis: full ATX board, dual-channel RAM, and 96MB 3D V-Cache for $130 less than the cheapest AM5 bundle. Easily feeds the RX 9060 XT / 9070 GRE at 60Hz+.',
        watchOut:
          'AM4 is an end-of-line socket (a major CPU upgrade in 4–5 years means swapping board + RAM too). Keep the stock rear AM4 backplate on for the Thermalright cooler!',
        linuxTag: 'AM4 3D V-Cache + Full ATX',
        links: [
          {
            label: 'MC Bundle 5007538',
            url: 'https://www.microcenter.com/product/5007538/amd-ryzen-5-5600x3d,-asus-b550-plus-prime-ac-hes-am4,-gskill-ripjaws-v-16gb-ddr4-3200-kit,-computer-build-bundle',
            channel: 'microcenter',
          },
          {
            label: 'MC AMD Bundles',
            url: 'https://www.microcenter.com/site/content/bundle-and-save.aspx',
            channel: 'microcenter',
          },
        ],
      },
      {
        id: 'mc-5600x3d-32gb',
        name: 'AMD Ryzen 5 5600X3D + ASUS Prime B550-Plus ATX + 32GB (4×8GB) DDR4-3200',
        shortName: '2. 5600X3D · 32GB DDR4',
        price: 404.98,
        defaultChannel: 'microcenter',
        badge: 'Best 32GB Value',
        specs: [
          'Bundle 5007538 ($269.99, 7 in stock) + Matching G.Skill Ripjaws V SKU 348201 ($134.99, in stock)',
          'Full 32GB (4×8GB) Dual-Channel DDR4-3200 CL16 + 96MB 3D V-Cache',
          'ASUS Prime B550-Plus AC-HES Full ATX: Front USB-C + 2× 5V ARGB + 2× M.2',
          '$245 LESS than Austin’s cheapest in-stock 32GB AM5 bundle (7700X3D $649.99)!',
        ],
        notes:
          'Cracks the 2026 "RAMageddon" code: 32GB dual-channel RAM, Full ATX, and 3D V-Cache while landing under $1,500 OUT THE DOOR (~$1,368 pre-tax / ~$1,481 w/ tax) with the $599.99 RX 9060 XT 16GB.',
        watchOut:
          'AM4 socket won’t take future Ryzen 9000/10000 CPUs. Populate all 4 DIMM slots with the two matched G.Skill Ripjaws V kits and enable DOCP/XMP 3200 in BIOS.',
        linuxTag: 'AM4 32GB + 3D V-Cache',
        links: [
          {
            label: 'MC Bundle 5007538',
            url: 'https://www.microcenter.com/product/5007538/amd-ryzen-5-5600x3d,-asus-b550-plus-prime-ac-hes-am4,-gskill-ripjaws-v-16gb-ddr4-3200-kit,-computer-build-bundle',
            channel: 'microcenter',
          },
          {
            label: 'Matching RAM SKU 348201',
            url: 'https://www.microcenter.com/search/search_results.aspx?Ntt=348201',
            channel: 'microcenter',
          },
        ],
      },
      {
        id: 'mc-7500x3d-b850m',
        name: 'AMD Ryzen 5 7500X3D (Pre-installed) + ASRock B850M-C mATX + 16GB DDR5-6000',
        shortName: '3. 7500X3D · 16GB AM5',
        price: 399.99,
        defaultChannel: 'microcenter',
        badge: 'Cheapest AM5 X3D',
        specs: [
          'Bundle 5007384 · 25+ NEW IN STOCK at Austin ($399.99, save $249.98)',
          'SKU 021980: Ryzen 5 7500X3D (3D V-Cache) pre-installed on ASRock B850M-C AM5',
          'SKU 784686 ($249.99 reg): G.Skill Flare X5 16GB (1×16GB) DDR5-6000',
          'Zero bent-pin risk (CPU pre-seated) + modern AM5 CPU upgrade path',
        ],
        notes:
          'Cheapest way onto modern AM5 with 3D V-Cache, landing ~$1,363 pre-tax (~$1,475 w/ tax) with the $599.99 RX 9060 XT 16GB. Linux runs very lean on 16GB RAM, and you can add a matching 2nd stick later.',
        watchOut:
          'Micro-ATX board (ASRock B850M-C) — match case standoffs strictly to mATX holes and remove unused ATX standoffs! Install the single RAM stick in slot A2 only.',
        linuxTag: 'AM5 3D V-Cache + B850',
        links: [
          {
            label: 'MC Bundle 5007384',
            url: 'https://www.microcenter.com/product/5007384/amd-ryzen-5-7500x3d,-asrock-b850m-c-am5,-gskill-flare-x5-series-16gb-ddr5-6000,-computer-build-bundle',
            channel: 'microcenter',
          },
        ],
      },
      {
        id: 'mc-7600x3d-b650',
        name: 'AMD Ryzen 5 7600X3D + Gigabyte B650 Gaming X AX V2 ATX + 16GB DDR5-6000',
        shortName: '4. 7600X3D · 16GB ATX',
        price: 479.99,
        defaultChannel: 'microcenter',
        badge: 'Reserved Pick',
        specs: [
          'Bundle 5007445 · 5 NEW IN STOCK at Austin ($479.99, save $139.98)',
          'CPU SKU 742940: Ryzen 5 7600X3D (6C/12T, 96MB 3D V-Cache, 65W AM5)',
          'Mobo SKU 660753: Gigabyte B650 Gaming X AX V2 Full ATX (3× M.2, 2.5GbE, Wi-Fi 6E)',
          'RAM SKU 784686: G.Skill Flare X5 16GB (1×16GB) DDR5-6000 (MC URL slug has a DDR4 typo — it IS DDR5!)',
        ],
        notes:
          'Locked-in Austin pickup winner! Full-ATX AM5 X3D with 3× M.2 slots and a clean upgrade path, landing at $1,442.94 pre-tax (~$1,562 w/ TX tax) paired with the $599.99 RX 9060 XT 16GB + $149.99 Inland 1TB NVMe.',
        watchOut:
          'Ships with 1×16GB single-channel DDR5 — install the stick in slot A2 (2nd from CPU). Only 5 in stock at Austin.',
        linuxTag: 'AM5 X3D + Full ATX',
        links: [
          {
            label: 'MC Bundle 5007445',
            url: 'https://www.microcenter.com/product/5007445/amd-ryzen-5-7600x3d,-gigabyte-b650-gaming-x-ax-vs-am5,-gskill-ripjaws-v-16gb-ddr4-3200,-computer-build-bundle',
            channel: 'microcenter',
          },
        ],
      },
      {
        id: 'mc-7700x3d-b650',
        name: 'AMD Ryzen 7 7700X3D + Gigabyte B650 Gaming X AX V2 ATX + 32GB DDR5-6000',
        shortName: '5. 7700X3D · 32GB AM5',
        price: 649.99,
        defaultChannel: 'microcenter',
        badge: 'No-Compromise AM5',
        specs: [
          'Bundle 5007704 · 25+ NEW IN STOCK at Austin ($649.99, save $369.98)',
          'CPU SKU 061077: Ryzen 7 7700X3D (8C/16T, 96MB 3D V-Cache)',
          'RAM SKU 440792 ($569.99 reg): G.Skill Flare X5 32GB (2×16GB) DDR5-6000',
          'Mobo SKU 660753: Gigabyte B650 Gaming X AX V2 Full ATX (3× M.2)',
        ],
        notes:
          'Cheapest in-stock 32GB AM5 bundle in Austin (both 9700X bundles remain sold out). One-and-done 8-core X3D + 32GB dual-channel DDR5 + Full ATX platform at ~$1,613 pre-tax with the $599.99 RX 9060 XT 16GB.',
        watchOut: 'Micro Center bundles must be returned as a complete 3-in-1 set. B850 upgrade (5007705) is +$30 ($679.99); 7800X3D B650E (5007508) is +$50 ($699.99).',
        linuxTag: 'AM5 8-Core X3D + 32GB',
        links: [
          {
            label: 'MC Bundle 5007704',
            url: 'https://www.microcenter.com/product/5007704/amd-ryzen-7-7700x3d,-gigabyte-b650-gaming-x-ax-v2-am5,-gskill-flare-x5-series-32gb-ddr5-6000-kit,-computer-build-bundle',
            channel: 'microcenter',
          },
        ],
      },
    ],
  },
  {
    id: 'gpu',
    title: 'Graphics Card (AMD Radeon RDNA 4)',
    subtitle: 'Live Micro Center Austin GPU stock (Nov 24) — RX 9060 XT 16GB slashed -$120 to $599.99!',
    icon: 'GPU',
    defaultOptionId: 'rx-9060-xt-challenger-16gb',
    options: [
      {
        id: 'rx-9060-xt-challenger-16gb',
        name: 'ASRock AMD Radeon RX 9060 XT Challenger OC Dual Fan 16GB (SKU 873026)',
        shortName: 'RX 9060 XT 16GB',
        price: 599.99,
        defaultChannel: 'microcenter',
        badge: '-$120 Reserved!',
        specs: [
          'SKU 873026 · 25+ in stock at Austin ($599.99, reg $799.99 — dropped $120 on Nov 24!)',
          '16GB GDDR6 VRAM · Cool & quiet Navi 44 die (~160W, single 8-pin PCIe)',
          'PowerColor Reaper Dual Fan 16GB (SKU 872010, 8 in stock) is also $599.99',
          '$120 CHEAPER than the new 12GB RX 9070 GRE ($719.99) with +4GB extra VRAM',
        ],
        notes:
          'Massive Tuesday Black Friday drop flipped the GPU math: at $599.99 with 16GB VRAM and native open-source Mesa/RADV Linux drivers, this easily handles 1080p/1440p and 4K+FSR @ 60Hz while keeping Full-ATX AM5 under $1,445 pre-tax.',
        watchOut:
          'Double-check the box says 16GB (SKU 873026 or PowerColor Reaper 872010) — Austin sells the 8GB Reaper (SKU 863720) at the exact same $599.99!',
        linuxTag: 'Open-source Mesa/RADV',
        links: [
          {
            label: 'MC SKU 873026',
            url: 'https://www.microcenter.com/search/search_results.aspx?Ntt=873026',
            channel: 'microcenter',
          },
          {
            label: 'Alt: Reaper 16GB (872010)',
            url: 'https://www.microcenter.com/search/search_results.aspx?Ntt=872010',
            channel: 'microcenter',
          },
        ],
      },
      {
        id: 'rx-9070-gre-hellhound',
        name: 'PowerColor AMD Radeon RX 9070 GRE Hellhound OC Triple-Fan 12GB (SKU 043349)',
        shortName: 'RX 9070 GRE Hellhound',
        price: 719.99,
        defaultChannel: 'microcenter',
        badge: '10 In Stock',
        specs: [
          'SKU 043349 · 10 new in stock at Austin ($719.99, reg $729.99; Open Box sold out)',
          'Bigger Navi 48 die · 48 Ray Accelerators · 12GB GDDR6 · PCIe 5.0',
          '327mm card (340mm w/ bracket) · 2× 8-pin PCIe · 700W min PSU',
          '~15–25% faster raster than RX 9060 XT 16GB, now costs +$120 more',
        ],
        notes:
          'Strong step-up if you want more raw raster performance at 1440p/4K and are okay trading 4GB VRAM and +$120 over the $599.99 RX 9060 XT 16GB.',
        watchOut:
          'Use two separate 8-pin PCIe cables from the PSU (not one daisy-chained pigtail). Clears all 3 cases easily (340mm vs 375mm+ clearance).',
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
        id: 'rx-9070-xt-openbox',
        name: 'Gigabyte RX 9070 XT Gaming OC Triple-Fan 16GB — Austin Open Box (SKU 799841)',
        shortName: 'RX 9070 XT 16GB OB',
        price: 764.96,
        defaultChannel: 'microcenter',
        badge: '1 Open Box!',
        specs: [
          'SKU 799841 · 1 Open Box listed at Austin from $764.96 ($135 off $899.99 new!)',
          'Full Navi 48 flagship 16GB GDDR6 (256-bit bus) · PCIe 5.0',
          'Only +$45 over the new 12GB RX 9070 GRE ($719.99)',
          'Includes Micro Center’s 30-day return coverage — inspect box at counter',
        ],
        notes:
          'Spotted in Austin’s live Nov 24 Open-Box stock! If you’re willing to stretch +$165 over the RX 9060 XT, this is flagship 16GB RDNA 4 performance for $135 off retail.',
        watchOut:
          'Only 1 Open-Box unit listed — verify PCIe 8-pin connector count on the box (3× 8-pin OC flagship models pair best with an 850W PSU like Montech CENTURY II 850W SKU 987511).',
        linuxTag: 'Open-source Mesa/RADV',
        links: [
          {
            label: 'MC SKU 799841',
            url: 'https://www.microcenter.com/search/search_results.aspx?Ntt=799841',
            channel: 'microcenter',
          },
        ],
      },
      {
        id: 'rx-9070-xt-16gb',
        name: 'Gigabyte / ASRock AMD Radeon RX 9070 XT 16GB New (SKU 799841)',
        shortName: 'RX 9070 XT 16GB New',
        price: 899.99,
        defaultChannel: 'microcenter',
        badge: '4K Max Stretch',
        specs: [
          'SKU 799841 · 25+ new in stock at Austin ($899.99, reg $1,199.99)',
          '16GB GDDR6 VRAM — full Navi 48 flagship RDNA 4 performance',
          '~304W TDP (750W min; 850W PSU recommended)',
          'Check Austin’s Open-Box unit ($764.96) first before paying $899.99 new',
        ],
        notes:
          'Flagship 16GB RDNA 4 tier if flexing past $1,500. Pairs best with the 850W Montech CENTURY II PSU.',
        watchOut:
          'Heavy OC flagship variants can require 3× 8-pin PCIe — verify connector count on the box!',
        linuxTag: 'Open-source Mesa/RADV',
        links: [
          {
            label: 'MC SKU 799841',
            url: 'https://www.microcenter.com/search/search_results.aspx?Ntt=799841',
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
    subtitle: 'Live Austin Deals (Nov 24) — Inland TN320 1TB TLC dropped $20 to $149.99 (beats BYO Sandisk!)',
    icon: 'SSD',
    defaultOptionId: 'inland-tn320-1tb',
    options: [
      {
        id: 'inland-tn320-1tb',
        name: 'Inland TN320 1TB PCIe Gen 3.0 x4 3D TLC NVMe (SKU 529776)',
        shortName: 'Inland TN320 1TB (MC)',
        price: 149.99,
        capacityTb: 1,
        defaultChannel: 'microcenter',
        badge: '-$20 Reserved!',
        specs: [
          'SKU 529776 · 25+ in stock at Austin ($149.99, reg $399.99 — dropped $20 on Nov 24!)',
          '1TB 3D TLC NAND (skip the $169.99 QLC QN450 right next to it!)',
          '$12 CHEAPER than the BYO Combo Sandisk ($161.99) with zero combo friction',
          'Saves $200 vs Austin’s cheapest 2TB drive ($349.99 Crucial P510)',
        ],
        notes:
          'Clear Nov 24 Austin winner: zero-fuss standalone 1TB TLC drive leaving ~835GB free after Linux + Marvel Rivals + Valheim + Risk of Rain 2. Drop a 2nd M.2 SSD into slots #2/#3 once NAND cools off.',
        linuxTag: 'NVMe + TLC native',
        links: [
          {
            label: 'MC SKU 529776',
            url: 'https://www.microcenter.com/search/search_results.aspx?Ntt=529776',
            channel: 'microcenter',
          },
        ],
      },
      {
        id: 'sandisk-gx7100-1tb',
        name: 'Sandisk Optimus GX 7100 1TB PCIe Gen 4.0 x4 BiCS TLC (BYO Combo · SKU 028134)',
        shortName: 'Sandisk 1TB Gen4 (BYO)',
        price: 161.99,
        capacityTb: 1,
        defaultChannel: 'microcenter',
        badge: 'Gen 4 BYO Alt',
        specs: [
          'SKU 028134 · $179.99 reg → $161.99 with -$18.00 BYO Combo Savings',
          '1TB PCIe Gen 4.0 ×4 BiCS 3D TLC NAND (WD Black SN7100 class)',
          '+$12 over the $149.99 Inland TN320 if you want faster sequential Gen 4 speeds',
          'Saves $188 vs Austin’s cheapest 2TB drive ($349.99)',
        ],
        notes:
          'Solid Gen 4 TLC step-up if you’re already using Micro Center’s Build Your Own Combo tool, though real-world Linux game load times vs. the $149.99 Inland TN320 are nearly identical.',
        watchOut: 'Must be added inside the BYO Combo Builder (or asked at the BYOPC counter) to trigger the -$18.00 combo discount.',
        linuxTag: 'NVMe Gen 4 + TLC',
        links: [
          {
            label: 'MC BYO Combo',
            url: 'https://www.microcenter.com/site/content/combo-builder.aspx',
            channel: 'microcenter',
          },
          {
            label: 'MC SKU 028134',
            url: 'https://www.microcenter.com/search/search_results.aspx?Ntt=028134',
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
          '2TB PCIe Gen 5 ×4 3D TLC (Samsung 990 EVO Plus 2TB SKU 762955 is $362.99)',
          '+$200 over the $149.99 1TB Inland — ~$175/TB (more per TB than 1TB right now!)',
        ],
        notes:
          'Included so you can see the real Nov 2026 Austin 2TB floor ($349.99). Because 2TB costs MORE per TB than 1TB today, sticking with 1TB is a no-brainer.',
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
        name: 'Online 1TB Gen 4 NVMe Deal Target (Amazon / Best Buy Flash Sale)',
        shortName: 'Online 1TB Deal Hunt',
        price: 129.99,
        capacityTb: 1,
        defaultChannel: 'online',
        badge: 'Save ~$20 Online',
        specs: [
          'Check Amazon / Best Buy / Newegg Black Friday flash sales',
          'Target $105–$130 for a 1TB TLC Gen 4 drive',
          'Edit the price box with whatever live online deal you find',
        ],
        notes:
          'With Austin dropping the Inland TN320 to $149.99, same-day in-store pickup only costs ~$20 more than hunting an online flash sale.',
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
    title: 'CPU Air Cooler (Thermalright AM4/AM5)',
    subtitle: 'Austin stocks Thermalright! Assassin X 120R Digital ($32.99) keeps everything in one pickup',
    icon: 'FAN',
    defaultOptionId: 'assassin-x-120r-mc',
    options: [
      {
        id: 'assassin-x-120r-mc',
        name: 'Thermalright Assassin X 120R Digital - Black (SKU 959528)',
        shortName: 'Assassin X 120R Digital',
        price: 32.99,
        defaultChannel: 'microcenter',
        badge: 'Reserved Pick',
        specs: [
          'SKU 959528 · 4 in stock at Austin ($32.99, reg $44.99)',
          'Clean black tower cooler (151mm height) with digital top readout — zero shipping wait',
          'Easily cools 65W AM5 chips (7500X3D & 7600X3D) quietly',
          'Leaves zero RAM clearance conflict with any DDR5 stick height',
        ],
        notes:
          'Best same-day Austin cooler value: lets you walk out with 100% of the PC in one trip for $32.99 while staying comfortably under $1,500 pre-tax.',
        watchOut:
          'Peel the clear protective plastic film off the cold plate before mounting! PWM cooling works natively on Linux; the top digital readout connects via internal USB 2.0 and needs an open-source Linux helper (e.g., thermalright-trcc-linux) to display live temps.',
        linuxTag: 'AM4/AM5 PWM native',
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
          'SKU 959296 · in stock at Austin ($59.99)',
          'Dual-tower 7-heatpipe flagship air cooler + standard 5V ARGB',
          'Same-day pickup (non-ARGB SKU 959304 is $54.99)',
        ],
        notes:
          'Costs $22 more than Amazon, but with the -$120 RX 9060 XT drop you can still upgrade to this in-store and stay under $1,470 pre-tax if you want dual-tower ARGB.',
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
          'SKU 959262 · in stock at Austin ($49.99)',
          '6-heatpipe dual-tower black air cooler (non-ARGB)',
          '$10 less than Phantom Spirit ARGB in-store',
        ],
        notes: 'Clean stealth dual-tower alternative in stock right on the Austin shelves.',
        linuxTag: 'AM4/AM5 PWM native',
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
    subtitle: 'Live Micro Center Austin stock (Nov 24) — Lancool 207 Black (3 left) reserved for pickup!',
    icon: 'CASE',
    defaultOptionId: 'lancool-207-black',
    options: [
      {
        id: 'lancool-207-black',
        name: 'Lian Li Lancool 207 Tempered Glass ATX Mid-Tower - Black (SKU 732115)',
        shortName: 'Lancool 207 Black',
        price: 99.99,
        defaultChannel: 'microcenter',
        badge: 'Reserved Pick',
        specs: [
          'SKU 732115 · 3 in stock at Austin ($99.99, In Store Only)',
          '4× included fans (2× 140mm front ARGB + 2× 120mm bottom GPU intake)',
          'Huge GPU clearance (375mm+ max — fits RX 9060 XT or triple-fan RX 9070 easily)',
          'Compact footprint + standard 5V ARGB fans (OpenRGB-friendly)',
        ],
        notes:
          'One of the best-cooling ATX mesh cases made — and physically on the floor in Austin. Pairs seamlessly with the compact 140mm MSI A750GL PSU and Gigabyte B650 ATX board.',
        watchOut:
          'Only 3 in stock at Austin — glad it’s reserved! Front-mounted PSU uses compact PSUs ≤160mm (all PSU picks below fit easily).',
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
        badge: 'In Stock (MC)',
        specs: [
          'SKU 969766 · in stock at Austin ("Add to Cart to see price")',
          'Black ATX mid-tower with tempered glass & RGB fans',
          'Strong backup if the Black Lancool 207 units sell out',
        ],
        notes:
          'Verify the live "Add to Cart" price in Austin. Edit the price box with the exact cart tag if swapping.',
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
          'Massive headroom for ~160W RX 9060 XT 16GB and future GPU upgrades',
        ],
        notes:
          'Absolute steal in Austin’s Holiday Deals — $10 cheaper in-store than typical online pricing, with 25+ units ready for pickup.',
        watchOut:
          'If stepping up to a dual-connector GPU (like RX 9070 GRE), use two separate 8-pin PCIe cables rather than a single daisy-chained pigtail.',
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
          'SKU 987511 · in stock at Austin ("Add to Cart to see price")',
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
    id: 'opt1-5600x3d-16gb',
    name: '1. 5600X3D · 16GB ($1,233)',
    tagline: 'AM4 Full ATX · ~$1,335 AFTER tax',
    selections: {
      bundle: 'mc-5600x3d-16gb',
      gpu: 'rx-9060-xt-challenger-16gb',
      ssd: 'inland-tn320-1tb',
      cooler: 'assassin-x-120r-mc',
      case: 'lancool-207-black',
      psu: 'msi-a750gl-mc',
    },
  },
  {
    id: 'opt2-5600x3d-32gb',
    name: '2. 5600X3D · 32GB ($1,368)',
    tagline: 'AM4 Full ATX · 32GB · Under $1,500 w/ tax!',
    selections: {
      bundle: 'mc-5600x3d-32gb',
      gpu: 'rx-9060-xt-challenger-16gb',
      ssd: 'inland-tn320-1tb',
      cooler: 'assassin-x-120r-mc',
      case: 'lancool-207-black',
      psu: 'msi-a750gl-mc',
    },
  },
  {
    id: 'opt3-7500x3d-am5',
    name: '3. 7500X3D · AM5 ($1,363)',
    tagline: 'AM5 mATX · Pre-installed · Under $1,500 w/ tax',
    selections: {
      bundle: 'mc-7500x3d-b850m',
      gpu: 'rx-9060-xt-challenger-16gb',
      ssd: 'inland-tn320-1tb',
      cooler: 'assassin-x-120r-mc',
      case: 'lancool-207-black',
      psu: 'msi-a750gl-mc',
    },
  },
  {
    id: 'opt4-7600x3d-atx',
    name: '4. 7600X3D · ATX ($1,443)',
    tagline: 'Reserved Pick · AM5 ATX + 16GB RX 9060 XT',
    selections: {
      bundle: 'mc-7600x3d-b650',
      gpu: 'rx-9060-xt-challenger-16gb',
      ssd: 'inland-tn320-1tb',
      cooler: 'assassin-x-120r-mc',
      case: 'lancool-207-black',
      psu: 'msi-a750gl-mc',
    },
  },
  {
    id: 'opt5-7700x3d-32gb',
    name: '5. 7700X3D · 32GB ($1,613)',
    tagline: 'AM5 8-Core X3D · 32GB DDR5 · Full ATX',
    selections: {
      bundle: 'mc-7700x3d-b650',
      gpu: 'rx-9060-xt-challenger-16gb',
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
      'UE5 is GPU-heavy at native 4K; the 16GB RX 9060 XT with 1080p/1440p or 4K FSR Quality/Balanced easily locks 60+ FPS with huge VRAM headroom (and 120+ FPS on a future 144Hz monitor).',
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
      'Runs effortlessly at 4K 60Hz on an RDNA 4 Radeon. Large player-built bases are CPU-sensitive, so the 7600X3D / 7500X3D / 7700X3D 3D V-Cache keeps frame times silky.',
    protonTip: 'Select the Vulkan renderer in Steam launch options for smoothest frame pacing on AMD Mesa/RADV.',
  },
  {
    title: 'Risk of Rain 2',
    engine: 'Unity (Roguelike Action)',
    linuxStatus: 'Proton Platinum',
    linuxBadgeTone: 'green',
    storageGb: 4,
    fourKNotes:
      'Butter-smooth 4K 60Hz out of the gate; late-game 90-minute god runs spawn hundreds of entities where AM5 3D V-Cache single-core speed shines.',
    protonTip: 'Click-and-play via Steam Proton; supports mods easily via r2modman on Linux.',
  },
];

export const CHECKLIST_PHASES: ChecklistPhase[] = [
  {
    id: 'pre-trip',
    title: '1. Pickup Day at Micro Center Austin',
    timing: 'Before & during store pickup',
    items: [
      {
        id: 'reserve-pickup',
        text: 'Confirm your 18-minute In-Store Pickup email is ready before heading to Austin (orders held 3 days)',
        tip: 'Payment is collected at pickup. Bring photo ID and the order confirmation.',
      },
      {
        id: 'verify-bundle',
        text: 'Verify all 6 reserved items (8 physical boxes) at the pickup counter: 7600X3D + Gigabyte B650 ATX + 16GB DDR5 bundle (5007445) + 16GB RX 9060 XT (SKU 873026)',
        tip: 'A Micro Center 3-in-1 bundle comes as 3 separate retail boxes. Double-check the GPU box explicitly says 16GB (not the 8GB model at the same $599.99 price) and that the SSD is the TLC Inland TN320 (SKU 529776).',
      },
      {
        id: 'check-open-box',
        text: 'Optional: walk past the Open-Box GPU glass case before checking out',
        tip: 'Micro Center Open-Box GPUs keep full 30-day return coverage (e.g., an Open-Box 16GB RX 9070 XT at $764.96 if you ever decide to stretch).',
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
        text: 'Place the Gigabyte B650 Gaming X AX V2 motherboard on top of its cardboard box (never on top of the anti-static bag)',
      },
      {
        id: 'install-cpu',
        text: 'Install the Ryzen 5 7600X3D into the AM5 socket: drop gently matching the gold triangle, zero force (skip if using pre-installed 7500X3D)',
        tip: 'Leave the black plastic AM5 socket cover snapped on — closing the retention lever pops it off automatically! (For AM4 5600X3D, keep the stock rear backplate on.)',
      },
      {
        id: 'install-nvme',
        text: 'Install the Inland TN320 1TB NVMe SSD in the top M.2_1 slot (closest to the CPU) and peel the heatsink thermal-pad film',
      },
      {
        id: 'install-ram',
        text: 'Install the single 16GB DDR5-6000 stick in slot A2 only (2nd slot from CPU; for 2-stick kits use A2 & B2; for 4 sticks fill all 4)',
        tip: 'Per the Gigabyte B650 Gaming X AX V2 manual, a single DDR5 module belongs in slot A2. Press firmly until latches click flat.',
      },
      {
        id: 'install-cooler',
        text: 'PEEL the clear plastic film off the Thermalright Assassin X 120R Digital cold plate, apply pea-sized paste, and mount cooler',
        tip: 'Plug the cooler PWM fan into CPU_FAN and its digital display USB cable into an internal 9-pin USB 2.0 header (cooling is 100% native on Linux; live top-readout temps use an open-source Linux TRCC helper post-install).',
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
        text: 'Attach only needed MSI A750GL cables first: 24-pin ATX, 8-pin CPU (EPS), and 8-pin PCIe GPU cable (two separate leads if using a 2-plug GPU)',
        tip: 'Lancool 207 mounts the compact 140mm PSU up front — attach cables before sliding it in, fan facing the filtered mesh.',
      },
      {
        id: 'mount-mobo',
        text: 'Verify all 9 ATX case standoffs align with the Gigabyte B650 ATX board (if using an mATX board, remove unused ATX standoffs first!) and fasten screws snug',
        tip: 'Important safety check: never leave an extra metal standoff behind a motherboard where there is no screw hole.',
      },
      {
        id: 'connect-headers',
        text: 'Plug in CPU 8-pin (top-left), 24-pin ATX, front-panel power switch, USB-C/USB 3.0, HD Audio, and Lancool 207 fan/5V ARGB headers',
      },
      {
        id: 'install-gpu',
        text: 'Remove rear PCIe slot covers, click the ASRock RX 9060 XT 16GB into the top PCIe x16 slot, screw bracket, and plug the 8-pin PCIe power cable',
        tip: 'Use the GPU anti-sag bracket if one comes in the case or GPU box (especially for triple-fan RX 9070 cards).',
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
        tip: 'Lancool 207 tip: flip the front-mounted PSU switch to “I” (ON) before closing the side/front panel, plug the rear AC cord in, then press the case power button.',
      },
      {
        id: 'memory-train',
        text: 'Be patient on the very first AM5 boot — DDR5 memory training can take 45–90 seconds before display lights up',
      },
      {
        id: 'bios-settings',
        text: 'In BIOS: verify 7600X3D / 16GB DDR5 / NVMe detected, check idle CPU temp (~35–48°C), enable AMD EXPO (6000 MT/s) & Resizable BAR / Above 4G Decoding',
      },
      {
        id: 'ethernet-check',
        text: 'Plug in your wired Ethernet cable — ready to pick & install your Linux distro when you’re set!',
        tip: 'Standard DHCP & local DNS filtering work automatically over Ethernet on Linux with zero client software.',
      },
    ],
  },
];
