// ==============================
// Quote Data (REQUIRED STRUCTURE)
// Each object contains:
// ["text", "category"]
// ==============================
const quotes = [
  {
    text: "The only way to do great work is to love what you do.",
    category: "Motivation"
  },
  {
    text: "JavaScript is the language of the web.",
    category: "Programming"
  },
  {
    text: "Simplicity is the soul of efficiency.",
    category: "Wisdom"
  }
];

// ==============================
// DOM References
// ==============================
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");

// ==============================
// Show Random Quote
// ==============================
function showRandomQuote() {
  // Clear existing content
  quoteDisplay.textContent = "";

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  // Create elements dynamically
  const quoteText = document.createElement("p");
  const quoteCategory = document.createElement("span");

  quoteText.textContent = `"${quote.text}"`;
  quoteCategory.textContent = `Category: ${quote.category}`;

  // Append to DOM
  quoteDisplay.appendChild(quoteText);
  quoteDisplay.appendChild(quoteCategory);
}

// ==============================
// Add New Quote Dynamically
// ==============================
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const newText = textInput.value.trim();
  const newCategory = categoryInput.value.trim();

  if (newText === "" || newCategory === "") {
    alert("Both text and category are required.");
    return;
  }

  // REQUIRED object structure
  const newQuote = {
    text: newText,
    category: newCategory
  };

  quotes.push(newQuote);

  textInput.value = "";
  categoryInput.value = "";

  showRandomQuote();
}

// ==============================
// Event Listeners
// ==============================
newQuoteBtn.addEventListener("click", showRandomQuote);
