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
const homeFindsDefaultFile = "ideas/categories/cute-finds-worth-saving/index.html";
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
        <nav class="ideas-site-nav" aria-label="Home Finds navigation">
          <a class="${active === "home" ? "is-active" : ""}" href="${escapeHtml(homeHref)}">Home</a>
          ${liveCategoryLinks}
        </nav>
      </div>
    </header>
  `;
}

function renderFooter(fromFile) {
  const homeHref = ensureRelativeHref(fromFile, "index.html");
  const homeFindsHref = ensureRelativeHref(fromFile, homeFindsDefaultFile);
  return `
    <footer class="ideas-site-footer">
      <div class="ideas-container ideas-footer-row">
        <div>
          <p class="ideas-footer-kicker">Home Finds</p>
          <p class="ideas-footer-copy">
            A small edit of cute, useful, saveable finds for making home feel sweeter and more put together.
          </p>
        </div>
        <div class="ideas-footer-links">
          <a href="${escapeHtml(homeHref)}">Back to home</a>
          <a href="${escapeHtml(homeFindsHref)}">Home Finds</a>
        </div>
      </div>
    </footer>
  `;
}

function renderAffiliateDisclosure() {
  return `
    <div class="ideas-affiliate-note" aria-label="Affiliate disclosure">
      <p>Some Home Finds links are affiliate links. As an Amazon Associate, Neighborhood Stewardship Project may earn from qualifying purchases.</p>
    </div>
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

