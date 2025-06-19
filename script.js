// 页面切换
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');

    if (id === 'travelMap' && !window.mapInitialized) {
        initMap();
        window.mapInitialized = true;
    }
}

// 保证切换地图时才初始化，解决容器尺寸 0 的问题
function showTravelMap() {
    showScreen('travelMap');
}

const cities = [
    { name: "南京", lat: 32.06, lon: 118.79, folder: "南京" },
    { name: "哈尔滨", lat: 45.80, lon: 126.53, folder: "哈尔滨" },
    { name: "黄山", lat: 29.71, lon: 118.33, folder: "黄山" },
    { name: "武功山", lat: 27.53, lon: 114.18, folder: "武功山" },
    { name: "大连", lat: 38.91, lon: 121.61, folder: "大连" },
    { name: "福州", lat: 26.07, lon: 119.29, folder: "福州" },
    { name: "长沙", lat: 28.22, lon: 112.93, folder: "长沙" },
    { name: "南昌", lat: 28.68, lon: 115.85, folder: "南昌" },
    { name: "本溪", lat: 41.29, lon: 123.76, folder: "本溪" },
    { name: "杭州", lat: 30.27, lon: 120.15, folder: "杭州" },
];

// 创建相册页
const galleryContainer = document.getElementById('cityGalleries');
cities.forEach(city => {
    const gallery = document.createElement('div');
    gallery.id = `${city.name}Gallery`;
    gallery.className = 'screen cityGallery';
    gallery.innerHTML = `
      <button class="backBtn" onclick="showScreen('travelMap')">⬅ 返回地图</button>
      <h1>${city.name} - 我的相册</h1>
      <div class="gallery" id="${city.name}Photos"></div>
    `;
    galleryContainer.appendChild(gallery);
});

// 初始化地图
function initMap() {
    const map = L.map('map').setView([32, 112], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    const flagIcon = L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
        iconSize: [32, 32],
    });

    cities.forEach(city => {
        const marker = L.marker([city.lat, city.lon], { icon: flagIcon }).addTo(map);
        marker.bindTooltip(city.name, { permanent: true, direction: 'right' });

        marker.on('click', () => {
            const galleryDiv = document.getElementById(`${city.name}Photos`);
            galleryDiv.innerHTML = "";

            for (let i = 1; i <= 20; i++) {
                let imgPath = `${city.folder}/${i}.jpg`;
                const img = new Image();
                img.src = imgPath;
                img.onload = () => galleryDiv.appendChild(img);
                img.onerror = () => { };
            }

            showScreen(`${city.name}Gallery`);
        });
    });
}
function showMoments() {
    showScreen('momentsGallery');

    const galleryDiv = document.getElementById('momentsPhotos');
    galleryDiv.innerHTML = "";

    for (let i = 1; i <= 20; i++) {
        let imgPath = `精彩时刻/${i}.jpg`;
        const img = new Image();
        img.src = imgPath;
        img.onload = () => galleryDiv.appendChild(img);
        img.onerror = () => { };
    }
}
function showLifeGoals() {
    showScreen('lifeGoalsGallery');

    const galleryDiv = document.getElementById('lifeGoalsPhotos');
    galleryDiv.innerHTML = "";

    for (let i = 1; i <= 20; i++) {
        let imgPath = `人生追求/${i}.jpg`;
        const img = new Image();
        img.src = imgPath;
        img.onload = () => galleryDiv.appendChild(img);
        img.onerror = () => { };
    }
}

// 初始欢迎页
showScreen('welcome');
