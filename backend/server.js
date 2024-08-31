import express from "express";
import cookieParser from "cookie-parser";
import path from 'path';

import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";

import authRoutes from './routes/auth.routes.js';

import movieRoutes from './routes/movie.routes.js';
import tvRoutes from './routes/tv.routes.js';
import castRoutes from './routes/cast.routes.js';
import searchRoutes from './routes/search.routes.js';
import saveRoutes from './routes/save.routes.js';

import {protectRoute} from './middleware/protectRoute.js';


const app = express();
const PORT = ENV_VARS.PORT;

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/movie', protectRoute, movieRoutes);
app.use('/api/v1/tv', protectRoute, tvRoutes);
app.use('/api/v1/cast', protectRoute, castRoutes);
app.use('/api/v1/search', protectRoute, searchRoutes);
app.use('/api/v1/save', protectRoute, saveRoutes);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/dist/')));

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    });
}

app.listen(PORT, () => {
    connectDB();
});