import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';

mermaid.initialize({ startOnLoad: true });

async function fetchDiagram() {
    const response = await fetch('diagrama.mmd');
    if (response.ok) {
        const text = await response.text();
        const container = document.getElementById('mermaid');
        const mermaidDiv = document.createElement('div');
        mermaidDiv.className = 'mermaid';
        mermaidDiv.textContent = text;
        container.appendChild(mermaidDiv);
        mermaid.init(undefined, document.querySelectorAll('.mermaid'));
    } else {
        console.error('Error fetching the Mermaid diagram:', response.statusText);
    }
}

document.addEventListener('DOMContentLoaded', fetchDiagram);