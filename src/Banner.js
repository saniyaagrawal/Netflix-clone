import React,{useState, useEffect} from 'react'
import axios from './axios';
import requests from './requests';
import './Banner.css'
// import Youtube from 'react-youtube'
// import movieTrailer from 'movie-trailer'
// import {Link} from "react-router-dom"
  
function Banner() {
    const [movie, setMovie] = useState([]);
    // const [trailerUrl, setTrailerUrl] = useState('');

    useEffect(() => {
        async function fetchData(){
            const request=await axios.get(requests.fetchNetflixOriginals)
            setMovie(request.data.results[Math.floor(Math.random()* request.data.results.length-1)])
            return request;
        }
        fetchData()
    }, [])

    function truncate(str,n){
        return str?.length>n ? str.substring(0,n-1)+"..." : str;
    }

    // const opts={
    //     padding: 0,
    //     height:'100%',
    //     width:'100%',
    //     playerVars:{
    //         autoplay:1
    //     }
    // }

    // const handleClick=(movie)=>{
    //     if(trailerUrl){
    //         setTrailerUrl('');
    //     }
    //     else{
    //         movieTrailer(movie?.title || movie?.name || movie?.original_name || '')
    //         .then((url=>{
    //             const urlparams=new URLSearchParams(new URL(url).search);
    //             setTrailerUrl(urlparams.get('v'))
    //         })).catch((err)=>console.log(err))
    //     }
    // }

    return (
        <div>
        <header 
            className='banner'
            style={{
                backgroundSize:'cover',
                backgroundImage:`url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`,
                backgroundPosition:'center center'
            }}
        >
            <div className='banner_contents'>
                <h1 className='banner_title'>
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className='banner_buttons'>
                    {/* <Link to='/play'> */}
                        <button className='banner_button'>Play</button>
                    {/* </Link> */}
                    <button className='banner_button'>My List</button>
                </div>
                <h1 className='banner_description'>
                    {truncate(movie?.overview,150)}
                </h1>
            </div>
            <div className='banner--fadeBottom'/>
        </header>
        {/* {trailerUrl && <Youtube videoId={trailerUrl} opts={opts}/>} */}
        </div>
    )
}

export default Banner
