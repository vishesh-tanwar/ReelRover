import { useEffect, useMemo, useState } from "react";
import Imdbcard from "./Imdbcard";
import Pagination from "./Pagination";

const Imdblist = () => { 
    const [movies,setmovies] = useState([]);
    const [watchlist , setwatchlist] = useState(()=>{
        const favouritesData = localStorage.getItem("favourites") || "[]" ;
        return (JSON.parse(favouritesData)) ; 
    });

    const generateFixedPrice = (title) => {
        const seed = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return Math.floor((seed % 30) + 20);
    };

    const fetchmovies = (pageno) => {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=9f48a5b363c49e0c31bf3d09bb319827&page=${pageno}`)
        .then(res => res.json())
        .then(data => {
            const movieWithPrice = data.results.map((movie)=>({
                ...movie, price : generateFixedPrice(movie.title),
            }));
            setmovies(movieWithPrice) ; 
        });        
        console.log(movies);
        
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
        <div style={{backgroundColor:"black"}}>
        <div className="text">
        Total WatchList : {watchlist.length} 
        </div>
        <p className="text">Popular Movies popularity above 220 : {popularmoviecount.length}</p>
        <div className="movie-list">
            {
                movies?.map(movie=>{
                    return (<Imdbcard movie={movie} onwatchlistupdate={setwatchlist} watchlist={watchlist}/> )
                })
            }
        </div>
        <Pagination onPageChange={fetchmovies}/>  
        </div>
    ); 
};

export default Imdblist;
