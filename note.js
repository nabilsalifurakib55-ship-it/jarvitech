:root {
  --bg-0: #020a13;
  --bg-1: #071a2a;
  --bg-2: #0c2437;
  --panel: rgba(8, 16, 27, 0.88);
  --panel-strong: rgba(12, 22, 35, 0.96);
  --surface: rgba(17, 31, 42, 0.9);
  --surface-alt: rgba(12, 27, 37, 0.94);
  --line: rgba(133, 171, 210, 0.22);
  --text: #ebf7ff;
  --muted: #a9c9da;
  --accent: #4dd3ff;
  --accent-2: #8d7dff;
  --success: #75e0a2;
  --warning: #ffcd70;
  --shadow: rgba(1, 6, 12, 0.6);
}

body[data-accent="cyan"] {
  --accent: #4dd3ff;
  --accent-2: #7dc8ff;
}

body[data-accent="violet"] {
  --accent: #8f7dff;
  --accent-2: #bf9bf8;
}

body[data-accent="emerald"] {
  --accent: #4fe7c2;
  --accent-2: #5ab9ff;
}

* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  min-height: 100%;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background:
    radial-gradient(circle at top, rgba(77, 211, 255, 0.18), transparent 30%),
    linear-gradient(135deg, var(--bg-0), var(--bg-1) 48%, var(--bg-2));
  color: var(--text);
}

body {
  min-height: 100vh;
  display: flex;
  align-items: stretch;
  justify-content: center;
  padding: 20px;
}

button, input {
  font: inherit;
}

button {
  cursor: pointer;
}

.desktop-shell {
  width: min(1400px, 100%);
  min-height: calc(100vh - 40px);
  background: rgba(4, 12, 18, 0.72);
  border: 1px solid var(--line);
  border-radius: 22px;
  box-shadow: 0 30px 60px var(--shadow);
  backdrop-filter: blur(12px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 18px;
  border-bottom: 1px solid var(--line);
  background: rgba(7, 17, 27, 0.72);
}

.topbar__left,
.topbar__right,
.topbar__center {
  display: flex;
  align-items: center;
}

.topbar__left {
  gap: 14px;
  min-width: 220px;
}

.topbar__center {
  flex: 1;
  justify-content: center;
  gap: 12px;
  text-align: center;
}

.topbar__right {
  justify-content: flex-end;
  gap: 8px;
  min-width: 260px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.brand__dot {
  width: 10px;
  height: 10px;
  background: var(--accent);
  border-radius: 50%;
  box-shadow: 0 0 12px var(--accent);
}

.status-tag {
  border: 1px solid var(--line);
  border-radius: 999px;
  font-size: 0.7rem;
  padding: 6px 10px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.clock {
  font-weight: 700;
  font-size: clamp(1rem, 2vw, 1.3rem);
  letter-spacing: 0.08em;
}

.date-display {
  color: var(--muted);
  font-size: 0.82rem;
}

.status-pills {
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-pill {
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--line);
  font-size: 0.7rem;
  color: var(--muted);
}

.status-pill--online {
  color: var(--success);
  border-color: rgba(117, 224, 162, 0.45);
}

.icon-button,
.window-action,
.dock-item,
.desktop-icon,
.accent-option {
  border: 1px solid var(--line);
  background: rgba(14, 28, 38, 0.8);
  color: var(--text);
  border-radius: 10px;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.icon-button:hover,
.window-action:hover,
.dock-item:hover,
.desktop-icon:hover,
.accent-option:hover,
.primary-button:hover,
.secondary-button:hover {
  transform: translateY(-1px);
  border-color: rgba(255, 255, 255, 0.2);
}

.icon-button {
  width: 38px;
  height: 38px;
  font-size: 1.1rem;
}

.desktop {
  flex: 1;
  display: flex;
  gap: 18px;
  padding: 18px;
}

.desktop-icons {
  width: 124px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 12px;
}

.desktop-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 10px;
  min-height: 84px;
  text-align: center;
  background: rgba(17, 31, 42, 0.38);
}

.desktop-icon.is-selected,
.dock-item.active {
  border-color: rgba(77, 211, 255, 0.6);
  box-shadow: inset 0 0 0 1px rgba(77, 211, 255, 0.18), 0 0 18px rgba(77, 211, 255, 0.12);
}

.desktop-icon__glyph {
  font-size: 1.8rem;
  color: var(--accent);
}

.workspace {
  flex: 1;
  position: relative;
  display: flex;
  align-items: stretch;
  justify-content: center;
  padding: 8px 0 0;
}

.window {
  position: absolute;
  inset: 0 8px 0 8px;
  display: none;
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 24px 35px rgba(0, 0, 0, 0.3);
}

.window.active {
  display: flex;
  flex-direction: column;
}

.window.is-hidden {
  display: none;
}

.window.is-minimized {
  display: none;
}

.window-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 12px 16px;
  background: rgba(13, 24, 35, 0.92);
  border-bottom: 1px solid var(--line);
}

.window-header__title {
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
  font-size: 0.76rem;
}

.window-header__actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.window-action {
  width: 28px;
  height: 28px;
  font-size: 1rem;
}

.window-content {
  flex: 1;
  padding: 18px;
  overflow: auto;
}

.home-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-panel {
  width: min(720px, 100%);
  padding: 30px 24px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: linear-gradient(135deg, rgba(15, 27, 38, 0.96), rgba(9, 19, 31, 0.8));
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.02);
}

.eyebrow {
  margin: 0 0 12px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--accent);
  font-size: 0.72rem;
}

