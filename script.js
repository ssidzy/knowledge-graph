
let cy;
let backlinksMap = {};

fetch('graph.json')
  .then(res => res.json())
  .then(data => {
    data.edges.forEach(e => {
      if (!backlinksMap[e.data.target]) backlinksMap[e.data.target] = [];
      backlinksMap[e.data.target].push(e.data.source);
    });

    cy = cytoscape({
      container: document.getElementById('cy'),
      elements: data,
      style: [
        {
          selector: 'node',
          style: {
            'label': 'data(label)',
            'background-color': '#00bcd4',
            'color': '#fff',
            'text-valign': 'center',
            'text-halign': 'center',
            'font-size': '14px',
            'width': 'label',
            'height': 'label',
            'padding': '10px'
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 2,
            'line-color': '#aaa',
            'target-arrow-color': '#aaa',
            'target-arrow-shape': 'triangle'
          }
        }
      ],
      layout: { name: 'cose' }
    });

    cy.on('tap', 'node', evt => {
      const data = evt.target.data();
      fetch(data.path)
        .then(res => res.text())
        .then(text => {
          document.getElementById('preview').style.display = 'block';
          document.getElementById('preview-title').innerText = data.label;
          const html = marked.parse(DOMPurify.sanitize(text));
          document.getElementById('preview-content').innerHTML = html;

          const backlinks = backlinksMap[data.id] || [];
          document.getElementById('backlinks').innerHTML =
            backlinks.length
              ? `<h3>Backlinks</h3><ul>` + backlinks.map(b => `<li>${b}</li>`).join('') + `</ul>`
              : '';
        });
    });

    document.getElementById('search').addEventListener('input', e => {
      const val = e.target.value.toLowerCase();
      cy.nodes().forEach(n => {
        if (n.data('label').toLowerCase().includes(val)) {
          n.style('background-color', '#ff9800');
        } else {
          n.style('background-color', '#00bcd4');
        }
      });
    });
  });

function resetZoom() {
  if (cy) cy.fit();
}
