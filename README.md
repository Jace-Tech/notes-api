# Note API

A simple RESTful API for managing notes, built with **Express**, **MongoDB (Mongoose)**, and **TypeScript**.

## Project Structure

```
src/
├── configs/        # Environment variables & database connection
├── controllers/    # Route handler logic
├── middlewares/    # Express middlewares
├── models/         # Mongoose schemas & models
├── routes/         # Express routers
├── lib/            # External libraries
├── schema/         # Zod validation schemas
├── services/       # Database interaction layer
└── utils/          # Shared utilities (error classes, response helpers, etc.)
```

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm
- A running MongoDB instance

### Installation

```bash
pnpm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

```env
PORT=4321
NODE_ENV=development
DB_URL=mongodb://localhost:27017/note-api
```

### Running the Server

```bash
# Development (with hot reload)
pnpm dev

# Production
pnpm build
pnpm start
```

## API Reference

Base URL: `http://localhost:<PORT>/api`

### Notes

| Method | Endpoint                            | Description               |
| ------ | ----------------------------------- | ------------------------- |
| POST   | `/api/notes`                        | Create a note             |
| GET    | `/api/notes`                        | Get all notes             |
| GET    | `/api/notes/:noteId`                | Get a single note         |
| DELETE | `/api/notes/:noteId`                | Delete a note             |
| PUT    | `/api/notes/:noteId`                | Update a note             |
| GET    | `/api/notes/categories/:categoryId` | Get all notes by category |

### Authentication

#### Register

| Method | Endpoint             | Description     |
| ------ | -------------------- | --------------- |
| POST   | `/api/auth/register` | Register a user |

#### Login

| Method | Endpoint          | Description  |
| ------ | ----------------- | ------------ |
| POST   | `/api/auth/login` | Login a user |

### Categories

| Method | Endpoint                      | Description           |
| ------ | ----------------------------- | --------------------- |
| POST   | `/api/categories`             | Create a category     |
| GET    | `/api/categories`             | Get all categories    |
| GET    | `/api/categories/:categoryId` | Get a single category |
| DELETE | `/api/categories/:categoryId` | Delete a category     |

### Request Body — Create Note

```json
{
  "title": "My Note",
  "content": "Note content here."
}
```

### Response Format

All responses follow a consistent structure:

```typescript
{
  success: boolean;
  message: string;
  data: any;
}
```

### Extra

Visit [https://documenter.getpostman.com/view/55366763/2sBXwqqqWZ](https://documenter.getpostman.com/view/55366763/2sBXwqqqWZ) to view the API documentation.

Live API endpoint: [https://notes-api-zdlt.onrender.com/](https://notes-api-zdlt.onrender.com/)