.hero-panel h1 {
  margin: 0 0 12px;
  font-size: clamp(2.2rem, 4vw, 4rem);
  line-height: 1.05;
}

.hero-panel p {
  margin: 0 0 18px;
  color: var(--muted);
  line-height: 1.6;
}

.primary-button,
.secondary-button {
  border-radius: 10px;
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--line);
  transition: all 0.2s ease;
}

.primary-button {
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  color: #04131c;
  font-weight: 700;
  border: none;
}

.secondary-button {
  background: rgba(255, 255, 255, 0.02);
  color: var(--text);
}

.message {
  min-height: 1.5em;
  margin-top: 16px;
  font-weight: 600;
  color: var(--accent);
}

.assistant-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
  background: rgba(4, 12, 18, 0.45);
  border: 1px solid var(--line);
  border-radius: 14px;
}

.chat-bubble {
  max-width: min(80%, 440px);
  padding: 12px 14px;
  border-radius: 14px;
  line-height: 1.5;
  border: 1px solid var(--line);
}

.chat-bubble--user {
  align-self: flex-end;
  background: rgba(77, 211, 255, 0.12);
}

.chat-bubble--assistant {
  align-self: flex-start;
  background: rgba(141, 125, 255, 0.08);
}

.chat-form {
  display: flex;
  gap: 10px;
}

.chat-form input {
  flex: 1;
  border-radius: 10px;
  border: 1px solid var(--line);
  background: rgba(10, 20, 29, 0.8);
  color: var(--text);
  padding: 0.9rem 1rem;
}

.file-manager {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 16px;
  min-height: 100%;
}

.file-manager__sidebar,
.file-manager__content {
  background: rgba(8, 19, 28, 0.8);
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 16px;
}

.file-manager__sidebar h3,
.file-manager__content h3,
.settings-group h3 {
  margin-top: 0;
}

.folder-list,
.file-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.folder-item,
.file-item {
  border: 1px solid transparent;
  border-radius: 10px;
  padding: 10px 12px;
  background: rgba(255, 255, 255, 0.02);
  color: var(--text);
  transition: border-color 0.2s ease, background 0.2s ease;
}

.folder-item.active,
.file-item.active {
  background: rgba(77, 211, 255, 0.08);
  border-color: rgba(77, 211, 255, 0.35);
}

.file-manager__header {
  margin-bottom: 12px;
}

.browser-panel {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.browser-bar {
  background: rgba(10, 21, 31, 0.86);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 12px 14px;
  color: var(--muted);
}

.browser-page {
  flex: 1;
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 18px;
  background: rgba(9, 18, 28, 0.7);
}

.browser-page h2 {
  margin-top: 0;
}

.browser-cards {
  display: grid;
  grid-template-columns: repeat(3, minmax(120px, 1fr));
  gap: 12px;
  margin-top: 18px;
}

.mini-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  background: rgba(255,255,255,0.03);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 14px;
}

.settings-panel {
  display: grid;
  gap: 18px;
}

.settings-group {
  background: rgba(10, 20, 29, 0.82);
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 16px;
}

.accent-picker {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.accent-option {
  padding: 0.75rem 1rem;
  min-width: 110px;
}

.accent-option.active {
  border-color: var(--accent);
  box-shadow: 0 0 0 1px rgba(77, 211, 255, 0.15);
}

.toggle-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.toggle-row input {
  width: 18px;
  height: 18px;
}

.dock {
  display: flex;
  justify-content: center;
  gap: 12px;
  background: rgba(6, 14, 21, 0.88);
  padding: 14px 18px 18px;
  border-top: 1px solid var(--line);
}

.dock-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-width: 82px;
  padding: 10px 12px 8px;
}

.dock-item span {
  font-size: 1.5rem;
  color: var(--accent);
}

.dock-item small {
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
}

.notification-stack {
  position: fixed;
  right: 20px;
  bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 50;
}

.notification {
  min-width: 260px;
  max-width: 360px;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid var(--line);
  background: rgba(11, 21, 28, 0.96);
  box-shadow: 0 18px 25px rgba(0, 0, 0, 0.28);
  animation: slideIn 0.25s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

@media (max-width: 980px) {
  .desktop {
    flex-direction: column;
  }

  .desktop-icons {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .window {
    inset: 0;
  }

  .file-manager {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  body {
    padding: 10px;
  }

  .topbar {
    flex-wrap: wrap;
    justify-content: center;
  }

  .topbar__left,
  .topbar__right {
    width: 100%;
    justify-content: center;
  }

  .topbar__center {
    width: 100%;
    order: 3;
  }

  .status-pills {
    display: none;
  }

  .dock {
    gap: 6px;
    overflow-x: auto;
    justify-content: flex-start;
  }

  .dock-item {
    min-width: 70px;
  }
}
