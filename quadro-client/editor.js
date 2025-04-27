// Map Editor core logic

let mapData = {
    width: 800,
    height: 600,
    spawn: { x: 120, y: 300 },
    platforms: []
};

let selectedPlatform = null;
let activeTool = 'select';
let isDragging = false;
let dragOffset = {x:0, y:0};
let playtestMode = false;
let playtestPlayer = null;
let hoveredPlatform = null;
let hoveredSpawn = false;
let selectedSpawn = false;

const mapWidthInput = document.getElementById('map-width');
const mapHeightInput = document.getElementById('map-height');
const spawnXInput = document.getElementById('spawn-x');
const spawnYInput = document.getElementById('spawn-y');
const platformsList = document.getElementById('platforms-list');
const mapCanvas = document.getElementById('map-canvas');
const ctx = mapCanvas.getContext('2d');
const propertiesPanel = document.getElementById('properties-panel');
const propertiesContent = document.getElementById('properties-content');

const toolbarBtns = {
    select: document.getElementById('tool-select'),
    move: document.getElementById('tool-move'),
    create: document.getElementById('tool-create'),
    delete: document.getElementById('tool-delete'),
    duplicate: document.getElementById('tool-duplicate'),
    playtest: document.getElementById('tool-playtest')
};

function setActiveTool(tool) {
    activeTool = tool;
    for (const key in toolbarBtns) {
        toolbarBtns[key].classList.toggle('active', key === tool);
    }
    if (tool !== 'select' && tool !== 'move') {
        selectedPlatform = null;
        propertiesPanel.style.display = 'none';
    }
    if (tool === 'playtest') {
        playtestMode = true;
        startPlaytest();
    } else {
        playtestMode = false;
        playtestPlayer = null;
        renderMap();
    }
}
Object.entries(toolbarBtns).forEach(([tool, btn]) => {
    btn.onclick = () => setActiveTool(tool);
});
setActiveTool('select');

// --- Templates ---
const templates = {
    classic: { x: 100, y: 400, width: 200, height: 20, color: '#4a4a4a', type: 'default' },
    wood:    { x: 200, y: 300, width: 120, height: 18, color: '#8b4513', type: 'wood' },
    lava:    { x: 300, y: 500, width: 180, height: 20, color: '#e53935', type: 'lava' },
    text:    { x: 400, y: 100, width: 0, height: 0, color: '#ff0', type: 'text', text: 'Text', size: 32, angle: 0 }
};
document.querySelectorAll('.template-btn').forEach(btn => {
    btn.onclick = () => {
        const t = templates[btn.dataset.template];
        if (t) {
            mapData.platforms.push({...t});
            renderPlatformsList();
            renderMap();
        }
    };
});

function updateMapInputs() {
    mapWidthInput.value = mapData.width;
    mapHeightInput.value = mapData.height;
    spawnXInput.value = mapData.spawn.x;
    spawnYInput.value = mapData.spawn.y;
    mapCanvas.width = mapData.width;
    mapCanvas.height = mapData.height;
}

function updateMapFromInputs() {
    mapData.width = parseInt(mapWidthInput.value);
    mapData.height = parseInt(mapHeightInput.value);
    mapData.spawn.x = parseInt(spawnXInput.value);
    mapData.spawn.y = parseInt(spawnYInput.value);
    mapCanvas.width = mapData.width;
    mapCanvas.height = mapData.height;
    renderMap();
}

mapWidthInput.oninput = updateMapFromInputs;
mapHeightInput.oninput = updateMapFromInputs;
spawnXInput.oninput = updateMapFromInputs;
spawnYInput.oninput = updateMapFromInputs;

