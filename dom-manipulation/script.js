// ==============================
// Quote Data
// Each quote object contains:
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
// Uses innerHTML (REQUIRED)
// ==============================
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  // innerHTML used to dynamically update content
  quoteDisplay.innerHTML = `
    <p>"${quote.text}"</p>
    <small>Category: ${quote.category}</small>
  `;
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

  quotes.push({
    text: newText,
    category: newCategory
  });

  textInput.value = "";
  categoryInput.value = "";

  showRandomQuote();
}

// ==============================
// Event Listeners
// ==============================
newQuoteBtn.addEventListener("click", showRandomQuote);
