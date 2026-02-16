// Motivational Quotes Database organized by mood
const quotes = [
    // Happy quotes
    { text: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama", mood: "happy" },
    { text: "The most important thing is to enjoy your life—to be happy—it's all that matters.", author: "Audrey Hepburn", mood: "happy" },
    { text: "Happiness is when what you think, what you say, and what you do are in harmony.", author: "Mahatma Gandhi", mood: "happy" },
    { text: "For every minute you are angry you lose sixty seconds of happiness.", author: "Ralph Waldo Emerson", mood: "happy" },
    
    // Motivated quotes
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", mood: "motivated" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", mood: "motivated" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson", mood: "motivated" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", mood: "motivated" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill", mood: "motivated" },
    { text: "Your limitation—it's only your imagination.", author: "Unknown", mood: "motivated" },
    
    // Sad quotes (uplifting)
    { text: "Every day may not be good, but there's something good in every day.", author: "Alice Morse Earle", mood: "sad" },
    { text: "The sun himself is weak when he first rises, and gathers strength and courage as the day gets on.", author: "Charles Dickens", mood: "sad" },
    { text: "You are braver than you believe, stronger than you seem, and smarter than you think.", author: "A.A. Milne", mood: "sad" },
    { text: "This too shall pass.", author: "Persian Proverb", mood: "sad" },
    { text: "Tough times never last, but tough people do.", author: "Robert H. Schuller", mood: "sad" },
    
    // Anxious quotes (calming)
    { text: "You don't have to control your thoughts. You just have to stop letting them control you.", author: "Dan Millman", mood: "anxious" },
    { text: "Worry does not empty tomorrow of its sorrow, it empties today of its strength.", author: "Corrie Ten Boom", mood: "anxious" },
    { text: "You are not your anxiety. You are the one who observes it.", author: "Unknown", mood: "anxious" },
    { text: "Breath is the power behind all things... I breathe in and know that good things will happen.", author: "Tao Porchon-Lynch", mood: "anxious" },
    { text: "Nothing can bring you peace but yourself.", author: "Ralph Waldo Emerson", mood: "anxious" },
    
    // Tired quotes (energizing)
    { text: "Rest when you're weary. Refresh and renew yourself, your body, your mind, your spirit. Then get back to work.", author: "Ralph Marston", mood: "tired" },
    { text: "Almost everything will work again if you unplug it for a few minutes, including you.", author: "Anne Lamott", mood: "tired" },
    { text: "Take rest; a field that has rested gives a bountiful crop.", author: "Ovid", mood: "tired" },
    { text: "Your body hears everything your mind says. Stay positive.", author: "Naomi Judd", mood: "tired" },
    { text: "Energy and persistence conquer all things.", author: "Benjamin Franklin", mood: "tired" }
];

// Current quote state
let currentQuote = null;
let currentQuoteIndex = -1;

// Initialize the app
function init() {
    updateQuoteCount();
    document.getElementById('mood').addEventListener('change', updateQuoteCount);
}

// Get a random quote based on selected mood
function getRandomQuote() {
    const selectedMood = document.getElementById('mood').value;
    let filteredQuotes = quotes;
    
    if (selectedMood !== 'all') {
        filteredQuotes = quotes.filter(q => q.mood === selectedMood);
    }
    
    if (filteredQuotes.length === 0) {
        displayQuote({ text: "No quotes available for this mood.", author: "", mood: "" });
        document.getElementById('editBtn').disabled = true;
        return;
    }
    
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    currentQuote = filteredQuotes[randomIndex];
    currentQuoteIndex = quotes.indexOf(currentQuote);
    
    displayQuote(currentQuote);
    document.getElementById('editBtn').disabled = false;
    
    // Hide edit container if it's visible
    document.getElementById('editContainer').style.display = 'none';
}

// Display a quote
function displayQuote(quote) {
    const quoteText = document.getElementById('quoteText');
    const quoteAuthor = document.getElementById('quoteAuthor');
    const quoteMood = document.getElementById('quoteMood');
    
    quoteText.textContent = `"${quote.text}"`;
    quoteAuthor.textContent = quote.author ? `— ${quote.author}` : '';
    quoteMood.textContent = quote.mood ? `Mood: ${getMoodEmoji(quote.mood)} ${capitalizeFirstLetter(quote.mood)}` : '';
    
    // Add animation
    const container = document.querySelector('.quote-container');
    container.style.animation = 'none';
    setTimeout(() => {
        container.style.animation = 'slideIn 0.5s ease-out';
    }, 10);
}

// Show edit form
function editQuote() {
    if (!currentQuote) return;
    
    const editContainer = document.getElementById('editContainer');
    const editText = document.getElementById('editText');
    const editAuthor = document.getElementById('editAuthor');
    
    editText.value = currentQuote.text;
    editAuthor.value = currentQuote.author;
    
    editContainer.style.display = 'block';
    editText.focus();
}

// Save edited quote
function saveEdit() {
    if (currentQuoteIndex === -1) return;
    
    const editText = document.getElementById('editText').value.trim();
    const editAuthor = document.getElementById('editAuthor').value.trim();
    
    if (!editText) {
        alert('Quote text cannot be empty!');
        return;
    }
    
    // Update the quote in the array
    quotes[currentQuoteIndex].text = editText;
    quotes[currentQuoteIndex].author = editAuthor;
    
    // Update current quote
    currentQuote = quotes[currentQuoteIndex];
    
    // Display updated quote
    displayQuote(currentQuote);
    
    // Hide edit container
    document.getElementById('editContainer').style.display = 'none';
    
    // Show success message
    showSuccessMessage('Quote updated successfully!');
}

// Cancel edit
function cancelEdit() {
    document.getElementById('editContainer').style.display = 'none';
}

// Update quote count based on selected mood
function updateQuoteCount() {
    const selectedMood = document.getElementById('mood').value;
    let count;
    
    if (selectedMood === 'all') {
        count = quotes.length;
    } else {
        count = quotes.filter(q => q.mood === selectedMood).length;
    }
    
    document.getElementById('quoteCount').textContent = `Available quotes: ${count}`;
}

// Helper function to get mood emoji
function getMoodEmoji(mood) {
    const emojiMap = {
        'happy': '😊',
        'motivated': '💪',
        'sad': '😔',
        'anxious': '😰',
        'tired': '😴'
    };
    return emojiMap[mood] || '✨';
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Show success message
function showSuccessMessage(message) {
    const quoteMood = document.getElementById('quoteMood');
    const originalText = quoteMood.textContent;
    quoteMood.textContent = `✅ ${message}`;
    quoteMood.style.color = '#28a745';
    
    setTimeout(() => {
        quoteMood.textContent = originalText;
        quoteMood.style.color = '#764ba2';
    }, 2000);
}

// Initialize when page loads
window.addEventListener('DOMContentLoaded', init);
