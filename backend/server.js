import express from 'express';
import path from 'path';
import authRoutes from './routes/auth.route.js'
import movieRoutes from './routes/movie.route.js'
import searchRoutes from './routes/search.route.js'

import { ENV_VARS } from './config/envVar.js';
import { connectDB } from './config/db.js';
import cookieParser from 'cookie-parser';
import { protectRoute } from './middlewares/protectRoute.js';

const app=express();
const PORT=ENV_VARS.PORT
const __dirname=path.resolve();

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/watch',protectRoute,movieRoutes)
app.use('/api/v1/search',protectRoute,searchRoutes)

if(ENV_VARS.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"/frontend/dist")));

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
})}

app.listen(PORT,()=>{
    console.log("server started at http://localhost:"+PORT);
    connectDB();
}) 