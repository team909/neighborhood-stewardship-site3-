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
        )}">${escapeHtml(category.name)}</a>
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
            A calm, practical edit of porch, garden, and curb appeal ideas that begin with the home and use products only where they help.
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
  const isPlaceholderLink = product.affiliateUrl.includes("replace-with-real-link");
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
        ${
          isPlaceholderLink
            ? `<p class="ideas-product-utility">Manual link placeholder. Replace this destination before launch.</p>`
            : ""
        }
        <a class="ideas-button ${isPlaceholderLink ? "ideas-button-utility" : "ideas-button-secondary"}" href="${escapeHtml(product.affiliateUrl)}" target="_blank" rel="noreferrer noopener">${escapeHtml(product.ctaLabel)}</a>
      </div>
    </article>
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

function buildLandingPage() {
  const file = "ideas/index.html";
  const featuredCategory = liveCategories[0];
  const featuredIdea = liveIdeas[0];
  const liveIdeaCards = liveIdeas.slice(0, 3);
  const featuredProducts = featuredCategory.featuredProductIds
    .map(getProductById)
    .filter(Boolean);

  const body = `
    <main class="ideas-main">
      ${renderIdeasHero({
        fromFile: file,
        kicker: "Neighborhood Ideas",
        title: "Beautiful, practical ideas for porches, entries, gardens, and everyday curb appeal.",
        copy:
          "A calm editorial place to browse small home and garden ideas that feel lived in, realistic, and worth keeping up over time.",
        image: featuredCategory.heroImage,
        alt: featuredCategory.coverAlt,
        actions: `
          <a class="ideas-button ideas-button-primary" href="${escapeHtml(
            ensureRelativeHref(file, `ideas/categories/${featuredCategory.slug}/index.html`),
          )}">Explore ${escapeHtml(featuredCategory.name)}</a>
          <a class="ideas-button ideas-button-secondary" href="${escapeHtml(
            ensureRelativeHref(file, `ideas/${featuredIdea.slug}/index.html`),
          )}">Read the first idea</a>
        `,
      })}

      <section class="ideas-section">
        <div class="ideas-container">
          <div class="ideas-section-heading">
            <p class="ideas-eyebrow">Browse by category</p>
            <h2>Start with the part of the home people notice first.</h2>
            <p class="ideas-lede ideas-lede-compact">
              Each category starts with the outcome, not the product. The point is to make a home feel more cared for in ways that are practical to keep up.
            </p>
          </div>
          <div class="ideas-grid ideas-grid-categories">
            ${categories.map((category) => renderCategoryCard(file, category)).join("")}
          </div>
        </div>
      </section>

      ${renderEditorialSplit({
        fromFile: file,
        eyebrow: "Featured idea",
        title: featuredIdea.title,
        copy:
          "The first live idea in the collection focuses on a front walk: the approach, the light, the mat, and the few details that make a home feel settled before anyone reaches the door.",
        image: featuredIdea.gallery[0]?.image || featuredIdea.heroImage,
        alt: featuredIdea.gallery[0]?.alt || featuredIdea.heroAlt,
        actionHref: ensureRelativeHref(file, `ideas/${featuredIdea.slug}/index.html`),
        actionLabel: "Read the featured idea",
      })}

      <section class="ideas-section">
        <div class="ideas-container">
          <div class="ideas-section-heading">
            <p class="ideas-eyebrow">Now live</p>
            <h2>A growing collection of practical neighborhood ideas.</h2>
            <p class="ideas-lede ideas-lede-compact">
              The collection begins with the walk up, the planted edge around it, and the modest curb-side fixes that can make a house feel more settled right away.
            </p>
          </div>
          <div class="ideas-grid ideas-grid-ideas">
            ${liveIdeaCards.map((idea) => renderIdeaCard(file, idea)).join("")}
          </div>
        </div>
      </section>

      <section class="ideas-section ideas-section-soft">
        <div class="ideas-container">
          <div class="ideas-section-heading">
            <p class="ideas-eyebrow">Curated product cards</p>
            <h2>Products only where they help the idea.</h2>
            <p class="ideas-lede ideas-lede-compact">
              This section is meant to feel editorial, not transactional. The products are here to support the outcome and stay secondary to the home itself.
            </p>
          </div>
          <div class="ideas-grid ideas-grid-products">
            ${featuredProducts.map((product) => renderProductCard(file, product)).join("")}
          </div>
          ${renderDisclosure(
            "These product links point to Amazon search pages chosen to stay broad, stable, and easy to update later if you want tighter curation.",
          )}
        </div>
      </section>
    </main>
  `;

  return renderIdeasShell({
    fromFile: file,
    title: "Neighborhood Ideas | Neighborhood Stewardship Project",
    description:
      "Browse warm, practical porch, garden, curb appeal, and essentials ideas in a calm editorial format.",
    body,
    active: "ideas",
  });
}

