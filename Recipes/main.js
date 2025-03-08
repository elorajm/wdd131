import recipes from './recipes.mjs';

function random(num) {
    return Math.floor(Math.random() * num);
}

function getRandomListEntry(list) {
    const listLength = list.length;
    const randomNum = random(listLength);
    return list[randomNum];
}

function tagsTemplate(tags) {
    return tags.map(tag => `<span>${tag}</span>`).join('');
}

function ratingTemplate(rating) {
    let html = `<span
        class="rating"
        role="img"
        aria-label="Rating: ${rating} out of 5 stars"
    >`;
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            html += `<span aria-hidden="true" class="icon-star">⭐</span>`;
        } else {
            html += `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
        }
    }
    html += `</span>`;
    return html;
}

function recipeTemplate(recipe) {
    return `
        <div class="recipe-card">
            <img src="${recipe.image}" alt="${recipe.name}">
            <div class="recipe-info">
                <div class="tags">${tagsTemplate(recipe.tags)}</div>
                <h2>${recipe.name}</h2>
                <p class="rating" role="img" aria-label="Rating: ${recipe.rating} out of 5 stars">
                    ${ratingTemplate(recipe.rating)}
                </p>
                <p>${recipe.description}</p>
            </div>
        </div>
    `;
}

function renderRecipes(recipeList) {
    const recipeDisplay = document.getElementById('recipe-display');
    recipeDisplay.innerHTML = recipeList.map(recipeTemplate).join('');
}

function init() {
    const recipe = getRandomListEntry(recipes);
    renderRecipes([recipe]);
}

function filterRecipes(query) {
    return recipes.filter(recipe => 
        recipe.name.toLowerCase().includes(query) || 
        recipe.description.toLowerCase().includes(query) || 
        recipe.tags.some(tag => tag.toLowerCase().includes(query)) ||
        recipe.recipeIngredient.some(ingredient => ingredient.toLowerCase().includes(query))
    ).sort((a, b) => a.name.localeCompare(b.name));
}

function searchHandler(event) {
    event.preventDefault();
    const query = document.getElementById('search').value.toLowerCase();
    const filteredRecipes = filterRecipes(query);
    renderRecipes(filteredRecipes);
}

document.querySelector('form').addEventListener('submit', searchHandler);

init();