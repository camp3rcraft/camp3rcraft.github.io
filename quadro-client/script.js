// Chat functionality
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');

function addMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Получаем ссылку на WebSocket из game.js, если он есть
function getGameSocket() {
    if (window.gameInstance && window.gameInstance.socket) {
        return window.gameInstance.socket;
    }
    return null;
}

function addMessageToChat(message) {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

chatSend.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message) {
        const socket = getGameSocket();
        if (socket && socket.readyState === 1) {
            socket.send(JSON.stringify({ type: 'chat', message: message }));
        }
        chatInput.value = '';
    }
});

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const message = chatInput.value.trim();
        if (message) {
            const socket = getGameSocket();
            if (socket && socket.readyState === 1) {
                socket.send(JSON.stringify({ type: 'chat', message: message }));
            }
            chatInput.value = '';
        }
    }
});

socket.on('chat message', (message) => {
    addMessage(message);
});

// Обработка подключения к серверу
socket.on('connect', () => {
    console.log('Connected to server');
    document.querySelector('.chat-container').classList.add('connected');
    document.getElementById('disconnect-btn').classList.add('connected');
    document.querySelector('.login-screen').style.display = 'none';
    document.getElementById('game-canvas').style.display = 'block';
});

// Обработка отключения от сервера
socket.on('disconnect', () => {
    console.log('Disconnected from server');
    document.querySelector('.chat-container').classList.remove('connected');
    document.getElementById('disconnect-btn').classList.remove('connected');
    document.querySelector('.login-screen').style.display = 'flex';
    document.getElementById('game-canvas').style.display = 'none';
});

// Обработка кнопки отключения
document.getElementById('disconnect-btn').addEventListener('click', () => {
    socket.disconnect();
});

// Кастомные уведомления (toast)
function showToast(message, type = 'info', duration = 3000) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 500);
    }, duration);
}

window.showToast = showToast;
window.addMessageToChat = addMessageToChat;

function showDisconnectModal(reason = 'Connection closed') {
    const modal = document.getElementById('disconnected-modal');
    const reasonElem = document.getElementById('disconnect-reason');
    if (modal && reasonElem) {
        reasonElem.textContent = reason;
        modal.style.display = 'flex';
    }
    const okBtn = document.getElementById('modal-ok-btn');
    if (okBtn) {
        okBtn.onclick = () => {
            modal.style.display = 'none';
            location.reload();
        };
    }
}

window.showDisconnectModal = showDisconnectModal; 