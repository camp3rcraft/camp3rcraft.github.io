const projects = [
    {
        icon: "assets/bubblemc.jpg",
        name: "BubbleMC",
        description: "вайбик лютый такой прям вш",
        openDate: "Дата открытия: 01-08-2025",
        telegram: "https://t.me/bubblemc",
        discord: "https://discord.gg/K4z4TpTnZg",
        website: "https://bubblemc.ru",
        github: ""
    },
    {
        icon: "assets/prikols/shampurradio.png",
        name: "ShampurRadio",
        description: "Гипер музло чтоб да",
        openDate: "Дата открытия: 13-04-2025",
        telegram: "",
        discord: "",
        website: "https://camper.isvery.fun/randomradio",
        github: ""
    }
    // {
    //     icon: "assets/gdps-spherium.png",
    //     name: "GDPS Spherium",
    //     description: "Дружное комьюнити нашей приватки <3",
    //     openDate: "Дата открытия: 21-03-2025",
    //     telegram: "https://t.me/gdps_spherium",
    //     discord: "https://discord.gg/jbgFG9MEkf",
    //     website: "",
    //     github: ""
    // },
    // {
    //     icon: "assets/ckms.png",
    //     name: "CKMS Activator",
    //     description: "Pirate Windows license ",
    //     openDate: "",
    //     telegram: "",
    //     discord: "",
    //     website: "",
    //     github: "https://github.com/camp3rcraft/CKMS-Activator"
    // },
    // {
    //     icon: "assets/ctn.png",
    //     name: "Corridor to Nowhere",
    //     description: "Ремастер моей старой кринге карты «Коридор в нИкуда»",
    //     openDate: "",
    //     telegram: "",
    //     discord: "",
    //     website: "ctn/index",
    //     github: ""
    // }
];

const projectsContainer = document.getElementById('projects');

projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card';

    const socialLinks = [];

    if (project.telegram) {
        socialLinks.push(`
            <a href="${project.telegram}" target="_blank" class="btn-social telegram" title="Telegram">
                <img src="assets/social-icons/telegram.png" alt="Telegram" class="social-icon" />
            </a>
        `);
    }
    if (project.discord) {
        socialLinks.push(`
            <a href="${project.discord}" target="_blank" class="btn-social discord" title="Discord">
                <img src="assets/social-icons/discord.png" alt="Discord" class="social-icon" />
            </a>
        `);
    }
    if (project.website) {
        socialLinks.push(`
            <a href="${project.website}" target="_blank" class="btn-social website" title="Website">
                <img src="assets/social-icons/website.png" alt="Website" class="social-icon" />
            </a>
        `);
    }
    if (project.github) {
        socialLinks.push(`
            <a href="${project.github}" target="_blank" class="btn-social github" title="GitHub">
                <img src="assets/social-icons/github.png" alt="GitHub" class="social-icon" />
            </a>
        `);
    }

    card.innerHTML = `
        <div class="project-header">
            <img src="${project.icon}" class="project-icon" alt="${project.name}">
            <div class="project-title">${project.name}</div>
        </div>
        <div class="project-description">${project.description}</div>
        <div class="project-date">${project.openDate}</div>
        <div class="project-social">
            ${socialLinks.join(' ')}
        </div>
    `;

    projectsContainer.appendChild(card);
});

const btnProjects = document.getElementById('toggleProjectsBtn');
const wrapperProjects = document.getElementById('projectsWrapper');

btnProjects.addEventListener('click', () => {
    wrapperProjects.classList.toggle('open');
});
