// Générer la table des matières à partir des titres de la section centrale
function generateTOC() {
        const contentArea = document.getElementById('content-area');
        const rightSection = document.getElementById('right-section');
    if (!contentArea || !rightSection) return;

    // Trouver le composant actuellement visible (pas display:none)
    const visibleContent = Array.from(contentArea.children).find(
        el => el.style.display !== 'none'
    );
    if (!visibleContent) return;

    // Sélectionner tous les titres h2, h3, h4 dans le composant visible
    const headings = visibleContent.querySelectorAll('h2, h3, h4');
    if (!headings.length) return;

    // Générer des IDs uniques pour chaque titre si absent
    headings.forEach((heading, idx) => {
        if (!heading.id) {
            heading.id = heading.textContent.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '') + '-' + idx;
        }
    });

    // Construire la TOC HTML
    let tocHtml = '<h2>On this page</h2><nav class="toc-nav">';
    headings.forEach(heading => {
        const level = parseInt(heading.tagName[1]);
        const indent = (level - 2) * 16;
        tocHtml += `<a href="#${heading.id}" class="toc-link" style="margin-left:${indent}px">${heading.textContent}</a>`;
    });
    tocHtml += '</nav>';
    rightSection.innerHTML = tocHtml;

    // Ajouter le scroll fluide au clic sur la TOC
    rightSection.querySelectorAll('.toc-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                history.replaceState(null, null, `#${targetId}`);
            }
        });
    });
}

// Appeler generateTOC au chargement initial
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        generateTOC();
    });
    window.generateTOC = generateTOC;
}

