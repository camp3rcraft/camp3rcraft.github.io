const devices = [
    {
        icon: "devices/pc.png",
        name: "Основной пк",
        specs: "cpu - Intel Xeon E5-2650 v2<br>ram - Samsung 16гб<br>gpu - Sapphire RX 580 8GB NITRO+<br>disks - SSD 250гб & HDD 1тб<br>os - Windows 11",
        date: "20-09-2022"
    },
    {
        icon: "assets/ownaquamarine.png",
        name: "Сервер",
        specs: "cpu - Xeon E5-2620v4<br>ram - 32гб<br>disk - SSD 250гб<br>os - Ubuntu Server 24.02",
        date: "18-01-2025"
    },
    {
        icon: "devices/phone.png",
        name: "Мобила",
        specs: "Samsung Galaxy S21+<br>display - Dynamic AMOLED 2X 2400 x 1080 (FHD+)<br>cpu - Exynos 2100<br>memory - 8/256гб<br>os - One UI 6.1 (Android 14)",
        date: "26-09-2024"
    },
    {
        icon: "devices/step-phone.png",
        name: "Вторая мобила",
        specs: "Samsung Galaxy S8<br>display - Super AMOLED 2960 x 1440<br>cpu - Exynos 8895<br>memory - 4/64гб<br>os - One UI 7 (Android 15)",
        date: "25-02-2025"
    },
    {
        icon: "devices/laptop.png",
        name: "Ноутбук",
        specs: "Acer Aspire 5 A515-51G<br>cpu - Intel Core i3 6006U<br>ram - 6гб RAM<br>gpu - NVIDIA GeForce 940mx<br>disk - SSD 512гб<br>os - Windows 11",
        date: "20-09-2019"
    }
];

const container = document.getElementById('devices');
devices.forEach(device => {
    const card = document.createElement('div');
    card.className = 'device-card';
    card.innerHTML = `
        <div class="device-header">
            <img src="${device.icon}" class="device-icon" alt="${device.name}">
            <div class="device-title">${device.name}</div>
        </div>
        <div class="device-specs">${device.specs}</div>
        <div class="device-date">Дата приобретения: ${device.date}</div>
    `;
    container.appendChild(card);
});

const btn = document.getElementById('toggleDevicesBtn');
const wrapper = document.getElementById('devicesWrapper');
btn.addEventListener('click', () => {
    wrapper.classList.toggle('open');
});