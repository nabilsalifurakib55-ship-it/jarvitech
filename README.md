# jarvitech

A lightweight HTML/CSS/JavaScript prototype for a simple personal homepage and JARVIS-inspired interface concept.

## Current status

This repository is not a complete operating system, native Linux desktop, or bootable Debian image. It is a small static web prototype that demonstrates a possible UI direction for a futuristic desktop-themed experience.

## Project structure

- `index.html` — page structure and UI markup
- `style.css` — visual styling for the existing homepage
- `note.js` — button interaction logic
- `README.md` — project documentation

## Current functionality

- Simple landing page layout
- Greeting button updates the page message
- Static styling for a clean, minimal landing page experience

## Known issue fixed

The page originally referenced `script.js`, but the functional JavaScript file in the repository was `note.js`. The page now loads the correct file.

## Local browser use

Open `index.html` directly in a browser to test the page locally.

## Testing checklist

- [ ] Open `index.html` in a browser.
- [ ] Confirm the page loads without console errors.
- [ ] Click the `Click Me` button.
- [ ] Confirm the message text changes to `Thanks for visiting my homepage! 🎉`.
- [ ] Verify the page remains readable and usable when resized.

## Roadmap note

This prototype can be evolved into a desktop-style interface for a JARVIS OS concept, but future work should be implemented incrementally with lightweight, modular front-end architecture and clear separation between UI, assistant logic, and system integration.
