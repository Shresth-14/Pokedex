const FAVOURITES_KEY = "pokedex-favourites";

function getFavouriteIds() {
  try {
    const parsed = JSON.parse(localStorage.getItem(FAVOURITES_KEY) || "[]");
    if (!Array.isArray(parsed)) {
      return [];
    }

    return [...new Set(parsed.map(Number).filter((id) => Number.isInteger(id) && id > 0))];
  } catch (error) {
    console.error("Failed to read favourites from localStorage", error);
    return [];
  }
}

function saveFavouriteIds(ids) {
  localStorage.setItem(FAVOURITES_KEY, JSON.stringify([...new Set(ids)]));
}

function isFavourite(id) {
  return getFavouriteIds().includes(Number(id));
}

function addFavourite(id) {
  const targetId = Number(id);
  const ids = getFavouriteIds();

  if (!ids.includes(targetId)) {
    ids.push(targetId);
    saveFavouriteIds(ids);
  }

  return true;
}

function removeFavourite(id) {
  const targetId = Number(id);
  const ids = getFavouriteIds().filter((savedId) => savedId !== targetId);

  saveFavouriteIds(ids);
  return false;
}

function toggleFavourite(id) {
  return isFavourite(id) ? removeFavourite(id) : addFavourite(id);
}

window.getFavouriteIds = getFavouriteIds;
window.isFavourite = isFavourite;
window.addFavourite = addFavourite;
window.removeFavourite = removeFavourite;
window.toggleFavourite = toggleFavourite;
