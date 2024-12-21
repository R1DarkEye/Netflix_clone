import { fetchFromTMDB } from '../services/tmdb.service.js';


// @desc Get trending movie
export async function getTrendingMovie(req, res) {
    const {type}=req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/trending/${type}/day?language=en-US`);
        const randomMovie=data.results[Math.floor(Math.random()*data.results?.length)];

        res.json({success:true,content:randomMovie});
    } catch (error) {
        res.status(500).json({ message: "internal server error  "+error.message });
    }
    
}

export async function getMoiveTrailers(req, res) {
    const {id,type}=req.params;
    try {
        const data =await fetchFromTMDB(`https://api.themoviedb.org/3/${type}/${id}/videos?language=en-US`);
        res.json({success: true, trailers:data.results});

    } catch (error) {
        if(error.message.includes('404')){
            res.status(404).json({message:"null"});
        }
    }
    
}

export async function getMoiveDetails(req, res) {
    const {id,type}=req.params;
    try {
        const data =await fetchFromTMDB(`https://api.themoviedb.org/3/${type}/${id}?language=en-US`);
        res.status(200).json({success: true, details:data});

    } catch (error) {

        if(error.message.includes('404')){
            res.status(404).json({message:"not found"});
        }
        else{
            res.status(500).json({message:"internal server error"});
        }
    }
}

export async function getSimilarMovies(req, res) {
    const {id,type}=req.params;
    try {
        const data =await fetchFromTMDB(`https://api.themoviedb.org/3/${type}/${id}/similar?language=en-US&page=1`);
        res.json({success: true, similarMovies:data.results});

    } catch (error) {
        res.status(500).json({message:"internal server error"});
    }
    
}
export async function getMoviesByCatagory(req, res) {
    const {catagory,type}=req.params;
    try {
        const data =await fetchFromTMDB(`https://api.themoviedb.org/3/${type}/${catagory}?language=en-US&page=1`);
        res.json({success: true, content:data.results});

    } catch (error) {
        res.status(500).json({message:"internal server error"});
    }
}