const detailsContainer = document.getElementById("pokemonDetails");
const params = new URLSearchParams(window.location.search);
const pokemonId = params.get("id");

if (!pokemonId) {
  detailsContainer.innerHTML = "<p>Missing Pokémon id.</p>";
} else {
  loadPokemonDetails(pokemonId);
}

async function loadPokemonDetails(id) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

    if (!response.ok) {
      throw new Error("Pokemon not found");
    }

    const pokemon = await response.json();
    renderDetails(pokemon);
  } catch (error) {
    detailsContainer.innerHTML = `<p>Failed to load details: ${error.message}</p>`;
  }
}

function renderDetails(pokemon) {
  const favourite = window.isFavourite ? window.isFavourite(pokemon.id) : false;
  const types = pokemon.types
    .map((t) => `<span class="tag ${t.type.name}">${t.type.name}</span>`)
    .join("");

  const abilities = pokemon.abilities
    .map((a) => `<span class="chip">${capitalize(a.ability.name.replace("-", " "))}</span>`)
    .join("");

  const stats = pokemon.stats
    .map((s) => {
      const value = s.base_stat;
      const width = Math.min((value / 180) * 100, 100);
      return `
        <div class="item">
          <span>${s.stat.name}</span>
          <div class="bar"><div class="bar-fill" style="width:${width}%"></div></div>
          <strong>${value}</strong>
        </div>
      `;
    })
    .join("");

  const image =
    pokemon.sprites.other["official-artwork"].front_default ||
    pokemon.sprites.front_default;

  detailsContainer.innerHTML = `
    <div class="row">
      <div class="preview">
        <span class="large-number">${pokemon.id}</span>
        <img class="image" src="${image}" alt="${pokemon.name}" />
      </div>
      <div class="content">
        <div class="title-row">
          <h1 class="title">${capitalize(pokemon.name)}</h1>
          <button class="fav-btn fav-button ${favourite ? "active" : ""}" aria-label="Toggle favourite">${favourite ? "♥" : "♡"}</button>
        </div>
        <p class="id">#${pokemon.id}</p>
        <div class="tags">${types}</div>
        <p class="label">Abilities</p>
        <div class="chips">${abilities}</div>
        <div class="info-row">
          <span><strong>Height:</strong> ${pokemon.height}</span>
          <span><strong>Weight:</strong> ${pokemon.weight}</span>
        </div>
      </div>
    </div>

    <section class="box">
      <h3 class="heading">Base Stats</h3>
      <div class="list">${stats}</div>
    </section>
  `;

  const favBtn = detailsContainer.querySelector(".fav-button");
  if (!favBtn) {
    return;
  }

  favBtn.addEventListener("click", function () {
    const isNowFav = window.toggleFavourite ? window.toggleFavourite(pokemon.id) : false;
    favBtn.classList.toggle("active", isNowFav);
    favBtn.textContent = isNowFav ? "♥" : "♡";
  });
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