function renderPlatformsList() {
    platformsList.innerHTML = '';
    mapData.platforms.forEach((p, i) => {
        const row = document.createElement('div');
        row.className = 'platform-row';
        row.style.background = (selectedPlatform === p) ? '#333' : '#222';
        row.innerHTML = `
            <select class="type">
                <option value="default" ${p.type === 'default' ? 'selected' : ''}>Default</option>
                <option value="wood" ${p.type === 'wood' ? 'selected' : ''}>Wood</option>
                <option value="lava" ${p.type === 'lava' ? 'selected' : ''}>Lava</option>
                <option value="text" ${p.type === 'text' ? 'selected' : ''}>Text</option>
            </select>
            <input type="number" class="x" value="${p.x}" title="X" style="width:50px;">
            <input type="number" class="y" value="${p.y}" title="Y" style="width:50px;">
            <input type="number" class="w" value="${p.width}" title="W" style="width:50px;">
            <input type="number" class="h" value="${p.height}" title="H" style="width:50px;">
            <input type="color" class="color" value="${p.color || '#ffffff'}" title="Color">
            <input type="text" class="text" value="${p.text || ''}" placeholder="Text" style="display:${p.type==='text'?'inline-block':'none'};width:90px;">
            <input type="number" class="size" value="${p.size||24}" placeholder="Size" style="display:${p.type==='text'?'inline-block':'none'};width:50px;">
            <input type="number" class="angle" value="${p.angle||0}" placeholder="Angle" style="display:${p.type==='text'?'inline-block':'none'};width:50px;">
            <button class="delete-btn">Delete</button>
        `;
        row.onclick = () => { selectedPlatform = p; renderPlatformsList(); renderMap(); showPropertiesPanel(); };
        row.querySelector('.type').onchange = e => { p.type = e.target.value; renderPlatformsList(); renderMap(); showPropertiesPanel(); };
        row.querySelector('.x').oninput = e => { p.x = parseInt(e.target.value); renderMap(); showPropertiesPanel(); };
        row.querySelector('.y').oninput = e => { p.y = parseInt(e.target.value); renderMap(); showPropertiesPanel(); };
        row.querySelector('.w').oninput = e => { p.width = parseInt(e.target.value); renderMap(); showPropertiesPanel(); };
        row.querySelector('.h').oninput = e => { p.height = parseInt(e.target.value); renderMap(); showPropertiesPanel(); };
        row.querySelector('.color').oninput = e => { p.color = e.target.value; renderMap(); showPropertiesPanel(); };
        row.querySelector('.text').oninput = e => { p.text = e.target.value; renderMap(); showPropertiesPanel(); };
        row.querySelector('.size').oninput = e => { p.size = parseInt(e.target.value); renderMap(); showPropertiesPanel(); };
        row.querySelector('.angle').oninput = e => { p.angle = parseInt(e.target.value); renderMap(); showPropertiesPanel(); };
        row.querySelector('.delete-btn').onclick = (e) => { e.stopPropagation(); mapData.platforms.splice(i, 1); if(selectedPlatform===p)selectedPlatform=null; renderPlatformsList(); renderMap(); showPropertiesPanel(); };
        platformsList.appendChild(row);
    });
}

