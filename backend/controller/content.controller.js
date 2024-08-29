import { fetchFromTMDB } from "../services/tmdb.services.js";

export function getContentCategory(type) {
    return async(req, res) => {
        const {category} = req.params;
        try{
            const data = await fetchFromTMDB(`https://api.themoviedb.org/3/${type}/${category}`);

            res.json({
                success: true,
                content: data.results,
            })
        }
        catch(e){
            res.status(500).json({
                success: false,
                message: "Server error"
            });
        }
    }
}

export function getTrendingContent(type) {
    return async(req, res) => {
        try{
            const data = await fetchFromTMDB(`https://api.themoviedb.org/3/trending/${type}/day`);
            const randomContent = data.results[
                Math.floor(Math.random() * data.results?.length)
            ];

            res.json({
                success: true,
                content: randomContent,
            })
        }
        catch(e){
            res.status(500).json({
                success: false,
                message: "Server error"
            });
        }
    }
}

export function getTopContents(type) {
    return async(req, res) => {
        try{
            const data = await fetchFromTMDB(`https://api.themoviedb.org/3/trending/${type}/day`);
            
            res.json({
                success: true,
                content: data.results,
            })
        }
        catch(e){
            res.status(500).json({
                success: false,
                message: "Server error"
            });
        }
    }
}

export function getContentTrailers(type) {
    return async(req, res) => {
        const {id} = req.params;
        try{
            const data = await fetchFromTMDB(`https://api.themoviedb.org/3/${type}/${id}/videos`);

            res.json({
                success: true,
                content: data.results,
            })
        }
        catch(e){
            if(e.message.includes(`404`)){
                return res.status(404).send(null);
            }
            res.status(500).json({
                success: false,
                message: "Server error"
            });
        }
    }
}

export function getContentDetails(type) {
    return async(req, res) => {
        const {id} = req.params;
        try{
            const data = await fetchFromTMDB(`https://api.themoviedb.org/3/${type}/${id}`);

            res.json({
                success: true,
                content: data,
            })
        }
        catch(e){
            if(e.message.includes(`404`)){
                return res.status(404).send(null);
            }
            res.status(500).json({
                success: false,
                message: "Server error"
            });
        }
    }
}

export function getContentKeywords(type) {
    return async(req, res) => {
        const {id} = req.params;
        try{
            const data = await fetchFromTMDB(`https://api.themoviedb.org/3/${type}/${id}/keywords`);

            res.json({
                success: true,
                content: data.keywords,
            })
        }
        catch(e){
            if(e.message.includes(`404`)){
                return res.status(404).send(null);
            }
            res.status(500).json({
                success: false,
                message: "Server error"
            });
        }
    }
}

export function getContentReviews(type) {
    return async(req, res) => {
        const {id} = req.params;
        try{
            const data = await fetchFromTMDB(`https://api.themoviedb.org/3/${type}/${id}/reviews`);

            res.json({
                success: true,
                content: data.results,
            })
        }
        catch(e){
            if(e.message.includes(`404`)){
                return res.status(404).send(null);
            }
            res.status(500).json({
                success: false,
                message: "Server error"
            });
        }
    }
}

export function getSimilarContents(type) {
    return async(req, res) => {
    const {id} = req.params;
    try{
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/${type}/${id}/similar`);

        res.json({
            success: true,
            content: data.results,
        })
    }
    catch(e){
        if(e.message.includes(`404`)){
            return res.status(404).send(null);
        }
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}
}

export function getCasts(type) {
    return async(req, res) => {
    const {id} = req.params;
    try{
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/${type}/${id}/credits`);

        res.json({
            success: true,
            content: data.cast,
        })
    }
    catch(e){
        if(e.message.includes(`404`)){
            return res.status(404).send(null);
        }
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}
}

export function getContentPosters(type) {
    return async(req, res) => {
        const {id} = req.params;
        try{
            const data = await fetchFromTMDB(`https://api.themoviedb.org/3/${type}/${id}/images`);

            res.json({
                success: true,
                content: data.posters,
            })
        }
        catch(e){
            if(e.message.includes(`404`)){
                return res.status(404).send(null);
            }
            res.status(500).json({
                success: false,
                message: "Server error"
            });
        }
    }   
}

export function getContentWatchProviders(type) {
    return async(req, res) => {
        const {id} = req.params;
        try{
            const data = await fetchFromTMDB(`https://api.themoviedb.org/3/${type}/${id}/watch/providers`);

            res.json({
                success: true,
                content: data.results,
            })
        }
        catch(e){
            if(e.message.includes(`404`)){
                return res.status(404).send(null);
            }
            res.status(500).json({
                success: false,
                message: "Server error"
            });
        }
    }   
}