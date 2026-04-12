const SQUAD_KEY = "pokedex-dashboard-squad";
const SQUAD_SIZE = 6;
const squadGrid = document.getElementById("squadGrid");
let squad = loadSquad();

if (!squadGrid) {
  console.error("Dashboard squad grid not found.");
} else {
  squadGrid.addEventListener("click", handleGridClick);
  renderSquad();
}

function createEmptySquad() {
  return Array.from({ length: SQUAD_SIZE }, () => null);
}

function loadSquad() {
  try {
    const saved = JSON.parse(localStorage.getItem(SQUAD_KEY) || "[]");
    if (!Array.isArray(saved)) {
      return createEmptySquad();
    }

    const normalized = saved.slice(0, SQUAD_SIZE).map((slot) => {
      if (!slot || typeof slot !== "object") {
        return null;
      }

      return {
        id: slot.id,
        name: slot.name,
        image: slot.image,
      };
    });

    return [...normalized, ...createEmptySquad()].slice(0, SQUAD_SIZE);
  } catch (error) {
    console.error("Failed to parse squad from localStorage:", error);
    return createEmptySquad();
  }
}

function persistSquad() {
  localStorage.setItem(SQUAD_KEY, JSON.stringify(squad));
}

function renderSquad() {
  const slotsMarkup = squad
    .map((pokemon, index) => {
      const slotHeader = `<span class="slot-index">Slot ${index + 1}</span>`;

      if (!pokemon) {
        return `
          <article class="squad-slot">
            ${slotHeader}
            <p class="slot-name">Empty Slot</p>
            <div class="slot-actions">
              <button type="button" class="slot-btn" data-action="add" data-index="${index}">Add Pokemon</button>
            </div>
          </article>
        `;
      }

      return `
        <article class="squad-slot">
          ${slotHeader}
          <img src="${pokemon.image}" alt="${capitalize(pokemon.name)}" loading="lazy" />
          <p class="slot-name">${capitalize(pokemon.name)}</p>
          <div class="slot-actions">
            <button type="button" class="slot-btn" data-action="replace" data-index="${index}">Replace</button>
            <button type="button" class="slot-btn clear" data-action="remove" data-index="${index}">Remove</button>
          </div>
        </article>
      `;
    })
    .join("");

  squadGrid.innerHTML = slotsMarkup;
}

async function handleGridClick(event) {
  const button = event.target.closest(".slot-btn");
  if (!button) {
    return;
  }

  const action = button.dataset.action;
  const index = Number(button.dataset.index);

  if (action === "remove") {
    squad[index] = null;
    persistSquad();
    renderSquad();
    return;
  }

  const query = window.prompt("Enter Pokemon name or id:");
  if (!query) {
    return;
  }

  button.disabled = true;
  button.textContent = "Loading...";

  const pokemon = await fetchPokemon(query.trim().toLowerCase());
  if (!pokemon) {
    window.alert("Pokemon not found. Try another name or id.");
    renderSquad();
    return;
  }

  squad[index] = pokemon;
  persistSquad();
  renderSquad();
}

async function fetchPokemon(query) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
    if (!response.ok) {
      return null;
    }

    const pokemon = await response.json();
    const image =
      pokemon.sprites.other["official-artwork"].front_default ||
      pokemon.sprites.front_default;

    if (!image) {
      return null;
    }

    return {
      id: pokemon.id,
      name: pokemon.name,
      image,
    };
  } catch (error) {
    console.error("Failed to fetch Pokemon:", error);
    return null;
  }
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