function buildCategoryPage(category) {
  const file = `ideas/categories/${category.slug}/index.html`;
  const liveIdeasForCategory = category.ideaSlugs.map(getIdeaBySlug).filter(Boolean);
  const products = category.featuredProductIds.map(getProductById).filter(Boolean);
  const featuredIdea = liveIdeasForCategory[0];

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
          )}">Read the first idea</a>
        `
            : "",
      })}

      <section class="ideas-section">
        <div class="ideas-container">
          <div class="ideas-section-heading">
            <p class="ideas-eyebrow">Ideas in this category</p>
            <h2>${escapeHtml(category.ideasHeading || "Practical ideas built around the front of the home.")}</h2>
          </div>
          <div class="ideas-grid ideas-grid-ideas">
            ${liveIdeasForCategory.map((idea) => renderIdeaCard(file, idea)).join("")}
          </div>
        </div>
      </section>

      <section class="ideas-section ideas-section-soft">
        <div class="ideas-container">
          <div class="ideas-section-heading">
            <p class="ideas-eyebrow">Helpful starting pieces</p>
            <h2>${escapeHtml(
              category.productsHeading ||
                "A few practical picks that support the idea without turning it into a shopping list.",
            )}</h2>
          </div>
          <div class="ideas-grid ideas-grid-products">
            ${products.map((product) => renderProductCard(file, product)).join("")}
          </div>
          ${renderDisclosure(
            "These product links point to Amazon search pages chosen to stay broad, stable, and easy to refine later if you want a more specific recommendation.",
          )}
        </div>
      </section>
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
  const products = idea.productIds.map(getProductById).filter(Boolean);
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
          <a class="ideas-button ideas-button-secondary" href="${escapeHtml(
            ensureRelativeHref(file, "index.html"),
          )}#recognition">Back to recognition</a>
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
            <h2>Four practical moves that hold up in everyday use.</h2>
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
            <p class="ideas-eyebrow">Care notes</p>
            <ul class="ideas-note-list">
              ${idea.careNotes.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}
            </ul>
          </article>
          <article class="ideas-note-card">
            <p class="ideas-eyebrow">Seasonal notes</p>
            <ul class="ideas-note-list">
              ${idea.seasonalNotes.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}
            </ul>
          </article>
        </div>
      </section>

      <section class="ideas-section ideas-section-soft">
        <div class="ideas-container">
          <div class="ideas-section-heading">
            <p class="ideas-eyebrow">Curated products</p>
            <h2>Products that support the idea without becoming the point.</h2>
          </div>
          <div class="ideas-grid ideas-grid-products">
            ${products.map((product) => renderProductCard(file, product)).join("")}
          </div>
          ${renderDisclosure(
            "These product links point to Amazon search pages chosen to stay broad, stable, and aligned with the idea without locking the page to one exact listing.",
          )}
        </div>
      </section>

      <section class="ideas-section">
        <div class="ideas-container">
          <div class="ideas-section-heading">
            <p class="ideas-eyebrow">More in ${escapeHtml(category.name)}</p>
            <h2>More ideas are on the way.</h2>
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
