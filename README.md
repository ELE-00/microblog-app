# microblog-app

Frontend for Whispr — a microblogging social platform. Built with React 19, Vite, and React Router.

<img src=".\src\assets\appScreen.png" width="500" />

[Live preview](https://microblog-app-zbjt.vercel.app/)

## Features

- Login and signup with JWT authentication
- Persistent auth via localStorage
- Feed showing own posts and followed users' posts
- Create posts with optional image attachments
- Like / unlike posts
- Comment on posts, delete own comments
- Follow / unfollow users, remove followers
- User profiles with editable bio, avatar, and banner
- Browse and search all users
- Light / dark mode toggle
- Real-time presence via Socket.IO

## Tech Stack

| Layer | Technology |
|-------|-----------|
| UI | React 19 |
| Build | Vite 7 |
| Routing | React Router DOM v7 |
| HTTP | Axios (with JWT interceptor) |
| Real-time | Socket.IO Client |
| Testing | Vitest + Testing Library |

## Getting Started

### Prerequisites

- Node.js 18+
- The [microblog-api](https://github.com/ELE-00/microblog-api) backend running

### Installation

```bash
git clone https://github.com/ELE-00/microblog-app.git
cd microblog-app
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and set your API URL:

```bash
cp .env.example .env
```

```env
VITE_API_URL=http://localhost:3000
```

For production, create `.env.production`:

```env
VITE_API_URL=https://your-api-url.com
```

### Running

```bash
npm run dev
```

The app starts at **http://localhost:5173**.

## Project Structure

```
microblog-app/
├── vite.config.js         # Vite + Vitest configuration
├── src/
│   ├── main.jsx           # Entry point and route definitions
│   ├── AppLayout.jsx      # Root layout with sidebar
│   ├── index.css          # Global styles + CSS variables (light/dark theme)
│   ├── socket.js          # Socket.IO client instance
│   ├── api/
│   │   ├── auth.js        # All API call functions
│   │   └── axiosClient.js # Axios instance with Bearer token interceptor
│   ├── context/
│   │   └── AuthContext.jsx  # Global auth state (user, profile, posts)
│   ├── components/
│   │   ├── ProtectedRoute.jsx
│   │   ├── SideNav.jsx
│   │   ├── FeedItem.jsx
│   │   ├── Comments.jsx
│   │   ├── ProfileCard.jsx
│   │   ├── EditProfileDialog.jsx
│   │   ├── FollowDialog.jsx
│   │   ├── FollowUserCard.jsx
│   │   └── UserCard.jsx
│   ├── pages/
│   │   ├── Feed.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Profile.jsx
│   │   ├── PostDetails.jsx
│   │   ├── UserList.jsx
│   │   └── NotFound.jsx
│   ├── styles/            # Per-component CSS files
│   ├── assets/            # Icons and images
│   └── test/
│       ├── setup.js
│       ├── ProtectedRoute.test.jsx
│       ├── Login.test.jsx
│       ├── Signup.test.jsx
│       ├── FeedItem.test.jsx
│       └── AuthContext.test.jsx
```

## Routing

| Path | Page | Protected |
|------|------|-----------|
| `/login` | Login | No |
| `/signup` | Signup | No |
| `/` | Feed | Yes |
| `/profile/:id` | Profile | Yes |
| `/post/:id` | Post Details | Yes |
| `/AddUser` | User List | Yes |

Protected routes redirect to `/login` when the user is not authenticated.

## Testing

```bash
# Run tests (watch mode)
npm test

# Run once with coverage report
npm run test:coverage
```

Tests use **Vitest** and **React Testing Library**. API calls, AuthContext, and Socket.IO are mocked — no real network calls are made.

### Test coverage includes

- `ProtectedRoute` — redirects when unauthenticated, renders children when authenticated
- `Login` — form rendering, form submission, success/error handling
- `Signup` — form rendering, form submission, success/error handling
- `FeedItem` — content rendering, delete button visibility, like/unlike toggle
- `AuthContext` — login/logout state, post updates, profile picture updates

## Deployment

The app is deployed on [Vercel](https://vercel.com).

Set the following environment variable in your Vercel project settings:

- `VITE_API_URL` — your production API URL (e.g. `https://your-api.up.railway.app`)

The `vite build` output in `dist/` is served as a static site.
