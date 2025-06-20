import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { authRoutes } from './src/routes/auth';
import { testDatabaseConnection } from './db/db';

const PORT = process.env.PORT || 3000;

const app = express();

// Middleware
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Authentication routes
app.post('/api/auth/signup', authRoutes.signup);
app.post('/api/auth/signin', authRoutes.signin);
app.get('/api/auth/profile', authRoutes.profile);

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString() 
    });
});

// Global error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Server error:', err);
    res.status(500).json({ 
        error: 'Internal server error' 
    });
});

// 404 handler for other routes (must be last)
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Route not found' 
    });
});


const startServer = async (): Promise<void> => {
    try {
        console.log('🚀 Starting Chat App Server...');
        console.log('📍 Environment:', process.env.NODE_ENV || 'development');
        
        await testDatabaseConnection();
        
        app.listen(PORT, () => {
            console.log(`\n✅ Server running successfully!`);
            console.log(`🌐 URL: http://localhost:${PORT}`);
            console.log(`\n📚 Available endpoints:`);
            console.log(`  POST /api/auth/signup - Create new user account`);
            console.log(`  POST /api/auth/signin - Sign in user`);
            console.log(`  GET  /api/auth/profile - Get user profile (requires auth)`);
            console.log(`  GET  /health - Health check`);
            console.log(`\n🔥 Server is ready to accept requests!\n`);
        });
        
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

export default app;