function showPropertiesPanel() {
    if (selectedPlatform) {
        propertiesPanel.style.display = 'block';
        let html = '';
        html += `<label>Type<select id="prop-type">
            <option value="default" ${selectedPlatform.type==='default'?'selected':''}>Default</option>
            <option value="wood" ${selectedPlatform.type==='wood'?'selected':''}>Wood</option>
            <option value="lava" ${selectedPlatform.type==='lava'?'selected':''}>Lava</option>
            <option value="text" ${selectedPlatform.type==='text'?'selected':''}>Text</option>
        </select></label>`;
        html += `<label>X<input type="number" id="prop-x" value="${selectedPlatform.x}"></label>`;
        html += `<label>Y<input type="number" id="prop-y" value="${selectedPlatform.y}"></label>`;
        html += `<label>Width<input type="number" id="prop-w" value="${selectedPlatform.width}"></label>`;
        html += `<label>Height<input type="number" id="prop-h" value="${selectedPlatform.height}"></label>`;
        html += `<label>Color<input type="color" id="prop-color" value="${selectedPlatform.color||'#ffffff'}"></label>`;
        if(selectedPlatform.type==='text') {
            html += `<label>Text<input type="text" id="prop-text" value="${selectedPlatform.text||''}"></label>`;
            html += `<label>Size<input type="number" id="prop-size" value="${selectedPlatform.size||24}"></label>`;
            html += `<label>Angle<input type="number" id="prop-angle" value="${selectedPlatform.angle||0}"></label>`;
        }
        html += `<button id="prop-duplicate">Duplicate</button> <button id="prop-delete">Delete</button>`;
        propertiesContent.innerHTML = html;
        document.getElementById('prop-type').onchange = e => { selectedPlatform.type = e.target.value; renderPlatformsList(); renderMap(); showPropertiesPanel(); };
        document.getElementById('prop-x').oninput = e => { selectedPlatform.x = parseInt(e.target.value); renderPlatformsList(); renderMap(); };
        document.getElementById('prop-y').oninput = e => { selectedPlatform.y = parseInt(e.target.value); renderPlatformsList(); renderMap(); };
        document.getElementById('prop-w').oninput = e => { selectedPlatform.width = parseInt(e.target.value); renderPlatformsList(); renderMap(); };
        document.getElementById('prop-h').oninput = e => { selectedPlatform.height = parseInt(e.target.value); renderPlatformsList(); renderMap(); };
        document.getElementById('prop-color').oninput = e => { selectedPlatform.color = e.target.value; renderPlatformsList(); renderMap(); };
        if(selectedPlatform.type==='text') {
            document.getElementById('prop-text').oninput = e => { selectedPlatform.text = e.target.value; renderPlatformsList(); renderMap(); };
            document.getElementById('prop-size').oninput = e => { selectedPlatform.size = parseInt(e.target.value); renderPlatformsList(); renderMap(); };
            document.getElementById('prop-angle').oninput = e => { selectedPlatform.angle = parseInt(e.target.value); renderPlatformsList(); renderMap(); };
        }
        document.getElementById('prop-duplicate').onclick = () => { mapData.platforms.push({...selectedPlatform}); renderPlatformsList(); renderMap(); };
        document.getElementById('prop-delete').onclick = () => { mapData.platforms = mapData.platforms.filter(p=>p!==selectedPlatform); selectedPlatform=null; renderPlatformsList(); renderMap(); showPropertiesPanel(); };
        return;
    }
    if (selectedSpawn) {
        propertiesPanel.style.display = 'block';
        let html = '';
        html += `<label>Spawn X<input type="number" id="prop-spawn-x" value="${mapData.spawn.x}"></label>`;
        html += `<label>Spawn Y<input type="number" id="prop-spawn-y" value="${mapData.spawn.y}"></label>`;
        propertiesContent.innerHTML = html;
        document.getElementById('prop-spawn-x').oninput = e => { mapData.spawn.x = parseInt(e.target.value); renderMap(); showPropertiesPanel(); };
        document.getElementById('prop-spawn-y').oninput = e => { mapData.spawn.y = parseInt(e.target.value); renderMap(); showPropertiesPanel(); };
        return;
    }
    // Если ничего не выбрано
    propertiesPanel.style.display = 'block';
    propertiesContent.innerHTML = '<div style="color:#888;">Выберите платформу или spawn</div>';
}

function renderMap() {
    ctx.clearRect(0, 0, mapData.width, mapData.height);
    // Draw white border
    ctx.save();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, mapData.width, mapData.height);
    ctx.restore();
    // Draw spawn
    ctx.save();
    ctx.strokeStyle = (selectedSpawn||hoveredSpawn) ? '#ff0' : '#00e6ff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(mapData.spawn.x, mapData.spawn.y, 12, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.font = '14px Arial';
    ctx.fillStyle = (selectedSpawn||hoveredSpawn) ? '#ff0' : '#00e6ff';
    ctx.fillText('Spawn', mapData.spawn.x + 18, mapData.spawn.y + 5);
    ctx.restore();
    // Draw platforms
    for (const p of mapData.platforms) {
        if (p.type === 'text') {
            ctx.save();
            ctx.font = `${p.size||24}px Arial`;
            ctx.fillStyle = p.color || '#fff';
            ctx.textAlign = 'center';
            ctx.translate(p.x, p.y);
            if (p.angle) ctx.rotate((p.angle * Math.PI) / 180);
            ctx.fillText(p.text || '', 0, 0);
            ctx.restore();
            continue;
        }
        ctx.save();
        ctx.fillStyle = p.color || '#fff';
        ctx.fillRect(p.x, p.y, p.width, p.height);
        if (p.type === 'lava') {
            ctx.globalAlpha = 0.5;
            ctx.fillStyle = '#fff';
            ctx.fillRect(p.x, p.y, p.width, p.height);
            ctx.globalAlpha = 1.0;
        }
        if (selectedPlatform === p) {
            ctx.strokeStyle = '#00e6ff';
            ctx.lineWidth = 3;
            ctx.strokeRect(p.x-2, p.y-2, p.width+4, p.height+4);
        } else {
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 1;
            ctx.strokeRect(p.x, p.y, p.width, p.height);
        }
        ctx.restore();
    }
    // Playtest: рисуем игрока
    if (playtestMode && playtestPlayer) {
        ctx.save();
        ctx.fillStyle = '#fff';
        ctx.fillRect(playtestPlayer.x-16, playtestPlayer.y-16, 32, 32);
        ctx.font = 'bold 14px Arial';
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.fillText('Player', playtestPlayer.x, playtestPlayer.y-20);
        ctx.restore();
    }
}

