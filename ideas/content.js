export const IDEAS_IMAGE_ASSETS = {
  categories: {
    porchEntry: "assets/Editorial/why-it-matters.jpg",
    gardenFlowers: "assets/Editorial/around-the-block.jpg",
    curbAppealBasics: "assets/Editorial/wilbraham-story-card.jpg",
    toolsEssentials: null,
  },
  ideas: {
    frontWalkHero: "assets/Editorial/why-it-matters.jpg",
    frontWalkGalleryStreet: "assets/Editorial/around-the-block.jpg",
    frontWalkGalleryPorch: "assets/Editorial/longmeadow-porch-light-story-card.jpg",
    hydrangeasHero: "assets/Editorial/why-it-matters.jpg",
    hydrangeasGalleryBed: "assets/Editorial/around-the-block.jpg",
    hydrangeasGalleryYard: "assets/Editorial/wilbraham-story-card.jpg",
    curbAppealHero: "assets/Editorial/wilbraham-story-card.jpg",
    curbAppealGalleryPorch: "assets/Editorial/longmeadow-porch-light-story-card.jpg",
    curbAppealGalleryDrive: "assets/Editorial/around-the-block.jpg",
  },
  products: {
    weatherReadyDoormat: "assets/Products/weather-ready-doormat.jpg",
    warmEntryLight: "assets/Products/warm-entry-light.jpg",
    darkEntryPlanter: "assets/Products/dark-entry-planter.jpg",
    bedEdgeSpade: "assets/Products/stone-edge-bed-shovel.jpg",
    darkBarkMulch: "assets/Products/hydrangea-friendly-mulch.jpg",
    wateringWand: "assets/Products/entry-watering-wand.jpg",
    houseNumbers: "assets/Products/matte-black-house-numbers.jpg",
    mailboxRefresh: "assets/Products/classic-mailbox-post-refresh.jpg",
    outdoorBroom: "assets/Products/wide-outdoor-broom.jpg",
  },
};

export const IDEAS_IMAGE_SLOTS = {
  categories: {
    toolsEssentials:
      "Add one horizontal cover image for Tools & Essentials (4:3, porch or shed-side tools detail).",
  },
  ideas: {
    porchLighting:
      "Add one 16:9 hero image for Porch Lighting That Feels Warm at Dusk.",
    entryPlanter:
      "Add one 16:9 hero image for An Entry Planter That Softens the Door.",
    frontBed:
      "Add one 16:9 hero image for A Front Bed That Softens the Walk.",
    flowerBeds:
      "Add one 16:9 hero image for Flower Beds That Hold Their Shape.",
    houseNumbers:
      "Add one 16:9 hero image for Clean House Numbers That Read Fast.",
    mailboxArea:
      "Add one 16:9 hero image for A Mailbox Area That Doesn’t Drag Down the Front.",
  },
  products: {
    weatherReadyDoormat:
      "Add one square product image for the weather-ready coir mat.",
    warmEntryLight:
      "Add one square product image for the warm-glow porch light.",
    darkEntryPlanter:
      "Add one square product image for the dark entry planter.",
    bedEdgeSpade:
      "Add one square product image for the stone-edge bed shovel.",
    darkBarkMulch:
      "Add one square product image for the dark bark mulch.",
    wateringWand:
      "Add one square product image for the entry watering wand.",
    houseNumbers:
      "Add one square product image for the matte black house numbers.",
    mailboxRefresh:
      "Add one square product image for the mailbox refresh set.",
    outdoorBroom:
      "Add one square product image for the wide outdoor broom.",
  },
};

export const PRODUCT_LINKS = {
  porchEntry: {
    weatherReadyDoormat:
      "https://www.amazon.com/s?k=waterproof+coir+doormat+outdoor+entrance",
    warmEntryLight:
      "https://www.amazon.com/s?k=matte+black+modern+outdoor+light+fixture",
    darkEntryPlanter: "https://www.amazon.com/s?k=black+outdoor+planter",
  },
  gardenFlowers: {
    bedEdgeSpade: "https://www.amazon.com/s?k=edging+shovel",
    darkBarkMulch: "https://www.amazon.com/s?k=dark+bark+mulch",
    wateringWand: "https://www.amazon.com/s?k=watering+wand",
  },
  curbAppealBasics: {
    houseNumbers: "https://www.amazon.com/s?k=matte+black+house+numbers",
    mailboxRefresh: "https://www.amazon.com/s?k=mailbox+with+post",
    outdoorBroom: "https://www.amazon.com/s?k=outdoor+broom+for+porch",
  },
};

