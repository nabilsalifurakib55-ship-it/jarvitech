# JARVITECH

A lightweight browser-based JARVIS-inspired desktop prototype built with HTML, CSS, and JavaScript, with a Python FastAPI backend for secure AI chat integration.

## Project status

This project is a browser-based desktop prototype for a JARVIS concept, not a native Linux desktop or operating system.

## Project structure

- `index.html` — desktop shell and UI structure
- `style.css` — dark futuristic visual styling
- `note.js` — desktop interaction logic, settings, notifications, and frontend chat integration
- `app.py` — FastAPI server and OpenAI-backed chat route
- `requirements.txt` — Python dependencies
- `.env.example` — environment template for API configuration
- `.gitignore` — ignores local secrets and Python cache files
- `README.md` — setup and usage instructions

## Frontend features

- Top bar with clock and system tags
- Desktop shortcuts and application dock
- JARVIS chat panel
- Mock file manager and browser-like panels
- Settings panel with local browser preferences
- Notifications

## Backend features

- `POST /api/chat` endpoint for AI requests
- Server-side API key handling using environment variables
- Input validation for empty or oversized messages
- Limited conversation history
- Friendly server-side errors when the API key is missing or the request fails

## Important AI status

The assistant is not considered functional until a real API key is configured and a valid provider response is successfully received.

## Windows setup

1. Open Command Prompt in the project folder.
2. Create and activate a virtual environment:

   ```cmd
   py -m venv .venv
   .\.venv\Scripts\activate
   ```

3. Upgrade pip if needed:

   ```cmd
   python -m pip install --upgrade pip
   ```

4. Install dependencies:

   ```cmd
   pip install -r requirements.txt
   ```

5. Create a local environment file:

   ```cmd
   copy .env.example .env
   ```

6. Edit `.env` and set a real key:

   ```env
   OPENAI_API_KEY=your_api_key_here
   OPENAI_MODEL=gpt-4o-mini
   ```

7. Start the backend:

   ```cmd
   python -m uvicorn app:app --host 127.0.0.1 --port 8000 --reload
   ```

8. Open the browser to the frontend page in the project folder, or serve the static files with any simple local server.

## Security notes

- The AI API key must never be hardcoded in HTML, JavaScript, or committed source files.
- Use a local `.env` file only.
- The AI does not have shell access or unrestricted filesystem access.
- No arbitrary commands are executed by the model.

## Testing and validation

Before a real AI response can be claimed, the following must be verified:

1. `.env` exists with a real key
2. backend starts successfully
3. a real `POST /api/chat` request returns a model response
4. the frontend displays the response without JavaScript errors

Without a valid API key, the backend should return a clean configuration error instead of pretending the AI is active.

## Git safety

The following are ignored by Git:

- `.env`
- `.venv/`
- `__pycache__/`
- `*.pyc`
- `.pytest_cache/`

## Requirements

- Python 3.10+
- internet access for the live model provider
- valid OpenAI API key

## Summary

This project preserves the existing desktop prototype while adding a server-side AI chat route. The browser UI remains functional even without the API key, but real AI functionality is only active after a valid live request succeeds.
