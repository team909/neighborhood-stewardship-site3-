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

function renderProductCard(fromFile, product) {
  const media = renderMedia({
    fromFile,
    image: product.image,
    alt: product.imageAlt,
    className: "ideas-product-media",
    ratioClass: "ideas-ratio-product",
    fallbackLabel: product.name,
    slotNote: product.imageSlot || "",
  });

  return `
    <article class="ideas-product-card">
      ${media}
      <div class="ideas-product-copy">
        <div class="ideas-product-topline">
          ${product.badge ? `<span class="ideas-status-pill">${escapeHtml(product.badge)}</span>` : ""}
          ${product.popularityLabel ? `<span class="ideas-status-pill">${escapeHtml(product.popularityLabel)}</span>` : ""}
          ${product.priceLabel ? `<span class="ideas-price-pill">${escapeHtml(product.priceLabel)}</span>` : ""}
        </div>
        <h3>${escapeHtml(product.name)}</h3>
        <p class="ideas-product-brand">${escapeHtml(product.brand)}</p>
        <p>${escapeHtml(product.description)}</p>
        <p class="ideas-editor-note">${escapeHtml(product.whyItHelps)}</p>
        ${product.editorNote ? `<p class="ideas-product-note">${escapeHtml(product.editorNote)}</p>` : ""}
        <div class="ideas-tag-row">
          ${product.tags.map((tag) => `<span class="ideas-tag">${escapeHtml(tag)}</span>`).join("")}
        </div>
        <a class="ideas-button ideas-button-secondary" href="${escapeHtml(product.affiliateUrl)}" target="_blank" rel="noreferrer noopener">${escapeHtml(product.ctaLabel)}</a>
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
      </div>
      <div class="ideas-grid ${variant === "extras" ? "ideas-grid-products-extras" : "ideas-grid-products"}">
        ${products.map((product) => renderProductCard(fromFile, product)).join("")}
      </div>
    </div>
  `;
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
            <p class="ideas-eyebrow">Choose the kind of mood you want first</p>
            <h2>Choose the kind of mood you want first.</h2>
            <p class="ideas-lede ideas-lede-compact">
              Start with the feeling you want to create: a sweeter front door, a cozier little corner, a weekend project that actually sounds fun, a seasonal mood, or a cute find worth saving for later.
            </p>
          </div>
          <div class="ideas-grid ideas-grid-categories">
            ${liveCategories.map((category) => renderCategoryCard(file, category)).join("")}
          </div>
        </div>
      </section>

      ${renderEditorialSplit({
        fromFile: file,
        eyebrow: "A favorite around the neighborhood",
        title: featuredIdea.title,
        copy:
          "The first live story is all about the walk up: the glow at dusk, the mat, the planter, and the little pieces that make a house feel friendlier before anyone reaches the door.",
        image: featuredIdea.gallery[0]?.image || featuredIdea.heroImage,
        alt: featuredIdea.gallery[0]?.alt || featuredIdea.heroAlt,
        actionHref: ensureRelativeHref(file, `ideas/${featuredIdea.slug}/index.html`),
        actionLabel: "Read the featured idea",
      })}

      <section class="ideas-section">
        <div class="ideas-container">
          <div class="ideas-section-heading">
            <p class="ideas-eyebrow">What people are saving</p>
            <h2>The sweet little ideas and finds that keep pulling people back in.</h2>
            <p class="ideas-lede ideas-lede-compact">
              The three live stories are meant to feel like a good saved folder: pretty, doable, and easy to imagine trying this weekend.
            </p>
          </div>
          <div class="ideas-grid ideas-grid-ideas-featured">
            ${trendingIdeaCards.map((idea) => renderIdeaCard(file, idea)).join("")}
          </div>
        </div>
      </section>

      <section class="ideas-section ideas-section-soft">
        <div class="ideas-container">
          ${renderProductGroup({
            fromFile: file,
            eyebrow: "Cute touches people keep choosing",
            title: "The little finds that make a home feel sweeter almost immediately.",
            productIds: cuteTouchesProducts,
            variant: "lead",
          })}
          ${renderDisclosure(
            "These product links point to broad Amazon search pages so the feed stays easy to update later without locking everything to one exact listing.",
          )}
        </div>
      </section>

      ${renderEditorialSplit({
        fromFile: file,
        eyebrow: "Seasonal sweetness",
        title: "The softer side of the front of the house.",
        copy:
          "Flowers by the steps, porch moments with a little glow, and the kind of seasonal touches that make the whole place feel more alive without looking overdone.",
        image: seasonalCategory?.heroImage,
        alt: seasonalCategory?.coverAlt,
        actionHref: ensureRelativeHref(file, `ideas/categories/${seasonalCategory.slug}/index.html`),
        actionLabel: "Explore seasonal ideas",
      })}

      ${renderEditorialSplit({
        fromFile: file,
        eyebrow: "Cute finds worth saving",
        title: "The little house details people always seem to notice.",
        copy:
          "A mailbox moment, sharper numbers, one lantern, one basket, one charming little accent. These are the low-lift pieces that make the front finally click.",
        image: cuteFindsCategory?.heroImage,
        alt: cuteFindsCategory?.coverAlt,
        actionHref: ensureRelativeHref(file, `ideas/categories/${cuteFindsCategory.slug}/index.html`),
        actionLabel: "Browse the cute finds",
      })}

      <section class="ideas-section">
        <div class="ideas-container">
          ${renderProductGroup({
            fromFile: file,
            eyebrow: "Helpful extras",
            title: "Helpful extras if you want to finish it properly.",
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
            eyebrow: category.leadProductsEyebrow || "Cute touches people keep choosing",
            title:
              category.leadProductsHeading ||
              category.productsHeading ||
              "The little pieces that make the front feel nicer fast.",
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
            eyebrow: idea.leadProductsEyebrow || "Cute touches people keep choosing",
            title:
              idea.leadProductsHeading ||
              "The little pieces that make this idea feel especially good.",
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
