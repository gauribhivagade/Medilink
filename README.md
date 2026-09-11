# MediLink AI - Multi-Agent Pharmacy Stock Assistant

MediLink AI is a multi-agent AI system designed to help users quickly find nearby pharmacies where a required medicine is available. It features spelling correction, generic medicine matching, location/distance-based inventory search, and automated workflows for alternative suggestions and restock notifications when primary medicines are unavailable.

## Features
- **Medicine Search Agent**: Normalizes spelling typos (using Levenshtein similarity) and resolves chemical compound mappings.
- **Pharmacy Search Agent**: Searches nearby mock pharmacies and sorts results by proximity distance.
- **Alternative Medicine Agent**: Suggests therapeutic equivalent generic medications when primary stocks are fully depleted, complete with medical safety disclaimers.
- **Notification Agent**: Establishes restock notification templates for users when medications are unavailable.
- **Interactive Database Manager**: A visual sidebar editor to adjust mock pharmacy stock counts on the fly and witness agents react reactively.
- **Replenishment Alert Toast**: Triggers active alerts in real-time if stock is replenished for a medicine on a user's notification watchlist.

---

## Tech Stack
- **Frontend Core**: React 18+ (JavaScript)
- **Scaffolding Tool**: Vite
- **Styling**: Vanilla CSS (Premium Obsidian Dark Mode & Glassmorphism design system)
- **Icons**: Lucide React

---

## Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v16.0.0 or higher recommended).

### Installation
1. Navigate to the project root directory:
   ```bash
   cd medilink-ai
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```

### Running Locally
To launch the interactive dashboard in development mode:
```bash
npm run dev
```
Open your browser and navigate to **[http://localhost:5173/](http://localhost:5173/)** to access the dashboard.

### Building for Production
To build the optimized static asset bundle:
```bash
npm run build
```
The output files will be compiled into the `dist` directory.

---

## Agent Communication Architecture
The multi-agent workflow operates in an event-driven loop:
1. **User Input** triggers the **Medicine Search Agent**.
2. If resolved, the output is passed to the **Pharmacy Search Agent**.
3. If the medicine is found **In Stock** in any pharmacy, locations are sorted and rendered immediately.
4. If the medicine is **Out of Stock** everywhere:
   - The **Alternative Medicine Agent** is triggered to find class-equivalent generic substitutes.
   - The **Notification Agent** is triggered to formulate restock SMS/Email alerts and render the watchlist signup form.
5. Replenishing stock via the database panel triggers a check against active notifications, firing a live alert toast when the stock is updated from `0` to `> 0`.
