const cardData = [
    {
        icon: 'prikols/shampurradio.png',
        title: 'ShampurRadio',
        description: 'Плеер в котором воспроизводится музыка с сайта. Недавно обновил его, имеет больше фишек для взаимодействия с музыкой',
        repo: 'camp3rcraft/camp3rcraft.github.io',
        path: 'randomradio.html',
        link: 'randomradio.html'
    },
    {
        icon: 'prikols/pasta.png',
        title: 'Пасты на каждый день',
        description: 'Тут ты найдёшь сборник различных паст на свой вкус и пук. пасты от пансана, ну и свои парочку',
        repo: 'owner/repo',
        path: 'anotherpage.html',
        link: 'pasta.html'
    },
    {
        icon: 'prikols/gallery.png',
        title: 'Галерея из дерьма',
        description: 'Добро пожаловать в самую топовую галерею этого мира! Здесь собраны шедевры лучших творителей, взгляните!',
        repo: 'camp3rcraft/camp3rcraft.github.io',
        path: 'yetanotherpage.html',
        link: 'gallery.html'
    },
    {
        icon: 'prikols/weather.png',
        title: 'Погода',
        description: 'Узнайте погоду в вашем регионе легко и быстро',
        repo: 'camp3rcraft/camp3rcraft.github.io',
        path: 'yetanotherpage.html',
        link: 'weather.html'
    },
    {
        icon: 'prikols/base64.png',
        title: 'base64',
        description: 'Кодировка текста в base64 и декодировка base64 в текст. Удобно, ачо',
        repo: 'camp3rcraft/camp3rcraft.github.io',
        path: 'yetanotherpage.html',
        link: 'base64.html'
    },
    {
        icon: 'prikols/clock.png',
        title: 'Часы',
        description: 'Здесь показывается ваше время и дата, есть таймер и секундомер',
        repo: 'camp3rcraft/camp3rcraft.github.io',
        path: 'yetanotherpage.html',
        link: 'clock.html'
    },
];

const container = document.querySelector('.content-prikols');

async function getFileLastCommitDate(repo, path) {
    const apiUrl = `https://api.github.com/repos/${repo}/commits?path=${path}&page=1&per_page=1`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            console.error(`Ошибка при запросе к GitHub API: ${response.status}`);
            return 'Дата недоступна';
        }

        const commits = await response.json();

        if (commits.length > 0) {
            const lastCommitDate = new Date(commits[0].commit.author.date);
            return lastCommitDate.toLocaleDateString();
        } else {
            return 'Дата недоступна';
        }
    } catch (error) {
        console.error(`Ошибка при получении даты последнего коммита: ${error}`);
        return 'Дата недоступна';
    }
}

async function createCard(data) {
    const cardLink = document.createElement('a');
    cardLink.href = data.link;
    cardLink.classList.add('card-link');

    const card = document.createElement('div');
    card.classList.add('card');

    const lastUpdated = await getFileLastCommitDate(data.repo, data.path);

    card.innerHTML = `
        <img src="${data.icon}" alt="${data.title}" class="card-icon">
        <h2>${data.title}</h2>
        <p>${data.description}</p>
    `;

    cardLink.appendChild(card);
    return cardLink;
}

async function renderCards() {
    for (const data of cardData) {
        const card = await createCard(data);
        container.appendChild(card);
    }
}

renderCards();