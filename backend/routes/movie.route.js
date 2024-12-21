// Initialize express router
import express from 'express';
import {getTrendingMovie,getMoiveDetails,getMoiveTrailers,getMoviesByCatagory,getSimilarMovies} from '../controllers/movie.controller.js'

const router=express.Router();
router.get('/:type/trending',getTrendingMovie);
router.get('/:type/:id/trailers',getMoiveTrailers);
router.get('/:type/:id/details',getMoiveDetails);
router.get('/:type/:id/similar',getSimilarMovies);
router.get('/:type/:catagory',getMoviesByCatagory);
export default router;
