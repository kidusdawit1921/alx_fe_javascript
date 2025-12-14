// ==============================
// Server Sync Configuration
// ==============================
const SERVER_URL = "https://jsonplaceholder.typicode.com/posts";
const SYNC_INTERVAL = 15000; // 15 seconds
const QUOTES_KEY = "dynamicQuotes";

const syncStatus = document.getElementById("syncStatus");

// ==============================
// Fetch Quotes from Server
// ==============================
async function fetchServerQuotes() {
  const response = await fetch(SERVER_URL);
  const data = await response.json();

  // Convert server data to quote format
  return data.slice(0, 5).map(post => ({
    text: post.title,
    category: "Server"
  }));
}

// ==============================
// Sync with Server
// Server takes precedence
// ==============================
async function syncWithServer() {
  syncStatus.textContent = "Syncing with server...";

  try {
    const serverQuotes = await fetchServerQuotes();
    const localQuotes = JSON.parse(localStorage.getItem(QUOTES_KEY)) || [];

    const localJSON = JSON.stringify(localQuotes);
    const serverJSON = JSON.stringify(serverQuotes);

    // Conflict detected
    if (localJSON !== serverJSON) {
      quotes = serverQuotes;
      localStorage.setItem(QUOTES_KEY, JSON.stringify(quotes));

      populateCategories();
      filterQuotes();

      syncStatus.textContent =
        "Conflict detected. Server data applied.";
    } else {
      syncStatus.textContent = "Data is already up to date.";
    }
  } catch (error) {
    syncStatus.textContent = "Sync failed. Server unavailable.";
  }
}

// ==============================
// Periodic Sync (Automatic)
// ==============================
setInterval(syncWithServer, SYNC_INTERVAL);
