import React,{useState, useEffect} from 'react'
import axios from './axios'
import './Row.css';
import Youtube from 'react-youtube'
import movieTrailer from 'movie-trailer'

const baseUrl= 'https://image.tmdb.org/t/p/original/'

function Row({ title, fetchUrl, isLarge }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');

    useEffect(()=>{
      async function fetchData(){
        const request=await axios.get(fetchUrl)
        setMovies(request.data.results);
        return request
      }
      fetchData()
    },[fetchUrl]);

    const opts={
        height:'390',
        width:'100%',
        playerVars:{
            autoplay:1
        }
    }

    const handleClick=(movie)=>{
        if(trailerUrl){
            setTrailerUrl('');
        }
        else{
            movieTrailer(movie?.title || movie?.name || movie?.original_name || '')
            .then((url=>{
                const urlparams=new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlparams.get('v'))
            })).catch((err)=>console.log(err))
        }
    }

    return (
        <div className='row'>
            <h1>{title}</h1>
            <div className='row_posters'>
                {movies.map((movie)=>(
                    <img 
                        key={movie.id}
                        onClick={()=>handleClick(movie)}
                        className={`row_poster ${isLarge && 'row_posterLarge'}`}
                        src={`${baseUrl}${isLarge ? movie.poster_path: movie.backdrop_path}`} 
                        alt={movie.name}/>
                    ))}
            </div>
            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts}/>}
        </div>
    )
}

export default Row
