const content = document.querySelector('.content');

function changeTheme() {
    const selectedTheme = themeSelector.value;

    const body = document.body;

    if (selectedTheme === 'dark') {
        body.classList.add('dark');
        logo.src = 'byui-logo_white.png';
        content.style.backgroundColor = '#333';
    } else {
        body.classList.remove('dark');
        logo.src = 'byui-logo_blue.webp';
        content.style.backgroundColor = '#fff';
    }
}

themeSelector.addEventListener('change', changeTheme);

changeTheme();