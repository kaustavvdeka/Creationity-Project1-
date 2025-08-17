# Creationity - Content Sharing Platform

A full-stack content sharing platform where users can create, share, and discover poems, stories, jokes, and pickup lines. Built with React frontend and Node.js backend with MongoDB database.

## Features

### Frontend
- **Modern UI**: Beautiful, responsive design with Tailwind CSS
- **Authentication**: JWT-based login/signup with user profiles
- **Content Management**: Create, edit, delete, and like content
- **User Profiles**: Personal dashboard with statistics and content management
- **Real-time Updates**: Dynamic content loading and updates
- **Responsive Design**: Works on desktop, tablet, and mobile

### Backend
- **RESTful API**: Complete CRUD operations for content and users
- **Authentication**: JWT tokens with bcrypt password hashing
- **Session Management**: Express sessions for enhanced security
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Comprehensive input validation
- **Security**: Rate limiting, CORS, Helmet, and other security measures

## Tech Stack

### Frontend
- React 19
- React Router DOM
- Tailwind CSS
- React Icons
- Context API for state management

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing
- express-validator for validation
- express-session for session management
- Helmet for security headers
- CORS for cross-origin requests

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Creationity-Project1-
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp env.example .env
```

Edit the `.env` file with your configuration:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/creationity
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
SESSION_SECRET=your-super-secret-session-key-change-this-in-production
NODE_ENV=development
```

### 3. Frontend Setup

```bash
# Navigate back to root directory
cd ..

# Install dependencies
npm install
```

### 4. Start MongoDB
If using local MongoDB:
```bash
mongod
```

Or use MongoDB Atlas (cloud) and update the MONGODB_URI in your .env file.

### 5. Run the Application

#### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/refresh` - Refresh JWT token

### Content Management
- `GET /api/content` - Get all content with filters
- `GET /api/content/:type/:category` - Get content by type and category
- `GET /api/content/trending/:type` - Get trending content
- `GET /api/content/item/:id` - Get single content item
- `POST /api/content` - Create new content
- `PUT /api/content/:id` - Update content (author only)
- `DELETE /api/content/:id` - Delete content (author only)
- `POST /api/content/:id/like` - Like/unlike content

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `GET /api/user/content` - Get user's content
- `GET /api/user/liked` - Get user's liked content
- `GET /api/user/stats` - Get user statistics
- `GET /api/user/profile/:username` - Get public user profile

## Usage

### 1. Create an Account
- Visit the signup page
- Fill in your details (username, email, password)
- Password must contain uppercase, lowercase, and number

### 2. Login
- Use your email and password to login
- You'll be redirected to the home page

### 3. Create Content
- Navigate to any content section (Poems, Stories, Jokes, Pickup Lines)
- Click "Share a [Content Type]" button
- Fill in the form and submit

### 4. Manage Your Content
- Click on your profile icon in the header
- Select "My Content" to view and manage your posts
- Edit or delete your content as needed

### 5. Interact with Content
- Like content by clicking the heart icon
- View content details and author information
- Browse content by categories

## Project Structure

```
Creationity-Project1-/
├── backend/                 # Backend API
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── server.js           # Main server file
│   ├── package.json        # Backend dependencies
│   └── README.md           # Backend documentation
├── src/                    # Frontend source
│   ├── components/         # React components
│   │   ├── content/        # Content-related components
│   │   ├── Header/         # Navigation header
│   │   ├── User/           # User profile components
│   │   └── ...             # Other components
│   ├── context/            # React context
│   ├── services/           # API service functions
│   └── App.jsx             # Main app component
├── package.json            # Frontend dependencies
└── README.md               # This file
```

## Environment Variables

### Backend (.env)
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/creationity
JWT_SECRET=your-super-secret-jwt-key
SESSION_SECRET=your-super-secret-session-key
NODE_ENV=development
```

## Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Session Management**: Express sessions
- **Input Validation**: Comprehensive validation
- **Rate Limiting**: Prevents abuse
- **CORS**: Configured for frontend integration
- **Helmet**: Security headers
- **Environment Variables**: Sensitive data protection

## Development

### Backend Scripts
```bash
npm run dev    # Start development server with nodemon
npm start      # Start production server
```

### Frontend Scripts
```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run preview # Preview production build
```

## Production Deployment

### Backend
1. Set `NODE_ENV=production`
2. Use strong JWT_SECRET and SESSION_SECRET
3. Configure MongoDB Atlas or production MongoDB
4. Set up proper CORS origins
5. Use HTTPS in production

### Frontend
1. Build the application: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Update API base URL in `contentService.js` for production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License

## Support

For support, please open an issue in the repository or contact the development team.

## Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- MongoDB team for the database
- Express.js team for the web framework
