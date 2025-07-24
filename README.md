
# Obsidian-style Knowledge Graph Viewer

This is a lightweight, interactive graph viewer for markdown-based knowledge systems — inspired by Obsidian's graph view.

## 🚀 Features

- Auto-generated graph from Markdown `[]()` links
- Interactive node graph with Cytoscape.js
- Click nodes to preview rendered Markdown
- Dark mode layout with search and zoom reset
- Backlinks panel to see what links *to* the selected note

## 📁 Project Structure

```
.
├── index.html       # Main app page
├── style.css        # Dark theme styles
├── script.js        # Graph logic and markdown preview
├── graph.json       # Auto-generated graph from markdown
├── notes/           # Folder containing .md files
│   ├── doc1.md
│   └── ...
```

## 🌐 Deploy via GitHub Pages

1. Push this project to a GitHub repository.
2. Go to **Settings > Pages**.
3. Under **Source**, select:
   - **Branch:** `main` (or your default branch)
   - **Folder:** `/ (root)`
4. Click **Save**.

> Make sure to include a `.nojekyll` file in the root to avoid GitHub Pages ignoring files/folders that start with `_`.

## 🛠 Future Ideas

- Tag filtering via YAML or `#tags`
- Bidirectional edge arrows
- Editable graph layout persistence
- Real-time sync with markdown updates

---

Built with ❤️ using [Cytoscape.js](https://js.cytoscape.org/) and [Marked.js](https://marked.js.org/)

