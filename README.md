# Market Bridge — Website documentation (HTML5 assignment)

This document describes the **HTML5 structure**, **file layout**, and **how the code is organised** for the Market Bridge prototype: a static multi-page site for a marketplace concept based in **Gaborone, Botswana** (Fairgrounds area, near Botswana Accountancy College).  

**Using this in Microsoft Word:** open `README.md` in Word (*File → Open*), or copy the contents into a new document and save as `.docx`.

---

## 1. Project overview

| Item | Description |
|------|-------------|
| **Purpose** | Prototype “buy / sell” marketplace with Home, About, Market hub, Buy, Sell, Feedback, and Contact. |
| **Currency** | All demo and catalog prices use **BWP** (Botswana Pula). |
| **Contact / social** | **Prototype only:** email, phone, WhatsApp, and social buttons use `href="#"` so nothing is expected to work as a live service. |
| **Dynamic behaviour** | New products added on **Sell** are stored in the browser **`localStorage`** and shown on **Buy** (no server). |

---

## 2. Folder and file structure

```
The Market Bridge/
├── index.html          # Home
├── about.html          # About the business
├── market.html         # Hub + slideshow + links to Buy / Sell
├── buy.html            # Product grid (defaults + user listings)
├── sell.html           # Form to add a product
├── feedback.html       # Feedback form (demo submit)
├── contact.html        # Contact + hours + social (prototype links)
├── style.css           # All shared styles
├── README.md           # This documentation
└── js/
    └── market-storage.js   # Listings + BWP formatting + localStorage
```

Every HTML page links to **`style.css`** in the `<head>`. Pages that use the catalog load **`js/market-storage.js`** before their inline scripts.

---

## 3. Global HTML5 document pattern

Each page follows the same **HTML5** skeleton so browsers and assistive technologies interpret the site consistently.

### 3.1 `<!DOCTYPE html>`

The first line is `<!DOCTYPE html>`. This triggers **standards mode** in browsers (HTML5 doctype is short and unambiguous).

### 3.2 Root element and language

```html
<html lang="en">
```

or, on the contact page (Botswana context):

```html
<html lang="en-BW">
```

**Why:** `lang` helps screen readers with pronunciation and can assist search engines. `en-BW` marks English as used in Botswana on that page.

### 3.3 `<head>` — metadata and resources

Typical contents:

| Element | Role |
|---------|------|
| `<meta charset="UTF-8">` | Character encoding (Unicode); avoids garbled text. |
| `<meta name="viewport" content="width=device-width, initial-scale=1.0">` | **Responsive layout** on phones: width matches device, no tiny “desktop shrink”. |
| `<title>…</title>` | Shown in the browser tab; unique per page. |
| `<link rel="stylesheet" href="style.css">` | Single shared stylesheet for the whole site. |
| Google Fonts `preconnect` + `link` | Faster font loading on styled pages (Home, About, Market, Buy, Sell, Feedback, Contact). |

### 3.4 `<body>` and landmark structure

Most pages use this **semantic** flow:

1. **`<header>`** — site title / branding and **`<nav>`** with links to main sections.  
   - `<nav>` groups navigation; search engines and assistive tech recognise it as the primary menu.  
2. **Main content** — `<section>`, `<div class="container">`, or page-specific layout (hero, grids, forms).  
3. **`<footer>`** — copyright / location line.

**HTML5 sections used:** `header`, `nav`, `section`, `footer`, `article` (e.g. product cards built in JS), `aside` (e.g. feedback illustration column).

---

## 4. Page-by-page structure and behaviour

### 4.1 `index.html` (Home)

- **`body.home`:** Extra class triggers **home-only** rules in `style.css` (gradient background, hero slideshow-style area, featured products).  
- **Hero:** `section.hero` with background layers (`hero-bg`, `hero-overlay`) and `hero-inner` for text and CTA.  
- **Highlights:** `section.home-highlights` with `article.highlight-card` — each card has an image and text.  
- **Featured products:** `div.container.featured-wrap` → `div.grid` → `div.card` blocks with `img` and `div.card-content`.  
- **Prices:** Shown as plain text, e.g. `From BWP 5,600` (static copy; not driven by JavaScript).

### 4.2 `about.html`

- **`body.about-page`** for typography and background.  
- **Banner:** `section.about-banner` with background image + overlay + text (mission-style intro).  
- **Cards:** `div.about-cards-grid` containing `article.info-card` elements; some cards include `info-card-accent` colour bars; one uses `info-card-photo`.  
- **CTA panel:** `section.about-cta-panel` with links to Market and Feedback.

### 4.3 `market.html`

- **`body.market-page`**.  
- **Slideshow:** `section.market-hero` → `div#marketSlideshow` with:
  - `div.slideshow-slides` — multiple `div.slide` panels; **only one** has `is-active` at a time.  
  - `div.slideshow-overlay` — dark gradient for readable text.  
  - `div.slideshow-content` — headline, dots container, prev/next buttons.  
- **Script (inline at bottom):** Cycles slides on a timer, updates **active** slide and **dot** buttons, handles prev/next.  
- **Hub cards:** `div.market-actions` — two large `<a class="market-action-card">` blocks linking to `buy.html` and `sell.html`, each with an image and overlay text.

### 4.4 `buy.html`

