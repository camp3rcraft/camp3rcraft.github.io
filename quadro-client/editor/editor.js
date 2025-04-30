class MapEditor {
    constructor() {
        this.canvas = document.getElementById('editor-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.objects = [];
        this.selectedObject = null;
        this.currentTool = 'select';
        this.isDragging = false;
        this.dragStart = { x: 0, y: 0 };
        this.dragObjectStart = { x: 0, y: 0 };
        this.zoom = 1;
        this.offset = { x: 0, y: 0 };
        this.gridSize = 32;
        this.isPanning = false;
        this.panStart = { x: 0, y: 0 };
        this.resizeHandle = null;
        this.resizeStart = { x: 0, y: 0 };
        this.resizeStartSize = { width: 0, height: 0 };
        this.mapName = '';
        this.clipboardObject = null;
        this.mapBgColor = '#1a1a1a';

        this.setupCanvas();
        this.setupEventListeners();
        this.setupTools();
        this.setupFileActions();
        this.addDefaultSpawnPoint();
        this.setupPropertiesPanel();
        this.setupClipboardShortcuts();
        this.updateMapPropertiesPanel();
        this.setupMapSettingsModal();
        this.setupMoveWithWASD();
        this.render();
        this.setupWelcomeScreen();
        this.setupModals();
        this.setupFileInput();
        this.loadTemplates();
    }

    setupCanvas() {
        this.canvas.width = window.innerWidth - 250; // 250px for sidebar
        this.canvas.height = window.innerHeight - 100; // 100px for top and status bars
        this.ctx.imageSmoothingEnabled = false;
    }

    setupEventListeners() {
        this.canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this.canvas.addEventListener('mouseup', () => this.onMouseUp());
        this.canvas.addEventListener('wheel', (e) => this.onMouseWheel(e));
        window.addEventListener('resize', () => {
            this.setupCanvas();
            this.render();
        });
    }

    setupTools() {
        // Только реально существующие элементы
        const selectTool = document.getElementById('select-tool');
        if (selectTool) {
            selectTool.addEventListener('click', () => {
                this.setTool('select');
                this.updateToolSelection();
            });
        }
        // Для всех блоков
        document.querySelectorAll('.block-preview').forEach(block => {
            block.addEventListener('click', () => {
                const type = block.dataset.type;
                if (type === 'delete') {
                    this.setTool('delete');
                } else {
                    this.setTool(type);
                }
                this.updateToolSelection();
            });
        });
        // Map name input
        const mapNameInput = document.getElementById('map-name');
        if (mapNameInput) {
            mapNameInput.addEventListener('input', (e) => {
                this.mapName = e.target.value;
            });
        }
    }

    updateToolSelection() {
        // Update select tool
        document.getElementById('select-tool').classList.toggle('active', this.currentTool === 'select');
        
        // Update block selection
        document.querySelectorAll('.block-preview').forEach(block => {
            block.classList.toggle('selected', block.dataset.type === this.currentTool);
        });
    }

    setupFileActions() {
        document.getElementById('new-map').addEventListener('click', () => this.newMap());
        document.getElementById('save-map').addEventListener('click', () => this.saveMap());
        document.getElementById('load-map').addEventListener('click', () => this.loadMap());
    }

    onMouseDown(e) {
        e.preventDefault();
        const pos = this.getMousePos(e);
        
        if (e.button === 1 || (e.button === 0 && e.altKey)) {
            this.isPanning = true;
            this.panStart = pos;
            this.canvas.style.cursor = 'grabbing';
            return;
        }

        if (e.button === 0) {
            if (this.currentTool === 'select') {
                // Проверяем точки изменения размера
                if (this.selectedObject && 
                    this.selectedObject.type !== 'spawn' && 
                    this.selectedObject.type !== 'text' &&
                    !['jumppad','gravitypad'].includes(this.selectedObject.type)) {
                    const handle = this.getResizeHandleAt(pos);
                    if (handle) {
                        this.resizeHandle = handle;
                        this.resizeStart = pos;
                        this.resizeStartSize = {
                            width: this.selectedObject.width,
                            height: this.selectedObject.height,
                            x: this.selectedObject.x,
                            y: this.selectedObject.y
                        };
                        this.isDragging = true;
                        this.canvas.style.cursor = this.getResizeCursor(handle);
                        return;
                    }
                }

                // Проверяем объекты
                const obj = this.getObjectAt(pos);
                if (obj) {
                    this.selectedObject = obj;
                    this.dragStart = pos;
                    this.dragObjectStart = { x: obj.x, y: obj.y };
                    this.isDragging = true;
                    this.canvas.style.cursor = 'move';
                    
                    // Если это текстовый объект, показываем поле ввода
                    if (obj.type === 'text') {
                        this.showTextInput(obj);
                    }
                    
                    this.render();
                    return;
                }
            } else if (this.currentTool === 'delete') {
                const obj = this.getObjectAt(pos);
                if (obj && obj.type !== 'spawn') {
                    this.objects = this.objects.filter(o => o !== obj);
                    if (this.selectedObject === obj) {
                        this.selectedObject = null;
                    }
                    this.render();
                }
            } else {
                // Создаем новый объект
                let newObj;
                switch (this.currentTool) {
                    case 'default':
                    case 'wood':
                    case 'lava':
                    case 'jumppad':
                    case 'gravitypad':
                        newObj = {
                            x: Math.round(pos.x / this.gridSize) * this.gridSize,
                            y: Math.round(pos.y / this.gridSize) * this.gridSize + this.gridSize / 2,
                            width: this.currentTool === 'jumppad' || this.currentTool === 'gravitypad' ? this.gridSize : this.gridSize * 2,
                            height: this.currentTool === 'jumppad' || this.currentTool === 'gravitypad' ? this.gridSize / 2 : this.gridSize,
                            color: this.currentTool === 'default' ? '#4a4a4a' :
                                   this.currentTool === 'wood' ? '#8b4513' :
                                   this.currentTool === 'lava' ? '#e53935' :
                                   this.currentTool === 'jumppad' ? '#ffe066' : '#66e0ff',
                            type: this.currentTool
                        };
                        break;
                    case 'spawn':
                        // Удаляем старую точку спавна
                        this.objects = this.objects.filter(obj => obj.type !== 'spawn');
                        newObj = {
                            x: Math.round(pos.x / this.gridSize) * this.gridSize,
                            y: Math.round(pos.y / this.gridSize) * this.gridSize,
                            width: 32,
                            height: 32,
                            color: '#00ff00',
                            type: 'spawn'
                        };
                        break;
                    case 'text':
                        newObj = {
                            x: Math.round(pos.x / this.gridSize) * this.gridSize,
                            y: Math.round(pos.y / this.gridSize) * this.gridSize,
                            width: 100,
                            height: 30,
                            color: '#ffffff',
                            type: 'text',
                            text: 'New Text',
                            fontSize: 16,
                            rotation: 0
                        };
                        this.showTextInput(newObj);
                        break;
                }
                
                if (newObj) {
                    this.objects.push(newObj);
                    this.selectedObject = newObj;
                    this.render();
                }
            }
        }
    }

    onMouseMove(e) {
        e.preventDefault();
        const pos = this.getMousePos(e);
        this.updateCursorPosition(pos);

        if (this.isPanning) {
            this.offset.x += pos.x - this.panStart.x;
            this.offset.y += pos.y - this.panStart.y;
            this.panStart = pos;
            this.render();
            return;
        }

        // Обновляем курсор при наведении
        if (!this.isDragging) {
            if (this.currentTool === 'select') {
                if (this.selectedObject) {
                    const handle = this.getResizeHandleAt(pos);
                    if (handle) {
                        this.canvas.style.cursor = this.getResizeCursor(handle);
                    } else if (this.getObjectAt(pos)) {
                        this.canvas.style.cursor = 'move';
                    } else {
                        this.canvas.style.cursor = 'default';
                    }
                } else if (this.getObjectAt(pos)) {
                    this.canvas.style.cursor = 'pointer';
                } else {
                    this.canvas.style.cursor = 'default';
                }
            } else {
                this.canvas.style.cursor = 'crosshair';
            }
        }

        if (this.isDragging && this.selectedObject) {
            if (this.resizeHandle && ['default', 'wood', 'lava'].includes(this.selectedObject.type)) {
                const dx = pos.x - this.resizeStart.x;
                const dy = pos.y - this.resizeStart.y;
                let newWidth = this.resizeStartSize.width;
                let newHeight = this.resizeStartSize.height;
                let newX = this.resizeStartSize.x;
                let newY = this.resizeStartSize.y;
                switch (this.resizeHandle) {
                    case 'nw':
                        newWidth = Math.max(this.gridSize, this.resizeStartSize.width - dx);
                        newHeight = Math.max(this.gridSize, this.resizeStartSize.height - dy);
                        newX = this.resizeStartSize.x + dx;
                        newY = this.resizeStartSize.y + dy;
                        break;
                    case 'ne':
                        newWidth = Math.max(this.gridSize, this.resizeStartSize.width + dx);
                        newHeight = Math.max(this.gridSize, this.resizeStartSize.height - dy);
                        newY = this.resizeStartSize.y + dy;
                        break;
                    case 'sw':
                        newWidth = Math.max(this.gridSize, this.resizeStartSize.width - dx);
                        newHeight = Math.max(this.gridSize, this.resizeStartSize.height + dy);
                        newX = this.resizeStartSize.x + dx;
                        break;
                    case 'se':
                        newWidth = Math.max(this.gridSize, this.resizeStartSize.width + dx);
                        newHeight = Math.max(this.gridSize, this.resizeStartSize.height + dy);
                        break;
                }
                this.selectedObject.width = Math.round(newWidth / this.gridSize) * this.gridSize;
                this.selectedObject.height = Math.round(newHeight / this.gridSize) * this.gridSize;
                this.selectedObject.x = Math.round(newX / this.gridSize) * this.gridSize;
                this.selectedObject.y = Math.round(newY / this.gridSize) * this.gridSize;
                this.render();
                this.updatePropertiesPanel();
            } else if (!this.resizeHandle) {
                // Плавное перемещение объекта за мышью
                const dx = pos.x - this.dragStart.x;
                const dy = pos.y - this.dragStart.y;
                const newX = this.dragObjectStart.x + dx;
                const newY = this.dragObjectStart.y + dy;
                this.selectedObject.x = Math.round(newX / this.gridSize) * this.gridSize;
                this.selectedObject.y = Math.round(newY / this.gridSize) * this.gridSize;
                this.render();
                this.updatePropertiesPanel();
            }
        }
    }

    onMouseUp() {
        this.isDragging = false;
        this.isPanning = false;
        this.resizeHandle = null;
        this.canvas.style.cursor = 'default';
    }

    onMouseWheel(e) {
        e.preventDefault();
        const pos = this.getMousePos(e);
        const zoom = e.deltaY > 0 ? 0.9 : 1.1;
        this.zoom *= zoom;
        this.offset.x = pos.x - (pos.x - this.offset.x) * zoom;
        this.offset.y = pos.y - (pos.y - this.offset.y) * zoom;
        this.render();
    }

    getMousePos(e) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: (e.clientX - rect.left - this.offset.x) / this.zoom,
            y: (e.clientY - rect.top - this.offset.y) / this.zoom
        };
    }

    setTool(tool) {
        this.currentTool = tool;
        // Снимаем выделение со всех
        document.querySelectorAll('.tool-button').forEach(btn => {
            btn.classList.remove('active');
        });
        // Активируем только select-tool
        if (tool === 'select') {
            const selectTool = document.getElementById('select-tool');
            if (selectTool) selectTool.classList.add('active');
        }
        // Для блоков
        document.querySelectorAll('.block-preview').forEach(block => {
            block.classList.toggle('selected', block.dataset.type === tool);
        });
        this.selectedObject = null;
        this.updatePropertiesPanel();
        this.render();
    }

    getObjectAt(pos) {
        // Проверяем сначала точки изменения размера
        if (this.selectedObject) {
            const handle = this.getResizeHandleAt(pos);
            if (handle) return this.selectedObject;
        }

        // Затем проверяем объекты
        for (let i = this.objects.length - 1; i >= 0; i--) {
            const obj = this.objects[i];
            if (pos.x >= obj.x && pos.x <= obj.x + obj.width &&
                pos.y >= obj.y && pos.y <= obj.y + obj.height) {
                return obj;
            }
        }
        return null;
    }

    getResizeHandleAt(pos) {
        if (!this.selectedObject) return null;
        
        const handleSize = 8;
        const handles = this.getResizeHandles();

        for (let i = 0; i < handles.length; i++) {
            const handle = handles[i];
            if (Math.abs(pos.x - handle.x) < handleSize && Math.abs(pos.y - handle.y) < handleSize) {
                return ['nw', 'ne', 'sw', 'se'][i];
            }
        }
        return null;
    }

    updatePropertiesPanel() {
        this.updateMapPropertiesPanel();
        const obj = this.selectedObject;
        if (!obj) {
            this.objectPropertiesSection.style.display = 'none';
            return;
        }
        this.objectPropertiesSection.style.display = 'block';

        // Скрываем все поля по умолчанию
        this.propX.parentElement.style.display = 'none';
        this.propY.parentElement.style.display = 'none';
        this.propWidth.parentElement.style.display = 'none';
        this.propHeight.parentElement.style.display = 'none';
        this.propColor.parentElement.style.display = 'none';
        this.propTypeGroup.style.display = 'none';
        this.propTextGroup.style.display = 'none';
        this.propFontSizeGroup.style.display = 'none';
        this.propRotationGroup.style.display = 'none';
        this.duplicateBtn.style.display = 'none';

        // Заполняем значения
        this.propX.value = Math.round(obj.x);
        this.propY.value = Math.round(obj.y);
        this.propWidth.value = Math.round(obj.width);
        this.propHeight.value = Math.round(obj.height);
        this.propColor.value = obj.color || '#ffffff';
        this.propType.value = obj.type || 'default';
        this.propText.value = obj.text || '';
        this.propFontSize.value = obj.fontSize || 16;
        this.propRotation.value = obj.rotation || 0;

        // Для платформ (default, wood, lava, jumppad, gravitypad)
        if (["default", "wood", "lava", "jumppad", "gravitypad"].includes(obj.type)) {
            this.propX.parentElement.style.display = '';
            this.propY.parentElement.style.display = '';
            // Для jumppad и gravitypad запрещаем изменение размера и цвета
            if (["jumppad", "gravitypad"].includes(obj.type)) {
                this.propWidth.parentElement.style.display = 'none';
                this.propHeight.parentElement.style.display = 'none';
                this.propColor.parentElement.style.display = 'none';
            } else {
                this.propWidth.parentElement.style.display = '';
                this.propHeight.parentElement.style.display = '';
                this.propColor.parentElement.style.display = '';
            }
            this.propTypeGroup.style.display = (obj.type === 'default') ? '' : 'none';
            this.duplicateBtn.style.display = '';
            // Для jumppad и gravitypad показываем поворот
            if (["jumppad", "gravitypad"].includes(obj.type)) {
                this.propRotationGroup.style.display = '';
                // Добавляем кнопки для поворота
                if (!document.getElementById('rotate-left-btn')) {
                    const btnLeft = document.createElement('button');
                    btnLeft.id = 'rotate-left-btn';
                    btnLeft.textContent = '⟲ 90°';
                    btnLeft.style.marginRight = '5px';
                    btnLeft.onclick = () => {
                        obj.rotation = ((obj.rotation || 0) - 90) % 360;
                        if (obj.rotation < 0) obj.rotation += 360;
                        this.propRotation.value = obj.rotation;
                        this.render();
                    };
                    this.propRotationGroup.appendChild(btnLeft);
                }
                if (!document.getElementById('rotate-right-btn')) {
                    const btnRight = document.createElement('button');
                    btnRight.id = 'rotate-right-btn';
                    btnRight.textContent = '90° ⟳';
                    btnRight.onclick = () => {
                        obj.rotation = ((obj.rotation || 0) + 90) % 360;
                        this.propRotation.value = obj.rotation;
                        this.render();
                    };
                    this.propRotationGroup.appendChild(btnRight);
                }
            }
        }
        // Для дерева, лавы, джампадов — без типа
        if (["wood", "lava", "jumppad", "gravitypad"].includes(obj.type)) {
            this.propTypeGroup.style.display = 'none';
        }
        // Для текста
        if (obj.type === 'text') {
            this.propX.parentElement.style.display = '';
            this.propY.parentElement.style.display = '';
            this.propTextGroup.style.display = '';
            this.propFontSizeGroup.style.display = '';
            this.propRotationGroup.style.display = '';
            this.propColor.parentElement.style.display = '';
            this.duplicateBtn.style.display = '';
        }
        // Для спавна
        if (obj.type === 'spawn') {
            this.propX.parentElement.style.display = '';
            this.propY.parentElement.style.display = '';
        }
    }

    updateSelectedObject(property, value) {
        if (!this.selectedObject) return;
        this.selectedObject[property] = value;
        this.render();
    }

    updateCursorPosition(pos) {
        document.getElementById('cursor-position').textContent = 
            `X: ${Math.round(pos.x)}, Y: ${Math.round(pos.y)}`;
    }

    addDefaultSpawnPoint() {
        const spawnPoint = {
            x: this.canvas.width / 2 - 16,
            y: this.canvas.height / 2 - 16,
            width: 32,
            height: 32,
            color: '#00ff00',
            type: 'spawn'
        };
        this.objects.push(spawnPoint);
    }

    newMap() {
        this.objects = [];
        this.addDefaultSpawnPoint();
        this.render();
    }

    saveMap() {
        // Собираем платформы и spawn
        const mapData = {
            width: this.canvas.width,
            height: this.canvas.height,
            name: this.mapName || '',
            background: this.mapBgColor || '#1a1a1a',
            spawn: null,
            platforms: []
        };
        for (const obj of this.objects) {
            if (obj.type === 'spawn') {
                mapData.spawn = { x: obj.x, y: obj.y };
            } else if (["default", "wood", "lava", "jumppad", "gravitypad"].includes(obj.type)) {
                mapData.platforms.push({
                    x: obj.x,
                    y: obj.y,
                    width: obj.width,
                    height: obj.height,
                    color: obj.color,
                    type: obj.type,
                    rotation: obj.rotation || 0
                });
            } else if (obj.type === 'text') {
                mapData.platforms.push({
                    x: obj.x,
                    y: obj.y,
                    width: 0,
                    height: 0,
                    color: obj.color,
                    type: 'text',
                    text: obj.text,
                    size: obj.fontSize,
                    angle: obj.rotation || 0
                });
            }
        }
        // Если нет spawn — добавим дефолтный
        if (!mapData.spawn) {
            mapData.spawn = { x: 0, y: 0 };
        }
        const blob = new Blob([JSON.stringify(mapData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'map.json';
        a.click();
        URL.revokeObjectURL(url);
    }

    // Универсальный импорт карты (используется для load, import и шаблонов)
    importMapData(mapData) {
        this.objects = [];
        // Точка спавна
        if (mapData.spawn) {
            this.objects.push({
                x: mapData.spawn.x,
                y: mapData.spawn.y,
                width: 32,
                height: 32,
                color: '#00ff00',
                type: 'spawn'
            });
        }
        // Платформы и текст
        if (Array.isArray(mapData.platforms)) {
            mapData.platforms.forEach(platform => {
                if (platform.type === 'text') {
                    this.objects.push({
                        x: platform.x,
                        y: platform.y,
                        width: platform.width || 100,
                        height: platform.height || 30,
                        color: platform.color || '#ffffff',
                        type: 'text',
                        text: platform.text || '',
                        fontSize: platform.size || 16,
                        rotation: platform.angle || 0
                    });
                } else {
                    this.objects.push({
                        x: platform.x,
                        y: platform.y,
                        width: platform.width,
                        height: platform.height,
                        color: platform.color,
                        type: platform.type
                    });
                }
            });
        }
        // Имя карты
        this.mapName = mapData.name || '';
        // Цвет фона
        this.mapBgColor = mapData.background || mapData.backgroundColor || '#1a1a1a';
        // Размеры
        this.canvas.width = mapData.width || 800;
        this.canvas.height = mapData.height || 600;
        this.setupCanvas();
        document.getElementById('map-name').value = this.mapName;
        this.render();
        document.getElementById('welcome-screen').style.display = 'none';
        document.getElementById('editor-container').style.display = 'block';
    }

    // Исправленный импорт из шаблона
    async importTemplateMap(filename) {
        if (!filename) {
            alert('Template file is not specified.');
            return;
        }
        try {
            const response = await fetch(`templates/${filename}`);
            if (!response.ok) {
                alert(`Template file not found: ${filename}`);
                return;
            }
            const raw = await response.json();
            console.log('Загруженный шаблон:', raw);
            // Если шаблон содержит mapData — импортируем его, иначе весь объект
            const mapData = raw.mapData ? raw.mapData : raw;
            this.importMapData(mapData);
            document.getElementById('templates-modal').style.display = 'none';
        } catch (error) {
            alert('Error loading template map.');
            console.error('Error loading template map:', error);
        }
    }

    // Исправленный обычный импорт
    importMap() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const mapData = JSON.parse(e.target.result);
                    this.importMapData(mapData);
                } catch (error) {
                    console.error('Error loading map:', error);
                    alert('Error loading map file. Please make sure it is a valid map file.');
                }
            };
            reader.readAsText(file);
        };
        input.click();
    }

    // Исправленный loadMap
    loadMap() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const mapData = JSON.parse(e.target.result);
                    this.importMapData(mapData);
                } catch (error) {
                    console.error('Error loading map:', error);
                    alert('Error loading map file. Please make sure it is a valid map file.');
                }
            };
            reader.readAsText(file);
        };
        input.click();
    }

    zoomIn() {
        this.zoom *= 1.1;
        this.render();
    }

    zoomOut() {
        this.zoom *= 0.9;
        this.render();
    }

    resetView() {
        this.zoom = 1;
        this.offset = { x: 0, y: 0 };
        this.render();
    }

    getResizeCursor(handle) {
        switch (handle) {
            case 'nw': return 'nw-resize';
            case 'ne': return 'ne-resize';
            case 'sw': return 'sw-resize';
            case 'se': return 'se-resize';
            default: return 'default';
        }
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        this.ctx.translate(this.offset.x, this.offset.y);
        this.ctx.scale(this.zoom, this.zoom);

        // Draw background color
        this.ctx.fillStyle = this.mapBgColor || '#1a1a1a';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw grid
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        this.ctx.lineWidth = 1;
        for (let x = 0; x < this.canvas.width; x += this.gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
        for (let y = 0; y < this.canvas.height; y += this.gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }

        // Draw objects
        this.objects.forEach(obj => {
            this.ctx.save();
            if (obj.type === 'text') {
                this.ctx.translate(obj.x + obj.width/2, obj.y + obj.height/2);
                this.ctx.rotate((obj.rotation || 0) * Math.PI / 180);
                this.ctx.fillStyle = obj.color;
                this.ctx.font = `${obj.fontSize}px Arial`;
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.fillText(obj.text, 0, 0);
            } else if (["jumppad", "gravitypad"].includes(obj.type)) {
                // Рисуем с поворотом
                this.ctx.translate(obj.x + obj.width/2, obj.y + obj.height/2);
                this.ctx.rotate((obj.rotation || 0) * Math.PI / 180);
                this.ctx.fillStyle = obj.color;
                this.ctx.fillRect(-obj.width/2, -obj.height/2, obj.width, obj.height);
                // Можно добавить иконку стрелки
                this.ctx.fillStyle = obj.type === 'jumppad' ? '#bfa800' : '#007a99';
                this.ctx.font = 'bold 24px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.fillText(obj.type === 'jumppad' ? '↑' : '⇅', 0, 0);
            } else {
                this.ctx.fillStyle = obj.color;
                this.ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
                if (obj.type === 'spawn') {
                    this.ctx.fillStyle = '#000';
                    this.ctx.beginPath();
                    this.ctx.arc(obj.x + obj.width/2, obj.y + obj.height/2, obj.width/4, 0, Math.PI * 2);
                    this.ctx.fill();
                }
            }
            this.ctx.restore();
        });

        // Draw selection and resize handles
        if (this.selectedObject) {
            this.ctx.save();
            
            if (this.selectedObject.type === 'text') {
                this.ctx.translate(this.selectedObject.x + this.selectedObject.width/2, 
                                 this.selectedObject.y + this.selectedObject.height/2);
                this.ctx.rotate(this.selectedObject.rotation * Math.PI / 180);
                this.ctx.strokeStyle = '#fff';
                this.ctx.lineWidth = 2;
                this.ctx.strokeRect(-this.selectedObject.width/2, -this.selectedObject.height/2, 
                                  this.selectedObject.width, this.selectedObject.height);
            } else {
                this.ctx.strokeStyle = '#fff';
                this.ctx.lineWidth = 2;
                this.ctx.strokeRect(
                    this.selectedObject.x,
                    this.selectedObject.y,
                    this.selectedObject.width,
                    this.selectedObject.height
                );
            }

            // Draw resize handles
            const handleSize = 8;
            const handles = this.getResizeHandles();
            this.ctx.fillStyle = '#fff';
            handles.forEach(handle => {
                this.ctx.fillRect(handle.x - handleSize/2, handle.y - handleSize/2, handleSize, handleSize);
            });

            this.ctx.restore();
        }

        this.ctx.restore();
    }

    getResizeHandles() {
        if (!this.selectedObject) return [];
        // Только для платформ, кроме jumppad и gravitypad
        if (["default", "wood", "lava"].includes(this.selectedObject.type)) {
            return [
                { x: this.selectedObject.x, y: this.selectedObject.y },
                { x: this.selectedObject.x + this.selectedObject.width, y: this.selectedObject.y },
                { x: this.selectedObject.x, y: this.selectedObject.y + this.selectedObject.height },
                { x: this.selectedObject.x + this.selectedObject.width, y: this.selectedObject.y + this.selectedObject.height }
            ];
        }
        return [];
    }

    showTextInput(obj) {
        // Создаем временное поле ввода для редактирования текста
        const input = document.createElement('input');
        input.type = 'text';
        input.value = obj.text;
        input.style.position = 'absolute';
        input.style.left = (obj.x + this.offset.x) + 'px';
        input.style.top = (obj.y + this.offset.y) + 'px';
        input.style.width = obj.width + 'px';
        input.style.height = obj.height + 'px';
        input.style.fontSize = obj.fontSize + 'px';
        input.style.textAlign = 'center';
        input.style.backgroundColor = 'transparent';
        input.style.border = 'none';
        input.style.outline = 'none';
        input.style.color = obj.color;
        input.style.transform = `rotate(${obj.rotation}deg)`;
        input.style.transformOrigin = 'center center';
        
        document.body.appendChild(input);
        input.focus();
        
        const updateText = () => {
            obj.text = input.value;
            this.render();
        };
        
        const removeInput = () => {
            input.removeEventListener('input', updateText);
            input.removeEventListener('blur', removeInput);
            input.remove();
        };
        
        input.addEventListener('input', updateText);
        input.addEventListener('blur', removeInput);
    }

    setupPropertiesPanel() {
        this.propX = document.getElementById('prop-x');
        this.propY = document.getElementById('prop-y');
        this.propWidth = document.getElementById('prop-width');
        this.propHeight = document.getElementById('prop-height');
        this.propColor = document.getElementById('prop-color');
        this.propType = document.getElementById('prop-type');
        this.propText = document.getElementById('prop-text');
        this.propFontSize = document.getElementById('prop-fontsize');
        this.propRotation = document.getElementById('prop-rotation');
        this.propTypeGroup = document.getElementById('prop-type-group');
        this.propTextGroup = document.getElementById('prop-text-group');
        this.propFontSizeGroup = document.getElementById('prop-fontsize-group');
        this.propRotationGroup = document.getElementById('prop-rotation-group');
        this.duplicateBtn = document.getElementById('duplicate-object');
        this.objectPropertiesSection = document.getElementById('object-properties-section');

        // Обработчики изменений
        this.propX.addEventListener('input', () => this.updateSelectedObject('x', parseInt(this.propX.value)));
        this.propY.addEventListener('input', () => this.updateSelectedObject('y', parseInt(this.propY.value)));
        this.propWidth.addEventListener('input', () => this.updateSelectedObject('width', parseInt(this.propWidth.value)));
        this.propHeight.addEventListener('input', () => this.updateSelectedObject('height', parseInt(this.propHeight.value)));
        this.propColor.addEventListener('input', () => this.updateSelectedObject('color', this.propColor.value));
        this.propType.addEventListener('change', () => this.updateSelectedObject('type', this.propType.value));
        this.propText.addEventListener('input', () => this.updateSelectedObject('text', this.propText.value));
        this.propFontSize.addEventListener('input', () => this.updateSelectedObject('fontSize', parseInt(this.propFontSize.value)));
        this.propRotation.addEventListener('input', () => this.updateSelectedObject('rotation', parseInt(this.propRotation.value)));
        this.duplicateBtn.addEventListener('click', () => this.duplicateSelectedObject());
    }

    updateMapPropertiesPanel() {
        document.getElementById('map-name').value = this.mapName;
    }

    duplicateSelectedObject() {
        if (!this.selectedObject) return;
        const obj = this.selectedObject;
        // Глубокое копирование
        const copy = JSON.parse(JSON.stringify(obj));
        copy.x += 32;
        copy.y += 32;
        this.objects.push(copy);
        this.selectedObject = copy;
        this.updatePropertiesPanel();
        this.render();
    }

    setupClipboardShortcuts() {
        window.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.code === 'KeyC') {
                if (this.selectedObject) {
                    this.clipboardObject = JSON.parse(JSON.stringify(this.selectedObject));
                }
            }
            if (e.ctrlKey && e.code === 'KeyV') {
                if (this.clipboardObject) {
                    const copy = JSON.parse(JSON.stringify(this.clipboardObject));
                    copy.x += 32;
                    copy.y += 32;
                    this.objects.push(copy);
                    this.selectedObject = copy;
                    this.updatePropertiesPanel();
                    this.render();
                }
            }
        });
    }

    setupMapSettingsModal() {
        this.mapSettingsBtn = document.getElementById('map-settings-btn');
        this.mapSettingsModal = document.getElementById('map-settings-modal');
        this.modalMapName = document.getElementById('modal-map-name');
        this.modalMapWidth = document.getElementById('modal-map-width');
        this.modalMapHeight = document.getElementById('modal-map-height');
        this.modalMapBgColor = document.getElementById('modal-map-bgcolor');
        this.closeMapSettings = document.getElementById('close-map-settings');
        this.applyMapSettings = document.getElementById('apply-map-settings');

        this.mapSettingsBtn.addEventListener('click', () => {
            this.modalMapName.value = this.mapName;
            this.modalMapWidth.value = this.canvas.width;
            this.modalMapHeight.value = this.canvas.height;
            this.modalMapBgColor.value = this.mapBgColor;
            this.mapSettingsModal.style.display = 'flex';
        });
        this.closeMapSettings.addEventListener('click', () => {
            this.mapSettingsModal.style.display = 'none';
        });
        this.applyMapSettings.addEventListener('click', () => {
            this.mapName = this.modalMapName.value;
            this.canvas.width = Math.max(100, Math.min(5000, parseInt(this.modalMapWidth.value)));
            this.canvas.height = Math.max(100, Math.min(5000, parseInt(this.modalMapHeight.value)));
            this.mapBgColor = this.modalMapBgColor.value;
            document.getElementById('map-name').value = this.mapName;
            this.mapSettingsModal.style.display = 'none';
            this.render();
            this.updatePropertiesPanel();
        });
        // Закрытие по клику вне окна
        this.mapSettingsModal.addEventListener('mousedown', (e) => {
            if (e.target === this.mapSettingsModal) this.mapSettingsModal.style.display = 'none';
        });
    }

    setupMoveWithWASD() {
        window.addEventListener('keydown', (e) => {
            if (!this.selectedObject) return;
            let moved = false;
            switch (e.key.toLowerCase()) {
                case 'w':
                    this.selectedObject.y -= this.gridSize;
                    moved = true;
                    break;
                case 'a':
                    this.selectedObject.x -= this.gridSize;
                    moved = true;
                    break;
                case 's':
                    this.selectedObject.y += this.gridSize;
                    moved = true;
                    break;
                case 'd':
                    this.selectedObject.x += this.gridSize;
                    moved = true;
                    break;
            }
            if (moved) {
                this.updatePropertiesPanel();
                this.render();
                e.preventDefault();
            }
        });
    }

    setupWelcomeScreen() {
        const createCard = document.getElementById('create-card');
        const importCard = document.getElementById('import-card');
        const templatesCard = document.getElementById('templates-card');

        createCard.addEventListener('click', () => this.showModal('create-modal'));
        importCard.addEventListener('click', () => this.importMap());
        templatesCard.addEventListener('click', () => this.showModal('templates-modal'));
    }

    setupModals() {
        // Create modal
        const createModal = document.getElementById('create-modal');
        const createForm = document.getElementById('create-form');
        const cancelBtn = createForm.querySelector('.cancel-btn');

        createForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.createNewMap({
                name: document.getElementById('modal-map-name').value,
                width: parseInt(document.getElementById('map-width').value),
                height: parseInt(document.getElementById('map-height').value),
                backgroundColor: document.getElementById('map-bgcolor').value
            });
            this.hideModal('create-modal');
        });

        cancelBtn.addEventListener('click', () => this.hideModal('create-modal'));

        // Templates modal
        const templatesModal = document.getElementById('templates-modal');
        templatesModal.addEventListener('click', (e) => {
            if (e.target === templatesModal) {
                this.hideModal('templates-modal');
            }
        });
    }

    setupFileInput() {
        this.fileInput = document.createElement('input');
        this.fileInput.type = 'file';
        this.fileInput.accept = '.json';
        this.fileInput.style.display = 'none';
        document.body.appendChild(this.fileInput);

        this.fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const mapData = JSON.parse(e.target.result);
                        // Скрываем приветственный экран
                        document.getElementById('welcome-screen').style.display = 'none';
                        // Показываем редактор
                        document.getElementById('editor-container').style.display = 'block';
                        // Инициализируем редактор с данными карты
                        this.initEditor(mapData);
                    } catch (error) {
                        console.error('Error loading map:', error);
                        alert('Error loading map file');
                    }
                };
                reader.readAsText(file);
            }
        });
    }

    async loadTemplates() {
        const templatesGrid = document.getElementById('templates-grid');
        templatesGrid.innerHTML = '';
        // Статический список шаблонов
        const templates = [
            {
                name: 'Platformer Template',
                file: 'template1.json',
                author: 'System',
                description: 'A basic platformer level template with platforms and spawn point',
                preview: 'template1.png'
            },
            // Добавьте сюда другие шаблоны по аналогии
        ];
        for (const template of templates) {
            const templateCard = this.createTemplateCard(template);
            templatesGrid.appendChild(templateCard);
        }
    }

    createTemplateCard(template) {
        const card = document.createElement('div');
        card.className = 'template-card';
        card.innerHTML = `
            <div class="template-preview">
                <img src="templates/${template.preview}" alt="${template.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iIzJjM2U1MCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiNlY2YwZjEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBwcmV2aWV3PC90ZXh0Pjwvc3ZnPg=='">
            </div>
            <div class="template-info">
                <h3>${template.name}</h3>
                <p>${template.description}</p>
                <p class="template-author">by ${template.author}</p>
                <button class="create-btn">Create</button>
            </div>
        `;
        const button = card.querySelector('.create-btn');
        if (template.file) {
            button.onclick = () => this.importTemplateMap(template.file);
        } else {
            button.disabled = true;
            button.textContent = 'No file';
        }
        return card;
    }

    showModal(modalId) {
        document.getElementById(modalId).style.display = 'flex';
    }

    hideModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
    }

    createNewMap(config) {
        const mapData = {
            name: config.name,
            width: config.width,
            height: config.height,
            backgroundColor: config.backgroundColor,
            objects: [],
            layers: []
        };
        this.initEditor(mapData);
    }

    initEditor(mapData) {
        // Скрываем приветственный экран
        document.getElementById('welcome-screen').style.display = 'none';
        
        // Показываем редактор
        const editorContainer = document.getElementById('editor-container');
        editorContainer.style.display = 'block';
        
        // Инициализируем редактор с данными карты
        // Здесь будет код инициализации редактора
        console.log('Initializing editor with:', mapData);
    }
}

// Инициализация редактора при загрузке страницы
const editor = new MapEditor();

// Глобальная функция для инициализации редактора с данными карты
function initEditor(mapData) {
    const editor = new MapEditor();
    
    // Устанавливаем размеры холста
    editor.canvas.width = mapData.width;
    editor.canvas.height = mapData.height;
    
    // Устанавливаем цвет фона
    editor.mapBgColor = mapData.backgroundColor;
    
    // Очищаем существующие объекты
    editor.objects = [];
    
    // Добавляем объекты из данных карты
    if (mapData.objects && Array.isArray(mapData.objects)) {
        mapData.objects.forEach(obj => {
            editor.objects.push(obj);
        });
    }
    
    // Добавляем слои из данных карты
    if (mapData.layers && Array.isArray(mapData.layers)) {
        mapData.layers.forEach(layer => {
            // Здесь можно добавить логику для работы со слоями
        });
    }
    
    // Обновляем отображение
    editor.render();
    
    return editor;
} 