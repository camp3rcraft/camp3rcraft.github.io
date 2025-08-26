const cardData = [
    {
        icon: 'assets/prikols/shampurradio.png',
        title: 'ShampurRadio',
        description: 'Плеер в котором воспроизводится музыка с сайта. Недавно обновил его, имеет больше фишек для взаимодействия с музыкой',
        link: 'randomradio'
    },
    {
        icon: 'assets/prikols/pasta.png',
        title: 'Пасты на каждый день',
        description: 'Тут ты найдёшь сборник различных паст на свой вкус и пук. пасты от пансана, ну и свои парочку',
        link: 'pasta.html'
    },
    {
        icon: 'assets/prikols/gallery.png',
        title: 'Галерея из дерьма',
        description: 'Добро пожаловать в самую топовую галерею этого мира! Здесь собраны шедевры лучших творителей, взгляните!',
        link: 'gallery.html'
    },
    {
        icon: 'assets/prikols/weather.png',
        title: 'Погода',
        description: 'Узнайте погоду в вашем регионе легко и быстро',
        link: 'weather.html'
    },
    {
        icon: 'assets/prikols/base64.png',
        title: 'base64',
        description: 'Кодировка текста в base64 и декодировка base64 в текст. Удобно, ачо',
        link: 'base64.html'
    },
    {
        icon: 'assets/prikols/clock.png',
        title: 'Часы',
        description: 'Здесь показывается ваше время и дата, есть таймер и секундомер',
        link: 'clock.html'
    },
];

const container = document.querySelector('.content-prikols');

function createCard(data) {
    const cardLink = document.createElement('a');
    cardLink.href = data.link;
    cardLink.classList.add('card-link');

    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
        <img src="${data.icon}" alt="${data.title}" class="card-icon" loading="lazy">
        <h2>${data.title}</h2>
        <p>${data.description}</p>
    `;

    cardLink.appendChild(card);
    return cardLink;
}

function renderCards() {
    cardData.forEach(data => {
        const card = createCard(data);
        container.appendChild(card);
    });
}

renderCards();
