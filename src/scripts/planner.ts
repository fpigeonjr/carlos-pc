import {
  BUILD_META,
  BUILD_PRESETS,
  CHECKLIST_PHASES,
  PART_SLOTS,
  type BuyChannel,
  type PartOption,
  type PartSlot,
  type SlotId,
} from '../data/buildData';

type TabId = 'configurator' | 'shopping' | 'storage' | 'checklist';

const TAB_ORDER: TabId[] = ['configurator', 'shopping', 'storage', 'checklist'];

interface PlannerState {
  selections: Record<SlotId, string>;
  priceOverrides: Record<string, number>;
  channelOverrides: Partial<Record<SlotId, BuyChannel>>;
  taxRate: number; // percentage, e.g. 8.25
  cartChecked: Partial<Record<SlotId, boolean>>;
  checklistChecked: Record<string, boolean>;
  activeTab: TabId;
}

const STORAGE_KEY = 'pc-build-planner-v4';

const defaultSelections = (): Record<SlotId, string> => {
  const result = {} as Record<SlotId, string>;
  for (const slot of PART_SLOTS) {
    result[slot.id] = slot.defaultOptionId;
  }
  return result;
};

const defaultTaxPercent = (): number => Number((BUILD_META.defaultTaxRate * 100).toFixed(2));

const defaultState = (): PlannerState => ({
  selections: defaultSelections(),
  priceOverrides: {},
  channelOverrides: {},
  taxRate: defaultTaxPercent(),
  cartChecked: {},
  checklistChecked: {},
  activeTab: 'configurator',
});

const fmtMoney = (n: number): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);

const escapeHtml = (str: string): string =>
  str
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const isTabId = (val: string | null | undefined): val is TabId =>
  val === 'configurator' || val === 'shopping' || val === 'storage' || val === 'checklist';

const isBuyChannel = (val: string | null | undefined): val is BuyChannel =>
  val === 'microcenter' || val === 'online';

function getSlot(slotId: SlotId): PartSlot {
  const found = PART_SLOTS.find((s) => s.id === slotId);
  if (!found) throw new Error(`Unknown slot: ${slotId}`);
  return found;
}

function getOption(slotId: SlotId, optionId: string): PartOption {
  const slot = getSlot(slotId);
  return slot.options.find((o) => o.id === optionId) ?? slot.options[0];
}

function isKnownOptionId(optionId: string): boolean {
  return PART_SLOTS.some((slot) => slot.options.some((opt) => opt.id === optionId));
}

function loadState(): PlannerState {
  const base = defaultState();

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<PlannerState>;
      if (parsed.selections) {
        for (const slot of PART_SLOTS) {
          const candidate = parsed.selections[slot.id];
          if (candidate && slot.options.some((o) => o.id === candidate)) {
            base.selections[slot.id] = candidate;
          }
        }
      }
      if (parsed.priceOverrides && typeof parsed.priceOverrides === 'object') {
        for (const [optId, price] of Object.entries(parsed.priceOverrides)) {
          if (isKnownOptionId(optId) && typeof price === 'number' && Number.isFinite(price) && price >= 0 && price <= 10000) {
            base.priceOverrides[optId] = price;
          }
        }
      }
      if (parsed.channelOverrides && typeof parsed.channelOverrides === 'object') {
        for (const slot of PART_SLOTS) {
          const ch = parsed.channelOverrides[slot.id];
          if (isBuyChannel(ch)) {
            base.channelOverrides[slot.id] = ch;
          }
        }
      }
      if (typeof parsed.taxRate === 'number' && Number.isFinite(parsed.taxRate)) {
        base.taxRate = Math.max(0, Math.min(20, parsed.taxRate));
      }
      if (parsed.cartChecked && typeof parsed.cartChecked === 'object') {
        base.cartChecked = parsed.cartChecked;
      }
      if (parsed.checklistChecked && typeof parsed.checklistChecked === 'object') {
        base.checklistChecked = parsed.checklistChecked;
      }
      if (isTabId(parsed.activeTab)) {
        base.activeTab = parsed.activeTab;
      }
    }
  } catch {
    // Ignore corrupt localStorage and fall back to defaults
  }

  // Hydrate shared build query params (?s=slot:opt&p=opt:123.45&c=slot:mc|online&t=8.25&tab=shopping)
  try {
    const params = new URLSearchParams(window.location.search);
    const sParam = params.get('s');
    if (sParam) {
      for (const pair of sParam.split(',')) {
        const [k, v] = pair.split(':');
        const slot = PART_SLOTS.find((item) => item.id === k);
        if (slot && v && slot.options.some((o) => o.id === v)) {
          base.selections[slot.id] = v;
        }
      }
    }
    const pParam = params.get('p');
    if (pParam) {
      for (const pair of pParam.split(',')) {
        const [optId, rawPrice] = pair.split(':');
        const num = Number(rawPrice);
        if (optId && isKnownOptionId(optId) && Number.isFinite(num) && num >= 0 && num <= 10000) {
          base.priceOverrides[optId] = num;
        }
      }
    }
    const cParam = params.get('c');
    if (cParam) {
      for (const pair of cParam.split(',')) {
        const [k, v] = pair.split(':');
        const slot = PART_SLOTS.find((item) => item.id === k);
        if (slot && isBuyChannel(v)) {
          base.channelOverrides[slot.id] = v;
        }
      }
    }
    const tParam = params.get('t');
    if (tParam !== null && tParam.trim() !== '') {
      const parsedTax = Number(tParam);
      if (Number.isFinite(parsedTax) && parsedTax >= 0 && parsedTax <= 20) {
        base.taxRate = parsedTax;
      }
    }
    const tabParam = params.get('tab');
    if (isTabId(tabParam)) {
      base.activeTab = tabParam;
    }
  } catch {
    // Ignore malformed query params
  }

  return base;
}

