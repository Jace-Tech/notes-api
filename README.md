# Note API

A simple RESTful API for managing notes, built with **Express**, **MongoDB (Mongoose)**, and **TypeScript**.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express v5
- **Database**: MongoDB via Mongoose
- **Language**: TypeScript
- **Validation**: Zod
- **Package Manager**: pnpm

## Project Structure

```
src/
├── configs/        # Environment variables & database connection
├── controllers/    # Route handler logic
├── models/         # Mongoose schemas & models
├── routes/         # Express routers
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

| Method | Endpoint            | Description       |
| ------ | ------------------- | ----------------- |
| POST   | `/api/note`         | Create a note     |
| GET    | `/api/note`         | Get all notes     |
| GET    | `/api/note/:noteId` | Get a single note |
| DELETE | `/api/note/:noteId` | Delete a note     |

### Request Body — Create Note

```json
{
  "title": "My Note",
  "content": "Note content here."
}
```

### Response Format

All responses follow a consistent envelope:

```json
{
  "success": true,
  "message": "Note created successfully.",
  "data": { ... }
}
```
