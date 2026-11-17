// Find the elements from the HTML page
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const typeSelect = document.getElementById("type-select");
const statusText = document.getElementById("status");
const results = document.getElementById("results");
 
// Request data from the API
async function searchMovies(title, type) {
  // Build the address of the request
  let url = "/.netlify/functions/myapi?s=" + encodeURIComponent(title);
  if (type !== "") {
    url = url + "&type=" + type;
  }
 
  statusText.textContent = "Searching...";
  results.innerHTML = "";
 
  try {
    const response = await fetch(url);
 
    // Save the result into a variable
    const data = await response.json();
 
    // OMDb sets Response to "False" if nothing was found
    if (data.Response === "False") {
      statusText.textContent = data.Error;
      return;
    }
 
    statusText.textContent = data.totalResults + " results found";
 
    // data.Search is the list of movies
    showMovies(data.Search);
  } catch (error) {
    console.log(error);
    statusText.textContent = "Could not load data. Try again later.";
  }
}
 
// Show the selected data on the page
function showMovies(movies) {
  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i];
 
    // Create a card for each movie
    const card = document.createElement("div");
    card.className = "card";
 
    // Poster (or N/A when returned nothing)
    if (movie.Poster !== "N/A") {
      const poster = document.createElement("img");
      poster.src = movie.Poster;
      poster.alt = movie.Title;
      card.appendChild(poster);
    }
 
    const title = document.createElement("h2");
    title.textContent = movie.Title;
    card.appendChild(title);
 
    const info = document.createElement("p");
    info.textContent = movie.Year + " (" + movie.Type + ")";
    card.appendChild(info);
 
    results.appendChild(card);
  }
}
 

// Event handler
searchForm.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from reloading
  searchMovies(searchInput.value.trim(), typeSelect.value);
});
 