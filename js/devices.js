const devices = [
    {
        icon: "assets/devices/pc.png",
        name: "Основной пк",
        specs: "cpu - Intel Xeon E5-2650 v2<br>ram - Samsung 16гб<br>gpu - Sapphire RX 580 8GB NITRO+<br>disks - SSD 250гб & HDD 1тб<br>os - Windows 11",
        date: "20-09-2022"
    },
    {
        icon: "assets/ownaquamarine.png",
        name: "Сервер",
        specs: "cpu - Xeon E5-2620 v4<br>ram - 32гб<br>disk - SSD 250гб<br>os - Debian Server ??.??",
        date: "18-01-2025"
    },
    {
        icon: "assets/devices/phone.png",
        name: "Мобила",
        specs: "Samsung Galaxy S21+<br>display - Dynamic AMOLED 2X 2400 x 1080 (FHD+)<br>cpu - Exynos 2100<br>memory - 8/256гб<br>os - One UI 7.0 (Android 15)",
        date: "26-09-2024"
    },
    {
        icon: "assets/devices/siphone.png",
        name: "Вторая мобила",
        specs: "iPhone 8<br>display - Retina HD 1334 x 750<br>cpu - A11 Bionic<br>memory - 2/64гб<br>os - iOS 16.7.7",
        date: "29-08-2025",
        // sold: true
    },
    {
        icon: "assets/devices/laptop.png",
        name: "Ноутбук",
        specs: "Acer Aspire 5 A515-51G<br>cpu - Intel Core i3 6006U<br>ram - 6гб RAM<br>gpu - NVIDIA GeForce 940mx<br>disk - SSD 512гб<br>os - Windows 11",
        date: "20-09-2019"
    }
];

const container = document.getElementById('devices');

devices.forEach(device => {
    const card = document.createElement('div');
    card.className = 'device-card';

    const titleClass = device.sold ? 'device-title sold' : 'device-title';

    const dateContent = device.sold
        ? '<span class="sold-text">продано :(</span>'
        : `Дата приобретения: ${device.date}`;

    card.innerHTML = `
        <div class="device-header">
            <img src="${device.icon}" class="device-icon" alt="${device.name}">
            <div class="${titleClass}">${device.name}</div>
        </div>
        <div class="device-specs">${device.specs}</div>
        <div class="device-date">${dateContent}</div>
    `;

    container.appendChild(card);
});

const btn = document.getElementById('toggleDevicesBtn');
const wrapper = document.getElementById('devicesWrapper');
btn.addEventListener('click', () => {
    wrapper.classList.toggle('open');
});
