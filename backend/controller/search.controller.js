import User from "../models/user.model.js";
import { fetchFromTMDB } from "../services/tmdb.services.js";

export async function getSearchedMovie(req, res){
    const {query} = req.params;
        try{
            const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}`);

            if(response.results.length === 0){
                return res.status(404).send(null);
            }

            await User.findByIdAndUpdate(req.user._id, {
                $push: {
                    searchHistory: {
                        id: response.results[0].id,
                        image: response.results[0].poster_path,
                        title: response.results[0].title,
                        searchType: 'movie',
                        createdAt: new Date()
                    }
                }
            });

            res.json({
                success: true,
                content: response.results,
            })
        }
        catch(e){
            res.status(500).json({
                success: false,
                message: "Server error"
            });
        }
}

export async function getSearchedTVShow(req, res){
    const {query} = req.params;
        try{
            const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}`);

            if(response.results.length === 0){
                return res.status(404).send(null);
            }

            await User.findByIdAndUpdate(req.user._id, {
                $push: {
                    searchHistory: {
                        id: response.results[0].id,
                        image: response.results[0].poster_path,
                        title: response.results[0].name,
                        searchType: 'tv',
                        createdAt: new Date()
                    }
                }
            });

            res.json({
                success: true,
                content: response.results,
            })
        }
        catch(e){
            res.status(500).json({
                success: false,
                message: "Server error"
            });
        }
}

export async function getSearchedPerson(req, res){
    const {query} = req.params;
        try{
            const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}`);

            if(response.results.length === 0){
                return res.status(404).send(null);
            }

            await User.findByIdAndUpdate(req.user._id, {
                $push: {
                    searchHistory: {
                        id: response.results[0].id,
                        image: response.results[0].profile_path,
                        title: response.results[0].name,
                        searchType: 'person',
                        createdAt: new Date()
                    }
                }
            });

            res.json({
                success: true,
                content: response.results,
            })
        }
        catch(e){
            res.status(500).json({
                success: false,
                message: "Server error"
            });
        }
}


export async function getSearchHistory(req, res){
        try{
            res.json({
                success: true,
                content: req.user.searchHistory,
            })
        }
        catch(e){
            res.status(500).json({
                success: false,
                message: "Server error"
            });
        }
}

export async function deleteSearchedContent(req, res){
    let {id} = req.params;
    id = parseInt(id);

    try{
        await User.findByIdAndUpdate(req.user._id, {
            $pull: {
                searchHistory: {
                    id: id
                }
            }
        });

        res.json({
            success: true,
            message: 'Item Removed',
        })
    }
    catch(e){
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}