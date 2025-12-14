// ==============================
// Quote Data
// Each object contains ["text", "category"]
// ==============================
const quotes = [
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
// Show Random Quote (uses innerHTML)
// ==============================
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  quoteDisplay.innerHTML = `
    <p>"${quote.text}"</p>
    <small>Category: ${quote.category}</small>
  `;
}

// ==============================
// REQUIRED FUNCTION
// createAddQuoteForm
// Dynamically creates the add-quote form
// ==============================
function createAddQuoteForm() {
  const formContainer = document.createElement("div");

  const quoteInput = document.createElement("input");
  quoteInput.id = "newQuoteText";
  quoteInput.type = "text";
  quoteInput.placeholder = "Enter a new quote";

  const categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.type = "text";
  categoryInput.placeholder = "Enter quote category";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  addButton.addEventListener("click", addQuote);

  formContainer.appendChild(quoteInput);
  formContainer.appendChild(categoryInput);
  formContainer.appendChild(addButton);

  document.body.appendChild(formContainer);
}

// ==============================
// Add New Quote Logic
// ==============================
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const text = textInput.value.trim();
  const category = categoryInput.v
