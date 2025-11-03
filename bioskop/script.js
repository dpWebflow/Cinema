// Lista filmova sa slikama
const movies = [
  { id: 1, name: "Herkules", description: "Avanture grčkog heroja Herkula.", rating: 8.5, price: 300, image: "img/hercules.png" },
  { id: 2, name: "Matrix", description: "Virtualna stvarnost i borba za slobodu.", rating: 9.0, price: 400, image: "img/matrix.png" },
  { id: 3, name: "Pirati sa Kariba", description: "Avanture kapetana Jacka Sparrowa.", rating: 7.8, price: 350, image: "img/pirates.png" },
  { id: 4, name: "Rocky Balboa", description: "Priča o bokseru i njegovoj borbi.", rating: 8.0, price: 250, image: "img/rocky.png" }
];

// Elementi
const moviesContainer = document.getElementById("movies");
const totalCostElement = document.getElementById("total-cost");

// Prikazivanje filmova
let totalCost = 0;

function renderMovies() {
  moviesContainer.innerHTML = ""; // Resetovanje sadržaja
  movies.forEach(movie => {
    const movieDiv = document.createElement("div");
    movieDiv.classList.add("movie");
    movieDiv.setAttribute("data-id", movie.id);

    const movieInfo = `
      <img src="${movie.image}" alt="${movie.name}">
      <div class="movie-info">
        <h3>${movie.name}</h3>
        <p>${movie.description}</p>
        <p>Ocena: ${movie.rating}</p>
        <p>Cena: ${movie.price} RSD</p>
      </div>
    `;

    const watchButton = `
      <button onclick="watchMovie(${movie.id})" id="btn-${movie.id}">Gledaj</button>
    `;

    movieDiv.innerHTML = movieInfo + watchButton;
    moviesContainer.appendChild(movieDiv);
  });
}

// Funkcija za gledanje filma
function watchMovie(id) {
  const movie = movies.find(movie => movie.id === id);
  if (movie) {
    // Dodavanje na ukupno
    totalCost += movie.price;
    totalCostElement.textContent = totalCost;

    // Oznaka gledanog filma
    const movieDiv = document.querySelector(`[data-id='${id}']`);
    movieDiv.classList.add("watched");

    // Menjanje dugmeta u "Otazi" nakon gledanja
    const button = document.getElementById(`btn-${id}`);
    button.textContent = "Otkazi";
    button.setAttribute("onclick", `resetMovie(${id})`); // Menja funkciju koja se poziva na klik

    // Disable dugmeta
    button.disabled = false;
  }
}

// Funkcija za resetovanje filma
function resetMovie(id) {
  const movie = movies.find(movie => movie.id === id);
  if (movie) {
    // Oduzimanje od ukupnog
    totalCost -= movie.price;
    totalCostElement.textContent = totalCost;

    // Vraćanje filma na početno stanje
    const movieDiv = document.querySelector(`[data-id='${id}']`);
    movieDiv.classList.remove("watched");

    // Vraćanje dugmeta u "Gledaj"
    const button = document.getElementById(`btn-${id}`);
    button.textContent = "Gledaj";
    button.setAttribute("onclick", `watchMovie(${id})`); // Ponovno postavljanje funkcije
  }
}

// Pokreni aplikaciju
renderMovies();
