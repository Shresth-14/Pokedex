const favouritesContainer = document.getElementById("favouriteContainer");
const searchInput = document.getElementById("searchInput");
const typeSortSelect = document.getElementById("typeSortSelect");

let allFavouritePokemon = [];

if (!favouritesContainer || !searchInput || !typeSortSelect) {
  console.error("Favourites page elements not found.");
} else {
  searchInput.addEventListener("input", renderFilteredFavourites);
  typeSortSelect.addEventListener("change", renderFilteredFavourites);
  loadFavourites();
}

async function loadFavourites() {
  const favouriteIds = getFavouriteIds();

  if (!favouriteIds.length) {
    renderEmptyState();
    return;
  }

  favouritesContainer.innerHTML = "<p>Loading favourites...</p>";

  try {
    const favourites = await Promise.all(favouriteIds.map((id) => loadOnePokemon(id)));
    allFavouritePokemon = favourites.filter(Boolean);

    if (!allFavouritePokemon.length) {
      renderEmptyState();
      return;
    }

    setTypeOptions();
    renderFilteredFavourites();
  } catch (error) {
    favouritesContainer.innerHTML = "<p>Failed to load favourites.</p>";
    console.error(error);
  }
}

function renderFilteredFavourites() {
  const searchText = searchInput.value.trim().toLowerCase();
  const selectedType = typeSortSelect.value;

  let visiblePokemon = allFavouritePokemon.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchText)
  );

  if (selectedType !== "all") {
    visiblePokemon = visiblePokemon.filter((pokemon) =>
      pokemon.types.some((t) => t.type.name === selectedType)
    );
  }

  favouritesContainer.innerHTML = "";

  if (!visiblePokemon.length) {
    renderEmptyState("No Matches Found", "Try a different name or Pokémon type filter.");
    return;
  }

  visiblePokemon.forEach((pokemon) => addFavouriteCard(pokemon));
}

function setTypeOptions() {
  const allTypes = new Set();

  allFavouritePokemon.forEach((pokemon) => {
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

async function loadOnePokemon(id) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!response.ok) {
      throw new Error("Pokemon request failed");
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch favourite pokemon:", error);
    return null;
  }
}

function addFavouriteCard(pokemon) {
  const card = document.createElement("div");
  card.className = "card";

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
      <button class="fav-btn active" aria-label="Remove favourite">♥</button>
      <span class="number">${pokemon.id}</span>
      <img src="${image}" alt="${name}" />
    </div>
    <div class="card-body">
      <div class="title-row">
        <h3>${name}</h3>
        <p class="id">#${pokemon.id}</p>
      </div>
      <div class="tags">${types}</div>
      <p class="meta-line"><span>Ability</span> ${primaryAbility}</p>
    </div>
  `;

  const favBtn = card.querySelector(".fav-btn");
  favBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    removeFavourite(pokemon.id);
    allFavouritePokemon = allFavouritePokemon.filter((savedPokemon) => savedPokemon.id !== pokemon.id);
    renderFilteredFavourites();
  });

  card.addEventListener("click", () => {
    window.location.href = `details.html?id=${pokemon.id}`;
  });

  favouritesContainer.appendChild(card);
}

function renderEmptyState(title = "No Favourites Yet", message = "Tap the heart icon on Explore or Details to add Pokémon here.") {
  favouritesContainer.innerHTML = `
    <div class="empty-state">
      <h2>${title}</h2>
      <p>${message}</p>
      <button class="empty-btn" onclick="goToExplore()">Go To Explore</button>
    </div>
  `;
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
