const form = document.getElementById("movie-form");
const queryInput = document.getElementById("query");
const moviesDiv = document.getElementById("movies");

const API_KEY = "YOUR_KEY";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const q = queryInput.value.trim();
  if (!q) return;

  moviesDiv.textContent = "Loading...";

  try {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(q)}`
    );
    const data = await res.json();

    if (data.Search) {
      moviesDiv.innerHTML = "";
      data.Search.forEach((m) => {
        const div = document.createElement("div");
        div.textContent = `${m.Title} (${m.Year})`;
        moviesDiv.appendChild(div);
      });
    } else {
      moviesDiv.textContent = "No results.";
    }
  } catch {
    moviesDiv.textContent = "Error fetching movies.";
  }
});
