import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  categories,
  ideaPages,
  productCards,
  getCategoryBySlug,
  getIdeaBySlug,
  getProductById,
} from "./content.js";

const rootDir = "/Users/ilierosulschi/Documents/Playground";
const liveCategories = categories.filter((category) => category.live);
const liveIdeas = ideaPages.filter((idea) => idea.live);

function ensureRelativeHref(fromFile, targetFile) {
  const relative = path.posix.relative(path.posix.dirname(fromFile), targetFile);
  return relative === "" ? "./" : relative;
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function resolveAssetPath(fromFile, assetPath) {
  if (!assetPath) {
    return null;
  }

  if (/^https?:\/\//.test(assetPath)) {
    return assetPath;
  }

  return ensureRelativeHref(fromFile, assetPath);
}

function renderMedia({
  fromFile,
  image,
  alt,
  className,
  ratioClass,
  fallbackLabel = "Image coming soon",
  fallbackKicker = "Image slot",
  slotNote = "",
}) {
  const slotAttribute = slotNote
    ? ` data-image-slot="${escapeHtml(slotNote)}"`
    : "";
  const fallbackMarkup = `
    <div class="ideas-media-fallback" role="img" aria-label="${escapeHtml(alt || fallbackLabel)}">
      <span class="ideas-media-fallback-kicker">${escapeHtml(fallbackKicker)}</span>
      <span class="ideas-media-fallback-label">${escapeHtml(fallbackLabel)}</span>
    </div>
  `;

  if (!image) {
    return `
      <div class="${className} ${ratioClass} ideas-media-shell is-missing"${slotAttribute}>
        ${fallbackMarkup}
      </div>
    `;
  }

  const src = resolveAssetPath(fromFile, image);
  return `
    <div class="${className} ${ratioClass} ideas-media-shell"${slotAttribute}>
      <img src="${escapeHtml(src)}" alt="${escapeHtml(alt || "")}" loading="lazy" decoding="async" onerror="this.closest('.ideas-media-shell').classList.add('is-missing'); this.remove();" />
      ${fallbackMarkup}
    </div>
  `;
}

function renderHeader(fromFile, active = "ideas") {
  const homeHref = ensureRelativeHref(fromFile, "index.html");
  const ideasHref = ensureRelativeHref(fromFile, "ideas/index.html");
  const liveCategoryLinks = liveCategories
    .map(
      (category) => `
        <a class="${active === category.slug ? "is-active" : ""}" href="${escapeHtml(
          ensureRelativeHref(fromFile, `ideas/categories/${category.slug}/index.html`),
        )}">${escapeHtml(category.navLabel || category.name)}</a>
      `,
    )
    .join("");

  return `
    <header class="ideas-site-header">
      <div class="ideas-container ideas-nav-row">
        <a class="ideas-brand" href="${escapeHtml(homeHref)}">
          <span class="ideas-brand-mark">NSP</span>
          <span class="ideas-brand-copy">
            <span class="ideas-brand-kicker">Neighborhood Stewardship</span>
            <span class="ideas-brand-name">Project</span>
          </span>
        </a>
        <nav class="ideas-site-nav" aria-label="Ideas navigation">
          <a class="${active === "home" ? "is-active" : ""}" href="${escapeHtml(homeHref)}">Home</a>
          <a class="${active === "ideas" ? "is-active" : ""}" href="${escapeHtml(ideasHref)}">Neighborhood Ideas</a>
          ${liveCategoryLinks}
        </nav>
      </div>
    </header>
  `;
}

function renderFooter(fromFile) {
  const homeHref = ensureRelativeHref(fromFile, "index.html");
  const ideasHref = ensureRelativeHref(fromFile, "ideas/index.html");
  return `
    <footer class="ideas-site-footer">
      <div class="ideas-container ideas-footer-row">
        <div>
          <p class="ideas-footer-kicker">Neighborhood Ideas</p>
          <p class="ideas-footer-copy">
            A warm little feed of porch charm, cozy home touches, weekend projects, seasonal sweetness, and cute finds people actually want to save.
          </p>
        </div>
        <div class="ideas-footer-links">
          <a href="${escapeHtml(homeHref)}">Back to home</a>
          <a href="${escapeHtml(ideasHref)}">Ideas landing</a>
        </div>
      </div>
    </footer>
  `;
}

function renderIdeasShell({ fromFile, title, description, body, active = "ideas" }) {
  const cssHref = ensureRelativeHref(fromFile, "ideas/ideas.css");

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Cormorant+Garamond:wght@500;600;700&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="${escapeHtml(cssHref)}" />
  </head>
  <body class="ideas-page">
    <div class="ideas-site-shell">
      ${renderHeader(fromFile, active)}
      ${body}
      ${renderFooter(fromFile)}
    </div>
  </body>
</html>`;
}

function renderIdeasHero({ fromFile, kicker, title, copy, image, alt, actions = "" }) {
  return `
    <section class="ideas-hero">
      <div class="ideas-container ideas-hero-layout">
        <div class="ideas-hero-copy">
          <p class="ideas-eyebrow">${escapeHtml(kicker)}</p>
          <h1>${escapeHtml(title)}</h1>
          <p class="ideas-lede">${escapeHtml(copy)}</p>
          ${actions ? `<div class="ideas-hero-actions">${actions}</div>` : ""}
        </div>
        <div class="ideas-hero-media">
          ${renderMedia({
            fromFile,
            image,
            alt,
            className: "ideas-hero-frame",
            ratioClass: "ideas-ratio-hero",
            fallbackLabel: "Neighborhood Ideas image",
          })}
        </div>
      </div>
    </section>
  `;
}

function renderPillRow(items = []) {
  if (!items.length) {
    return "";
  }

  return `
    <div class="ideas-pill-row">
      ${items
        .map((item) => `<span class="ideas-story-pill">${escapeHtml(item)}</span>`)
        .join("")}
    </div>
  `;
}

function renderStoryUtility({ idea }) {
  const pills = Array.isArray(idea.storyPills) ? idea.storyPills : [];

  return `
    <section class="ideas-section ideas-section-first">
      <div class="ideas-container">
        <div class="ideas-story-utility">
          <div class="ideas-story-utility-copy">
            <p class="ideas-eyebrow">Story guide</p>
            <h2>This one is meant to be easy to picture, easy to save, and easy to try.</h2>
            <p class="ideas-lede ideas-lede-compact">
              Start with the mood, then the pretty pieces, then the helpful extras if you want the look to stay easy.
            </p>
            ${renderPillRow(pills)}
          </div>
          <div class="ideas-story-list-card">
            <p class="ideas-eyebrow">Amazon list</p>
            <h3>${escapeHtml(idea.listLabel || "Amazon list coming soon")}</h3>
            <p>${escapeHtml(
              idea.listNote ||
                "This story will eventually link to one clean list with the pieces that create the look.",
            )}</p>
            <span class="ideas-button ideas-button-secondary is-disabled">List link opens here later</span>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderBreadcrumbs(fromFile, items) {
  return `
    <nav class="ideas-breadcrumbs" aria-label="Breadcrumb">
      ${items
        .map((item, index) => {
          if (!item.href) {
            return `<span aria-current="page">${escapeHtml(item.label)}</span>`;
          }

          return `
            <a href="${escapeHtml(ensureRelativeHref(fromFile, item.href))}">${escapeHtml(item.label)}</a>
            ${index < items.length - 1 ? `<span class="ideas-breadcrumb-sep">/</span>` : ""}
          `;
        })
        .join("")}
    </nav>
  `;
}

function renderCategoryCard(fromFile, category) {
  const media = renderMedia({
    fromFile,
    image: category.heroImage,
    alt: category.coverAlt,
    className: "ideas-card-media",
    ratioClass: "ideas-ratio-card",
    fallbackLabel: category.name,
    slotNote: category.imageSlot || "",
  });

  const href = category.live
    ? ensureRelativeHref(fromFile, `ideas/categories/${category.slug}/index.html`)
    : null;

  const cardInner = `
    ${media}
    <div class="ideas-card-copy">
      <div class="ideas-card-topline">
        <p class="ideas-card-kicker">${escapeHtml(category.kicker)}</p>
        ${!category.live ? `<span class="ideas-status-pill">Coming soon</span>` : ""}
      </div>
      <h3>${escapeHtml(category.name)}</h3>
      <p>${escapeHtml(category.description)}</p>
      <span class="ideas-text-link">${category.live ? "Explore category" : "More ideas soon"}</span>
    </div>
  `;

  return category.live
    ? `<a class="ideas-card" href="${escapeHtml(href)}">${cardInner}</a>`
    : `<article class="ideas-card ideas-card-muted">${cardInner}</article>`;
}

function renderIdeaCard(fromFile, idea) {
  const href = idea.live
    ? ensureRelativeHref(fromFile, `ideas/${idea.slug}/index.html`)
    : null;

  const cardInner = `
    ${renderMedia({
      fromFile,
      image: idea.heroImage,
      alt: idea.heroAlt,
      className: "ideas-card-media",
      ratioClass: "ideas-ratio-card",
      fallbackLabel: idea.title,
      slotNote: idea.imageSlot || "",
    })}
    <div class="ideas-card-copy">
      <div class="ideas-card-topline">
        ${idea.badge ? `<p class="ideas-card-kicker">${escapeHtml(idea.badge)}</p>` : ""}
        ${idea.popularityLabel ? `<span class="ideas-status-pill">${escapeHtml(idea.popularityLabel)}</span>` : ""}
      </div>
      <h3>${escapeHtml(idea.title)}</h3>
      <p>${escapeHtml(idea.dek)}</p>
      ${idea.editorNote ? `<p class="ideas-editor-note">${escapeHtml(idea.editorNote)}</p>` : ""}
      <span class="ideas-text-link">${idea.live ? "Read idea" : "Coming soon"}</span>
    </div>
  `;

  return idea.live
    ? `<a class="ideas-card" href="${escapeHtml(href)}">${cardInner}</a>`
    : `<article class="ideas-card ideas-card-muted">${cardInner}</article>`;
}

function renderProductCard(fromFile, product, variant = "lead", index = 0) {
  const media = renderMedia({
    fromFile,
    image: product.image,
    alt: product.imageAlt,
    className: "ideas-product-media",
    ratioClass:
      variant === "extras"
        ? "ideas-ratio-product-extra"
        : index === 0
          ? "ideas-ratio-product-featured"
          : "ideas-ratio-product",
    fallbackLabel: product.name,
    slotNote: product.imageSlot || "",
  });
  const productHref = escapeHtml(product.affiliateUrl);
  const visibleTags =
    variant === "extras" ? product.tags : product.tags.slice(0, 2);
  const cardClass = [
    "ideas-product-card",
    variant === "extras" ? "ideas-product-card-extra" : "ideas-product-card-lead",
    variant !== "extras" && index === 0 ? "is-featured" : "",
  ]
    .filter(Boolean)
    .join(" ");
  const headlineNote = variant === "extras" ? product.description : product.whyItHelps;
  const ctaLabel = variant === "extras" ? "View extra" : "Shop now";

  return `
    <article class="${cardClass}">
      <a class="ideas-product-media-link" href="${productHref}" target="_blank" rel="noreferrer noopener" aria-label="${escapeHtml(`Shop ${product.name} on Amazon`)}">
        ${media}
        ${variant === "extras"
          ? ""
          : `
        <div class="ideas-product-media-overlay">
          <div class="ideas-product-topline ideas-product-topline-overlay">
            ${product.badge ? `<span class="ideas-status-pill">${escapeHtml(product.badge)}</span>` : ""}
            ${product.popularityLabel ? `<span class="ideas-status-pill">${escapeHtml(product.popularityLabel)}</span>` : ""}
          </div>
          <div class="ideas-product-hero-copy">
            <p class="ideas-product-brand">${escapeHtml(product.brand)}</p>
            <h3>${escapeHtml(product.name)}</h3>
            <p class="ideas-product-overlay-copy">${escapeHtml(product.description)}</p>
          </div>
        </div>
        `}
      </a>
      <div class="ideas-product-copy">
        <div class="ideas-product-topline ${variant === "extras" ? "" : "ideas-product-topline-secondary"}">
          ${variant === "extras" && product.badge ? `<span class="ideas-status-pill">${escapeHtml(product.badge)}</span>` : ""}
          ${variant === "extras" && product.popularityLabel ? `<span class="ideas-status-pill">${escapeHtml(product.popularityLabel)}</span>` : ""}
          ${product.priceLabel ? `<span class="ideas-price-pill">${escapeHtml(product.priceLabel)}</span>` : ""}
        </div>
        ${variant === "extras" ? `<h3>${escapeHtml(product.name)}</h3>` : ""}
        ${variant === "extras" ? `<p class="ideas-product-brand">${escapeHtml(product.brand)}</p>` : ""}
        <p class="ideas-editor-note">${escapeHtml(headlineNote)}</p>
        ${product.editorNote ? `<p class="ideas-product-note">${escapeHtml(product.editorNote)}</p>` : ""}
        <div class="ideas-tag-row">
          ${visibleTags.map((tag) => `<span class="ideas-tag">${escapeHtml(tag)}</span>`).join("")}
        </div>
        <div class="ideas-product-actions">
          <a class="ideas-button ideas-button-secondary" href="${productHref}" target="_blank" rel="noreferrer noopener">${escapeHtml(ctaLabel)}</a>
          <span class="ideas-product-merchant">${escapeHtml(product.merchant)}</span>
        </div>
      </div>
    </article>
  `;
}

function renderProductGroup({
  fromFile,
  eyebrow,
  title,
  productIds = [],
  fallbackTitle = "Cute touches people keep choosing",
  note = "",
  variant = "lead",
}) {
  const products = productIds.map(getProductById).filter(Boolean);

  if (!products.length) {
    return "";
  }

  return `
    <div class="ideas-products-group ${variant === "extras" ? "ideas-products-group-extras" : "ideas-products-group-lead"}">
      <div class="ideas-section-heading">
        ${eyebrow ? `<p class="ideas-eyebrow">${escapeHtml(eyebrow)}</p>` : ""}
        <h2>${escapeHtml(title || fallbackTitle)}</h2>
        ${note ? `<p class="ideas-section-copy ideas-section-copy-compact">${escapeHtml(note)}</p>` : ""}
      </div>
      <div class="ideas-grid ${variant === "extras" ? "ideas-grid-products-extras" : "ideas-grid-products"}">
        ${products.map((product, index) => renderProductCard(fromFile, product, variant, index)).join("")}
      </div>
    </div>
  `;
}

function renderLandingFeedTile({
  fromFile,
  image,
  alt,
  href = "",
  eyebrow = "",
  title,
  copy,
  badge = "",
  cta = "",
  size = "medium",
  kind = "story",
  textOnly = false,
}) {
  const tileClass = [
    "ideas-feed-tile",
    `ideas-feed-tile-${size}`,
    textOnly ? "ideas-feed-tile-text" : `ideas-feed-tile-${kind}`,
  ].join(" ");
  const content = `
    ${textOnly
      ? ""
      : renderMedia({
          fromFile,
          image,
          alt,
          className: "ideas-feed-media",
          ratioClass: `ideas-feed-ratio-${size}`,
          fallbackLabel: title,
        })}
    <div class="ideas-feed-overlay ${textOnly ? "ideas-feed-overlay-text" : ""}">
      <div class="ideas-feed-head">
        ${eyebrow ? `<p class="ideas-feed-eyebrow">${escapeHtml(eyebrow)}</p>` : ""}
        ${badge ? `<span class="ideas-status-pill">${escapeHtml(badge)}</span>` : ""}
      </div>
      <div class="ideas-feed-body">
        <h3>${escapeHtml(title)}</h3>
        <p>${escapeHtml(copy)}</p>
        ${cta ? `<span class="ideas-feed-cta">${escapeHtml(cta)}</span>` : ""}
      </div>
    </div>
  `;

  if (href) {
    return `<a class="${tileClass}" href="${escapeHtml(href)}">${content}</a>`;
  }

  return `<article class="${tileClass}">${content}</article>`;
}

function renderEditorialSplit({
  fromFile,
  eyebrow,
  title,
  copy,
  image,
  alt,
  actionHref = "",
  actionLabel = "",
}) {
  return `
    <section class="ideas-editorial">
      <div class="ideas-container ideas-editorial-layout">
        <div class="ideas-editorial-copy">
          <p class="ideas-eyebrow">${escapeHtml(eyebrow)}</p>
          <h2>${escapeHtml(title)}</h2>
          <p class="ideas-lede ideas-lede-compact">${escapeHtml(copy)}</p>
          ${
            actionHref && actionLabel
              ? `<div class="ideas-editorial-actions">
                  <a class="ideas-button ideas-button-secondary" href="${escapeHtml(actionHref)}">${escapeHtml(actionLabel)}</a>
                </div>`
              : ""
          }
        </div>
        <div class="ideas-editorial-media">
          ${renderMedia({
            fromFile,
            image,
            alt,
            className: "ideas-editorial-frame",
            ratioClass: "ideas-ratio-editorial",
            fallbackLabel: title,
          })}
        </div>
      </div>
    </section>
  `;
}

function renderDisclosure(text) {
  return `
    <div class="ideas-disclosure-panel">
      <p class="ideas-disclosure">${escapeHtml(text)}</p>
    </div>
  `;
}

function renderGalleryStrip(fromFile, idea) {
  if (!Array.isArray(idea.gallery) || !idea.gallery.length) {
    return "";
  }

  return `
    <section class="ideas-section ideas-section-gallery">
      <div class="ideas-container">
        <div class="ideas-grid ideas-grid-gallery">
          ${idea.gallery
            .map((item) =>
              renderMedia({
                fromFile,
                image: item.image,
                alt: item.alt,
                className: "ideas-gallery-card",
                ratioClass: "ideas-ratio-card",
                fallbackLabel: idea.title,
              }),
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}

function buildLandingPage() {
  const file = "ideas/index.html";
  const featuredCategory = liveCategories[0];
  const featuredIdea = liveIdeas[0];
  const cuteTouchesProducts = [
    "weather-ready-doormat",
    "soft-front-door-wreath",
    "warm-entry-light",
    "dark-entry-planter",
    "matte-black-house-numbers",
    "front-step-flower-basket",
    "black-outdoor-lantern",
  ];
  const helpfulExtrasProducts = [
    "simple-wreath-hanger",
    "stone-edge-bed-shovel",
    "hydrangea-friendly-mulch",
    "entry-watering-wand",
    "wide-outdoor-broom",
  ];
  const trendingIdeaCards = [
    "cute-front-door-ideas-that-feel-warm-right-away",
    "pretty-front-step-flowers-that-make-everything-feel-sweeter",
    "little-house-details-people-notice-right-away",
  ]
    .map(getIdeaBySlug)
    .filter(Boolean);
  const seasonalCategory = getCategoryBySlug("seasonal-sweetness");
  const cuteFindsCategory = getCategoryBySlug("cute-finds-worth-saving");
  const shopFeedTiles = [
    renderLandingFeedTile({
      fromFile: file,
      kind: "editorial",
      textOnly: true,
      size: "short",
      eyebrow: "Shop and save",
      title: "A cleaner little feed of pretty things worth opening.",
      copy:
        "This is the browse layer now: mood first, image first, and only the pieces that make the house feel sweeter right away.",
      cta: "Open a card or jump into a story",
    }),
    renderLandingFeedTile({
      fromFile: file,
      kind: "category",
      size: "tall",
      image: featuredCategory.heroImage,
      alt: featuredCategory.coverAlt,
      href: ensureRelativeHref(file, `ideas/categories/${featuredCategory.slug}/index.html`),
      eyebrow: "Front Door & Porch Charm",
      badge: "Start here",
      title: "The little front-door touches people always save first.",
      copy: "Mat, glow, planter, wreath, and the soft details that make the whole house feel friendlier.",
      cta: "Explore lane",
    }),
    renderLandingFeedTile({
      fromFile: file,
      kind: "product",
      size: "short",
      image: getProductById("soft-front-door-wreath")?.image,
      alt: getProductById("soft-front-door-wreath")?.imageAlt,
      href: getProductById("soft-front-door-wreath")?.affiliateUrl,
      eyebrow: "Cute touch people keep choosing",
      badge: "Shop now",
      title: "Soft front-door wreath",
      copy: "An easy layer that makes the entry feel sweet without decorating the whole porch.",
      cta: "Browse on Amazon",
    }),
    renderLandingFeedTile({
      fromFile: file,
      kind: "story",
      size: "wide",
      image: featuredIdea.heroImage,
      alt: featuredIdea.heroAlt,
      href: ensureRelativeHref(file, `ideas/${featuredIdea.slug}/index.html`),
      eyebrow: "Featured story",
      badge: "Popular around the neighborhood",
      title: featuredIdea.title,
      copy: featuredIdea.dek,
      cta: "Read story",
    }),
    renderLandingFeedTile({
      fromFile: file,
      kind: "product",
      size: "medium",
      image: getProductById("dark-entry-planter")?.image,
      alt: getProductById("dark-entry-planter")?.imageAlt,
      href: getProductById("dark-entry-planter")?.affiliateUrl,
      eyebrow: "Looks more expensive than it is",
      badge: "Shop now",
      title: "Dark olive porch planter",
      copy: "One good planter does more for the front than a cluster of smaller pieces.",
      cta: "Browse on Amazon",
    }),
    renderLandingFeedTile({
      fromFile: file,
      kind: "category",
      size: "medium",
      image: seasonalCategory?.heroImage,
      alt: seasonalCategory?.coverAlt,
      href: ensureRelativeHref(file, `ideas/categories/${seasonalCategory.slug}/index.html`),
      eyebrow: "Seasonal Sweetness",
      badge: "Soft floral mood",
      title: "Flowers and porch moments that make the steps feel sweeter.",
      copy: "The softer side of the front of the house, with just enough seasonal color and shape.",
      cta: "Explore seasonal ideas",
    }),
    renderLandingFeedTile({
      fromFile: file,
      kind: "product",
      size: "short",
      image: getProductById("black-outdoor-lantern")?.image,
      alt: getProductById("black-outdoor-lantern")?.imageAlt,
      href: getProductById("black-outdoor-lantern")?.affiliateUrl,
      eyebrow: "Small detail, big difference",
      badge: "Shop now",
      title: "Simple black lantern",
      copy: "A tiny glow-and-texture layer that makes the whole front click.",
      cta: "Browse on Amazon",
    }),
    renderLandingFeedTile({
      fromFile: file,
      kind: "story",
      size: "tall",
      image: getIdeaBySlug("pretty-front-step-flowers-that-make-everything-feel-sweeter")?.heroImage,
      alt: getIdeaBySlug("pretty-front-step-flowers-that-make-everything-feel-sweeter")?.heroAlt,
      href: ensureRelativeHref(file, "ideas/pretty-front-step-flowers-that-make-everything-feel-sweeter/index.html"),
      eyebrow: "Seasonal favorite",
      badge: "Read story",
      title: "Pretty Front-Step Flowers That Make Everything Feel Sweeter",
      copy: "The soft, fuller look that changes the mood before anyone notices the exact plants.",
      cta: "Open story",
    }),
    renderLandingFeedTile({
      fromFile: file,
      kind: "product",
      size: "medium",
      image: getProductById("weather-ready-doormat")?.image,
      alt: getProductById("weather-ready-doormat")?.imageAlt,
      href: getProductById("weather-ready-doormat")?.affiliateUrl,
      eyebrow: "Easy favorite",
      badge: "Shop now",
      title: "Weather-ready coir mat",
      copy: "The quick first layer that makes the front feel grounded, tidy, and more finished right away.",
      cta: "Browse on Amazon",
    }),
    renderLandingFeedTile({
      fromFile: file,
      kind: "category",
      size: "medium",
      image: cuteFindsCategory?.heroImage,
      alt: cuteFindsCategory?.coverAlt,
      href: ensureRelativeHref(file, `ideas/categories/${cuteFindsCategory.slug}/index.html`),
      eyebrow: "Cute Finds Worth Saving",
      badge: "Low-lift favorites",
      title: "The little house details people notice almost immediately.",
      copy: "Mailboxes, numbers, lanterns, baskets, and the tiny upgrades that make the front feel finished.",
      cta: "Browse the finds",
    }),
    renderLandingFeedTile({
      fromFile: file,
      kind: "product",
      size: "short",
      image: getProductById("matte-black-house-numbers")?.image,
      alt: getProductById("matte-black-house-numbers")?.imageAlt,
      href: getProductById("matte-black-house-numbers")?.affiliateUrl,
      eyebrow: "Small detail, big difference",
      badge: "Shop now",
      title: "Matte black house numbers",
      copy: "One of the fastest ways to make the whole front feel sharper and more intentional.",
      cta: "Browse on Amazon",
    }),
    renderLandingFeedTile({
      fromFile: file,
      kind: "story",
      size: "tall",
      image: getIdeaBySlug("little-house-details-people-notice-right-away")?.heroImage,
      alt: getIdeaBySlug("little-house-details-people-notice-right-away")?.heroAlt,
      href: ensureRelativeHref(file, "ideas/little-house-details-people-notice-right-away/index.html"),
      eyebrow: "Cute finds story",
      badge: "Read story",
      title: "Little House Details People Notice Right Away",
      copy: "The tiny upgrades that make the place feel more admired without starting a whole project.",
      cta: "Open story",
    }),
  ].join("");

  const body = `
    <main class="ideas-main">
      ${renderIdeasHero({
        fromFile: file,
        kicker: "Neighborhood Ideas",
        title: "Little home ideas that make life feel sweeter",
        copy:
          "Front porch charm, cozy home touches, weekend little projects, seasonal favorites, hosting ideas, recipes, and cute finds people actually want to save.",
        image: featuredIdea.heroImage,
        alt: featuredIdea.heroAlt,
        actions: `
          <a class="ideas-button ideas-button-primary" href="${escapeHtml(
            ensureRelativeHref(file, `ideas/categories/${featuredCategory.slug}/index.html`),
          )}">Start with ${escapeHtml(featuredCategory.name)}</a>
          <a class="ideas-button ideas-button-secondary" href="${escapeHtml(
            ensureRelativeHref(file, `ideas/${featuredIdea.slug}/index.html`),
          )}">Read the featured story</a>
        `,
      })}

      <section class="ideas-section">
        <div class="ideas-container">
          <div class="ideas-section-heading">
            <p class="ideas-eyebrow">What people are saving</p>
            <h2>A Pinterest-style save feed, but built around your actual shop lanes.</h2>
            <p class="ideas-lede ideas-lede-compact">
              The cards below mix stories, shoppable finds, and category lanes in one image-led rhythm so the browsing feels easier and more visual.
            </p>
          </div>
          <div class="ideas-save-feed">${shopFeedTiles}</div>
        </div>
      </section>

      <section class="ideas-section ideas-section-soft">
        <div class="ideas-container">
          ${renderProductGroup({
            fromFile: file,
            eyebrow: "Shop now",
            title: "Cute touches people keep choosing.",
            note:
              "If someone wants the cleaner product view after the feed, this is the calmer shop strip underneath it.",
            productIds: cuteTouchesProducts,
            variant: "lead",
          })}
          ${renderDisclosure(
            "These product links point to broad Amazon search pages so the feed stays easy to update later without locking everything to one exact listing.",
          )}
        </div>
      </section>

      <section class="ideas-section">
        <div class="ideas-container">
          ${renderProductGroup({
            fromFile: file,
            eyebrow: "Helpful extras",
            title: "Helpful extras if you want to finish it properly.",
            note:
              "These stay lower on purpose. They help the cute part keep working without taking over the whole page.",
            productIds: helpfulExtrasProducts,
            variant: "extras",
          })}
          ${renderDisclosure(
            "The practical extras live lower on the page on purpose. They help keep the sweet part looking good without taking over the mood.",
          )}
        </div>
      </section>
    </main>
  `;

  return renderIdeasShell({
    fromFile: file,
    title: "Neighborhood Ideas | Neighborhood Stewardship Project",
    description:
      "Browse porch charm, cozy home touches, weekend little projects, seasonal favorites, and cute finds that make life at home feel sweeter.",
    body,
    active: "ideas",
  });
}

function buildCategoryPage(category) {
  const file = `ideas/categories/${category.slug}/index.html`;
  const liveIdeasForCategory = category.ideaSlugs.map(getIdeaBySlug).filter(Boolean);
  const featuredIdea = liveIdeasForCategory[0];
  const leadProductIds = Array.isArray(category.leadProductIds)
    ? category.leadProductIds
    : category.extraProductIds
      ? []
      : category.featuredProductIds || [];
  const extraProductIds = category.extraProductIds || [];

  const body = `
    <main class="ideas-main">
      <section class="ideas-section ideas-section-first">
        <div class="ideas-container">
          ${renderBreadcrumbs(file, [
            { label: "Home", href: "index.html" },
            { label: "Neighborhood Ideas", href: "ideas/index.html" },
            { label: category.name },
          ])}
        </div>
      </section>

      ${renderIdeasHero({
        fromFile: file,
        kicker: category.kicker,
        title: category.name,
        copy: category.intro,
        image: category.heroImage,
        alt: category.coverAlt,
        actions:
          featuredIdea
            ? `
          <a class="ideas-button ideas-button-primary" href="${escapeHtml(
            ensureRelativeHref(file, `ideas/${featuredIdea.slug}/index.html`),
          )}">Read the featured story</a>
        `
            : "",
      })}

      <section class="ideas-section">
        <div class="ideas-container">
          <div class="ideas-section-heading">
            <p class="ideas-eyebrow">Ideas in this category</p>
            <h2>${escapeHtml(category.ideasHeading || "Warm little ideas built around the front of the home.")}</h2>
            <p class="ideas-lede ideas-lede-compact">
              Scroll the stories first, then shop the mood, then drop into the helpful extras only if you want the look to stay easy.
            </p>
          </div>
          <div class="ideas-grid ideas-grid-ideas">
            ${liveIdeasForCategory.map((idea) => renderIdeaCard(file, idea)).join("")}
          </div>
        </div>
      </section>

      ${
        leadProductIds.length
          ? `
      <section class="ideas-section ideas-section-soft">
        <div class="ideas-container">
          ${renderProductGroup({
            fromFile: file,
            eyebrow: category.leadProductsEyebrow || "Shop now",
            title:
              category.leadProductsHeading ||
              category.productsHeading ||
              "The little pieces that make the front feel nicer fast.",
            note:
              "Start with the pieces you can picture right away. The practical extras can come later.",
            productIds: leadProductIds,
            variant: "lead",
          })}
          ${renderDisclosure(
            "These product links point to broad Amazon search pages chosen to stay stable, easy to update, and secondary to the mood of the page itself.",
          )}
        </div>
      </section>
      `
          : ""
      }

      ${
        extraProductIds.length
          ? `
      <section class="ideas-section ${leadProductIds.length ? "" : "ideas-section-soft"}">
        <div class="ideas-container">
          ${renderProductGroup({
            fromFile: file,
            eyebrow: category.extraProductsEyebrow || "Helpful extras",
            title:
              category.extraProductsHeading ||
              "Helpful extras if you want to finish it properly.",
            note:
              "This is the quieter utility layer that helps the prettier part stay easy.",
            productIds: extraProductIds,
            variant: "extras",
          })}
          ${!leadProductIds.length
            ? renderDisclosure(
                "These product links point to broad Amazon search pages chosen to stay stable, easy to update, and secondary to the mood of the page itself.",
              )
            : ""}
        </div>
      </section>
      `
          : ""
      }
    </main>
  `;

  return renderIdeasShell({
    fromFile: file,
    title: category.seoTitle,
    description: category.seoDescription,
    body,
    active: category.slug,
  });
}

function buildIdeaPage(idea) {
  const file = `ideas/${idea.slug}/index.html`;
  const category = getCategoryBySlug(idea.categorySlug);
  const leadProductIds = Array.isArray(idea.leadProductIds)
    ? idea.leadProductIds
    : idea.extraProductIds
      ? []
      : idea.productIds || [];
  const extraProductIds = idea.extraProductIds || [];
  const relatedIdeas = idea.relatedIdeaSlugs.map(getIdeaBySlug).filter(Boolean);

  const body = `
    <main class="ideas-main">
      <section class="ideas-section ideas-section-first">
        <div class="ideas-container">
          ${renderBreadcrumbs(file, [
            { label: "Home", href: "index.html" },
            { label: "Neighborhood Ideas", href: "ideas/index.html" },
            { label: category.name, href: `ideas/categories/${category.slug}/index.html` },
            { label: idea.title },
          ])}
        </div>
      </section>

      ${renderStoryUtility({ idea })}

      ${renderIdeasHero({
        fromFile: file,
        kicker: idea.badge || category.name,
        title: idea.title,
        copy: idea.dek,
        image: idea.heroImage,
        alt: idea.heroAlt,
        actions: `
          <a class="ideas-button ideas-button-primary" href="${escapeHtml(
            ensureRelativeHref(file, `ideas/categories/${category.slug}/index.html`),
          )}">More in ${escapeHtml(category.name)}</a>
          <span class="ideas-button ideas-button-secondary is-disabled">Amazon list opens here later</span>
        `,
      })}

      ${renderGalleryStrip(file, idea)}

      <section class="ideas-section">
        <div class="ideas-container ideas-article-grid">
          <div class="ideas-article-copy">
            <p class="ideas-article-intro">${escapeHtml(idea.intro)}</p>
            ${idea.whyItWorks
              .map((paragraph) => `<p class="ideas-article-paragraph">${escapeHtml(paragraph)}</p>`)
              .join("")}
          </div>
          <aside class="ideas-article-note">
            <p class="ideas-eyebrow">Editor note</p>
            <p>${escapeHtml(idea.editorNote || "")}</p>
            ${idea.popularityLabel ? `<span class="ideas-status-pill">${escapeHtml(idea.popularityLabel)}</span>` : ""}
          </aside>
        </div>
      </section>

      <section class="ideas-section ideas-section-soft">
        <div class="ideas-container">
          <div class="ideas-section-heading">
            <p class="ideas-eyebrow">How to try it</p>
            <h2>${escapeHtml(
              idea.stepsHeading || "A few easy little shifts that make the whole thing feel nicer fast.",
            )}</h2>
          </div>
          <div class="ideas-grid ideas-grid-steps">
            ${idea.steps
              .map(
                (step, index) => `
                  <article class="ideas-step-card">
                    <span class="ideas-step-number">${index + 1}</span>
                    <h3>${escapeHtml(step.title)}</h3>
                    <p>${escapeHtml(step.body)}</p>
                  </article>
                `,
              )
              .join("")}
          </div>
        </div>
      </section>

      <section class="ideas-section">
        <div class="ideas-container ideas-two-column-notes">
          <article class="ideas-note-card">
            <p class="ideas-eyebrow">Keep it looking sweet</p>
            <ul class="ideas-note-list">
              ${idea.careNotes.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}
            </ul>
          </article>
          <article class="ideas-note-card">
            <p class="ideas-eyebrow">Swap with the season</p>
            <ul class="ideas-note-list">
              ${idea.seasonalNotes.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}
            </ul>
          </article>
        </div>
      </section>

      ${
        leadProductIds.length
          ? `
      <section class="ideas-section ideas-section-soft">
        <div class="ideas-container">
          ${renderProductGroup({
            fromFile: file,
            eyebrow: idea.leadProductsEyebrow || "Shop now",
            title:
              idea.leadProductsHeading ||
              "The little pieces that make this idea feel especially good.",
            note:
              "These are the first pieces to click when you want the look, the mood, and the easiest visible payoff.",
            productIds: leadProductIds,
            variant: "lead",
          })}
          ${renderDisclosure(
            "These product links point to broad Amazon search pages chosen to stay stable, easy to update, and secondary to the mood of the idea itself.",
          )}
        </div>
      </section>
      `
          : ""
      }

      ${
        extraProductIds.length
          ? `
      <section class="ideas-section ${leadProductIds.length ? "" : "ideas-section-soft"}">
        <div class="ideas-container">
          ${renderProductGroup({
            fromFile: file,
            eyebrow: idea.extraProductsEyebrow || "Helpful extras",
            title:
              idea.extraProductsHeading ||
              "Helpful extras if you want to finish it properly.",
            note:
              "The useful support pieces live down here so the pretty part stays the star.",
            productIds: extraProductIds,
            variant: "extras",
          })}
          ${!leadProductIds.length
            ? renderDisclosure(
                "These product links point to broad Amazon search pages chosen to stay stable, easy to update, and secondary to the mood of the idea itself.",
              )
            : ""}
        </div>
      </section>
      `
          : ""
      }

      <section class="ideas-section">
        <div class="ideas-container">
          <div class="ideas-section-heading">
            <p class="ideas-eyebrow">More in ${escapeHtml(category.name)}</p>
            <h2>You would probably save these too.</h2>
          </div>
          <div class="ideas-grid ideas-grid-ideas">
            ${relatedIdeas.map((relatedIdea) => renderIdeaCard(file, relatedIdea)).join("")}
          </div>
        </div>
      </section>
    </main>
  `;

  return renderIdeasShell({
    fromFile: file,
    title: idea.seoTitle,
    description: idea.seoDescription,
    body,
    active: category.slug,
  });
}

const outputPages = [
  { file: "ideas/index.html", html: buildLandingPage() },
  ...liveCategories.map((category) => ({
    file: `ideas/categories/${category.slug}/index.html`,
    html: buildCategoryPage(category),
  })),
  ...liveIdeas.map((idea) => ({
    file: `ideas/${idea.slug}/index.html`,
    html: buildIdeaPage(idea),
  })),
];

await Promise.all(
  outputPages.map(async ({ file, html }) => {
    const outputPath = path.join(rootDir, file);
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, html, "utf8");
  }),
);

console.log(`Generated ${outputPages.length} Neighborhood Ideas pages.`);
