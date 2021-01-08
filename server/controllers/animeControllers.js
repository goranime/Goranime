const axios = require("axios")

class animeController {

    static getAll(req, res, next) {
        const url = `https://api.myanimelist.net/v2/anime?q=one&limit=50`;
        const config = { headers: { Authorization: 'Bearer ' + process.env.API_ANIME_LIST } };

        axios.get(url, config)
            .then(response => {
                res.status(200).json(response.data)

            })
            .catch(err => {
                next({
                    message: err.message,
                    code: 500,
                    from: "get anime list"
                })
            })
    }

    static getById(req, res, next) {
        const idAnime = +req.params.animeId;
        const url = `https://api.myanimelist.net/v2/anime/${idAnime}?fields=id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,my_list_status,num_episodes,start_season,broadcast,source,average_episode_duration,rating,pictures,background,related_anime,related_manga,recommendations,studios,statistics`;
        const config = { headers: { Authorization: 'Bearer ' + process.env.API_ANIME_LIST } };

        axios.get(url, config)
            .then(response => {
                res.status(200).json(response.data)
            })
            .catch(err => {
                next({
                    message: err.message,
                    code: 500,
                    from: "get anime by id"
                })
            })
    }

}

module.exports = animeController