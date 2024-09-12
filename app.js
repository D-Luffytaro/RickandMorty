let allCharacters = [];

function fetchCharacters() {
    fetch("https://rickandmortyapi.com/api/character")
        .then(response => response.json())
        .then(data => {
            allCharacters = data.results;
            displayCharacters(allCharacters);
        })
        .catch(error => console.log('Erreur:', error));
}

function displayCharacters(characters) {
    const charactersGrid = document.getElementById('characters');
    charactersGrid.innerHTML = '';

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
            <button class="btn-icon" onclick="goToCharacterDetail(${character.id})" title="Show Details">
               <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <g id="Icon / Resize">
                   <rect id="Square" x="3.5" y="3.5" width="12" height="12" fill="white" stroke="black"/>
                   <rect id="Small Square" x="0.5" y="0.5" width="9" height="9" fill="white" stroke="black"/>
                 </g>
               </svg>
            </button>
        </div>
        `;

        charactersGrid.appendChild(charactersCard);
    });
}

function showCharacterDetails(character) {
    const detailsSection = document.getElementById('character-details');
    detailsSection.innerHTML = `
        <h2>${character.name}</h2>
        <img src="${character.image}" alt="${character.name}">
        <p><strong>Status:</strong> ${character.status}</p>
        <p><strong>Species:</strong> ${character.species}</p>
        <p><strong>Gender:</strong> ${character.gender}</p>
        <p><strong>Location:</strong> ${character.location.name}</p>
    `;

    document.getElementById('character-list-page').classList.add('hidden');
    document.getElementById('character-details-page').classList.remove('hidden');

    document.querySelector('.controls-container').classList.add('hidden');
    history.pushState({ page: 'details', characterId: character.id }, '', `?character=${character.id}`);
}

function goToCharacterDetail(characterId) {
    const selectedCharacter = allCharacters.find(character => character.id === characterId);

    if (selectedCharacter) {
        showCharacterDetails(selectedCharacter);
    }
}

function displayAliveCharacters() {
    const aliveCharacters = allCharacters.filter(character => character.status.toLowerCase() === 'alive');
    displayCharacters(aliveCharacters);
}

function displayDeadCharacters() {
    const deadCharacters = allCharacters.filter(character => character.status.toLowerCase() === 'dead');
    displayCharacters(deadCharacters);
}

function showAllCharacters() {
    displayCharacters(allCharacters);
}

function filterCharactersNames() {
    const nameInput = document.getElementById('name-input').value.toLowerCase();
    const filteredCharacters = allCharacters.filter(character =>
        character.name.toLowerCase().includes(nameInput)
    );
    displayCharacters(filteredCharacters);
}

fetchCharacters();