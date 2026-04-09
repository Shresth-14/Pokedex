const container = document.getElementById("pokemonContainer");
const searchInput = document.getElementById("searchInput");
const typeSortSelect = document.getElementById("typeSortSelect");

let allPokemon = [];

if (!container || !searchInput || !typeSortSelect) {
  console.error("Explore page elements not found.");
} else {
  searchInput.addEventListener("input", showPokemon);
  typeSortSelect.addEventListener("change", showPokemon);
  loadPokemon();
}

async function loadPokemon() {
  try {
    container.innerHTML = "<p>Loading Pokémon...</p>";

    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
    if (!res.ok) {
      throw new Error("Could not fetch Pokemon list");
    }
    const data = await res.json();

    const details = await Promise.all(data.results.map((item) => loadOnePokemon(item.url)));
    allPokemon = details;
    setTypeOptions();
    showPokemon();
  } catch (error) {
    container.innerHTML = "<p>Failed to load</p>";
    console.error(error);
  }
}

async function loadOnePokemon(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Pokemon details request failed");
    }
    return await res.json();
  } catch (err) {
    console.error("Error fetching pokemon:", err);
    return undefined;
  }
}

function showPokemon() {
  const searchText = searchInput.value.trim().toLowerCase();
  const selectedType = typeSortSelect.value;

  let visiblePokemon = allPokemon.filter((pokemon) => pokemon &&
    pokemon.name.toLowerCase().includes(searchText)
  );

  if (selectedType !== "all") {
    visiblePokemon = visiblePokemon.filter((pokemon) =>
      pokemon.types.some((t) => t.type.name === selectedType)
    );
  }

  container.innerHTML = "";

  if (!visiblePokemon.length) {
    container.innerHTML = "<p>No Pokémon found.</p>";
    return;
  }

  visiblePokemon.forEach((pokemon) => addCard(pokemon));
}

function setTypeOptions() {
  const allTypes = new Set();

  allPokemon.forEach((pokemon) => {
    if (!pokemon) return;
    pokemon.types.forEach((t) => allTypes.add(t.type.name));
  });

  const sortedTypes = Array.from(allTypes).sort();

  typeSortSelect.innerHTML = '<option value="all">Type: All</option>';

  for (const type of sortedTypes) {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = `Type: ${capitalize(type)}`;
    typeSortSelect.appendChild(option);
  }
}

function addCard(pokemon) {
  const card = document.createElement("div");
  card.className = "card";
  const favourite = window.isFavourite ? window.isFavourite(pokemon.id) : false;

  const types = pokemon.types
    ? pokemon.types
        .map((t) => `<span class="tag ${t.type.name}">${t.type.name}</span>`)
        .join("")
    : "<span>No type</span>";

  const name = capitalize(pokemon.name);
  const primaryAbility = pokemon.abilities?.[0]?.ability?.name
    ? capitalize(pokemon.abilities[0].ability.name.replace("-", " "))
    : "Unknown";

  const image =
    pokemon.sprites.other["official-artwork"].front_default ||
    pokemon.sprites.front_default;

  card.innerHTML = `
    <div class="card-top">
      <button class="fav-btn ${favourite ? "active" : ""}" aria-label="Toggle favourite">${favourite ? "♥" : "♡"}</button>
      <span class="number">${pokemon.id}</span>
      <img src="${image}" alt="${name}" />
    </div>
    <div class="card-body">
      <div class="title-row">
        <h3>${name}</h3>
   </div>
      <div class="tags">${types}</div>
      <p class="meta-line"><span>Ability</span> ${primaryAbility}</p>
    </div>
  `;

  const favBtn = card.querySelector(".fav-btn");
  favBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    const active = window.toggleFavourite ? window.toggleFavourite(pokemon.id) : false;
    favBtn.classList.toggle("active", active);
    favBtn.textContent = active ? "♥" : "♡";
  });

  card.addEventListener("click", () => {
    window.location.href = `details.html?id=${pokemon.id}`;
  });
  container.appendChild(card);
}
function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}