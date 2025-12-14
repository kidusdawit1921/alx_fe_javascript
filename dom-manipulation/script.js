// ==============================
// Storage Keys
// ==============================
const QUOTES_KEY = "dynamicQuotes";
const FILTER_KEY = "selectedCategory";

// ==============================
// Load Quotes
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

// ==============================
// Save Quotes
// ==============================
function saveQuotes() {
  localStorage.setItem(QUOTES_KEY, JSON.stringify(quotes));
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

  // Restore saved filter
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

  let filteredQuotes =
    selectedCategory === "all"
      ? quotes
      : quotes.filter(q => q.category === selectedCategory);

  displayQuotes(filteredQuotes);
}

// ==============================
// Display Quotes
// ==============================
function displayQuotes(quotesToDisplay) {
  quoteDisplay.innerHTML = "";

  if (quotesToDisplay.length === 0) {
    quoteDisplay.innerHTML = "<p>No quotes found.</p>";
    return;
  }

  quotesToDisplay.forEach(quote => {
    quoteDisplay.innerHTML += `
      <p>"${quote.text}"</p>
      <small>Category: ${quote.category}</small><br /><br />
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
// Add Quote (Updates Categories)
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
// Event Listeners
// ==============================
newQuoteBtn.addEventListener("click", showRandomQuote);

// ==============================
// Initialize App
// ==============================
createAddQuoteForm();
populateCategories();
filterQuotes();