function buildRedirectPage(fromFile, targetFile) {
  const targetHref = ensureRelativeHref(fromFile, targetFile);

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Cute Finds | Home Finds</title>
    <meta http-equiv="refresh" content="0; url=${escapeHtml(targetHref)}" />
    <link rel="canonical" href="${escapeHtml(targetHref)}" />
  </head>
  <body>
    <p>This page has moved to <a href="${escapeHtml(targetHref)}">Cute Finds</a>.</p>
    <script>window.location.replace(${JSON.stringify(targetHref)});</script>
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
            fallbackLabel: "Home Finds image",
          })}
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
  const cardImage = idea.cardImage || idea.heroImage;
  const cardAlt = idea.cardAlt || idea.heroAlt;

  const cardInner = `
    ${renderMedia({
      fromFile,
      image: cardImage,
      alt: cardAlt,
      className: "ideas-card-media",
      ratioClass: "ideas-ratio-card",
      fallbackLabel: idea.title,
      slotNote: idea.imageSlot || "",
    })}
    <div class="ideas-card-copy">
      <div class="ideas-card-topline">
        ${idea.badge ? `<p class="ideas-card-kicker">${escapeHtml(idea.badge)}</p>` : ""}
      </div>
      <h3>${escapeHtml(idea.title)}</h3>
      <p>${escapeHtml(idea.dek)}</p>
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
  const cardClass = [
    "ideas-product-card",
    variant === "extras" ? "ideas-product-card-extra" : "ideas-product-card-lead",
    variant !== "extras" && index === 0 ? "is-featured" : "",
  ]
    .filter(Boolean)
    .join(" ");
  const headlineNote = variant === "extras" ? product.whyItHelps : product.description;
  const ctaLabel = product.ctaLabel || "See pick";

  return `
    <article class="${cardClass}">
      <a class="ideas-product-media-link" href="${productHref}" target="_blank" rel="noreferrer noopener" aria-label="${escapeHtml(`Shop ${product.name} on Amazon`)}">
        ${media}
      </a>
      <div class="ideas-product-copy">
        <div class="ideas-product-topline ${variant === "extras" ? "ideas-product-topline-extra" : ""}">
          ${product.badge ? `<span class="ideas-product-badge">${escapeHtml(product.badge)}</span>` : ""}
          ${product.popularityLabel ? `<span class="ideas-product-popularity">${escapeHtml(product.popularityLabel)}</span>` : ""}
        </div>
        <h3>${escapeHtml(product.name)}</h3>
        <p class="ideas-editor-note">${escapeHtml(headlineNote)}</p>
        <div class="ideas-product-actions">
          <a class="ideas-button ideas-button-secondary" href="${productHref}" target="_blank" rel="noreferrer noopener">${escapeHtml(ctaLabel)}</a>
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
  showDisclosure = false,
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
      ${showDisclosure ? renderAffiliateDisclosure() : ""}
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
  cta = "",
}) {
  const tileClass = "ideas-feed-tile";
  const content = `
    ${renderMedia({
      fromFile,
      image,
      alt,
      className: "ideas-feed-media",
      ratioClass: "ideas-feed-ratio",
      fallbackLabel: title,
    })}
    <div class="ideas-feed-overlay">
      ${eyebrow ? `<p class="ideas-feed-eyebrow">${escapeHtml(eyebrow)}</p>` : ""}
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

function buildLandingPage() {
  const file = "ideas/index.html";
  const cuteFindsCategory = getCategoryBySlug("cute-finds-worth-saving");
  const practicalCategory = getCategoryBySlug("pretty-practical-finds");
  const landingTiles = [
    renderLandingFeedTile({
      fromFile: file,
      image: cuteFindsCategory?.heroImage,
      alt: cuteFindsCategory?.coverAlt,
      href: ensureRelativeHref(file, `ideas/categories/${cuteFindsCategory.slug}/index.html`),
      eyebrow: "Cute Finds",
      title: "Cute home finds worth saving.",
      copy: "Warm, pretty pieces for bedrooms, living rooms, patios, and the corners people notice first.",
      cta: "Browse Cute Finds",
    }),
    renderLandingFeedTile({
      fromFile: file,
      image: practicalCategory?.heroImage,
      alt: practicalCategory?.coverAlt,
      href: ensureRelativeHref(file, `ideas/categories/${practicalCategory.slug}/index.html`),
      eyebrow: "Practical Finds",
      title: "Useful little finds that still feel cute.",
      copy: "Garden lights, cozy glow pieces, kitchen helpers, and tidy little organizers from the Amazon links.",
      cta: "Browse Practical Finds",
    }),
  ].join("");

  const body = `
    <main class="ideas-main">
      ${renderIdeasHero({
        fromFile: file,
        kicker: "Home Finds",
        title: "Cute and useful finds for a sweeter home",
        copy:
          "A simplified edit of the two sections worth keeping right now: cute finds people want to save, and practical Amazon finds that still look good at home.",
        image: practicalCategory?.heroImage,
        alt: practicalCategory?.coverAlt,
        actions: `
          <a class="ideas-button ideas-button-primary" href="${escapeHtml(
            ensureRelativeHref(file, `ideas/categories/${cuteFindsCategory.slug}/index.html`),
          )}">Browse Cute Finds</a>
          <a class="ideas-button ideas-button-secondary" href="${escapeHtml(
            ensureRelativeHref(file, `ideas/categories/${practicalCategory.slug}/index.html`),
          )}">See Practical Finds</a>
        `,
      })}

      <section class="ideas-section">
        <div class="ideas-container">
          <div class="ideas-section-heading">
            <p class="ideas-eyebrow">Choose a lane</p>
            <h2>Two simple paths, no extra clutter.</h2>
            <p class="ideas-lede ideas-lede-compact">
              Cute Finds stays as the polished saveable page. Practical Finds turns the Amazon links into a warm, shoppable home edit.
            </p>
          </div>
          ${renderAffiliateDisclosure()}
          <div class="ideas-save-feed ideas-save-feed-compact">${landingTiles}</div>
        </div>
      </section>

      <section class="ideas-section ideas-section-soft">
        <div class="ideas-container">
          ${renderProductGroup({
            fromFile: file,
            eyebrow: "Quick preview",
            title: "A few finds from the simplified shop edit.",
            note:
              "The full pages keep the browsing experience focused, but this gives the landing page a little taste of what is inside.",
            productIds: [
              "brooklyn-coffee-table",
              "kitten-candle-holder",
              "plant-propagation-station",
              "floral-soup-bowl",
              "solar-globe-lights",
            ],
            variant: "lead",
          })}
        </div>
      </section>
    </main>
  `;

  return renderIdeasShell({
    fromFile: file,
    title: "Home Finds | Neighborhood Stewardship Project",
    description:
      "Browse cute finds and practical Amazon finds that make life at home feel sweeter, calmer, and more put together.",
    body,
    active: "ideas",
  });
}

function buildCategoryPage(category) {
  const file = `ideas/categories/${category.slug}/index.html`;
  const liveIdeasForCategory = category.ideaSlugs.map(getIdeaBySlug).filter(Boolean);
  const featuredIdea = liveIdeasForCategory[0];
  const shouldShowFeaturedStory =
    Boolean(featuredIdea) && category.showFeaturedStory !== false;
  const leadProductIds = Array.isArray(category.leadProductIds)
    ? category.leadProductIds
    : category.extraProductIds
      ? []
      : category.featuredProductIds || [];

  const body = `
    <main class="ideas-main">
      <section class="ideas-section ideas-section-first">
        <div class="ideas-container">
          ${renderBreadcrumbs(file, [
            { label: "Home", href: "index.html" },
            { label: "Home Finds", href: homeFindsDefaultFile },
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
          shouldShowFeaturedStory
            ? `
          <a class="ideas-button ideas-button-primary" href="${escapeHtml(
            ensureRelativeHref(file, `ideas/${featuredIdea.slug}/index.html`),
          )}">Read the featured story</a>
        `
            : "",
      })}

      ${
        shouldShowFeaturedStory
          ? `
      <section class="ideas-section">
        <div class="ideas-container">
          <div class="ideas-section-heading">
            <p class="ideas-eyebrow">Featured story</p>
            <h2>${escapeHtml(category.ideasHeading || "Warm little ideas built around the front of the home.")}</h2>
            <p class="ideas-lede ideas-lede-compact">
              Open the story first, then use the products below if you want to pull the same feeling into your own space.
            </p>
          </div>
          <div class="ideas-grid ideas-grid-ideas">
            ${liveIdeasForCategory.map((idea) => renderIdeaCard(file, idea)).join("")}
          </div>
        </div>
      </section>
      `
          : ""
      }

      ${
        leadProductIds.length
          ? `
      <section class="ideas-section ideas-section-soft">
        <div class="ideas-container">
          ${renderProductGroup({
            fromFile: file,
            eyebrow: category.leadProductsEyebrow || "Cute touches",
            title:
              category.leadProductsHeading ||
              category.productsHeading ||
              "The little pieces that make the front feel nicer fast.",
            note:
              "Keep it to the few pieces that do most of the visible work right away.",
            productIds: leadProductIds,
            variant: "lead",
            showDisclosure: true,
          })}
        </div>
      </section>
      `
          : ""
      }

      ${
        category.extraProductIds?.length
          ? `
      <section class="ideas-section">
        <div class="ideas-container">
          ${renderProductGroup({
            fromFile: file,
            eyebrow: category.extraProductsEyebrow || "Helpful extras",
            title:
              category.extraProductsHeading ||
              "A few quiet helpers if you want the look to stay easy.",
            note:
              category.extraProductsNote ||
              "These are the behind-the-scenes pieces that keep the pretty part low stress.",
            productIds: category.extraProductIds,
            variant: "extras",
          })}
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
  const relatedIdeas = idea.relatedIdeaSlugs.map(getIdeaBySlug).filter(Boolean);

  const body = `
    <main class="ideas-main">
      <section class="ideas-section ideas-section-first">
        <div class="ideas-container">
          ${renderBreadcrumbs(file, [
            { label: "Home", href: "index.html" },
            { label: "Home Finds", href: homeFindsDefaultFile },
            { label: category.name, href: `ideas/categories/${category.slug}/index.html` },
            { label: idea.title },
          ])}
        </div>
      </section>

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
        `,
      })}

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

      ${
        leadProductIds.length
          ? `
      <section class="ideas-section ideas-section-soft">
        <div class="ideas-container">
          ${renderProductGroup({
            fromFile: file,
            eyebrow: idea.leadProductsEyebrow || "Cute touches",
            title:
              idea.leadProductsHeading ||
              "The little pieces that make this idea feel especially good.",
            note:
              "Start with the few pieces that carry most of the visible charm.",
            productIds: leadProductIds,
            variant: "lead",
            showDisclosure: true,
          })}
        </div>
      </section>
      `
          : ""
      }

      ${
        idea.extraProductIds?.length
          ? `
      <section class="ideas-section">
        <div class="ideas-container">
          ${renderProductGroup({
            fromFile: file,
            eyebrow: "Helpful extras",
            title: "A few quiet helpers if you want it to stay easy.",
            note:
              "These are the behind-the-scenes pieces that keep the cute part low stress.",
            productIds: idea.extraProductIds,
            variant: "extras",
          })}
        </div>
      </section>
      `
          : ""
      }

      ${
        relatedIdeas.length
          ? `
      <section class="ideas-section">
        <div class="ideas-container">
          <div class="ideas-section-heading">
            <p class="ideas-eyebrow">More in ${escapeHtml(category.name)}</p>
            <h2>More to explore.</h2>
          </div>
          <div class="ideas-grid ideas-grid-ideas">
            ${relatedIdeas.map((relatedIdea) => renderIdeaCard(file, relatedIdea)).join("")}
          </div>
        </div>
      </section>
      `
          : ""
      }
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
  { file: "ideas/index.html", html: buildRedirectPage("ideas/index.html", homeFindsDefaultFile) },
  ...liveCategories.map((category) => ({
    file: `ideas/categories/${category.slug}/index.html`,
    html: buildCategoryPage(category),
  })),
  ...liveIdeas.map((idea) => ({
    file: `ideas/${idea.slug}/index.html`,
    html: buildIdeaPage(idea),
  })),
  ...[
    "ideas/categories/front-door-porch-charm/index.html",
    "ideas/categories/seasonal-sweetness/index.html",
    "ideas/cute-front-door-ideas-that-feel-warm-right-away/index.html",
    "ideas/little-house-details-people-notice-right-away/index.html",
    "ideas/pretty-front-step-flowers-that-make-everything-feel-sweeter/index.html",
  ].map((file) => ({
    file,
    html: buildRedirectPage(file, homeFindsDefaultFile),
  })),
];

await Promise.all(
  outputPages.map(async ({ file, html }) => {
    const outputPath = path.join(rootDir, file);
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, html, "utf8");
  }),
);

console.log(`Generated ${outputPages.length} Home Finds pages.`);
