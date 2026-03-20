const revealNodes = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.16 },
);

revealNodes.forEach((node) => revealObserver.observe(node));

const storyModal = document.getElementById("story-modal");
const storyTitle = document.getElementById("story-modal-title");
const storyLocation = document.getElementById("story-modal-location");
const storyBody = document.getElementById("story-modal-body");
const storyCards = document.querySelectorAll(".story-card");

const flowModal = document.getElementById("flow-modal");
const flowKicker = document.getElementById("flow-kicker");
const flowTitle = document.getElementById("flow-title");
const flowCopy = document.getElementById("flow-copy");
const flowTabs = document.querySelectorAll(".flow-tab");
const flowPanels = document.querySelectorAll(".flow-panel");
const pathCards = document.querySelectorAll("[data-path-card]");
const flowButtons = document.querySelectorAll(".js-open-flow");
const shareButtons = document.querySelectorAll(".js-share-project");
const shareModal = document.getElementById("share-modal");
const shareStatus = document.getElementById("share-status");
const copyLinkButton = document.querySelector(".js-copy-link");
const shareTextLink = document.getElementById("share-text-link");
const shareEmailLink = document.getElementById("share-email-link");
const townToggleButtons = document.querySelectorAll("[data-town-toggle]");

const shareData = {
  title: "Neighborhood Stewardship Project",
  text: "Recognition for the homes and neighbors that make a street feel better kept.",
  url: window.location.href,
};

const flowContent = {
  mailed: {
    kicker: "Official mailed recognition",
    title: "Request the Official Mailed Certificate",
    copy:
      "The mailed option for people who want the recognition to arrive in print and feel more complete from the start.",
  },
  digital: {
    kicker: "Digital recognition",
    title: "Open the Digital Recognition form",
    copy:
      "A simpler online path when you want to recognize someone clearly without requesting the mailed version.",
  },
  nominate: {
    kicker: "Community nomination",
    title: "Nominate someone from the community",
    copy:
      "Share the story of a person, family, home, or local place whose care makes the street feel more looked after.",
  },
};

function setBodyLock(isLocked) {
  document.body.style.overflow = isLocked ? "hidden" : "";
}

function updateShareLinks() {
  if (!shareTextLink || !shareEmailLink) {
    return;
  }

  const encodedText = encodeURIComponent(`${shareData.text} ${shareData.url}`);
  const encodedSubject = encodeURIComponent("Neighborhood Stewardship Project");
  const encodedBody = encodeURIComponent(
    `I wanted to share this with you:\n\n${shareData.text}\n\n${shareData.url}`,
  );

  shareTextLink.href = `sms:?body=${encodedText}`;
  shareEmailLink.href = `mailto:?subject=${encodedSubject}&body=${encodedBody}`;
}

function closeStoryModal() {
  if (!storyModal) {
    return;
  }

  storyModal.classList.remove("is-open");
  storyModal.setAttribute("aria-hidden", "true");

  if (!flowModal?.classList.contains("is-open")) {
    setBodyLock(false);
  }
}

function openStoryModal(card) {
  if (!storyModal || !storyTitle || !storyLocation || !storyBody) {
    return;
  }

  storyTitle.textContent = card.dataset.storyTitle || "Recognition story";
  storyLocation.textContent = card.dataset.storyLocation || "";
  storyBody.textContent = card.dataset.storyBody || "";
  storyModal.classList.add("is-open");
  storyModal.setAttribute("aria-hidden", "false");
  setBodyLock(true);
}

function setFlow(path) {
  const content = flowContent[path];

  if (!content || !flowKicker || !flowTitle || !flowCopy) {
    return;
  }

  flowKicker.textContent = content.kicker;
  flowTitle.textContent = content.title;
  flowCopy.textContent = content.copy;

  flowTabs.forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.flowTab === path);
  });

  flowPanels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.id === `panel-${path}`);
  });

  pathCards.forEach((card) => {
    card.classList.toggle("is-selected", card.dataset.pathCard === path);
  });
}

function openFlowModal(path = "mailed") {
  if (!flowModal) {
    return;
  }

  setFlow(path);
  flowModal.classList.add("is-open");
  flowModal.setAttribute("aria-hidden", "false");
  setBodyLock(true);
}

function closeFlowModal() {
  if (!flowModal) {
    return;
  }

  flowModal.classList.remove("is-open");
  flowModal.setAttribute("aria-hidden", "true");

  if (!storyModal?.classList.contains("is-open")) {
    setBodyLock(false);
  }
}

function closeShareModal() {
  if (!shareModal) {
    return;
  }

  shareModal.classList.remove("is-open");
  shareModal.setAttribute("aria-hidden", "true");

  if (!storyModal?.classList.contains("is-open") && !flowModal?.classList.contains("is-open")) {
    setBodyLock(false);
  }
}

function openShareModal() {
  if (!shareModal) {
    return;
  }

  updateShareLinks();
  if (shareStatus) {
    shareStatus.textContent = "";
  }
  shareModal.classList.add("is-open");
  shareModal.setAttribute("aria-hidden", "false");
  setBodyLock(true);
}

async function handleShare() {
  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return;
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
    }
  }

  openShareModal();
}

storyCards.forEach((card) => {
  const trigger = card.querySelector(".story-button");

  if (!trigger) {
    return;
  }

  trigger.addEventListener("click", () => openStoryModal(card));
});

flowButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const path = button.dataset.flow || "mailed";

    if (storyModal?.classList.contains("is-open")) {
      closeStoryModal();
    }

    openFlowModal(path);
  });
});

flowTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const path = tab.dataset.flowTab;

    if (!path) {
      return;
    }

    setFlow(path);
  });
});

shareButtons.forEach((button) => {
  button.addEventListener("click", () => {
    handleShare();
  });
});

townToggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const controls = button.getAttribute("aria-controls");

    if (!controls) {
      return;
    }

    const list = document.getElementById(controls);

    if (!list) {
      return;
    }

    const isExpanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isExpanded));
    button.textContent = isExpanded ? "More" : "Less";
    list.hidden = isExpanded;
  });
});

copyLinkButton?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(shareData.url);

    if (shareStatus) {
      shareStatus.textContent = "Link copied. You can paste it into a text or email.";
    }
  } catch {
    if (shareStatus) {
      shareStatus.textContent = "Could not copy automatically. Use the text or email buttons below.";
    }
  }
});

document.addEventListener("click", (event) => {
  const target = event.target;

  if (!(target instanceof HTMLElement)) {
    return;
  }

  if (target.matches(".story-modal-close") || target.dataset.closeStory === "true") {
    closeStoryModal();
  }

  if (target.matches(".flow-modal-close") || target.dataset.closeFlow === "true") {
    closeFlowModal();
  }

  if (target.matches(".share-modal-close") || target.dataset.closeShare === "true") {
    closeShareModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") {
    return;
  }

  closeStoryModal();
  closeFlowModal();
  closeShareModal();
});

updateShareLinks();
