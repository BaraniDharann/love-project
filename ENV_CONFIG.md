# Environment Variables Configuration

All hardcoded `localhost:3000` and `localhost:5000` URLs have been replaced with environment variables.

## Backend Configuration

**File:** `backend/.env`

```env
PORT=5000
FRONTEND_URL=http://localhost:3000
```

- `PORT`: Backend server port (default: 5000)
- `FRONTEND_URL`: Frontend application URL used for video generation and link creation

## Frontend Configuration

**File:** `frontend/.env`

```env
REACT_APP_API_URL=http://localhost:5000
```

- `REACT_APP_API_URL`: Backend API URL for all API calls

## Setup Instructions

1. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Install frontend dependencies:**
   ```bash
   cd frontend
   npm install
   ```

3. **Configure environment variables:**
   - Backend: Edit `backend/.env` to set your PORT and FRONTEND_URL
   - Frontend: Edit `frontend/.env` to set your REACT_APP_API_URL

4. **Start the application:**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm start

   # Terminal 2 - Frontend
   cd frontend
   npm start
   ```

## Production Deployment

For production, update the environment variables:

**Backend `.env`:**
```env
PORT=5000
FRONTEND_URL=https://your-frontend-domain.com
```

**Frontend `.env`:**
```env
REACT_APP_API_URL=https://your-backend-domain.com
```

## Files Modified

### Backend:
- `server.js` - Uses `process.env.PORT` and `process.env.FRONTEND_URL`
- `playwrightVideoGenerator.js` - Uses `process.env.FRONTEND_URL`
- `package.json` - Added `dotenv` dependency

### Frontend:
- `src/config.js` - New file centralizing API URL configuration
- `src/components/LoveProposal.js` - Uses `config.API_URL`
- `src/components/Anniversary.js` - Uses `config.API_URL`
- `src/components/OnesideLove.js` - Uses `config.API_URL`
- `src/components/ViewPage.js` - Uses `config.API_URL`

## Notes

- The `.env` files are already created with default localhost values
- Make sure to run `npm install` in the backend folder to install the `dotenv` package
- Frontend automatically reads `REACT_APP_*` environment variables
- Restart both servers after changing environment variables
