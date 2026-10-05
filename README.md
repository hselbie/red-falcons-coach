# ⚽ The Red Falcons — Soccer Coach App

Youth soccer match, lineup, and substitution management app built for 6v6 matches (2-2-1 formation).

## Features
- **🏟️ Match & Field Dashboard**: Live scoreboard (+/- goals), quarter timer (10m quarters), 6v6 field visualizer, and bench management.
- **⚡ 1-Tap Sub Recommendations**: Smart substitution suggestions with **Next Option** cycling to easily find the right player pairing on the fly.
- **🧤 Full-Half Goalie Protection**: Goalkeepers play 1 full half and are automatically protected from outfield substitution recommendations.
- **⏱️ Live Playing Time Tracker**: Real-time minute counters for each player to maintain balanced field time.
- **🔒 Coach Auth**: Quick authentication built-in.
  - **Username:** `coach`
  - **Password:** `redfalconsarethebest`

---

## 🚀 Deploy to GitHub Pages in 1 Minute

1. **Create a GitHub Repository**:
   - Go to [github.com/new](https://github.com/new) and create a repository named `red-falcons-coach` (or any name you like).

2. **Push Code to GitHub**:
   ```bash
   cd soccer-coach-app
   git init
   git add .
   git commit -m "Initial commit for The Red Falcons coach app"
   git branch -M main
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/red-falcons-coach.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to your repository on GitHub.
   - Click **Settings** ➔ **Pages** (in the left sidebar).
   - Under **Build and deployment** ➔ **Branch**:
     - Select `main` branch.
     - Folder: `/(root)`.
   - Click **Save**.

Your app will be live at:
`https://<YOUR_GITHUB_USERNAME>.github.io/red-falcons-coach/`
