# Pokedex Web Application

A multi-page Pokedex built with vanilla HTML, CSS, and JavaScript. It uses live data from PokéAPI and includes dashboard squad building, explore, details, and favourites pages.

## Overview

This project focuses on a clean UI, simple architecture, and browser-only setup.

- Dashboard: Build a 6-slot Pokemon squad and persist it in localStorage.
- Explore: Browse Pokemon, search by name, and filter by type.
- Details: View one Pokemon with types, abilities, height/weight, and base stats.
- Favourites: Save favourites and manage them with search and type filtering.

## API

Data source: https://pokeapi.co

Main endpoints used:

- GET /api/v2/pokemon?limit=1000
- GET /api/v2/pokemon/{id}
- GET /api/v2/pokemon/{name}

No API key is required.

## Features

### Dashboard

- 6 squad slots (add/replace/remove Pokemon).
- Accepts Pokemon name or id input when adding to a slot.
- Squad persisted in localStorage.

### Explore

- Loads a Pokemon list from PokéAPI.
- Search by name.
- Filter by type.
- Toggle favourite directly from cards.

### Details

- Fetches selected Pokemon by id from URL query.
- Shows artwork, id, types, abilities, stats, and measurements.
- Toggle favourite from details view.

### Favourites

- Reads favourite ids from localStorage.
- Displays favourite cards with API data.
- Search and type filter on favourites list.
- Remove favourites from the page directly.

## Tech Stack

- HTML5
- CSS3
- JavaScript (ES6+)
- Fetch API
- localStorage

## Project Structure

```
Pokedex/
├── index.html
├── style.css
├── navigation.js
├── README.md
├── cssfolders/
│   ├── details.css
│   ├── explore.css
│   └── favourites.css
├── htmlfolders/
│   ├── details.html
│   ├── explore.html
│   └── favourites.html
├── images/
└── jsfolders/
	├── dashboard.js
	├── details.js
	├── explore.js
	├── favourites-storage.js
	└── favourites.js
```

## Run Locally

No build step is required.

1. Clone or download this repository.
2. Open index.html in a browser.

Recommended:

1. Open the folder in VS Code.
2. Run with Live Server for easier navigation across pages.

## Requirements

- Internet connection (for PokéAPI requests)
- Modern browser (Chrome, Edge, Firefox, Safari)

## Author

Shresth Juyal

