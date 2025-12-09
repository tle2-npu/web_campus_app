document.addEventListener("DOMContentLoaded", () => {
  console.log("Script loaded, DOM ready.");

  // Home page events 
  if (document.title === "Home") {
    const buttons = document.querySelectorAll("a.btn");
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        console.log(`Home page button clicked: ${btn.textContent}`);
      });
    });
  }

  // Resources page events 
  const resourceKeyword = document.getElementById("resourceKeyword");
  const resourceSearchBtn = document.getElementById("resourceSearchBtn");
  const resourcesContainer = document.getElementById("resourcesContainer");

  if (resourceSearchBtn && resourceKeyword && resourcesContainer) {
    resourceSearchBtn.addEventListener("click", () => {
      const keyword = resourceKeyword.value.trim() || "Computer Science";
      console.log(`Resources search: ${keyword}`);

      // API placeholder
      const apiUrl = `https://api.osf.io/v2/preprints/?filter[text]=${encodeURIComponent(keyword)}`;
      console.log("OSF API URL:", apiUrl);

      resourcesContainer.innerHTML = `<p>Loading results for "${keyword}"... (API not functional yet)</p>`;
    });
  }

  // Blog page events
  const blogKeyword = document.getElementById("blogKeyword");
  const blogSearchBtn = document.getElementById("blogSearchBtn");
  const blogContainer = document.getElementById("blogContainer");

  if (blogSearchBtn && blogKeyword && blogContainer) {
    blogSearchBtn.addEventListener("click", () => {
      const keyword = blogKeyword.value.trim() || "Education";
      console.log(`Blog search: ${keyword}`);

      // API placeholder
      const apiUrl = `https://gnews.io/api/v4/search?q=${encodeURIComponent(keyword)}&token=YOUR_API_KEY`;
      console.log("GNews API URL:", apiUrl);

      blogContainer.innerHTML = `<p>Loading news for "${keyword}"... (API not functional yet)</p>`;
    });
  }
});