import axios from "axios"
import * as queryString from 'query-string';
import { BaseImageUrl, BaseUrl, Categories, Endpoints, API_KEY } from "../utilities/Constants";

export const getGenres = (callback) => {
    let genres;
    axios.get(`${BaseUrl}3${Endpoints.genres}?api_key=675c392c90047f3d4a826fcaf89de2ab`)
        .then((res) => {
            genres = res.data;
            let totalGenre = genres.genres.filter((elem) => Object.values(Categories).includes(elem.name))
            callback(totalGenre);
        })
    return genres;
}
export const getMovieByCategory = (url, queryParams, callBack) => {
    let movies;
    const params = queryString.stringify(queryParams);
    axios.get(
        `${BaseUrl}3${url}?api_key=675c392c90047f3d4a826fcaf89de2ab&${params}
        `
    )
        .then((res) => {
            callBack(res.data.results);
        })
    return movies;
}
export const getMoviePoster = (path) => {
    let imageUrl;
    axios.get(`${BaseImageUrl}t/p/w500/${path}`)
        .then(res => res.blob)
        .then(data => imageUrl = URL.createObjectURL(data))
    return imageUrl;
}
export const search = (queryParam, callBack) => {
    let response;
    const param = queryString.stringify(queryParam);
    axios.get(`${BaseUrl}3${Endpoints.search}?api_key=675c392c90047f3d4a826fcaf89de2ab&${param}`)
        .then((res) => {
            callBack(res.data.results);
        })
}
export const getLatest = (queryParam, callBack) => {
    const param = queryString.stringify(queryParam);
    axios.get(`${BaseUrl}3${Endpoints.latest}?api_key=${API_KEY}&${param}`)
    .then((res)=>{
        callBack(res.data.results);
    })
}
export const getUpcoming = (queryParam, callBack) => {
    const param = queryString.stringify(queryParam);
    axios.get(`${BaseUrl}3${Endpoints.upcoming}?api_key=${API_KEY}&${param}`)
    .then((res)=>{
        callBack(res.data.results);
    })
}
export const getMovieDetails=(id,callBack)=>{
    let details;
    axios.get(`${BaseUrl}3/movie/${id}?api_key=${API_KEY}`)
    .then((res)=>{
        details= res.data;
        callBack(res.data);
    })
    return details;
}
export const getCredits=(id, callBack)=>{
    let credits;
    axios.get(`${BaseUrl}3/movie/${id}/credits?api_key=${API_KEY}`)
    .then((res)=>{
        credits = res.data;
        callBack(res.data);
    })
    return credits;
}
export const getRecommendations =(id,callBack)=>{
    let rec;
    axios.get(`${BaseUrl}3/movie/${id}/recommendations?api_key=${API_KEY}`)
    .then((res)=>{
        rec = res.data.results;
        callBack(res.data.results);
    })
}
