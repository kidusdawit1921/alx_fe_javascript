// ==============================
// Storage Keys
// ==============================
const QUOTES_KEY = "dynamicQuotes";
const FILTER_KEY = "selectedCategory";

// ==============================
// Initial Quotes (Fallback)
// ==============================
let quotes = JSON.parse(localStorage.getItem(QUOTES_KEY)) || [
  { text: "The only way to do great work is to love what you do.", category: "Motivation" },
  { text: "JavaScript is the language of the web.", category: "Programming" },
  { text: "Simplicity is the soul of efficiency.", category: "Wisdom" }
];

// ==============================
// DOM References
// ==============================
const quoteDisplay = document.getElementById("quoteDisplay");
const categoryFilter = document.getElementById("categoryFilter");
const newQuoteBtn = document.getElementById("newQuote");
const syncStatus = document.getElementById("syncStatus");

// ==============================
// Save Quotes to Local Storage
// ==============================
function saveQuotes() {
  localStorage.setItem(QUOTES_KEY, JSON.stringify(quotes));
}

// ==============================
// Display Quotes (uses innerHTML)
// ==============================
function displayQuotes(quotesToDisplay) {
  quoteDisplay.innerHTML = "";

  if (quotesToDisplay.length === 0) {
    quoteDisplay.innerHTML = "<p>No quotes available.</p>";
    return;
  }

  quotesToDisplay.forEach(q => {
    quoteDisplay.innerHTML += `
      <p>"${q.text}"</p>
      <small>Category: ${q.category}</small><br /><br />
    `;
  });
}

// ==============================
// Show Random Quote
// ==============================
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  displayQuotes([quotes[randomIndex]]);
}

// ==============================
// Populate Categories (REQUIRED)
// ==============================
function populateCategories() {
  const categories = [...new Set(quotes.map(q => q.category))];

  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;

  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  const savedFilter = localStorage.getItem(FILTER_KEY);
  if (savedFilter) {
    categoryFilter.value = savedFilter;
  }
}

// ==============================
// Filter Quotes (REQUIRED)
// ==============================
function filterQuotes() {
  const selectedCategory = categoryFilter.value;
  localStorage.setItem(FILTER_KEY, selectedCategory);

  const filtered =
    selectedCategory === "all"
      ? quotes
      : quotes.filter(q => q.category === selectedCategory);

  displayQuotes(filtered);
}

// ==============================
// REQUIRED FUNCTION
// createAddQuoteForm
// ==============================
function createAddQuoteForm() {
  const container = document.createElement("div");

  const quoteInput = document.createElement("input");
  quoteInput.id = "newQuoteText";
  quoteInput.placeholder = "Enter a new quote";

  const categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.placeholder = "Enter quote category";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  addButton.addEventListener("click", addQuote);

  container.appendChild(quoteInput);
  container.appendChild(categoryInput);
  container.appendChild(addButton);

  document.body.appendChild(container);
}

// ==============================
// Add Quote
// ==============================
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  if (!text || !category) {
    alert("Both fields are required.");
    return;
  }

  quotes.push({ text, category });
  saveQuotes();

  populateCategories();
  filterQuotes();

  textInput.value = "";
  categoryInput.value = "";
}

// ==============================
// SERVER SYNC SECTION
// ==============================

// REQUIRED FUNCTION NAME
async function fetchQuotesFromServer() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();

  // Convert server posts into quotes
  return data.slice(0, 5).map(post => ({
    text: post.title,
    category: "Server"
  }));
}

// ==============================
// Sync With Server
// Server Takes Precedence
// ==============================
async function syncWithServer() {
  syncStatus.textContent = "Syncing with server...";

  try {
    const serverQuotes = await fetchQuotesFromServer();

    if (JSON.stringify(serverQuotes) !== JSON.stringify(quotes)) {
      quotes = serverQuotes;
      saveQuotes();

      populateCategories();
      filterQuotes();

      syncStatus.textContent =
        "Conflict detected. Server data applied.";
    } else {
      syncStatus.textContent = "Data already up to date.";
    }
  } catch (error) {
    syncStatus.textContent = "Server sync failed.";
  }
}

// ==============================
// Automatic Periodic Sync
// ==============================
setInterval(syncWithServer, 15000);

// ==============================
// Event Listeners
// ==============================
newQuoteBtn.addEventListener("click", showRandomQuote);

// ==============================
// Initialize App
// ==============================
createAddQuoteForm();
populateCategories();
filterQuotes();
