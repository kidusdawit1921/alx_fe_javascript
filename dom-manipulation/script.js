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
// Populate Categories
// ==============================
function populateCategories() {
  const categories = [...new Set(quotes.map(q => q.category))];

  categoryFilter.innerHTML = `<option value
