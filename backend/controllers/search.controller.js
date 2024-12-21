import { User } from '../models/user.model.js';
import {fetchFromTMDB} from '../services/tmdb.service.js';


export async function searchPerson(req,res) {
    const {query}=req.params;
    let exist=false;
    const current_user=await User.findById(req.user._id)
    try{
        const response=await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);
        if(response.results.length===0){
            return res.status(404).send(null);
        }
        current_user.searchHistory.forEach(element => {
            if(element.id===response.results[0].id){
                exist=true;
    }})
        if(!exist){
            await User.findByIdAndUpdate(req.user._id,{$push:{
                searchHistory:{
                id:response.results[0].id,
                image:response.results[0].poster_path,
                title:response.results[0].name,
                searchType:"TV",
                createdAt:Date.now(),}
            }});
        }
        res.status(200).json({success:true,content:response.results});
    }catch(error){
        console.log("error in searchPerson ",error);
        res.status(500).json({success:false,message:"Internal server error"});
    }}


export async function searchMovie(req,res) {
    const {query}=req.params;
    let exist=false;
    const current_user=await User.findById(req.user._id)
    try{
        const response=await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);
        if(response.results.length===0){
            return res.status(404).send(null);
        }
        current_user.searchHistory.forEach(element => {
            if(element.id===response.results[0].id){
                exist=true;
    }})
        if(!exist){
            await User.findByIdAndUpdate(req.user._id,{$push:{
                searchHistory:{
                id:response.results[0].id,
                image:response.results[0].poster_path,
                title:response.results[0].name,
                searchType:"TV",
                createdAt:Date.now(),}
            }});
        }
        res.status(200).json({success:true,content:response.results});

    }catch(error){
        console.log("error in searchMovie ",error);
        res.status(500).json({success:false,message:"Internal server error"});
    }
}


export async function searchTv(req,res) {
    const {query}=req.params;
    let exist=false;
    const current_user=await User.findById(req.user._id)
    try{
        const response=await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);
        if(response.results.length===0){
            return res.status(404).send(null);
        }
        current_user.searchHistory.forEach(element => {
            if(element.id===response.results[0].id){
                exist=true;
    }})
        if(!exist){
            await User.findByIdAndUpdate(req.user._id,{$push:{
                searchHistory:{
                id:response.results[0].id,
                image:response.results[0].poster_path,
                title:response.results[0].name,
                searchType:"TV",
                createdAt:Date.now(),}
            }});
        }

        res.status(200).json({success:true,content:response.results});

    }catch(error){
        console.log("error in searchTv ",error);
        res.status(500).json({success:false,message:"Internal server error"});
    }
}
export async function getSearchHistory(req,res) {
    try{
        res.status(200).json({success:true,content:req.user.searchHistory});
    }catch(error){
        console.log("error in getSearchHistory ",error);
        res.status(500).json({success:false,message:"Internal server error"});
    }
}
export async function removeItemFromSearchHistory(req,res) {
    let {id}=req.params;
    id=parseInt(id);
    try{
        await User.findByIdAndUpdate(req.user._id,{$pull:{
            searchHistory:{id:id},
        }});
        res.status(200).json({success:true,message:"Removed successfully"});
    }catch(error){
        console.log("error in removeItemFromSearchHistory ",error);
        res.status(500).json({success:false,message:"Internal server error"});
    }
}