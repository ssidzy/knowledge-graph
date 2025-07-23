const fs = require('fs');
const path = require('path');
const { remark } = require('remark');
const { visit } = require('unist-util-visit');

const notesDir = path.join(__dirname, '../docs/notes');
const outputFile = path.join(__dirname, '../docs/graph.json');

const nodes = [];
const edges = [];

// Process all markdown files
fs.readdirSync(notesDir).forEach(file => {
  if (!file.endsWith('.md')) return;

  const filePath = path.join(notesDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const ast = remark().parse(content);

  // Extract title (first H1 or fallback to filename)
  let title = path.basename(file, '.md');
  visit(ast, 'heading', (node) => {
    if (node.depth === 1 && node.children && node.children.length > 0) {
      title = node.children[0].value;
    }
  });

  // Add node
  nodes.push({
    id: file,
    label: title,
    path: `notes/${file}`
  });

  // Extract links to other .md files
  visit(ast, 'link', (node) => {
    if (node.url.endsWith('.md')) {
      const targetFile = path.basename(node.url); // Ensure it's just the filename
      edges.push({
        source: file,
        target: targetFile
      });
    }
  });
});

// Save graph data
fs.writeFileSync(outputFile, JSON.stringify({
  nodes: nodes.map(n => ({ data: n })),
  edges: edges.map(e => ({ data: e }))
}, null, 2));

console.log(`✅ Generated graph with ${nodes.length} nodes and ${edges.length} edges`);
