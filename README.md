const THEME_KEY = 'jarvis-ui-theme';
const ACCENT_KEY = 'jarvis-ui-accent';
const COMPACT_KEY = 'jarvis-ui-compact';

const state = {
  accent: localStorage.getItem(ACCENT_KEY) || 'cyan',
  theme: localStorage.getItem(THEME_KEY) || 'dark',
  compact: localStorage.getItem(COMPACT_KEY) === 'true'
};

const chatHistory = [];

function applyUiState() {
  document.body.dataset.theme = state.theme;
  document.body.dataset.accent = state.accent;
  document.body.classList.toggle('compact-mode', state.compact);

  document.querySelectorAll('.accent-option').forEach((button) => {
    const matches = button.dataset.accent === state.accent;
    button.classList.toggle('active', matches);
  });

  const compactToggle = document.getElementById('compactToggle');
  if (compactToggle) {
    compactToggle.checked = state.compact;
  }
}

function showNotification(message) {
  const stack = document.getElementById('notificationStack');
  if (!stack) return;

  const note = document.createElement('div');
  note.className = 'notification';
  note.textContent = message;
  stack.appendChild(note);

  setTimeout(() => {
    note.remove();
  }, 2600);
}

function updateClock() {
  const clockEl = document.getElementById('clock');
  const dateEl = document.getElementById('dateDisplay');

  if (!clockEl || !dateEl) return;

  const now = new Date();
  const time = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const date = now.toLocaleDateString([], {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  clockEl.textContent = time;
  dateEl.textContent = date;
}

function activateWindow(target) {
  const appName = `window-${target}`;
  const appWindow = document.getElementById(appName);

  document.querySelectorAll('.window').forEach((windowNode) => {
    const shouldShow = windowNode.id === appName;
    windowNode.classList.toggle('active', shouldShow);
    windowNode.classList.remove('is-hidden');
  });

  document.querySelectorAll('.dock-item, .desktop-icon').forEach((button) => {
    const matches = button.dataset.target === target;
    button.classList.toggle('active', matches);
    button.classList.toggle('is-selected', matches);
  });

  if (appWindow) {
    appWindow.classList.add('active');
  }
}

function bindWindowActions() {
  document.querySelectorAll('.window-action').forEach((button) => {
    button.addEventListener('click', () => {
      const windowNode = button.closest('.window');
      if (!windowNode) return;

      const action = button.dataset.windowAction;
      if (action === 'close') {
        windowNode.classList.add('is-hidden');
        windowNode.classList.remove('active');
        activateWindow('home');
      }

      if (action === 'minimize') {
        windowNode.classList.add('is-minimized');
        windowNode.classList.remove('active');
        activateWindow('home');
      }
    });
  });
}

function bindAppButtons() {
  document.querySelectorAll('[data-target]').forEach((button) => {
    if (!button.dataset.target) return;

    button.addEventListener('click', () => {
      const target = button.dataset.target;
      activateWindow(target);
    });
  });
}

function setupGreeting() {
  const button = document.getElementById('greetBtn');
  const message = document.getElementById('message');

  if (!button || !message) return;

  button.addEventListener('click', () => {
    message.textContent = 'System acknowledged. JARVIS prototype online and ready.';
    showNotification('Welcome sequence completed.');
  });
}

function appendChatMessage(sender, text) {
  const chatMessages = document.getElementById('chatMessages');
  if (!chatMessages) return;

  const bubble = document.createElement('div');
  bubble.className = `chat-bubble chat-bubble--${sender}`;
  bubble.textContent = text;
  chatMessages.appendChild(bubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getLocalAssistantReply(input) {
  const value = input.trim().toLowerCase();

  if (!value) {
    return 'I am ready when you are.';
  }

  if (value.includes('help') || value.includes('commands')) {
    return 'Try: status, time, home, files, browser, settings, or clear.';
  }

  if (value.includes('status') || value.includes('system')) {
    return 'Prototype status is nominal. Core interface modules are active and ready for expansion.';
  }

  if (value.includes('time')) {
    return `Current time: ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}.`;
  }

  if (value.includes('home')) {
    activateWindow('home');
    return 'Opening the home dashboard.';
  }

  if (value.includes('files')) {
    activateWindow('files');
    return 'Opening the prototype file manager.';
  }

  if (value.includes('browser')) {
    activateWindow('browser');
    return 'Opening the browser panel.';
  }

  if (value.includes('settings')) {
    activateWindow('settings');
    return 'Opening the settings panel.';
  }

  if (value.includes('clear')) {
    return 'clear';
  }

  if (value.includes('hello') || value.includes('hi')) {
    return 'Hello. I am the JARVIS prototype assistant shell. Connect a real model behind this interface when ready.';
  }

  return 'Prototype response received. This interface is ready to connect to a real assistant backend later without changing the UI.';
}

function setLoadingState(isLoading) {
  const chatInput = document.getElementById('chatInput');
  const sendButton = document.getElementById('sendChatBtn');

  if (chatInput) {
    chatInput.disabled = isLoading;
    chatInput.setAttribute('aria-busy', String(isLoading));
  }

  if (sendButton) {
    sendButton.disabled = isLoading;
    sendButton.textContent = isLoading ? 'Sending...' : 'Send';
  }
}

function buildRequestHistory() {
  const trimmed = chatHistory.slice(-8);
  return trimmed.map((entry) => ({
    role: entry.role,
    content: entry.content
  }));
}

async function submitChatMessage(event) {
  event.preventDefault();

  const chatInput = document.getElementById('chatInput');
  if (!chatInput) return;

  const text = chatInput.value.trim();
  if (!text) {
    showNotification('Please enter a message first.');
    return;
  }

  appendChatMessage('user', text);
  chatHistory.push({ role: 'user', content: text });
  chatInput.value = '';
  setLoadingState(true);

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: text,
        history: buildRequestHistory()
      })
    });

    let payload = null;
    try {
      payload = await response.json();
    } catch (error) {
      payload = null;
    }

    if (!response.ok) {
      const errorMessage = payload?.detail || payload?.error || 'The AI service could not process the request.';
      appendChatMessage('assistant', `Assistant unavailable: ${errorMessage}`);
      showNotification('AI request failed. Please configure the server API key.');
      return;
    }

    const reply = payload?.reply || getLocalAssistantReply(text);
    appendChatMessage('assistant', reply);
  } catch (error) {
    const errorText = error instanceof Error ? error.message : 'Unknown network error';
    appendChatMessage('assistant', 'Unable to reach the assistant backend. Please check the server is running.');
    showNotification(`Connection issue: ${errorText}`);
  } finally {
    setLoadingState(false);
    chatInput.focus();
  }
}

