import { useEffect, useState } from "react";
import Imdbcard from "./Imdbcard";

const Imdblist = () => {
    const [movies,setmovies] = useState([]);

    useEffect(()=>{
        fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=9f48a5b363c49e0c31bf3d09bb319827")
        .then(res => res.json())
        .then(data => setmovies(data.results));
    },[]) 
    
    return ( 
        <div className="movie-list">
            {
                movies?.map(movie=>{
                    return (<Imdbcard movie={movie}/> )
                })
            }
        </div>
    ); 
};

export default Imdblist;
