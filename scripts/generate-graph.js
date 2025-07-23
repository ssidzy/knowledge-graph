const fs = require('fs');
const path = require('path');
const { remark } = require('remark');
const { visit } = require('unist-util-visit');

const notesDir = path.join(__dirname, '../docs/notes');
const outputFile = path.join(__dirname, '../docs/graph.json');

const nodes = [];
const edges = [];

fs.readdirSync(notesDir).forEach(file => {
  if (!file.endsWith('.md')) return;

  const filePath = path.join(notesDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const ast = remark().parse(content);

  let title = path.basename(file, '.md');
  visit(ast, 'heading', (node) => {
    if (node.depth === 1 && node.children?.[0]?.value) {
      title = node.children[0].value;
    }
  });

  const encodedId = encodeURIComponent(file);  // ✅ Important fix
  nodes.push({
    id: encodedId,
    label: title,
    path: `notes/${file}`
  });

  visit(ast, 'link', (node) => {
    if (node.url.endsWith('.md')) {
      const target = encodeURIComponent(path.basename(node.url)); // ✅ encode this too
      edges.push({
        source: encodedId,
        target: target
      });
    }
  });
});

fs.writeFileSync(outputFile, JSON.stringify({
  nodes: nodes.map(n => ({ data: n })),
  edges: edges.map(e => ({ data: e }))
}, null, 2));

console.log(`✅ Final graph generated with ${nodes.length} nodes and ${edges.length} edges`);
