console.log("script.js loaded");

// GNews API configuration
const API_KEY = '501f89f198b6616bba0591219b0aebaf';
const BASE_URL = 'https://gnews.io/api/v4/search';

// DOM elements
const newsSearchBtn = document.getElementById('newsSearchBtn');
const newsKeyword = document.getElementById('newsKeyword');
const newsContainer = document.getElementById('newsContainer');

// Event listener for search button
newsSearchBtn.addEventListener('click', () => {
  const keyword = newsKeyword.value.trim();
  if (!keyword) {
    alert('Please enter a keyword to search.');
    return;
  }
  fetchNews(keyword);
});

// Fetch news articles from GNews API
async function fetchNews(keyword) {
  // Show loading message
  newsContainer.innerHTML = '<p>Loading news...</p>';

  try {
    const response = await fetch(`${BASE_URL}?q=${encodeURIComponent(keyword)}&apikey=${API_KEY}&lang=en&max=10`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    displayNews(data.articles);
  } catch (error) {
    newsContainer.innerHTML = `<p>Error fetching news: ${error.message}</p>`;
  }
}

// Display news articles in cards
function displayNews(articles) {
  if (!articles || articles.length === 0) {
    newsContainer.innerHTML = '<p>No news articles found for this keyword.</p>';
    return;
  }

  // Clear previous results
  newsContainer.innerHTML = '';

  articles.forEach(article => {
    // Create column
    const col = document.createElement('div');
    col.className = 'col-md-6 mb-4';

    // Create card
    const card = document.createElement('div');
    card.className = 'card bg-dark text-white h-100';

    // Image
    const img = document.createElement('img');
    img.src = article.image || 'images/default-news.jpg'; // fallback image
    img.alt = article.title; // accessibility
    img.className = 'card-img-top';
    card.appendChild(img);

    // Card body
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    // Title
    const cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title';
    cardTitle.textContent = article.title;

    // Description
    const cardDesc = document.createElement('p');
    cardDesc.className = 'card-text';
    cardDesc.textContent = article.description || '';

    // Source and date
    const cardSource = document.createElement('p');
    cardSource.className = 'card-text small';
    cardSource.innerHTML = `<strong>Source:</strong> ${article.source.name} | <strong>Date:</strong> ${new Date(article.publishedAt).toLocaleString()}`;

    // Read more button
    const readMore = document.createElement('a');
    readMore.href = article.url;
    readMore.target = '_blank';
    readMore.rel = 'noopener';
    readMore.className = 'btn btn-warning mt-2';
    readMore.textContent = 'Read more';

    // Assemble card
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardDesc);
    cardBody.appendChild(cardSource);
    cardBody.appendChild(readMore);
    card.appendChild(cardBody);
    col.appendChild(card);

    // Add to container
    newsContainer.appendChild(col);
  });
}