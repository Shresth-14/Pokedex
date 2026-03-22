# Pokédex Web Application

A responsive web application that lets users explore their favourite Pokémon using live data from the PokéAPI.

---

## Purpose

The goal of this project is to build an interactive Pokédex that fetches real Pokémon data from a public API and presents it through a clean, user-friendly interface. Users can browse hundreds of Pokémon, search by name, filter by type, sort the list, and save their favourites — all in a single-page application built with vanilla HTML, CSS, and JavaScript.

---

## API Used

**PokéAPI** — [https://pokeapi.co](https://pokeapi.co)

A free, open, and fully documented REST API for Pokémon data. No API key or authentication is required.

Endpoints used in this project:

| Endpoint | Purpose |
|---|---|
| `GET /api/v2/pokemon?limit=40&offset=0` | Fetch a paginated list of Pokémon |
| `GET /api/v2/pokemon/{name}` | Fetch full details for a single Pokémon |

Data retrieved includes names, IDs, types, base stats, abilities, height, weight, and official artwork sprites.

---

## Features

### Core Features
- **Browse Pokémon** — Paginated grid of Pokémon cards with Image, name, ID, and type badges
- **Search** — Real-time search by Pokémon name as you type
- **Filter by Type** — Click any type chip (Fire, Water, Grass, etc.) to filter the grid
- **Sort** — Sort by ID ascending/descending or alphabetically A–Z / Z–A
- **Detail Modal** — Click any card to open a popup showing base stats, abilities, height, and weight

### Extra Features
- **Favourites** — Heart any Pokémon to save it; persisted using `localStorage`
- **Favourites View** — Toggle to see only your saved Pokémon
- **Stat Bars** — Animated visual bars for HP, Attack, Defense, Sp. Atk, Sp. Def, Speed
- **Responsive Design** — Works on mobile, tablet, and desktop

---

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Structure of the web application |
| CSS3 | Styling and responsive design |
| JavaScript (ES6+) | Logic, API calls, and interactivity |
| Fetch API | Retrieving data from PokéAPI |
| LocalStorage | Saving favourite Pokémon |

---

## Project Structure

```
pokedex/
│
├── index.html      # Main HTML file — structure, styles, and scripts
├── style.css       # Styling (can be split into multiple files if needed)
├── script.js       # JavaScript logic (can be split into multiple files if needed)
├── README.md       # Project documentation
```
---

## How to Run

This project requires no build tools, package managers, or server setup.

**Option 1 — Open directly in browser**
1. Download or clone this repository
2. Open `index.html` in any modern web browser (Chrome, Firefox, Edge, Safari)
3. The app will load and begin fetching Pokémon data automatically

**Option 2 — Run with a local server (recommended)**

Using VS Code with the Live Server extension:
1. Open the project folder in VS Code
2. Right-click `index.html` and select **Open with Live Server**


**Requirements:**
- An active internet connection (to fetch data from PokéAPI)
- A modern browser with ES6 support

---


## Author

> *(Shresth Juyal)*