export const categories = [
  {
    slug: "porch-entry",
    name: "Porch & Entry",
    kicker: "Neighborhood Ideas",
    description:
      "Small entry details that make a home feel warm, settled, and cared for from the curb.",
    heroImage: IDEAS_IMAGE_ASSETS.categories.porchEntry,
    coverAlt: "A front walk leading to a lit porch at dusk.",
    intro:
      "This category focuses on the first few seconds people have with a home: the walk up, the lighting, the mat, and the small signs that someone is paying attention.",
    ideaSlugs: ["front-walk-that-sets-the-tone"],
    featuredProductIds: [
      "weather-ready-doormat",
      "warm-entry-light",
      "dark-entry-planter",
    ],
    ideasHeading:
      "Simple entry changes that make a home feel calmer from the curb.",
    productsHeading:
      "Three practical picks that support the entry without cluttering it.",
    seoTitle: "Porch & Entry Ideas | Neighborhood Stewardship Project",
    seoDescription:
      "Browse warm, practical porch and entry ideas that help a home feel more cared for from the first step in.",
    live: true,
  },
  {
    slug: "garden-flowers",
    name: "Garden & Flowers",
    kicker: "Neighborhood Ideas",
    description:
      "Planting ideas that soften a front edge and make a home feel looked after through the season.",
    heroImage: IDEAS_IMAGE_ASSETS.categories.gardenFlowers,
    coverAlt: "A tidy front yard with planted beds, a clean walk, and a warm porch light.",
    intro:
      "Garden and flower ideas start with restraint: one bed that holds its shape, one planted edge that softens the steps, and choices that still look good when the week gets busy.",
    ideaSlugs: ["hydrangeas-that-soften-the-steps"],
    featuredProductIds: [
      "stone-edge-bed-shovel",
      "hydrangea-friendly-mulch",
      "entry-watering-wand",
    ],
    ideasHeading:
      "Front-bed ideas that make the walk feel softer and more settled.",
    productsHeading:
      "A few useful picks that support the bed without turning it into a shopping list.",
    seoTitle: "Garden & Flowers Ideas | Neighborhood Stewardship Project",
    seoDescription:
      "Browse calm, practical garden and flower ideas for front beds, entries, and curb-facing planting.",
    live: true,
  },
  {
    slug: "curb-appeal-basics",
    name: "Curb Appeal Basics",
    kicker: "Neighborhood Ideas",
    description:
      "Useful, non-flashy routines that help a home read as clean, steady, and well kept.",
    heroImage: IDEAS_IMAGE_ASSETS.categories.curbAppealBasics,
    coverAlt:
      "A cared-for home with tidy lawn edges and a clear front approach.",
    intro:
      "Curb appeal basics are often the simplest things to maintain: a sharper edge at the lawn, a cleaner mailbox area, numbers that read clearly, and a few small updates that make the house feel steadily looked after.",
    ideaSlugs: ["easy-curb-appeal-upgrades-under-100"],
    featuredProductIds: [
      "matte-black-house-numbers",
      "classic-mailbox-post-refresh",
      "wide-outdoor-broom",
    ],
    ideasHeading:
      "Low-cost upgrades that make a house feel more settled without trying too hard.",
    productsHeading:
      "A few practical basics that help the front of the house read cleaner and more cared for.",
    seoTitle: "Curb Appeal Basics | Neighborhood Stewardship Project",
    seoDescription:
      "Browse practical curb appeal ideas built around upkeep, clarity, and modest upgrades that make a home feel more cared for.",
    live: true,
  },
  {
    slug: "tools-essentials",
    name: "Tools & Essentials",
    kicker: "Coming soon",
    description:
      "A calm edit of practical tools and outdoor essentials that support care without clutter.",
    heroImage: IDEAS_IMAGE_ASSETS.categories.toolsEssentials,
    imageSlot: IDEAS_IMAGE_SLOTS.categories.toolsEssentials,
    coverAlt: "A curated tools and essentials placeholder.",
    intro:
      "This category will collect the simple tools, bins, lights, and entry pieces that make maintenance easier to keep up.",
    ideaSlugs: [],
    featuredProductIds: [],
    seoTitle: "Tools & Essentials | Neighborhood Stewardship Project",
    seoDescription:
      "Coming soon: a practical edit of entry, garden, and curb care essentials.",
    live: false,
  },
];

