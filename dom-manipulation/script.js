// ==============================
// Storage Keys
// ==============================
const STORAGE_KEY = "dynamicQuotes";
const SESSION_KEY = "lastViewedQuote";

// ==============================
// Load Quotes from Local Storage
// ==============================
let quotes = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
  { text: "The only way to do great work is to love what you do.", category: "Motivation" },
  { text: "JavaScript is the language of the web.", category: "Programming" },
  { text: "Simplicity is the soul of efficiency.", category: "Wisdom" }
];

// ==============================
// DOM References
// ==============================
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");

// ==============================
// Save Quotes to Local Storage
// ==============================
function saveQuotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(quotes));
}

// ==============================
// Show Random Quote
// Uses innerHTML + Session Storage
// ==============================
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  quoteDisplay.innerHTML = `
    <p>"${quote.text}"</p>
    <small>Category: ${quote.category}</small>
  `;

  // Save last viewed quote (Session Storage)
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(quote));
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
// Add Quote Logic
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

  textInput.value = "";
  categoryInput.value = "";

  showRandomQuote();
}

// ==============================
// Export Quotes to JSON File
// ==============================
function exportQuotesToJson() {
  const jsonData = JSON.stringify(quotes, null, 2);
  const blob = new Blob([jsonData], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();

  URL.revokeObjectURL(url);
}

// ==============================
// Import Quotes from JSON File
// ==============================
function importFromJsonFile(event) {
  const fileReader = new FileReader();

  fileReader.onload = function (e) {
    const importedQuotes = JSON.parse(e.target.result);

    if (!Array.isArray(importedQuotes)) {
      alert("Invalid JSON format.");
      return;
    }

    quotes.push(...importedQuotes);
    saveQuotes();
    alert("Quotes imported successfully!");
  };

  fileReader.readAsText(event.target.files[0]);
}

// ==============================
// Event Listeners
// ==============================
newQuoteBtn.addEventListener("click", showRandomQuote);

// ==============================
// Initialize Application
// ==============================
createAddQuoteForm();
showRandomQuote();
