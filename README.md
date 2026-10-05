# Emergency Response Route Optimizer

A **Design and Analysis of Algorithms (DAA)** mini project that simulates an emergency vehicle finding routes through a **weighted graph** representing a fictional road network. Compare **BFS**, **Dijkstra's algorithm**, and **A\*** with live metrics and SVG visualization.

> **Note:** This is a simulated road network. It does not provide real-time emergency navigation, live traffic, or real geographic data.

## Problem Statement

Emergency responders must reach hospitals quickly through a road network where distances differ, some roads may be blocked, and multiple routes exist. This project models the problem as **shortest-path search on a weighted graph** and compares classical graph algorithms.

## Objective

- Represent locations as **vertices** and roads as **weighted edges**
- Implement BFS, Dijkstra, and A* **manually** (no routing libraries)
- Visualize search and final routes on an interactive SVG graph
- Compare algorithms by path cost, nodes visited, and execution time
- Support **road blocking** to demonstrate dynamic rerouting

## Features

- Interactive simulated map (~20 locations) with **node hover** (grows in place at fixed coordinates)
- Dark, Apple-inspired UI with glass panels
- Algorithm animation with speed control (Slow / Med / Fast)
- **Find Route** — animates the selected method and shows a **trip comparison** (BFS, Dijkstra, A*) with **Fastest / Medium / Slowest** by path cost (tie-break: execution time)
- **Compare All** — detailed metrics table for the same trip
- Road Management (**Roads**) — click edges to block or unblock
- **Algorithm Analysis** — educational section (toggle button at bottom)
- Vitest unit tests for core pathfinding logic

## Prerequisites

- **Node.js** 18 or newer (LTS recommended) — [nodejs.org](https://nodejs.org)
- **npm** (included with Node.js)
- **Git** (optional, for cloning and pushing to GitHub)

## Installation

Install dependencies once per machine (or after `git pull` if `package.json` changed).

### Option A — Clone from GitHub

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
npm install
```

### Option B — Use this folder locally

```bash
cd path/to/DAA
npm install
```

This installs React, Vite, Tailwind CSS, Vitest, and other packages into `node_modules`. That folder is listed in `.gitignore` and should **not** be committed.

**Quick start**

- **First time:** `npm install` then `npm run dev`
- **Every day after:** `npm run dev`

## Available scripts

| Command | Purpose |
|---------|---------|
| `npm install` | Install project dependencies |
| `npm run dev` | Start development server (usually [http://localhost:5173](http://localhost:5173)) |
| `npm run build` | Create production build in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm test` | Run Vitest unit tests |
| `npm run lint` | Run oxlint |

## How the Simulation Works

1. Set **From**, **To**, and **Method** (which algorithm animates on the map).
2. Click **Find Route** — the graph animates the selected algorithm; **Route Result** shows that run; **Fast response from any location** compares all three algorithms for this trip (Fastest / Medium / Slowest by path cost).
3. Click **Compare All** for an extra detailed comparison table (metrics use `performance.now()`, not hardcoded values).
4. Turn on **Roads**, click a road on the map to block or unblock it, then run **Find Route** again.
5. Open **Algorithm Analysis** at the bottom for BFS, Dijkstra, and A* notes.

## DAA Algorithms Used

| Algorithm | Role in project |
|-----------|-----------------|
| BFS | Baseline — minimum hop count (not minimum weight) |
| Dijkstra | Minimum-cost path with non-negative weights |
| A* | Goal-directed search with Euclidean heuristic |

## Graph Representation

- **Nodes:** `{ id, name, x, y }` — layout coordinates for SVG and A* heuristic
- **Edges:** `{ source, target, weight, blocked }` — bidirectional roads
- **Blocked edges:** Excluded from adjacency list at runtime

Data file: [`src/data/graphData.js`](src/data/graphData.js)

## BFS

- Queue-based layer-by-layer exploration
- **Time:** O(V + E) — **Space:** O(V)
- Finds shortest path in **number of edges**; does not guarantee minimum total weight on weighted graphs

## Dijkstra

- Min-heap priority queue on current best distance
- **Time:** O((V + E) log V) — **Space:** O(V)
- Optimal for non-negative edge weights

## A*

- f(n) = g(n) + h(n); h(n) = Euclidean distance to destination
- **Time:** O((V + E) log V) typical with heap — **Space:** O(V)
- Can visit fewer nodes than Dijkstra when the heuristic is informative; not always faster

## Complexity Analysis

See in-app **Algorithm Analysis** and the comparison tables for time/space complexity per algorithm.

## Technology Stack

- React + JavaScript
- Vite
- Tailwind CSS (v4 via `@tailwindcss/vite`)
- SVG graph rendering
- Vitest for tests
- No backend, database, authentication, or external map APIs

## Project Structure

```
src/
  components/
    ui/              # Card, Button
    TripRouteComparison.jsx
    ControlPanel.jsx
    GraphCanvas.jsx
    ...
  algorithms/        # bfs.js, dijkstra.js, astar.js
  data/              # graphData.js, algorithmMeta.js, testGraph.js
  utils/             # graphUtils.js, performance.js, rankAlgorithms.js
  App.jsx
  main.jsx
```

## Publish to GitHub

Use these steps the first time you upload this project. Replace `<YOUR_USERNAME>` and `<REPO_NAME>` with your GitHub username and repository name (e.g. `emergency-route-optimizer`).

### 1. Create the repository on GitHub

- Go to [github.com/new](https://github.com/new)
- Name the repo (e.g. `emergency-route-optimizer`)
- Choose Public or Private
- **Do not** add a README, `.gitignore`, or license on GitHub if you already have them in this folder

Suggested repository description:

> DAA mini project — BFS, Dijkstra, A* on a simulated emergency road network (React + Vite).

### 2. Initialize Git and push (Windows PowerShell)

```powershell
cd c:\Users\kundl\OneDrive\Desktop\DAA

# Only if this folder is not already a git repository:
git init

git add .
git commit -m "Initial commit: Emergency Response Route Optimizer DAA project"

git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/<REPO_NAME>.git
git push -u origin main
```

If `origin` already exists, update it:

```powershell
git remote set-url origin https://github.com/<YOUR_USERNAME>/<REPO_NAME>.git
git push -u origin main
```

### 3. Alternative — GitHub CLI

If [GitHub CLI](https://cli.github.com/) is installed and you are logged in:

```bash
gh repo create <REPO_NAME> --public --source=. --remote=origin --push
```

### What not to commit

- `node_modules/` and `dist/` (already in `.gitignore`)
- `.env` files or API keys (this project does not require secrets)

## Limitations

- Simulated network only — not real roads or GPS
- No real-time traffic or live incident data
- Euclidean heuristic is a geometric estimate, not drive time
- Single vehicle, static weights

## Future Enhancements

- Real map integration (e.g. OpenStreetMap)
- Real-time traffic weights
- GPS / live vehicle position
- Multiple emergency units and dispatch
- Dynamic edge weight updates

## License

Academic/educational use.
