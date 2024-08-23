import { useEffect, useMemo, useState } from "react";
import Imdbcard from "./Imdbcard";
import Pagination from "./Pagination";

const Imdblist = () => { 
    const [movies,setmovies] = useState([]);
    const [watchlist , setwatchlist] = useState(()=>{
        const favouritesData = localStorage.getItem("favourites") || "[]" ;
        return (JSON.parse(favouritesData)) ; 
    });

    const fetchmovies = (pageno) => {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=9f48a5b363c49e0c31bf3d09bb319827&page=${pageno}`)
        .then(res => res.json())
        .then(data => setmovies(data.results));
    }

    const popularmoviecount = useMemo(()=>
        movies.filter((movie)=>{
            return movie.popularity > 220 ; 
        })
    ,[movies]) ;  
        

    useEffect(()=>{
        fetchmovies(1) ; 
    },[]) 
    
    return ( 
        <>
        <div>
        Total WatchList : {watchlist.length} 
        </div>
        <p>Popular Movies popularity above 220 : {popularmoviecount.length}</p>
        <div className="movie-list">
            {
                movies?.map(movie=>{
                    return (<Imdbcard movie={movie} onwatchlistupdate={setwatchlist} watchlist={watchlist}/> )
                })
            }
        </div>
        <Pagination onPageChange={fetchmovies}/>  
        </>
    ); 
};

export default Imdblist;
