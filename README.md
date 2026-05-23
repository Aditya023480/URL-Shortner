# URL Shortner

A simple URL shortener built with Node.js, Express, and PostgreSQL. The project includes a backend API plus a separate static frontend in `public/`.

## Features

- Create short links from long URLs
- Use a custom slug for the short path
- Redirect short links to the original URL
- Copy generated links from the UI
- Keep a recent-links list in the browser using `localStorage`

## Project Structure

- `src/server.js` - Express app entry point (backend moved into `src/`)
- `common/config/db.js` - PostgreSQL connection
- `modules/url shortener/` - controller, route, and service logic
- `public/` - frontend files (`index.html`, `app.js`, `styles.css`)

## Requirements

- Node.js 18+ recommended
- PostgreSQL running locally or remotely
- A database named `URLshortner` matching the config in `common/config/db.js`

## Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Make sure PostgreSQL is running.
3. Confirm the database and credentials in `common/config/db.js` match your setup.

## Run the backend

Start the Express server on port 3000:

```bash
npm start
```

## Run the frontend

The frontend lives in `public/` and is static. You can open `public/index.html` with a local static server such as Live Server in VS Code.

Important: the frontend currently sends API requests to `http://localhost:3000`, so the backend must be running locally for the UI to work.

## API

### `POST /createURL`

Creates a new short URL.

Request body:

```json
{
  "url": "https://example.com/some/long/link",
  "custom": "launch"
}
```

Response:

```json
{
  "newURL": "localhost:3000/launch0"
}
```

### `GET /:url`

Redirects the short URL to its original destination.

## How It Works

1. The frontend sends the original URL and custom slug to `/createURL`.
2. The backend stores the mapping in PostgreSQL.
3. The backend returns the short URL.
4. Visiting the short URL triggers a redirect to the original link.

## Deployment Notes

If you want to deploy this project:

- Use **Render** for the Node.js backend.
- Use **Vercel** or another static host for the frontend.
- Update the frontend API base URL so it points to your deployed backend instead of `localhost:3000`.

## Notes

- Recent links in the UI are stored only in the browser with `localStorage`.
- The current server does not serve the `public/` folder directly.