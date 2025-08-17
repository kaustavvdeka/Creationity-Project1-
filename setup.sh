#!/bin/bash

echo "🚀 Setting up Creationity - Content Sharing Platform"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16 or higher."
    exit 1
fi

# Check if MongoDB is running (optional check)
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB is not installed locally. You can use MongoDB Atlas instead."
    echo "   Update the MONGODB_URI in backend/.env with your Atlas connection string."
fi

echo "📦 Installing frontend dependencies..."
npm install

echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..

echo "🔧 Setting up environment variables..."
if [ ! -f "backend/.env" ]; then
    cp backend/env.example backend/.env
    echo "✅ Created backend/.env file"
    echo "⚠️  Please update backend/.env with your MongoDB connection string and secrets"
else
    echo "✅ backend/.env already exists"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update backend/.env with your MongoDB connection string"
echo "2. Start MongoDB (if using local instance): mongod"
echo "3. Start the backend: cd backend && npm run dev"
echo "4. Start the frontend: npm run dev"
echo ""
echo "The application will be available at:"
echo "- Frontend: http://localhost:5173"
echo "- Backend API: http://localhost:3000"
echo ""
echo "Happy coding! 🚀"
