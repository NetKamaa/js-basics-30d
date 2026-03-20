# JavaScript Practice Project (Days 4--14)

This project is part of my **30-Day JavaScript Learning Journey**.

Between **Day 4 and Day 14**, I built a small application using
**vanilla JavaScript** to practice core frontend concepts and learn how
to structure a real project without frameworks.

The goal of this stage was to move beyond simple exercises and start
thinking in terms of **application architecture, state management, and
modular code organization**.

---

# Features

The application includes several core frontend mechanics:

- Add items to a list
- Delete items
- Filter items by text
- Load initial data from an API
- Persist data in **localStorage**
- Display statistics (total / visible items)
- Handle loading and error states
- Basic input validation

---

# Application Logic

The project follows a **state-driven architecture**, similar to how
modern frontend frameworks work.

### Async API loading

Data is fetched from a remote API using **async/await** and processed
before being stored in the application state.

### Explicit state management

The application keeps a single **source of truth** inside a state
object.

Example of stored state:

- items
- filter
- requestStatus
- requestError

The UI is always rendered based on this state.

### Derived data

Some values are computed from the state instead of being stored
directly:

- visibleItems
- statistics
- UI flags

This keeps the state minimal and predictable.

### Local persistence

Items and filter values are stored in **localStorage**, allowing the
application to restore previous data after a page reload.

---

# Project Architecture

The codebase is intentionally split into modules to simulate a real
application structure.

    api.js        → API requests
    actions.js    → async actions
    state.js      → state management
    render.js     → UI rendering
    handlers.js   → DOM event handlers
    utils.js      → pure helper functions
    main.js       → application bootstrap
    index.html    → UI

Responsibilities are clearly separated:

- **state** manages data
- **actions** perform operations
- **render** updates the UI
- **handlers** react to user events
- **utils** provide reusable helper functions

---

# What I Practiced

During this project I focused on:

- modular JavaScript architecture
- separating logic into layers
- working with asynchronous code
- API requests using Fetch
- DOM rendering patterns
- event delegation
- input validation
- localStorage persistence
- defensive programming

---

# Learning Context

This project represents the **first practical milestone** of my 30‑day
JavaScript roadmap.

The overall learning track:

    Days 1–14
    Core JavaScript + Mini Project (this repository)

    Days 15–22
    Fake Store Catalog
    API-driven product catalog using Fake Store API

    Days 23–30
    Notes Pro
    A more advanced notes application

Each project increases in complexity and helps transition from **basic
JavaScript exercises to building structured frontend applications**.

---

# Upcoming Projects

## Fake Store Catalog

The next project will be a **product catalog application** based on the
Fake Store API.

Planned features:

- product list
- filtering and search
- pagination or "load more"
- favorites
- product modal view
- UI state handling

A link to this repository will be added once the project is completed.

https://github.com/NetKamaa/Catalog-FakeStore . 13.03.2026

---

## Notes Pro

The final project of the roadmap will be **Notes Pro**, a more advanced
application focused on:

- note creation and editing
- structured state management
- persistent storage
- richer UI interactions

A link to this repository will be added after completion.

https://github.com/NetKamaa/Notes-Pro . 20.30.2026
---

# How to Run

1.  Clone the repository
2.  Open `index.html` in a browser

No build tools or dependencies are required.

---

# Future Direction

The goal of this learning journey is to move from **core JavaScript
fundamentals** to building **modern frontend applications**, and later
transition to **React and full‑stack development**.