- **`body.buy-page`**.  
- **Sub-navigation:** `div.page-subnav` — “Back to Market” and “List an item” for **wayfinding**.  
- **Hero:** `section.buy-hero` with image, overlay, and title.  
- **Product grid:** `div#product-grid` starts **empty**.  
- **Scripts:**  
  1. `js/market-storage.js` defines `window.MarketBridgeCatalog`.  
  2. Inline script runs on `DOMContentLoaded` logic: reads `getAllListings()`, creates `article.card` elements with `createElement` / `textContent` (safer than raw `innerHTML` for user-supplied names).  
- **Prices:** `MarketBridgeCatalog.formatPriceDisplay()` outputs strings like **`BWP 12,800.00`** (thousand separators + two decimals).

### 4.5 `sell.html`

- **`body.sell-page`**.  
- **Sub-navigation:** same pattern as Buy.  
- **Layout:** `div.sell-layout` — image column `section.sell-visual` + form column `div.sell-main`.  
- **Form:** `form#sell-form` with labelled inputs (`name`, `price` in **BWP**, optional `description`, optional `image` URL).  
- **Script:** On submit, calls `addUserListing()`; on success, shows a message with a **link** to `buy.html` and resets the form.

### 4.6 `feedback.html`

- **`body.feedback-page`**.  
- **Banner** + **two-column** `div.feedback-layout`: aside image + `form.feedback-form` with topic `<select>`.  
- **Script:** Prevents real HTTP submit; shows a thank-you line (assignment **demo** only).

### 4.7 `contact.html`

- **`body.contact-page`**, `lang="en-BW"`.  
- **Banner** introduces the page; text states details are **prototype**.  
- **`div.contact-grid`:** multiple `div.contact-card` blocks — email, phone, physical address (Fairgrounds / near **Botswana Accountancy College**), **P.O. Box** postal address, support note.  
- **Hours:** `section.contact-hours-card` with a `<ul>`.  
- **Social:** `ul.social-links` with `<a href="#">` and SVG icons (non-functional placeholders).  
- **Footer:** includes “Gaborone, Botswana”.

---

## 5. CSS architecture (`style.css`)

- **Reset:** `* { margin: 0; padding: 0; box-sizing: border-box; }` — predictable sizing (`border-box` includes padding in width).  
- **Global:** `body`, `header`, `nav`, `footer`, `.btn`, `.grid`, `.card` — shared across pages.  
- **Scoped themes:** Selectors like `body.home …`, `body.about-page …`, `body.market-page …`, `body.buy-page …`, `body.sell-page …`, `body.feedback-page …`, `body.contact-page …` keep each page’s look **without** separate CSS files.  
- **Components:** Slideshow (`.slideshow*`), subnav (`.page-subnav`), product badges (`.product-badge`), social buttons (`.social-link*`), etc.  
- **Motion:** `@keyframes fadeIn` reused for gentle entrance of hero content.

---

## 6. JavaScript — `js/market-storage.js`

Wrapped in an **IIFE** `(function () { … })();` so variables do not leak into the global scope except **`window.MarketBridgeCatalog`**.

| Function / key | Purpose |
|----------------|---------|
| `STORAGE_KEY` | `localStorage` key for user-added products. |
| `DEFAULT_LISTINGS` | Built-in sample products (names, **BWP** amounts as strings, images, descriptions). |
| `getUserListings()` | `JSON.parse` of stored array; returns `[]` on error. |
| `addUserListing(product)` | Validates name and price; **`unshift`** adds new item at front so it appears first on Buy. |
| `getAllListings()` | **User listings first**, then defaults. |
| `formatPriceDisplay()` | Normalises digits, formats **BWP** with commas and `.00`. |
| `normalizePrice()` | Strips non-numeric characters for storage. |

**Why `localStorage`:** The assignment is static HTML with no backend; persistence is **per browser** on one device until storage is cleared.

---

## 7. Accessibility and good practice notes

- **Semantic headings:** One logical `<h1>` per page; subsections use `<h2>` / `<h3>`.  
- **Images:** `alt` text on meaningful images; decorative slideshow / card backgrounds sometimes use `alt=""` or `aria-hidden="true"` where appropriate.  
- **Forms:** `<label for="id">` tied to input `id` for click-to-focus and screen readers.  
- **`aria-labelledby` / `aria-label`:** Used on some sections and slideshow controls.  
- **`role="status"` / `aria-live`:** Used on form feedback messages so updates are announced when they change.

---

## 8. Botswana-specific prototype content (Contact)

- **City / area:** Gaborone — **Fairgrounds**, near **Botswana Accountancy College**.  
- **Sample physical address:** Suite 5B, Plot 24816, Fairgrounds Office Park, Gaborone, Botswana *(fictional plot for coursework)*.  
- **Sample postal address:** P.O. Box 015847, Gaborone, Botswana *(fictional; matches `contact.html`)*.  
- **Sample numbers:** `+267 74 628 051` (mobile style), `+267 391 4728` (office style) — **not real**; format matches common Botswana patterns (`+267` country code).

---

## 9. How to run the project

1. Unzip or clone the folder.  
2. Open **`index.html`** in a browser (double-click or *Open with*).  
3. For **Buy/Sell sync**, use **Sell** to add an item, then open **Buy** — data is stored in that browser only.

**Note:** Some school labs block `localStorage` in `file://` mode; if listings do not persist, try another browser or a simple local server (optional).

---

## 10. Summary diagram (page flow)

```text
index.html (Home)
    ├── about.html
    ├── market.html (slideshow hub)
    │       ├── buy.html  ←── data from market-storage.js + localStorage
    │       └── sell.html ──┘
    ├── feedback.html
    └── contact.html
```

This README matches the codebase structure and explains **where** each HTML5 element sits and **why** it is placed that way for the Market Bridge assignment.
