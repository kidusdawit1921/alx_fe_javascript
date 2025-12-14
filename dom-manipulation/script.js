// ==============================
// Server Simulation Config
// ==============================
const SERVER_URL = "https://jsonplaceholder.typicode.com/posts";
const SYNC_INTERVAL = 15000; // 15 seconds

const syncStatus = document.getElementById("syncStatus");

// ==============================
// Fetch Quotes from Server
// ==============================
async function fetchServerQuotes() {
  const response = await fetch(SERVER_URL);
  const data = await response.json();

  // Map server posts to quote format
  return data.slice(0, 5).map(post => ({
    text: post.title,
    category: "Server"
  }));
}

// ==============================
// Sync Logic (Server Takes Precedence)
// ==============================
async function syncWithServer() {
  syncStatus.textContent = "Syncing with server...";

  try {
    const serverQuotes = await fetchServerQuotes();

    const localData = JSON.stringify(quotes);
    const serverData = JSON.stringify(serverQuotes);

    // Conflict detected
    if (localData !== serverData) {
      quotes = serverQuotes;
      localStorage.setItem("dynamicQuotes", JSON.stringify(quotes));

      populateCategories();
      filterQuotes();

      syncStatus.textContent =
        "Conflict detected. Server data applied.";
    } else {
      syncStatus.textContent = "No changes detected.";
    }
  } catch (error) {
    syncStatus.textContent = "Sync failed. Server unreachable.";
  }
}

// ==============================
// Periodic Sync
// ==============================
setInterval(syncWithServer, SYNC_INTERVAL);
