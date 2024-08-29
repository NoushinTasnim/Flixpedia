import { fetchFromTMDB } from "../services/tmdb.services.js";

export function getCastDetails() {
    return async(req, res) => {
        const {id} = req.params;
        try{
            const data = await fetchFromTMDB(`https://api.themoviedb.org/3/person/${id}`);

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

export function getCastMovies() {
    return async(req, res) => {
        const {id} = req.params;
        try{
            const data = await fetchFromTMDB(`https://api.themoviedb.org/3/person/${id}/movie_credits`);

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

export function getCastSeries() {
    return async(req, res) => {
        const {id} = req.params;
        try{
            const data = await fetchFromTMDB(`https://api.themoviedb.org/3/person/${id}/tv_credits`);

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
