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

        charactersCard.innerHTML = `
        <img src="${character.image}" alt="${character.name}">
        <h2>${character.name}</h2>
        <p>${character.status}</p>
        `;

        charactersGrid.appendChild(charactersCard);
    });
}

fetchCharacters();