export const ideaPages = [
  {
    slug: "front-walk-that-sets-the-tone",
    categorySlug: "porch-entry",
    title: "A Front Walk That Sets the Tone",
    dek:
      "A clean path, one clear light source, and a few steady details can make an entry feel more settled without making it feel staged.",
    heroImage: IDEAS_IMAGE_ASSETS.ideas.frontWalkHero,
    heroAlt:
      "A front walk curving toward a warmly lit porch with flowers by the steps.",
    gallery: [
      {
        image: IDEAS_IMAGE_ASSETS.ideas.frontWalkGalleryStreet,
        alt: "A clean sidewalk edge and simple front planting near a ranch home.",
      },
      {
        image: IDEAS_IMAGE_ASSETS.ideas.frontWalkGalleryPorch,
        alt: "A front porch with evening light and a maintained walkway.",
      },
    ],
    intro:
      "The front walk is often the first thing a neighbor, guest, or passerby notices. It does not need to be elaborate. It only needs to feel clear, intentional, and easy to keep up over time.",
    whyItWorks: [
      "A front walk sets expectations before anyone reaches the door. When the edges are swept, the lighting feels warm, and the approach is uncluttered, the whole house reads as more looked after.",
      "The goal is not to create a showpiece. It is to create an entry that feels steady, practical, and welcoming in ordinary daily use.",
    ],
    steps: [
      {
        title: "Keep the path visually clear",
        body:
          "Start with the concrete itself. Sweep debris, trim plant spillover, and keep the edges readable so the walk feels intentional from the curb.",
      },
      {
        title: "Add one warm point of light",
        body:
          "A single porch light or entry lantern at dusk changes the tone immediately. It helps the home feel occupied, calm, and easier to approach.",
      },
      {
        title: "Use one grounded entry object",
        body:
          "A simple mat, planter, or low bench can anchor the entry without crowding it. One useful object is usually enough.",
      },
      {
        title: "Choose maintenance you can actually keep up",
        body:
          "The best entry ideas are the ones that still look cared for on a normal Tuesday. Durable materials matter more than decorative excess.",
      },
    ],
    careNotes: [
      "Sweep the walk weekly during the active season.",
      "Replace tired mats before they fray at the edges.",
      "Keep planters simple and prune anything that spills too far into the path.",
    ],
    seasonalNotes: [
      "In spring and summer, focus on edging, mulch touch-ups, and one planted accent.",
      "In fall and winter, keep the walk free of leaves, grit, and clutter so the entry still reads clearly.",
    ],
    productIds: [
      "weather-ready-doormat",
      "warm-entry-light",
      "dark-entry-planter",
    ],
    relatedIdeaSlugs: [
      "porch-lighting-that-feels-warm",
      "an-entry-planter-that-softens-the-door",
    ],
    seoTitle: "A Front Walk That Sets the Tone | Neighborhood Ideas",
    seoDescription:
      "A practical porch and entry idea for making the first steps to a home feel cleaner, warmer, and more cared for.",
    badge: "Featured idea",
    popularityLabel: "Easy first upgrade",
    editorNote:
      "Start with the path itself before adding anything decorative. A clean walk usually changes the whole impression first.",
    live: true,
  },
  {
    slug: "hydrangeas-that-soften-the-steps",
    categorySlug: "garden-flowers",
    title: "Hydrangeas That Soften the Steps",
    dek:
      "One planted edge by the walk can make a front approach feel friendlier, fuller, and more settled without turning the entry into a garden project.",
    heroImage: IDEAS_IMAGE_ASSETS.ideas.hydrangeasHero,
    heroAlt:
      "Hydrangeas and layered plantings softening the steps to a porch at dusk.",
    gallery: [
      {
        image: IDEAS_IMAGE_ASSETS.ideas.hydrangeasGalleryBed,
        alt: "A simple front bed wrapping a clean walk near a modest ranch house.",
      },
      {
        image: IDEAS_IMAGE_ASSETS.ideas.hydrangeasGalleryYard,
        alt: "A front yard with warm planting shapes and a tidy entry edge.",
      },
    ],
    intro:
      "Front beds work best when they calm the approach rather than compete with it. A few shrubs with enough room to mature, a dark mulch bed that stays contained, and one repeatable shape near the steps can make a house feel more settled before anyone reaches the porch.",
    whyItWorks: [
      "A soft planted edge changes how a home meets the sidewalk. It makes the entry feel looked after without making it feel precious or overly styled.",
      "Hydrangeas, hostas, and other rounded plantings work well here because they fill space generously, hold the line of the walk, and still read clearly from the street.",
    ],
    steps: [
      {
        title: "Keep the bed close to the entry simple",
        body:
          "Choose one main flowering shrub and one or two steady green companions. Too many small choices make the bed harder to keep clean.",
      },
      {
        title: "Shape the edge so the walk still reads clearly",
        body:
          "The goal is softness, not spillover. The planted edge should frame the path, not close in on it.",
      },
      {
        title: "Mulch deeply enough to calm the bed",
        body:
          "Fresh mulch creates visual order fast. It helps the flowers and foliage read as intentional even when everything is not in peak bloom.",
      },
      {
        title: "Plant for a good normal week, not for one perfect weekend",
        body:
          "Use varieties that still look respectable after a missed watering or a stretch of rain. Dependable structure matters more than a short bloom moment.",
      },
    ],
    careNotes: [
      "Cut back damaged stems before the active season starts.",
      "Keep mulch off the stems and refresh the edge line when it begins to blur.",
      "Deadhead only if it improves the look; a good shrub should still carry itself well.",
    ],
    seasonalNotes: [
      "In spring, focus on shape and fresh mulch before adding any annual color.",
      "In late summer, let the bed mature naturally instead of forcing a second round of planting.",
    ],
    productIds: [
      "stone-edge-bed-shovel",
      "hydrangea-friendly-mulch",
      "entry-watering-wand",
    ],
    relatedIdeaSlugs: [
      "a-front-walk-that-sets-the-tone-garden",
      "flower-beds-that-hold-their-shape",
    ],
    seoTitle: "Hydrangeas That Soften the Steps | Neighborhood Ideas",
    seoDescription:
      "A calm front-bed idea for softening porch steps and making an entry feel more settled from the street.",
    badge: "Garden idea",
    popularityLabel: "Front-bed favorite",
    editorNote:
      "The bed should support the entry, not overpower it. If the walk still reads first, the planting is doing its job.",
    live: true,
  },
  {
    slug: "easy-curb-appeal-upgrades-under-100",
    categorySlug: "curb-appeal-basics",
    title: "Easy Curb Appeal Upgrades Under $100",
    dek:
      "A few low-cost changes at the front of the house can make everything feel more intentional: cleaner numbers, a sharper walk edge, and one or two details that read clearly from the street.",
    heroImage: IDEAS_IMAGE_ASSETS.ideas.curbAppealHero,
    heroAlt:
      "A tidy front yard and house exterior with a calm, well-kept curb-facing view.",
    gallery: [
      {
        image: IDEAS_IMAGE_ASSETS.ideas.curbAppealGalleryPorch,
        alt: "A front porch and lawn that feel steady and well maintained.",
      },
      {
        image: IDEAS_IMAGE_ASSETS.ideas.curbAppealGalleryDrive,
        alt: "A driveway edge, walk, and flower bed that give the house a more settled look.",
      },
    ],
    intro:
      "A lot of curb appeal is built from the ordinary parts of a house that either look cared for or start to blur together when nobody gets around to them. This kind of upgrade is less about decorating and more about restoring clarity to the front of the property.",
    whyItWorks: [
      "When the mailbox area looks upright, the house numbers read cleanly, and the walk edge is kept in line, the whole property feels more settled even before anyone notices the details separately.",
      "Small fixes work well here because they are realistic to finish and maintain. The point is not to transform the house. It is to help it keep showing up well every week.",
    ],
    steps: [
      {
        title: "Start with what reads from the street",
        body:
          "House numbers, the mailbox, and the first edge of the lawn are the parts people register quickly. If those look clear, the whole property already feels more looked after.",
      },
      {
        title: "Refresh one tired element instead of five small ones",
        body:
          "Choose the thing that currently makes the front feel neglected, whether that is faded numbers, a leaning mailbox, or a dirty walk edge.",
      },
      {
        title: "Use one dark, simple finish",
        body:
          "Black or dark bronze works well for numbers, hooks, small hardware, and mailbox pieces because it reads crisp without looking flashy.",
      },
      {
        title: "End with a maintenance tool you will actually use",
        body:
          "A broom, edging spade, or hose attachment can matter more than another decorative item because it helps the front stay clean in ordinary use.",
      },
    ],
    careNotes: [
      "Clean the walk edge and mailbox area before adding any new hardware.",
      "Check that numbers remain visible from the street, especially at dusk.",
      "If a finish starts to chip, touch it up early before the front begins to look tired again.",
    ],
    seasonalNotes: [
      "Spring is the best time to reset the front edge, refresh numbers, and clean winter residue off the walk.",
      "In fall, keep leaves from collecting around the mailbox base and front step so the upgrades still read clearly.",
    ],
    productIds: [
      "matte-black-house-numbers",
      "classic-mailbox-post-refresh",
      "wide-outdoor-broom",
    ],
    relatedIdeaSlugs: [
      "clean-house-numbers-that-read-fast",
      "a-mailbox-area-that-doesnt-drag-down-the-front",
    ],
    seoTitle:
      "Easy Curb Appeal Upgrades Under $100 | Neighborhood Ideas",
    seoDescription:
      "A practical curb appeal idea built around modest upgrades that make the front of a house feel cleaner, clearer, and more cared for.",
    badge: "Budget-friendly",
    popularityLabel: "High impact, low effort",
    editorNote:
      "The best low-cost curb appeal changes are usually the ones that restore clarity, not the ones that add more things.",
    live: true,
  },
  {
    slug: "porch-lighting-that-feels-warm",
    categorySlug: "porch-entry",
    title: "Porch Lighting That Feels Warm at Dusk",
    dek: "Coming soon.",
    heroImage: null,
    imageSlot: IDEAS_IMAGE_SLOTS.ideas.porchLighting,
    heroAlt: "Porch lighting idea coming soon.",
    gallery: [],
    intro: "Coming soon.",
    whyItWorks: [],
    steps: [],
    careNotes: [],
    seasonalNotes: [],
    productIds: [],
    relatedIdeaSlugs: [],
    seoTitle: "Porch Lighting That Feels Warm at Dusk | Neighborhood Ideas",
    seoDescription: "Coming soon.",
    badge: "Coming soon",
    popularityLabel: null,
    editorNote: null,
    live: false,
  },
  {
    slug: "an-entry-planter-that-softens-the-door",
    categorySlug: "porch-entry",
    title: "An Entry Planter That Softens the Door",
    dek: "Coming soon.",
    heroImage: null,
    imageSlot: IDEAS_IMAGE_SLOTS.ideas.entryPlanter,
    heroAlt: "Entry planter idea coming soon.",
    gallery: [],
    intro: "Coming soon.",
    whyItWorks: [],
    steps: [],
    careNotes: [],
    seasonalNotes: [],
    productIds: [],
    relatedIdeaSlugs: [],
    seoTitle: "An Entry Planter That Softens the Door | Neighborhood Ideas",
    seoDescription: "Coming soon.",
    badge: "Coming soon",
    popularityLabel: null,
    editorNote: null,
    live: false,
  },
  {
    slug: "a-front-walk-that-sets-the-tone-garden",
    categorySlug: "garden-flowers",
    title: "A Front Bed That Softens the Walk",
    dek: "Coming soon.",
    heroImage: null,
    imageSlot: IDEAS_IMAGE_SLOTS.ideas.frontBed,
    heroAlt: "Front bed idea coming soon.",
    gallery: [],
    intro: "Coming soon.",
    whyItWorks: [],
    steps: [],
    careNotes: [],
    seasonalNotes: [],
    productIds: [],
    relatedIdeaSlugs: [],
    seoTitle: "A Front Bed That Softens the Walk | Neighborhood Ideas",
    seoDescription: "Coming soon.",
    badge: "Coming soon",
    popularityLabel: null,
    editorNote: null,
    live: false,
  },
  {
    slug: "flower-beds-that-hold-their-shape",
    categorySlug: "garden-flowers",
    title: "Flower Beds That Hold Their Shape",
    dek: "Coming soon.",
    heroImage: null,
    imageSlot: IDEAS_IMAGE_SLOTS.ideas.flowerBeds,
    heroAlt: "Flower bed idea coming soon.",
    gallery: [],
    intro: "Coming soon.",
    whyItWorks: [],
    steps: [],
    careNotes: [],
    seasonalNotes: [],
    productIds: [],
    relatedIdeaSlugs: [],
    seoTitle: "Flower Beds That Hold Their Shape | Neighborhood Ideas",
    seoDescription: "Coming soon.",
    badge: "Coming soon",
    popularityLabel: null,
    editorNote: null,
    live: false,
  },
  {
    slug: "clean-house-numbers-that-read-fast",
    categorySlug: "curb-appeal-basics",
    title: "Clean House Numbers That Read Fast",
    dek: "Coming soon.",
    heroImage: null,
    imageSlot: IDEAS_IMAGE_SLOTS.ideas.houseNumbers,
    heroAlt: "House numbers idea coming soon.",
    gallery: [],
    intro: "Coming soon.",
    whyItWorks: [],
    steps: [],
    careNotes: [],
    seasonalNotes: [],
    productIds: [],
    relatedIdeaSlugs: [],
    seoTitle: "Clean House Numbers That Read Fast | Neighborhood Ideas",
    seoDescription: "Coming soon.",
    badge: "Coming soon",
    popularityLabel: null,
    editorNote: null,
    live: false,
  },
  {
    slug: "a-mailbox-area-that-doesnt-drag-down-the-front",
    categorySlug: "curb-appeal-basics",
    title: "A Mailbox Area That Doesn’t Drag Down the Front",
    dek: "Coming soon.",
    heroImage: null,
    imageSlot: IDEAS_IMAGE_SLOTS.ideas.mailboxArea,
    heroAlt: "Mailbox area idea coming soon.",
    gallery: [],
    intro: "Coming soon.",
    whyItWorks: [],
    steps: [],
    careNotes: [],
    seasonalNotes: [],
    productIds: [],
    relatedIdeaSlugs: [],
    seoTitle:
      "A Mailbox Area That Doesn’t Drag Down the Front | Neighborhood Ideas",
    seoDescription: "Coming soon.",
    badge: "Coming soon",
    popularityLabel: null,
    editorNote: null,
    live: false,
  },
];

