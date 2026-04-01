const container = document.getElementById("pokemonContainer");
const searchInput = document.getElementById("searchInput");
const typeSortSelect = document.getElementById("typeSortSelect");

let allPokemon = [];

async function loadPokemon() {
  try {
    container.innerHTML = "<p>Loading Pokémon...</p>";

    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
    const data = await res.json();

    const details = [];

    for (const item of data.results) {
      const pokemon = await loadOnePokemon(item.url);
      if (pokemon) {
        details.push(pokemon);
      }
    }
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
    return await res.json();
  } catch (err) {
    console.error("Error fetching pokemon:", err);
    return null;
  }
}

function showPokemon() {
  const searchText = searchInput.value.trim().toLowerCase();
  const selectedType = typeSortSelect.value;

  let visiblePokemon = allPokemon.filter((pokemon) =>
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
  card.className = "pokemon-card";

  const types = pokemon.types
    ? pokemon.types
        .map((t) => `<span class="type ${t.type.name}">${t.type.name}</span>`)
        .join("")
    : "<span>No type</span>";

  const name = capitalize(pokemon.name);

  const image =
    pokemon.sprites.other["official-artwork"].front_default ||
    pokemon.sprites.front_default;

  card.innerHTML = `
    <img src="${image}" alt="${name}" />
    <h3>${name}</h3>
    <div class="types">${types}</div>
    <p>#${pokemon.id}</p>
  `;

  card.addEventListener("click", () => {
    window.location.href = `details.html?id=${pokemon.id}`;
  });
  container.appendChild(card);
}
function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
searchInput.addEventListener("input", showPokemon);
typeSortSelect.addEventListener("change", showPokemon);

loadPokemon();