function addPlatform() {
    mapData.platforms.push({
        x: 100, y: 100, width: 100, height: 20, color: '#8b4513', type: 'default', text: '', size: 24, angle: 0
    });
    renderPlatformsList();
    renderMap();
}

document.getElementById('add-platform-btn').onclick = addPlatform;
document.getElementById('new-map-btn').onclick = () => {
    mapData = {
        width: 800,
        height: 600,
        spawn: { x: 120, y: 300 },
        platforms: []
    };
    selectedPlatform = null;
    updateMapInputs();
    renderPlatformsList();
    renderMap();
    showPropertiesPanel();
};

document.getElementById('load-map-btn').onclick = () => {
    document.getElementById('load-map-input').click();
};
document.getElementById('load-map-input').onchange = function(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(ev) {
        try {
            mapData = JSON.parse(ev.target.result);
            selectedPlatform = null;
            selectedSpawn = false;
            playtestMode = false;
            playtestPlayer = null;
            updateMapInputs();
            renderPlatformsList();
            renderMap();
            showPropertiesPanel();
        } catch (err) {
            alert('Invalid map file!');
        }
    };
    reader.readAsText(file);
};
document.getElementById('export-map-btn').onclick = () => {
    const blob = new Blob([JSON.stringify(mapData, null, 4)], {type: 'application/json'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'map.json';
    a.click();
};

// --- Drag & drop платформ и spawn ---
mapCanvas.addEventListener('mousedown', e => {
    const rect = mapCanvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    // Проверка на spawn
    if (Math.hypot(mx - mapData.spawn.x, my - mapData.spawn.y) < 16) {
        selectedPlatform = null;
        selectedSpawn = true;
        dragOffset.x = mx - mapData.spawn.x;
        dragOffset.y = my - mapData.spawn.y;
        isDragging = true;
        renderPlatformsList();
        renderMap();
        showPropertiesPanel();
        return;
    }
    // Платформы
    if (activeTool !== 'move' && activeTool !== 'select') return;
    let found = false;
    for (let i = mapData.platforms.length-1; i>=0; i--) {
        const p = mapData.platforms[i];
        if (p.type !== 'text' && mx >= p.x && mx <= p.x+p.width && my >= p.y && my <= p.y+p.height) {
            selectedPlatform = p;
            selectedSpawn = false;
            dragOffset.x = mx - p.x;
            dragOffset.y = my - p.y;
            isDragging = (activeTool === 'move');
            found = true;
            renderPlatformsList();
            renderMap();
            showPropertiesPanel();
            break;
        }
    }
    if (!found && activeTool === 'select') {
        selectedPlatform = null;
        selectedSpawn = false;
        renderPlatformsList();
        renderMap();
        showPropertiesPanel();
    }
});
mapCanvas.addEventListener('mousemove', e => {
    const rect = mapCanvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    // Hover для spawn
    hoveredSpawn = Math.hypot(mx - mapData.spawn.x, my - mapData.spawn.y) < 16;
    // Hover для платформ
    hoveredPlatform = null;
    for (let i = mapData.platforms.length-1; i>=0; i--) {
        const p = mapData.platforms[i];
        if (p.type !== 'text' && mx >= p.x && mx <= p.x+p.width && my >= p.y && my <= p.y+p.height) {
            hoveredPlatform = p;
            break;
        }
    }
    // Курсор
    if (hoveredSpawn || hoveredPlatform) {
        mapCanvas.style.cursor = 'pointer';
    } else {
        mapCanvas.style.cursor = (activeTool==='move') ? 'move' : 'default';
    }
    // Drag
    if (isDragging && selectedSpawn) {
        mapData.spawn.x = mx - dragOffset.x;
        mapData.spawn.y = my - dragOffset.y;
        renderMap();
        showPropertiesPanel();
    }
    if (isDragging && selectedPlatform) {
        selectedPlatform.x = mx - dragOffset.x;
        selectedPlatform.y = my - dragOffset.y;
        renderPlatformsList();
        renderMap();
        showPropertiesPanel();
    }
});
mapCanvas.addEventListener('mouseup', e => { isDragging = false; });
mapCanvas.addEventListener('mouseleave', e => { isDragging = false; });

// --- Playtest ---
function startPlaytest() {
    playtestPlayer = { x: mapData.spawn.x, y: mapData.spawn.y, vx: 0, vy: 0, onGround: false };
    window.playtestKeys = {left:false,right:false,up:false};
    renderMap();
    requestAnimationFrame(playtestLoop);
}
function playtestLoop() {
    if (!playtestMode || !playtestPlayer) return;
    // Управление
    let left = false, right = false, up = false;
    if (window.playtestKeys) {
        left = window.playtestKeys.left;
        right = window.playtestKeys.right;
        up = window.playtestKeys.up;
    }
    if (left) playtestPlayer.vx = -4;
    else if (right) playtestPlayer.vx = 4;
    else playtestPlayer.vx = 0;
    if (up && playtestPlayer.onGround) {
        playtestPlayer.vy = -10;
        playtestPlayer.onGround = false;
    }
    playtestPlayer.vy += 0.5; // gravity
    playtestPlayer.x += playtestPlayer.vx;
    playtestPlayer.y += playtestPlayer.vy;
    // Простая коллизия
    playtestPlayer.onGround = false;
    for (const p of mapData.platforms) {
        if (p.type === 'text') continue;
        if (
            playtestPlayer.x+16 > p.x && playtestPlayer.x-16 < p.x+p.width &&
            playtestPlayer.y+16 > p.y && playtestPlayer.y-16 < p.y+p.height
        ) {
            // Lava: телепорт на spawn
            if (p.type === 'lava') {
                playtestPlayer.x = mapData.spawn.x;
                playtestPlayer.y = mapData.spawn.y;
                playtestPlayer.vx = 0;
                playtestPlayer.vy = 0;
                break; // Завершаем обработку коллизий на этот кадр
            }
            // Wood: только сверху
            if (p.type === 'wood') {
                if (playtestPlayer.vy > 0 && playtestPlayer.y-16 < p.y && playtestPlayer.y+16 > p.y) {
                    playtestPlayer.y = p.y-16;
                    playtestPlayer.vy = 0;
                    playtestPlayer.onGround = true;
                }
                continue;
            }
            // Default: только если сверху (нельзя прыгать снизу)
            if (p.type === 'default' || !p.type) {
                if (playtestPlayer.vy > 0 && playtestPlayer.y-16 < p.y && playtestPlayer.y+16 > p.y && playtestPlayer.y < p.y) {
                    playtestPlayer.y = p.y-16;
                    playtestPlayer.vy = 0;
                    playtestPlayer.onGround = true;
                }
            }
        }
    }
    // Границы
    if (playtestPlayer.x < 16) playtestPlayer.x = 16;
    if (playtestPlayer.x > mapData.width-16) playtestPlayer.x = mapData.width-16;
    if (playtestPlayer.y < 16) playtestPlayer.y = 16;
    if (playtestPlayer.y > mapData.height-16) {
        playtestPlayer.y = mapData.height-16;
        playtestPlayer.vy = 0;
        playtestPlayer.onGround = true;
    }
    renderMap();
    requestAnimationFrame(playtestLoop);
}
window.playtestKeys = {left:false,right:false,up:false};
document.addEventListener('keydown', e => {
    if (!playtestMode) return;
    if (e.key === 'ArrowLeft' || e.key === 'a') window.playtestKeys.left = true;
    if (e.key === 'ArrowRight' || e.key === 'd') window.playtestKeys.right = true;
    if (e.key === 'ArrowUp' || e.key === 'w' || e.key === ' ') window.playtestKeys.up = true;
});
document.addEventListener('keyup', e => {
    if (!playtestMode) return;
    if (e.key === 'ArrowLeft' || e.key === 'a') window.playtestKeys.left = false;
    if (e.key === 'ArrowRight' || e.key === 'd') window.playtestKeys.right = false;
    if (e.key === 'ArrowUp' || e.key === 'w' || e.key === ' ') window.playtestKeys.up = false;
});

// Инициализация
updateMapInputs();
renderPlatformsList();
renderMap();
showPropertiesPanel(); 