export const productCards = [
  {
    id: "weather-ready-doormat",
    name: "Weather-ready coir mat",
    brand: "Entry edit",
    image: IDEAS_IMAGE_ASSETS.products.weatherReadyDoormat,
    imageSlot: IDEAS_IMAGE_SLOTS.products.weatherReadyDoormat,
    imageAlt: "A durable coir doormat placed at a front door.",
    merchant: "Amazon",
    priceLabel: "Under $40",
    affiliateUrl: PRODUCT_LINKS.porchEntry.weatherReadyDoormat,
    description:
      "A straightforward mat that makes the entry feel anchored and catches grit before it travels inside.",
    whyItHelps:
      "One of the fastest ways to make an entry feel intentional without adding visual clutter.",
    tags: ["Entry", "Practical", "Low effort"],
    disclosure:
      "This product link points to Amazon and is meant to support the idea without taking over the page.",
    ctaLabel: "Browse on Amazon",
    badge: "Practical pick",
    popularityLabel: "Most useful first step",
    editorNote:
      "Choose a plain edge and a deep neutral color so it still looks good when the weather changes.",
  },
  {
    id: "warm-entry-light",
    name: "Warm-glow porch light",
    brand: "Lighting edit",
    image: IDEAS_IMAGE_ASSETS.products.warmEntryLight,
    imageSlot: IDEAS_IMAGE_SLOTS.products.warmEntryLight,
    imageAlt: "A simple porch light with a warm evening glow.",
    merchant: "Amazon",
    priceLabel: "Under $80",
    affiliateUrl: PRODUCT_LINKS.porchEntry.warmEntryLight,
    description:
      "A single warm light source can make the whole approach feel calmer and more occupied after sunset.",
    whyItHelps:
      "Lighting changes tone faster than almost any other entry update.",
    tags: ["Evening", "Porch", "Warm light"],
    disclosure:
      "This product link points to Amazon and is meant to support the idea without taking over the page.",
    ctaLabel: "Browse on Amazon",
    badge: "Evening upgrade",
    popularityLabel: "Best at dusk",
    editorNote:
      "Look for a warmer bulb temperature and a shape that matches the home rather than competing with it.",
  },
  {
    id: "dark-entry-planter",
    name: "Dark olive entry planter",
    brand: "Outdoor edit",
    image: IDEAS_IMAGE_ASSETS.products.darkEntryPlanter,
    imageSlot: IDEAS_IMAGE_SLOTS.products.darkEntryPlanter,
    imageAlt: "A simple dark planter placed beside an entry step.",
    merchant: "Amazon",
    priceLabel: "Under $60",
    affiliateUrl: PRODUCT_LINKS.porchEntry.darkEntryPlanter,
    description:
      "A grounded planter can soften a doorway and add life without making the path feel crowded.",
    whyItHelps:
      "It gives the entry one calm point of focus and works across seasons.",
    tags: ["Planter", "Entry", "All season"],
    disclosure:
      "This product link points to Amazon and is meant to support the idea without taking over the page.",
    ctaLabel: "Browse on Amazon",
    badge: "Editor note",
    popularityLabel: null,
    editorNote:
      "Use one planter with a healthy, easy-to-maintain planting instead of several smaller pieces.",
  },
  {
    id: "stone-edge-bed-shovel",
    name: "Bed-edge spade",
    brand: "Garden edit",
    image: IDEAS_IMAGE_ASSETS.products.bedEdgeSpade,
    imageSlot: IDEAS_IMAGE_SLOTS.products.bedEdgeSpade,
    imageAlt: "A narrow garden spade for defining the edge of a flower bed.",
    merchant: "Amazon",
    priceLabel: "Under $45",
    affiliateUrl: PRODUCT_LINKS.gardenFlowers.bedEdgeSpade,
    description:
      "A narrow spade helps keep the line between walk and planting bed crisp, which changes the look of the whole entry quickly.",
    whyItHelps:
      "Clean edges are often more important than adding more flowers.",
    tags: ["Garden", "Edges", "Useful"],
    disclosure:
      "This product link points to Amazon and is meant to support the idea without taking over the page.",
    ctaLabel: "Browse on Amazon",
    badge: "Most practical",
    popularityLabel: "High-impact tool",
    editorNote:
      "If the bed line stays sharp, the whole planting reads as more deliberate even before anything blooms.",
  },
  {
    id: "hydrangea-friendly-mulch",
    name: "Dark bark mulch",
    brand: "Garden edit",
    image: IDEAS_IMAGE_ASSETS.products.darkBarkMulch,
    imageSlot: IDEAS_IMAGE_SLOTS.products.darkBarkMulch,
    imageAlt: "A dark mulch spread through a front flower bed.",
    merchant: "Amazon",
    priceLabel: "Under $20",
    affiliateUrl: PRODUCT_LINKS.gardenFlowers.darkBarkMulch,
    description:
      "A dark mulch layer settles the bed visually and gives the flowers and foliage a cleaner backdrop.",
    whyItHelps:
      "Fresh mulch can make a modest bed feel finished faster than almost anything else.",
    tags: ["Mulch", "Front bed", "Seasonal"],
    disclosure:
      "This product link points to Amazon and is meant to support the idea without taking over the page.",
    ctaLabel: "Browse on Amazon",
    badge: "Fast visual fix",
    popularityLabel: "Best before bloom",
    editorNote:
      "Use enough to calm the bed, but keep it off the stems so the planting still looks healthy and deliberate.",
  },
  {
    id: "entry-watering-wand",
    name: "Gentle watering wand",
    brand: "Garden edit",
    image: IDEAS_IMAGE_ASSETS.products.wateringWand,
    imageSlot: IDEAS_IMAGE_SLOTS.products.wateringWand,
    imageAlt: "A long watering wand used to water plants beside front steps.",
    merchant: "Amazon",
    priceLabel: "Under $35",
    affiliateUrl: PRODUCT_LINKS.gardenFlowers.wateringWand,
    description:
      "A watering wand makes it easier to keep front-edge planting alive without dragging a hose awkwardly through the entry.",
    whyItHelps:
      "The easier the routine feels, the more likely the bed will still look good in a normal week.",
    tags: ["Watering", "Garden", "Routine"],
    disclosure:
      "This product link points to Amazon and is meant to support the idea without taking over the page.",
    ctaLabel: "Browse on Amazon",
    badge: "Routine helper",
    popularityLabel: null,
    editorNote:
      "Choose the simplest version that feels easy to grab and use, especially near the front steps.",
  },
  {
    id: "matte-black-house-numbers",
    name: "Matte black house numbers",
    brand: "Curb edit",
    image: IDEAS_IMAGE_ASSETS.products.houseNumbers,
    imageSlot: IDEAS_IMAGE_SLOTS.products.houseNumbers,
    imageAlt: "Simple matte black house numbers mounted near a front door.",
    merchant: "Amazon",
    priceLabel: "Under $35",
    affiliateUrl: PRODUCT_LINKS.curbAppealBasics.houseNumbers,
    description:
      "Fresh house numbers are one of the simplest ways to make the front of a home feel sharper and easier to read.",
    whyItHelps:
      "They restore clarity quickly and make the entry feel more intentional without adding clutter.",
    tags: ["Numbers", "Front door", "Fast fix"],
    disclosure:
      "This product link points to Amazon and is meant to support the idea without taking over the page.",
    ctaLabel: "Browse on Amazon",
    badge: "Fastest refresh",
    popularityLabel: "Under 30 minutes",
    editorNote:
      "Choose a simple type style and a size that can be read from the curb without looking oversized.",
  },
  {
    id: "classic-mailbox-post-refresh",
    name: "Classic mailbox refresh set",
    brand: "Curb edit",
    image: IDEAS_IMAGE_ASSETS.products.mailboxRefresh,
    imageSlot: IDEAS_IMAGE_SLOTS.products.mailboxRefresh,
    imageAlt: "A tidy mailbox area with a refreshed post and clean trim.",
    merchant: "Amazon",
    priceLabel: "Under $90",
    affiliateUrl: PRODUCT_LINKS.curbAppealBasics.mailboxRefresh,
    description:
      "A refreshed mailbox area can make the whole front edge of the property feel less neglected.",
    whyItHelps:
      "The mailbox is often noticed before the porch, so getting it upright and clean changes the first impression fast.",
    tags: ["Mailbox", "Street edge", "Curb"],
    disclosure:
      "This product link points to Amazon and is meant to support the idea without taking over the page.",
    ctaLabel: "Browse on Amazon",
    badge: "Street-side fix",
    popularityLabel: "Most noticeable from the road",
    editorNote:
      "Keep the finish simple and durable. The best mailbox updates look steady, not decorative.",
  },
  {
    id: "wide-outdoor-broom",
    name: "Wide outdoor broom",
    brand: "Curb edit",
    image: IDEAS_IMAGE_ASSETS.products.outdoorBroom,
    imageSlot: IDEAS_IMAGE_SLOTS.products.outdoorBroom,
    imageAlt: "A wide outdoor broom used on a driveway edge and front walk.",
    merchant: "Amazon",
    priceLabel: "Under $25",
    affiliateUrl: PRODUCT_LINKS.curbAppealBasics.outdoorBroom,
    description:
      "A good outdoor broom keeps the walk, front step, and driveway edge from collecting the kind of grit that makes the front feel tired.",
    whyItHelps:
      "Routine cleanup is often what keeps a low-cost curb upgrade actually looking good.",
    tags: ["Maintenance", "Walk", "Useful"],
    disclosure:
      "This product link points to Amazon and is meant to support the idea without taking over the page.",
    ctaLabel: "Browse on Amazon",
    badge: "Everyday essential",
    popularityLabel: null,
    editorNote:
      "A tool that is easy to grab and actually gets used is worth more here than another decorative object.",
  },
];

export function getCategoryBySlug(slug) {
  return categories.find((category) => category.slug === slug);
}

export function getIdeaBySlug(slug) {
  return ideaPages.find((idea) => idea.slug === slug);
}

export function getProductById(id) {
  return productCards.find((product) => product.id === id);
}