export function initPlanner(): void {
  const state = loadState();

  const saveState = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage quota errors
    }
  };

  const getEffectivePrice = (option: PartOption): number => {
    const override = state.priceOverrides[option.id];
    return typeof override === 'number' && Number.isFinite(override) ? override : option.price;
  };

  const getEffectiveChannel = (slotId: SlotId, option: PartOption): BuyChannel => {
    return state.channelOverrides[slotId] ?? option.defaultChannel;
  };

  const switchTab = (tabId: TabId, focusTab = false) => {
    state.activeTab = tabId;
    saveState();

    document.querySelectorAll<HTMLButtonElement>('[data-tab-btn]').forEach((btn) => {
      const isSelected = btn.dataset.tabBtn === tabId;
      btn.setAttribute('aria-selected', String(isSelected));
      btn.setAttribute('tabindex', isSelected ? '0' : '-1');
      if (isSelected && focusTab) {
        btn.focus();
      }
    });

    document.querySelectorAll<HTMLElement>('[data-tab-panel]').forEach((panel) => {
      const isMatch = panel.dataset.tabPanel === tabId;
      panel.classList.toggle('hidden', !isMatch);
    });
  };

  const renderSlotDetails = (slot: PartSlot) => {
    const selectedOption = getOption(slot.id, state.selections[slot.id]);
    const effectivePrice = getEffectivePrice(selectedOption);
    const isOverridden = typeof state.priceOverrides[selectedOption.id] === 'number';
    const effectiveChannel = getEffectiveChannel(slot.id, selectedOption);

    // Highlight option pills
    document
      .querySelectorAll<HTMLButtonElement>(`[data-option-btn][data-slot="${slot.id}"]`)
      .forEach((btn) => {
        const optId = btn.dataset.optionId ?? '';
        const opt = getOption(slot.id, optId);
        const optPrice = getEffectivePrice(opt);
        const isActive = optId === selectedOption.id;

        btn.setAttribute('aria-pressed', String(isActive));
        btn.className = isActive
          ? 'text-left rounded-xl border px-3 py-2.5 transition-all cursor-pointer bg-ctp-surface0/90 border-ctp-red/60 ring-1 ring-ctp-red/30 shadow-sm'
          : 'text-left rounded-xl border px-3 py-2.5 transition-all cursor-pointer bg-ctp-mantle/70 border-ctp-surface0 hover:border-ctp-surface2 hover:bg-ctp-surface0/40';

        const priceLabel = btn.querySelector<HTMLElement>('[data-pill-price]');
        if (priceLabel) {
          priceLabel.textContent = fmtMoney(optPrice);
        }
      });

    // Update price input without clobbering active typing
    const priceInput = document.querySelector<HTMLInputElement>(`[data-price-input="${slot.id}"]`);
    if (priceInput && document.activeElement !== priceInput) {
      priceInput.value = effectivePrice.toFixed(2);
    }

    const resetBtn = document.querySelector<HTMLButtonElement>(`[data-price-reset="${slot.id}"]`);
    if (resetBtn) {
      resetBtn.classList.toggle('hidden', !isOverridden);
    }

    const overrideTag = document.querySelector<HTMLElement>(`[data-price-tag="${slot.id}"]`);
    if (overrideTag) {
      if (isOverridden) {
        const diff = effectivePrice - selectedOption.price;
        const sign = diff >= 0 ? '+' : '';
        overrideTag.textContent = `Custom (${sign}${fmtMoney(diff)} vs baseline)`;
        overrideTag.className = 'text-xs font-medium text-ctp-peach';
      } else {
        overrideTag.textContent = 'Nov 2026 baseline';
        overrideTag.className = 'text-xs text-ctp-overlay2';
      }
    }

    // Update channel toggle buttons
    document
      .querySelectorAll<HTMLButtonElement>(`[data-channel-btn="${slot.id}"]`)
      .forEach((btn) => {
        const isSelected = btn.dataset.channel === effectiveChannel;
        btn.setAttribute('aria-pressed', String(isSelected));
        if (btn.dataset.channel === 'microcenter') {
          btn.className = isSelected
            ? 'rounded-lg px-2.5 py-1 text-xs font-semibold border transition cursor-pointer bg-ctp-blue/20 border-ctp-blue/60 text-ctp-blue'
            : 'rounded-lg px-2.5 py-1 text-xs font-medium border transition cursor-pointer bg-ctp-mantle/60 border-ctp-surface1 text-ctp-subtext0 hover:text-ctp-text';
        } else {
          btn.className = isSelected
            ? 'rounded-lg px-2.5 py-1 text-xs font-semibold border transition cursor-pointer bg-ctp-mauve/20 border-ctp-mauve/60 text-ctp-mauve'
            : 'rounded-lg px-2.5 py-1 text-xs font-medium border transition cursor-pointer bg-ctp-mantle/60 border-ctp-surface1 text-ctp-subtext0 hover:text-ctp-text';
        }
      });

    // Update details body
    const detailsEl = document.querySelector<HTMLElement>(`[data-slot-details="${slot.id}"]`);
    if (detailsEl) {
      const specsHtml = selectedOption.specs
        .map(
          (spec) =>
            `<li class="flex items-start gap-2 text-xs text-ctp-subtext1"><span class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-ctp-teal"></span><span>${escapeHtml(spec)}</span></li>`
        )
        .join('');

      const linksHtml = selectedOption.links
        .map((link) => {
          const pillTone =
            link.channel === 'microcenter'
              ? 'border-ctp-blue/40 bg-ctp-blue/10 text-ctp-blue hover:bg-ctp-blue/20'
              : link.channel === 'online'
                ? 'border-ctp-mauve/40 bg-ctp-mauve/10 text-ctp-mauve hover:bg-ctp-mauve/20'
                : 'border-ctp-surface2 bg-ctp-surface0/60 text-ctp-subtext1 hover:bg-ctp-surface1';
          return `<a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition ${pillTone}"><span>${escapeHtml(link.label)}</span><span aria-hidden="true">↗</span></a>`;
        })
        .join('');

      const watchOutHtml = selectedOption.watchOut
        ? `<div class="mt-3 rounded-lg border border-ctp-yellow/30 bg-ctp-yellow/10 px-3 py-2 text-xs text-ctp-yellow/95"><strong class="font-semibold">Watch out:</strong> ${escapeHtml(selectedOption.watchOut)}</div>`
        : '';

      detailsEl.innerHTML = `
        <div class="flex flex-wrap items-center justify-between gap-2">
          <h4 class="text-sm font-semibold text-ctp-text">${escapeHtml(selectedOption.name)}</h4>
          <span class="rounded-full border border-ctp-green/35 bg-ctp-green/10 px-2.5 py-0.5 text-[11px] font-medium text-ctp-green">${escapeHtml(selectedOption.linuxTag)}</span>
        </div>
        <p class="mt-2 text-xs leading-relaxed text-ctp-subtext0">${escapeHtml(selectedOption.notes)}</p>
        <ul class="mt-2.5 grid gap-1.5 sm:grid-cols-2">${specsHtml}</ul>
        ${watchOutHtml}
        <div class="mt-3 flex flex-wrap items-center gap-2">
          <span class="text-[11px] uppercase tracking-wider text-ctp-overlay2">Check live price:</span>
          ${linksHtml}
        </div>
      `;
    }
  };

  const renderHudAndTotals = () => {
    let subtotal = 0;
    let mcTotal = 0;
    let mcCount = 0;
    let onlineTotal = 0;
    let onlineCount = 0;
    let activeOverrides = 0;

    for (const slot of PART_SLOTS) {
      const opt = getOption(slot.id, state.selections[slot.id]);
      const price = getEffectivePrice(opt);
      const channel = getEffectiveChannel(slot.id, opt);

      subtotal += price;
      if (channel === 'microcenter') {
        mcTotal += price;
        mcCount += 1;
      } else {
        onlineTotal += price;
        onlineCount += 1;
      }
      if (typeof state.priceOverrides[opt.id] === 'number') {
        activeOverrides += 1;
      }
    }

    const taxRateDecimal = state.taxRate / 100;
    const taxAmount = subtotal * taxRateDecimal;
    const outTheDoor = subtotal + taxAmount;
    const delta = subtotal - BUILD_META.budgetTarget;
    const pct = Math.min(100, Math.max(0, (subtotal / BUILD_META.budgetTarget) * 100));

    const elSubtotal = document.getElementById('hud-subtotal');
    const elDelta = document.getElementById('hud-budget-badge');
    const elBar = document.getElementById('hud-progress-bar');
    const elTax = document.getElementById('hud-tax-amount');
    const elOtd = document.getElementById('hud-otd-total');
    const elMc = document.getElementById('hud-mc-total');
    const elOnline = document.getElementById('hud-online-total');
    const elOverrides = document.getElementById('hud-override-count');

    if (elSubtotal) elSubtotal.textContent = fmtMoney(subtotal);
    if (elTax) elTax.textContent = fmtMoney(taxAmount);
    if (elOtd) elOtd.textContent = fmtMoney(outTheDoor);
    if (elMc) elMc.textContent = `${fmtMoney(mcTotal)} (${mcCount})`;
    if (elOnline) elOnline.textContent = `${fmtMoney(onlineTotal)} (${onlineCount})`;

    if (elDelta) {
      if (delta <= 0) {
        elDelta.textContent = `${fmtMoney(Math.abs(delta))} under $1,500 target`;
        elDelta.className =
          'inline-flex items-center rounded-full border border-ctp-green/40 bg-ctp-green/15 px-2.5 py-0.5 text-xs font-semibold text-ctp-green';
      } else if (delta <= 125) {
        elDelta.textContent = `${fmtMoney(delta)} over $1,500 target`;
        elDelta.className =
          'inline-flex items-center rounded-full border border-ctp-peach/45 bg-ctp-peach/15 px-2.5 py-0.5 text-xs font-semibold text-ctp-peach';
      } else {
        elDelta.textContent = `${fmtMoney(delta)} over $1,500 target`;
        elDelta.className =
          'inline-flex items-center rounded-full border border-ctp-red/45 bg-ctp-red/15 px-2.5 py-0.5 text-xs font-semibold text-ctp-red';
      }
    }

    if (elBar) {
      elBar.style.width = `${pct}%`;
      elBar.className =
        delta <= 0
          ? 'h-full rounded-full bg-gradient-to-r from-ctp-teal to-ctp-green transition-all duration-300'
          : delta <= 125
            ? 'h-full rounded-full bg-gradient-to-r from-ctp-yellow to-ctp-peach transition-all duration-300'
            : 'h-full rounded-full bg-gradient-to-r from-ctp-peach to-ctp-red transition-all duration-300';
    }

    if (elOverrides) {
      elOverrides.classList.toggle('hidden', activeOverrides === 0);
      elOverrides.textContent = `${activeOverrides} custom shelf price${activeOverrides === 1 ? '' : 's'}`;
    }

    // Highlight matching preset if exact match
    document.querySelectorAll<HTMLButtonElement>('[data-preset-btn]').forEach((btn) => {
      const preset = BUILD_PRESETS.find((p) => p.id === btn.dataset.presetBtn);
      if (!preset) return;
      const isMatch = PART_SLOTS.every((s) => state.selections[s.id] === preset.selections[s.id]);
      btn.setAttribute('aria-pressed', String(isMatch));
      btn.className = isMatch
        ? 'rounded-xl border border-ctp-mauve/60 bg-ctp-mauve/15 px-3 py-1.5 text-left transition cursor-pointer'
        : 'rounded-xl border border-ctp-surface1 bg-ctp-mantle/80 px-3 py-1.5 text-left hover:border-ctp-surface2 hover:bg-ctp-surface0/60 transition cursor-pointer';
    });
  };

  const renderShoppingPlan = () => {
    const mcListEl = document.getElementById('shopping-mc-list');
    const onlineListEl = document.getElementById('shopping-online-list');
    const mcSubEl = document.getElementById('shopping-mc-subtotal');
    const onlineSubEl = document.getElementById('shopping-online-subtotal');
    const cartSummaryEl = document.getElementById('shopping-cart-summary');

    if (!mcListEl || !onlineListEl) return;

    const mcItems: Array<{ slot: PartSlot; option: PartOption; price: number; custom: boolean }> = [];
    const onlineItems: Array<{ slot: PartSlot; option: PartOption; price: number; custom: boolean }> = [];

    let checkedCount = 0;

    for (const slot of PART_SLOTS) {
      const option = getOption(slot.id, state.selections[slot.id]);
      const price = getEffectivePrice(option);
      const custom = typeof state.priceOverrides[option.id] === 'number';
      const channel = getEffectiveChannel(slot.id, option);
      if (state.cartChecked[slot.id]) checkedCount += 1;

      if (channel === 'microcenter') {
        mcItems.push({ slot, option, price, custom });
      } else {
        onlineItems.push({ slot, option, price, custom });
      }
    }

    const renderRow = (item: { slot: PartSlot; option: PartOption; price: number; custom: boolean }) => {
      const checked = Boolean(state.cartChecked[item.slot.id]);
      const firstLink = item.option.links[0];
      const inputId = `cart-check-${item.slot.id}`;
      return `
        <div class="flex items-start justify-between gap-3 rounded-xl border p-3.5 transition ${
          checked
            ? 'border-ctp-green/40 bg-ctp-green/5 opacity-80'
            : 'border-ctp-surface0 bg-ctp-mantle/70 hover:border-ctp-surface2'
        }">
          <div class="flex items-start gap-3">
            <input
              id="${inputId}"
              type="checkbox"
              data-cart-check="${item.slot.id}"
              ${checked ? 'checked' : ''}
              class="mt-1 h-4 w-4 rounded border-ctp-surface2 bg-ctp-base accent-ctp-green cursor-pointer"
            />
            <div>
              <label for="${inputId}" class="block cursor-pointer">
                <span class="block text-[11px] font-semibold uppercase tracking-wider text-ctp-overlay2">${escapeHtml(item.slot.title)}</span>
                <span class="block text-sm font-medium ${checked ? 'line-through text-ctp-subtext0' : 'text-ctp-text'}">${escapeHtml(item.option.name)}</span>
              </label>
              <div class="mt-1 flex flex-wrap items-center gap-2 text-xs">
                ${
                  item.custom
                    ? '<span class="rounded bg-ctp-peach/15 px-1.5 py-0.5 text-[11px] font-medium text-ctp-peach">Custom shelf price</span>'
                    : '<span class="text-ctp-overlay1">Baseline estimate</span>'
                }
                ${
                  firstLink
                    ? `<a href="${escapeHtml(firstLink.url)}" target="_blank" rel="noopener noreferrer" class="text-ctp-blue hover:underline">${escapeHtml(firstLink.label)} ↗</a>`
                    : ''
                }
              </div>
            </div>
          </div>
          <div class="shrink-0 text-right font-mono text-sm font-semibold text-ctp-text">
            ${fmtMoney(item.price)}
          </div>
        </div>
      `;
    };

    mcListEl.innerHTML =
      mcItems.length > 0
        ? mcItems.map(renderRow).join('')
        : '<div class="rounded-xl border border-dashed border-ctp-surface1 p-4 text-xs text-ctp-subtext0">No items assigned to Micro Center Austin. Toggle any part in the Configurator tab to move it here.</div>';

    onlineListEl.innerHTML =
      onlineItems.length > 0
        ? onlineItems.map(renderRow).join('')
        : '<div class="rounded-xl border border-dashed border-ctp-surface1 p-4 text-xs text-ctp-subtext0">Everything is assigned to Micro Center Austin for a single-trip haul!</div>';

    const mcSum = mcItems.reduce((acc, i) => acc + i.price, 0);
    const onlineSum = onlineItems.reduce((acc, i) => acc + i.price, 0);

    if (mcSubEl) mcSubEl.textContent = `${fmtMoney(mcSum)} pre-tax · ${fmtMoney(mcSum * (1 + state.taxRate / 100))} w/ tax`;
    if (onlineSubEl)
      onlineSubEl.textContent = `${fmtMoney(onlineSum)} pre-tax · ${fmtMoney(onlineSum * (1 + state.taxRate / 100))} w/ tax`;
    if (cartSummaryEl) cartSummaryEl.textContent = `${checkedCount} of ${PART_SLOTS.length} parts checked off`;

    document.querySelectorAll<HTMLInputElement>('[data-cart-check]').forEach((input) => {
      input.addEventListener('change', () => {
        const slotId = input.dataset.cartCheck as SlotId;
        state.cartChecked[slotId] = input.checked;
        saveState();
        renderShoppingPlan();
      });
    });
  };

  const renderStorageComparison = () => {
    const selectedSsd = getOption('ssd', state.selections.ssd);

    // Compare against the user's active 1TB / 2TB choices when selected
    const oneTbRef = selectedSsd.capacityTb === 1 ? selectedSsd : getOption('ssd', 'sandisk-gx7100-1tb');
    const twoTbRef = selectedSsd.capacityTb === 2 ? selectedSsd : getOption('ssd', 'crucial-p510-2tb');

    const sandisk1 = getOption('ssd', 'sandisk-gx7100-1tb');
    const crucial2 = getOption('ssd', 'crucial-p510-2tb');
    const online1 = getOption('ssd', 'online-1tb-hunt');

    const oneTbRefPrice = getEffectivePrice(oneTbRef);
    const twoTbRefPrice = getEffectivePrice(twoTbRef);
    const delta = twoTbRefPrice - oneTbRefPrice;
    const perTb1 = oneTbRefPrice;
    const perTb2 = twoTbRefPrice / 2;
    const pctSavedPerTb = perTb1 > 0 ? Math.round(((perTb1 - perTb2) / perTb1) * 100) : 0;

    const el1Price = document.getElementById('ssd-1tb-price');
    const el1PerTb = document.getElementById('ssd-1tb-pertb');
    const el2Price = document.getElementById('ssd-2tb-price');
    const el2PerTb = document.getElementById('ssd-2tb-pertb');
    const elOnline = document.getElementById('ssd-online-price');
    const elDelta = document.getElementById('ssd-delta-amount');
    const elDeltaLabel = document.getElementById('ssd-delta-label');
    const elVerdict = document.getElementById('ssd-verdict-box');

    const p1 = getEffectivePrice(sandisk1);
    const p2 = getEffectivePrice(crucial2);
    const pOnline = getEffectivePrice(online1);
    const snPct = p1 > 0 ? Math.round(((p1 - p2 / 2) / p1) * 100) : 0;

    if (el1Price) el1Price.textContent = fmtMoney(p1);
    if (el1PerTb) el1PerTb.textContent = `${fmtMoney(p1)} / TB`;
    if (el2Price) el2Price.textContent = fmtMoney(p2);
    if (el2PerTb) el2PerTb.textContent = `${fmtMoney(p2 / 2)} / TB (${snPct > 0 ? `${snPct}% cheaper/TB` : 'no /TB savings'})`;
    if (elOnline) elOnline.textContent = fmtMoney(pOnline);
    if (elDeltaLabel) elDeltaLabel.textContent = `${oneTbRef.shortName} → ${twoTbRef.shortName}:`;
    if (elDelta) elDelta.textContent = `${delta >= 0 ? '+' : ''}${fmtMoney(delta)}`;

    if (elVerdict) {
      if (delta <= 65) {
        elVerdict.className = 'mt-4 rounded-xl border border-ctp-green/40 bg-ctp-green/10 p-4 text-sm text-ctp-green';
        elVerdict.innerHTML = `<strong class="font-semibold">Verdict: Minimal Cost Jump (${fmtMoney(delta)}) — 2TB Is Worth Grabbing!</strong> Upgrading from ${escapeHtml(oneTbRef.shortName)} to ${escapeHtml(twoTbRef.shortName)} for ≤$65 drops your $/TB by ${pctSavedPerTb}% and adds years of Steam + optional Windows dual-boot headroom.`;
      } else if (delta <= 95) {
        elVerdict.className = 'mt-4 rounded-xl border border-ctp-yellow/40 bg-ctp-yellow/10 p-4 text-sm text-ctp-yellow';
        elVerdict.innerHTML = `<strong class="font-semibold">Verdict: Borderline Gap (${fmtMoney(delta)}) — Stick with 1TB Unless Under Budget.</strong> Comparing ${escapeHtml(oneTbRef.shortName)} vs. ${escapeHtml(twoTbRef.shortName)}: 1TB easily holds Linux + Marvel Rivals + Valheim + Risk of Rain 2 (~96GB total) with ~835GB free, leaving extra M.2 slots open for later.`;
      } else {
        elVerdict.className = 'mt-4 rounded-xl border border-ctp-blue/40 bg-ctp-blue/10 p-4 text-sm text-ctp-blue';
        elVerdict.innerHTML = `<strong class="font-semibold">Verdict: 100% Stick with 1TB Right Now!</strong> At a ${fmtMoney(delta)} jump (${escapeHtml(oneTbRef.shortName)} → ${escapeHtml(twoTbRef.shortName)}), 2TB costs more per TB than 1TB. Save the money today and drop a second M.2 drive into slot #2 once NAND prices cool off.`;
      }
    }

    document.querySelectorAll<HTMLButtonElement>('[data-quick-ssd]').forEach((btn) => {
      const isSelected = state.selections.ssd === btn.dataset.quickSsd;
      btn.textContent = isSelected ? 'Selected in Build ✓' : `Select ${btn.dataset.quickSsdLabel ?? ''}`;
      btn.className = isSelected
        ? 'mt-3 w-full rounded-lg border border-ctp-green/50 bg-ctp-green/15 px-3 py-1.5 text-xs font-semibold text-ctp-green cursor-pointer'
        : 'mt-3 w-full rounded-lg border border-ctp-surface2 bg-ctp-surface0 px-3 py-1.5 text-xs font-semibold text-ctp-text hover:border-ctp-blue/60 hover:text-ctp-blue transition cursor-pointer';
    });
  };

  const renderChecklistProgress = () => {
    const allIds = CHECKLIST_PHASES.flatMap((phase) => phase.items.map((item) => item.id));
    const completed = allIds.filter((id) => state.checklistChecked[id]).length;
    const pct = allIds.length > 0 ? Math.round((completed / allIds.length) * 100) : 0;

    const textEl = document.getElementById('checklist-progress-text');
    const barEl = document.getElementById('checklist-progress-bar');

    if (textEl) textEl.textContent = `${completed} / ${allIds.length} steps complete (${pct}%)`;
    if (barEl) barEl.style.width = `${pct}%`;

    document.querySelectorAll<HTMLInputElement>('[data-checklist-item]').forEach((cb) => {
      const id = cb.dataset.checklistItem ?? '';
      cb.checked = Boolean(state.checklistChecked[id]);
      const wrapper = cb.closest<HTMLElement>('[data-checklist-row]');
      if (wrapper) {
        wrapper.classList.toggle('opacity-65', cb.checked);
      }
    });
  };

  const renderAll = () => {
    for (const slot of PART_SLOTS) {
      renderSlotDetails(slot);
    }
    renderHudAndTotals();
    renderShoppingPlan();
    renderStorageComparison();
    renderChecklistProgress();
    switchTab(state.activeTab);
  };

  // --- Wire Static Event Listeners ---

  // Tab navigation (click + keyboard ArrowLeft/ArrowRight/Home/End)
  document.querySelectorAll<HTMLButtonElement>('[data-tab-btn]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tabBtn as TabId;
      switchTab(tab);
    });

    btn.addEventListener('keydown', (e) => {
      const currentIdx = TAB_ORDER.indexOf(btn.dataset.tabBtn as TabId);
      if (currentIdx === -1) return;

      let nextIdx: number | null = null;
      if (e.key === 'ArrowRight') nextIdx = (currentIdx + 1) % TAB_ORDER.length;
      else if (e.key === 'ArrowLeft') nextIdx = (currentIdx - 1 + TAB_ORDER.length) % TAB_ORDER.length;
      else if (e.key === 'Home') nextIdx = 0;
      else if (e.key === 'End') nextIdx = TAB_ORDER.length - 1;

      if (nextIdx !== null) {
        e.preventDefault();
        switchTab(TAB_ORDER[nextIdx], true);
      }
    });
  });

  // Preset quick-buttons
  document.querySelectorAll<HTMLButtonElement>('[data-preset-btn]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const preset = BUILD_PRESETS.find((p) => p.id === btn.dataset.presetBtn);
      if (!preset) return;
      state.selections = { ...preset.selections };
      saveState();
      renderAll();
    });
  });

  // Option selection pills
  document.querySelectorAll<HTMLButtonElement>('[data-option-btn]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const slotId = btn.dataset.slot as SlotId;
      const optionId = btn.dataset.optionId ?? '';
      if (!slotId || !optionId) return;
      state.selections[slotId] = optionId;
      saveState();
      renderSlotDetails(getSlot(slotId));
      renderHudAndTotals();
      renderShoppingPlan();
      renderStorageComparison();
    });
  });

  // Live inline price inputs (ignore empty while typing, restore/format on blur)
  document.querySelectorAll<HTMLInputElement>('[data-price-input]').forEach((input) => {
    input.addEventListener('input', () => {
      const slotId = input.dataset.priceInput as SlotId;
      const raw = input.value.trim();
      if (raw === '') return;

      const val = Number(raw);
      if (!Number.isFinite(val) || val < 0 || val > 10000) return;

      const selectedOption = getOption(slotId, state.selections[slotId]);
      if (Math.abs(val - selectedOption.price) < 0.005) {
        delete state.priceOverrides[selectedOption.id];
      } else {
        state.priceOverrides[selectedOption.id] = val;
      }
      saveState();
      renderSlotDetails(getSlot(slotId));
      renderHudAndTotals();
      renderShoppingPlan();
      renderStorageComparison();
    });

    input.addEventListener('blur', () => {
      const slotId = input.dataset.priceInput as SlotId;
      const selectedOption = getOption(slotId, state.selections[slotId]);
      input.value = getEffectivePrice(selectedOption).toFixed(2);
    });
  });

  // Reset single part price
  document.querySelectorAll<HTMLButtonElement>('[data-price-reset]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const slotId = btn.dataset.priceReset as SlotId;
      const selectedOption = getOption(slotId, state.selections[slotId]);
      delete state.priceOverrides[selectedOption.id];
      saveState();
      renderSlotDetails(getSlot(slotId));
      renderHudAndTotals();
      renderShoppingPlan();
      renderStorageComparison();
    });
  });

  // Channel toggles (Micro Center vs Online)
  document.querySelectorAll<HTMLButtonElement>('[data-channel-btn]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const slotId = btn.dataset.channelBtn as SlotId;
      const channel = btn.dataset.channel as BuyChannel;
      if (!slotId || !channel) return;
      state.channelOverrides[slotId] = channel;
      saveState();
      renderSlotDetails(getSlot(slotId));
      renderHudAndTotals();
      renderShoppingPlan();
    });
  });

  // Tax rate input (ignore empty while typing, restore on blur)
  const taxInput = document.getElementById('hud-tax-rate') as HTMLInputElement | null;
  if (taxInput) {
    taxInput.value = state.taxRate.toString();
    taxInput.addEventListener('input', () => {
      const raw = taxInput.value.trim();
      if (raw === '') return;
      const parsed = Number(raw);
      if (Number.isFinite(parsed) && parsed >= 0 && parsed <= 20) {
        state.taxRate = parsed;
        saveState();
        renderHudAndTotals();
        renderShoppingPlan();
      }
    });
    taxInput.addEventListener('blur', () => {
      taxInput.value = state.taxRate.toString();
    });
  }

  // Quick SSD buttons on Storage tab
  document.querySelectorAll<HTMLButtonElement>('[data-quick-ssd]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const optId = btn.dataset.quickSsd;
      if (!optId) return;
      state.selections.ssd = optId;
      saveState();
      renderSlotDetails(getSlot('ssd'));
      renderHudAndTotals();
      renderShoppingPlan();
      renderStorageComparison();
    });
  });

  // Build-day checklist items
  document.querySelectorAll<HTMLInputElement>('[data-checklist-item]').forEach((cb) => {
    cb.addEventListener('change', () => {
      const id = cb.dataset.checklistItem ?? '';
      state.checklistChecked[id] = cb.checked;
      saveState();
      renderChecklistProgress();
    });
  });

  // Reset checklist button
  document.getElementById('reset-checklist-btn')?.addEventListener('click', () => {
    state.checklistChecked = {};
    saveState();
    renderChecklistProgress();
  });

  // Share build link button (serializes selections, price overrides, channel overrides, tax rate & tab)
  const shareBtn = document.getElementById('share-build-btn');
  shareBtn?.addEventListener('click', async () => {
    const sPairs = PART_SLOTS.map((slot) => `${slot.id}:${state.selections[slot.id]}`).join(',');
    const pPairs = Object.entries(state.priceOverrides)
      .map(([optId, price]) => `${optId}:${price.toFixed(2)}`)
      .join(',');
    const cPairs = PART_SLOTS.filter((slot) => {
      const opt = getOption(slot.id, state.selections[slot.id]);
      return getEffectiveChannel(slot.id, opt) !== opt.defaultChannel;
    })
      .map((slot) => `${slot.id}:${getEffectiveChannel(slot.id, getOption(slot.id, state.selections[slot.id]))}`)
      .join(',');

    const url = new URL(window.location.href);
    url.searchParams.set('s', sPairs);

    if (pPairs) url.searchParams.set('p', pPairs);
    else url.searchParams.delete('p');

    if (cPairs) url.searchParams.set('c', cPairs);
    else url.searchParams.delete('c');

    if (Math.abs(state.taxRate - defaultTaxPercent()) >= 0.005) {
      url.searchParams.set('t', state.taxRate.toString());
    } else {
      url.searchParams.delete('t');
    }

    url.searchParams.set('tab', state.activeTab);

    try {
      await navigator.clipboard.writeText(url.toString());
      const original = shareBtn.textContent;
      shareBtn.textContent = 'Copied Link ✓';
      setTimeout(() => {
        shareBtn.textContent = original;
      }, 2000);
    } catch {
      window.history.replaceState({}, '', url.toString());
      shareBtn.textContent = 'URL Updated ✓';
      setTimeout(() => {
        shareBtn.textContent = 'Share Build';
      }, 2000);
    }
  });

  // Reset entire build to baseline AND strip stale query params from URL
  document.getElementById('reset-all-btn')?.addEventListener('click', () => {
    state.selections = defaultSelections();
    state.priceOverrides = {};
    state.channelOverrides = {};
    state.cartChecked = {};
    state.taxRate = defaultTaxPercent();
    if (taxInput) taxInput.value = state.taxRate.toString();
    window.history.replaceState({}, '', window.location.pathname);
    saveState();
    renderAll();
  });

  renderAll();
}
