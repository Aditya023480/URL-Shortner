const form = document.getElementById("shorten-form");
const urlInput = document.getElementById("url");
const customInput = document.getElementById("custom");
const submitBtn = document.getElementById("submit-btn");
const statusEl = document.getElementById("status");
const resultCard = document.getElementById("result-card");
const resultLink = document.getElementById("result-link");
const copyBtn = document.getElementById("copy-btn");
const historyEl = document.getElementById("history");
const template = document.getElementById("history-item-template");

const STORAGE_KEY = "url-shortner-history";

let recentLinks = loadHistory();
renderHistory();

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const originalUrl = urlInput.value.trim();
  const customSlug = customInput.value.trim();

  if (!originalUrl || !customSlug) {
    setStatus("Both fields are required.", "error");
    return;
  }

  submitBtn.disabled = true;
  setStatus("Creating short link...", "");

  try {
    const response = await fetch(getApiBase() + "/createURL", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: originalUrl,
        custom: customSlug,
      }),
    });

    if (!response.ok) {
      throw new Error("Request failed with status " + response.status);
    }

    const data = await response.json();
    const shortUrl = normalizeShortUrl(data.newURL || data.shortUrl || data.url);

    if (!shortUrl) {
      throw new Error("No short URL returned by the server.");
    }

    showResult(shortUrl);
    pushHistory({ originalUrl, customSlug, shortUrl });
    setStatus("Short link created successfully.", "success");
    form.reset();
    urlInput.focus();
  } catch (error) {
    setStatus(error.message || "Something went wrong.", "error");
  } finally {
    submitBtn.disabled = false;
  }
});

copyBtn.addEventListener("click", async () => {
  if (!resultLink.href) {
    return;
  }

  await copyText(resultLink.href);
});

historyEl.addEventListener("click", async (event) => {
  const copyTarget = event.target.closest(".mini-copy");

  if (copyTarget) {
    const item = copyTarget.closest(".history-item");
    const url = item?.dataset.shortUrl;

    if (url) {
      await copyText(url);
    }
  }
});

function getApiBase() {
  return window.__API_BASE_URL__ || "http://localhost:3000";
}

function normalizeShortUrl(value) {
  if (!value) {
    return "";
  }

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  return "http://" + value;
}

function showResult(shortUrl) {
  resultCard.hidden = false;
  resultLink.textContent = shortUrl;
  resultLink.href = shortUrl;
}

function setStatus(message, tone) {
  statusEl.textContent = message;
  statusEl.classList.remove("is-error", "is-success");

  if (tone === "error") {
    statusEl.classList.add("is-error");
  }

  if (tone === "success") {
    statusEl.classList.add("is-success");
  }
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    setStatus("Copied to clipboard.", "success");
  } catch {
    setStatus("Copy is not available in this browser.", "error");
  }
}

function pushHistory(entry) {
  recentLinks = [
    {
      ...entry,
      createdAt: new Date().toISOString(),
    },
    ...recentLinks.filter((item) => item.shortUrl !== entry.shortUrl),
  ].slice(0, 6);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(recentLinks));
  renderHistory();
}

function loadHistory() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function renderHistory() {
  historyEl.innerHTML = "";

  if (!recentLinks.length) {
    const emptyState = document.createElement("div");
    emptyState.className = "history-empty";
    emptyState.textContent = "Your latest short links will appear here.";
    historyEl.appendChild(emptyState);
    return;
  }

  recentLinks.forEach((entry) => {
    const node = template.content.cloneNode(true);
    const item = node.querySelector(".history-item");
    const url = node.querySelector(".history-url");
    const meta = node.querySelector(".history-meta");
    const visitLink = node.querySelector(".visit-link");
    const copyButton = node.querySelector(".mini-copy");

    item.dataset.shortUrl = entry.shortUrl;
    url.textContent = entry.shortUrl;
    meta.textContent = `${entry.customSlug} -> ${entry.originalUrl}`;
    visitLink.href = entry.shortUrl;
    copyButton.dataset.shortUrl = entry.shortUrl;

    historyEl.appendChild(node);
  });
}