function setupAssistant() {
  const chatForm = document.getElementById('chatForm');
  const clearButton = document.getElementById('clearChatBtn');

  if (chatForm) {
    chatForm.addEventListener('submit', submitChatMessage);
  }

  clearButton?.addEventListener('click', () => {
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages) {
      chatMessages.innerHTML = '';
    }
    chatHistory.length = 0;
    appendChatMessage('assistant', 'Conversation cleared. Ready for the next prompt.');
  });

  appendChatMessage('assistant', 'Welcome online. I am the JARVIS prototype shell. Ask for help, status, time, or open a workspace panel.');
}

function buildFileBrowser() {
  const folders = [
    { name: 'workspace', path: 'workspace', active: true },
    { name: 'projects', path: 'projects' },
    { name: 'archives', path: 'archives' }
  ];

  const filesByFolder = {
    workspace: [
      { name: 'README.md', type: 'file' },
      { name: 'assistant.py', type: 'file' },
      { name: 'ui-design', type: 'folder' }
    ],
    projects: [
      { name: 'jarvis-dashboard', type: 'folder' },
      { name: 'system-monitor', type: 'folder' }
    ],
    archives: [
      { name: 'snapshot-001', type: 'folder' },
      { name: 'notes.txt', type: 'file' }
    ]
  };

  const folderList = document.getElementById('folderList');
  const fileList = document.getElementById('fileList');
  const titleNode = document.getElementById('fileManagerTitle');

  if (!folderList || !fileList || !titleNode) return;

  function selectFolder(folderName) {
    const folderButtons = folderList.querySelectorAll('.folder-item');
    folderButtons.forEach((button) => {
      button.classList.toggle('active', button.dataset.folder === folderName);
    });

    titleNode.textContent = `/${folderName}`;
    fileList.innerHTML = '';

    const items = filesByFolder[folderName] || [];
    items.forEach((item) => {
      const listItem = document.createElement('li');
      listItem.className = 'file-item';
      listItem.dataset.name = item.name;
      listItem.textContent = `${item.type === 'folder' ? '📁' : '📄'} ${item.name}`;
      listItem.addEventListener('click', () => {
        document.querySelectorAll('.file-item').forEach((node) => node.classList.remove('active'));
        listItem.classList.add('active');
        showNotification(`${item.name} selected in demo file manager.`);
      });
      fileList.appendChild(listItem);
    });
  }

  folders.forEach((folder) => {
    const item = document.createElement('li');
    item.className = 'folder-item';
    item.dataset.folder = folder.path;
    item.textContent = `📂 ${folder.name}`;
    if (folder.active) {
      item.classList.add('active');
    }
    item.addEventListener('click', () => selectFolder(folder.path));
    folderList.appendChild(item);
  });

  selectFolder('workspace');
}

function setupSettings() {
  const accentButtons = document.querySelectorAll('.accent-option');
  const compactToggle = document.getElementById('compactToggle');

  accentButtons.forEach((button) => {
    button.addEventListener('click', () => {
      state.accent = button.dataset.accent || 'cyan';
      localStorage.setItem(ACCENT_KEY, state.accent);
      applyUiState();
      showNotification(`Accent set to ${state.accent}.`);
    });
  });

  compactToggle?.addEventListener('change', (event) => {
    state.compact = Boolean(event.target.checked);
    localStorage.setItem(COMPACT_KEY, String(state.compact));
    applyUiState();
    showNotification(state.compact ? 'Compact mode enabled.' : 'Compact mode disabled.');
  });
}

function setupNotificationButton() {
  const notificationsBtn = document.getElementById('notificationsBtn');
  const settingsBtn = document.getElementById('settingsBtn');

  notificationsBtn?.addEventListener('click', () => {
    showNotification('System alerts: prototype environment is running normally.');
  });

  settingsBtn?.addEventListener('click', () => {
    activateWindow('settings');
    showNotification('Settings panel opened.');
  });
}

function init() {
  applyUiState();
  updateClock();
  setInterval(updateClock, 1000);

  setupGreeting();
  setupAssistant();
  buildFileBrowser();
  setupSettings();
  setupNotificationButton();
  bindAppButtons();
  bindWindowActions();

  document.querySelectorAll('.window').forEach((windowNode) => {
    if (windowNode.id === 'window-home') {
      windowNode.classList.add('active');
    }
  });

  showNotification('JARVIS OS prototype initialized.');
}

document.addEventListener('DOMContentLoaded', init);

localStorage.setItem(THEME_KEY, state.theme);
