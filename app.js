function fetchCharacters() {
    fetch("https://rickandmortyapi.com/api/character")
        .then(response => response.json())
        .then(data => {
            displayCharacters(data.results)
        })
        .catch(error => console.log('Erreur:', error));
}

function displayCharacters(characters) {
    const charactersGrid = document.getElementById('characters');

    characters.forEach(character => {
        const charactersCard = document.createElement('div');
        charactersCard.classList.add('character-card');

        const statusClass = character.status.toLowerCase() === 'alive' ? 'alive' : 'dead';

        charactersCard.innerHTML = `
        <img src="${character.image}" alt="${character.name}">
        <h2>${character.name}</h2>
        <div class="status">
            <span class="status-dot ${statusClass}"></span>
            <p>${character.status}</p>
        </div>
        <div class="card-footer">
            <button class="btn-icon" title="Resize">
               <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="Icon / Resize"><rect id="Square" x="3.5" y="3.5" width="12" height="12" fill="white" stroke="black"/><rect id="Small Square" x="0.5" y="0.5" width="9" height="9" fill="white" stroke="black"/></g></svg>
            </button>
        </div>
        `;

        charactersGrid.appendChild(charactersCard);
    });
}

fetchCharacters();