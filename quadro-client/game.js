class Game {
    constructor() {
        console.log('[GAME] Game constructor called');
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 800;
        this.canvas.height = 600;
        
        this.players = new Map();
        this.localPlayer = null;
        this.socket = null;
        this.map = null;
        
        this.keys = {
            a: false,
            d: false,
            space: false,
            shift: false
        };
        
        // Для отладки
        this.lastPingTime = 0;
        this.ping = 0;
        this.fps = 0;
        this.lastFpsUpdate = 0;
        this.frameCount = 0;
        
        this.setupEventListeners();
    }
    
    async loadMap() {
        try {
            const response = await fetch('map.json');
            if (!response.ok) {
                throw new Error('Failed to load map');
            }
            this.map = await response.json();
            console.log('Map loaded:', this.map);
        } catch (error) {
            console.error('Error loading map:', error);
            // Если не удалось загрузить карту, используем встроенную
            this.map = {
                width: 800,
                height: 600,
                platforms: [
                    { x: 0, y: 550, width: 800, height: 50, color: "#4a4a4a" },
                    { x: 100, y: 400, width: 200, height: 20, color: "#8b4513" },
                    { x: 500, y: 400, width: 200, height: 20, color: "#8b4513" },
                    { x: 300, y: 300, width: 200, height: 20, color: "#8b4513" },
                    { x: 100, y: 200, width: 200, height: 20, color: "#8b4513" },
                    { x: 500, y: 200, width: 200, height: 20, color: "#8b4513" }
                ]
            };
        }
    }
    
    setupEventListeners() {
        console.log('[GAME] setupEventListeners called');
        document.getElementById('connect-btn').addEventListener('click', () => this.connect());
        document.getElementById('disconnect-btn').addEventListener('click', () => this.disconnect());
        document.getElementById('debug-checkbox').addEventListener('change', (e) => {
            document.getElementById('debug-info').style.display = e.target.checked ? 'block' : 'none';
        });
        
        // Управление чатом
        const chatInput = document.getElementById('chat-input');
        const chatSend = document.getElementById('chat-send');
        chatSend.addEventListener('click', () => { console.log('[GAME] chatSend click'); this.sendChatMessage(chatInput); });
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                console.log('[GAME] chatInput Enter');
                this.sendChatMessage(chatInput);
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key.toLowerCase() === 'a') this.keys.a = true;
            if (e.key.toLowerCase() === 'd') this.keys.d = true;
            if (e.key === ' ') this.keys.space = true;
            if (e.key === 'Shift') this.keys.shift = true;
        });
        
        document.addEventListener('keyup', (e) => {
            if (e.key.toLowerCase() === 'a') this.keys.a = false;
            if (e.key.toLowerCase() === 'd') this.keys.d = false;
            if (e.key === ' ') this.keys.space = false;
            if (e.key === 'Shift') this.keys.shift = false;
        });
    }
    
    connect() {
        const nickname = document.getElementById('nickname').value;
        const serverIp = document.getElementById('server-ip').value;
        const color = document.getElementById('player-color').value;
        
        if (!nickname.match(/^[a-zA-Z]+$/)) {
            alert('Nickname should contain only English letters');
            return;
        }
        
        console.log('Connecting to server...');
        this.socket = new WebSocket(`ws://${serverIp}:8080`);
        
        this.socket.onopen = () => {
            console.log('WebSocket connection established');
            this.socket.send(JSON.stringify({
                type: 'join',
                nickname,
                color
            }));
            
            // Скрываем экран авторизации и показываем игровой интерфейс
            document.querySelector('.login-screen').style.display = 'none';
            document.getElementById('game-canvas').style.display = 'block';
            document.querySelector('.chat-container').classList.add('connected');
            document.getElementById('disconnect-btn').classList.add('connected');
            
            this.lastPingTime = Date.now();
            this.gameLoop();
        };
        
        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Received message type:', data.type);
            
            if (data.type === 'join') {
                if (data.map) {
                    this.map = data.map;
                    console.log('Map received on join:', this.map);
                }
                if (data.playerId) {
                    this.localPlayerId = data.playerId;
                }
            }
            
            if (data.type === 'state') {
                const newPlayers = new Map(Object.entries(data.players));
                if (this.localPlayerId && newPlayers.has(this.localPlayerId)) {
                    this.localPlayer = newPlayers.get(this.localPlayerId);
                } else if (!this.localPlayer && newPlayers.size > 0) {
                    this.localPlayer = newPlayers.values().next().value;
                }
                this.players = newPlayers;
                if (this.localPlayer) {
                    this.socket.send(JSON.stringify({ type: 'ping' }));
                }
            }
            
            if (data.type === 'pong') {
                this.ping = Date.now() - this.lastPingTime;
                this.lastPingTime = Date.now();
            }
            
            // Логика для чата и системных сообщений
            if (data.type === 'chat') {
                const isSystem = data.sender === 'system';
                const msg = isSystem ? `[SYSTEM] ${data.message}` : `[${data.sender}] ${data.message}`;
                console.log('[CHAT][RECV]', msg, data);
                if (window.addMessageToChat) {
                    window.addMessageToChat(msg);
                }
            }
        };
        
        this.socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
        
        this.socket.onclose = () => {
            console.log('[GAME] Disconnected');
            if (window.showDisconnectModal) {
                window.showDisconnectModal('Connection closed');
            } else {
                alert('Connection closed');
                location.reload();
            }
        };
    }
    
    disconnect() {
        if (this.socket) {
            this.socket.close();
            // Показываем экран авторизации и скрываем игровой интерфейс
            document.querySelector('.login-screen').style.display = 'flex';
            document.getElementById('game-canvas').style.display = 'none';
            document.querySelector('.chat-container').classList.remove('connected');
            document.getElementById('disconnect-btn').classList.remove('connected');
        }
    }
    
    updateDebugInfo() {
        const debugInfo = document.getElementById('debug-info');
        if (!debugInfo) return;
        
        const now = Date.now();
        this.frameCount++;
        
        if (now - this.lastFpsUpdate >= 1000) {
            this.fps = this.frameCount;
            this.frameCount = 0;
            this.lastFpsUpdate = now;
        }
        
        const serverIp = document.getElementById('server-ip').value;
        const playersCount = this.players.size;
        const x = this.localPlayer ? Math.round(this.localPlayer.x) : 0;
        const y = this.localPlayer ? Math.round(this.localPlayer.y) : 0;
        
        debugInfo.innerHTML = `
            IP: ${serverIp}<br>
            Ping: ${this.ping}ms<br>
            FPS: ${this.fps}<br>
            Players: ${playersCount}<br>
            Position: (${x}, ${y})
        `;
    }
    
    drawPlatforms() {
        if (!this.map || !this.localPlayer) return;
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        this.map.platforms.forEach(platform => {
            if (platform.type === 'text') {
                // Рисуем текст
                this.ctx.save();
                this.ctx.font = `${platform.size || 24}px Arial`;
                this.ctx.fillStyle = platform.color || '#fff';
                this.ctx.textAlign = 'center';
                this.ctx.translate(
                    platform.x - this.localPlayer.x + centerX - 16,
                    platform.y - this.localPlayer.y + centerY - 16
                );
                if (platform.angle) this.ctx.rotate(platform.angle * Math.PI / 180);
                this.ctx.fillText(platform.text || '', 0, 0);
                this.ctx.restore();
                return;
            }
            // Цвет для lava
            if (platform.type === 'lava') {
                this.ctx.fillStyle = platform.color || '#e53935';
            } else if (platform.type === 'wood') {
                this.ctx.fillStyle = platform.color || '#8b4513';
            } else {
                this.ctx.fillStyle = platform.color || '#4a4a4a';
            }
            const x = platform.x - this.localPlayer.x + centerX - 16;
            const y = platform.y - this.localPlayer.y + centerY - 16;
            this.ctx.fillRect(x, y, platform.width, platform.height);
            // Lava: рисуем анимацию/эффект
            if (platform.type === 'lava') {
                this.ctx.globalAlpha = 0.5;
                this.ctx.fillStyle = '#fff';
                this.ctx.fillRect(x, y, platform.width, platform.height);
                this.ctx.globalAlpha = 1.0;
            }
            // Тень
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            this.ctx.fillRect(x, y + platform.height - 2, platform.width, 2);
        });
    }
    
    drawPlayer(player, centerX, centerY) {
        const x = player.x - this.localPlayer.x + centerX - 16;
        const y = player.y - this.localPlayer.y + centerY - 16;
        
        // Рисуем кубик
        this.ctx.fillStyle = player.color;
        this.ctx.fillRect(x, y, 32, 32);
        
        // Рисуем тень
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        this.ctx.fillRect(x, y + 32 - 2, 32, 2);
        
        // Рисуем никнейм
        this.ctx.font = '12px Arial';
        this.ctx.fillStyle = '#ffffff';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(player.nickname, x + 16, y - 5);
    }
    
    gameLoop() {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify({
                type: 'input',
                keys: this.keys
            }));
        }
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Рисуем только если есть localPlayer
        if (this.localPlayer) {
            // Сначала рисуем платформы
            this.drawPlatforms();
            
            // Затем рисуем игроков
            const centerX = this.canvas.width / 2;
            const centerY = this.canvas.height / 2;
            
            this.players.forEach((player, id) => {
                this.drawPlayer(player, centerX, centerY);
            });
        }
        
        // Обновляем отладочную информацию
        this.updateDebugInfo();
        
        requestAnimationFrame(() => this.gameLoop());
    }

    sendChatMessage(chatInput) {
        const message = chatInput.value.trim();
        if (message && this.socket && this.socket.readyState === 1) {
            console.log('[CHAT][SEND] Отправка сообщения:', message);
            this.socket.send(JSON.stringify({ type: 'chat', message: message }));
            chatInput.value = '';
        } else {
            console.log('[CHAT][SEND] Не удалось отправить сообщение:', message, 'Socket:', this.socket);
        }
    }
}

window.onload = () => {
    console.log('[GAME] window.onload');
    window.gameInstance = new Game();
}; 