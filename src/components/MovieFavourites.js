import { useEffect, useState } from "react";

let genreids = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

const MovieFavourite = () => {
  const [favourites, setfavourites] = useState([]);
  const [genres, setgenres] = useState([]);
  const [filterfavourites, setfilterfavourites] = useState([]);
  const [selectedGenreId, setselectedgenreId] = useState("");

  useEffect(() => {
    const favouritesData = JSON.parse(localStorage.getItem("favourites") || "[]");
    const genresdata = favouritesData.map((data) => data.genre_ids[0]);
    setgenres(Array.from(new Set(genresdata)));
    setfavourites(favouritesData);
    setfilterfavourites(favouritesData);
  }, []);

  const handlegenreselection = (e) => {
    const id = e.target.dataset.id;
    setselectedgenreId(id);
  };

  useEffect(() => {
    setfilterfavourites(() => {
      return selectedGenreId === ""
        ? favourites
        : favourites.filter((movie) => movie.genre_ids[0] == selectedGenreId);
    });
  }, [selectedGenreId, favourites]);

  const removeFromFavourites = (movieId) => {
    const updatedFavourites = favourites.filter((fav) => fav.id !== movieId);
    setfavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  };

  const handlesearch = (e) => {
    const text = e.target.value ;
    setfilterfavourites(()=>{
        return favourites.filter(movie => movie.title.toLowerCase().includes(text.toLowerCase())) ;
    })
  }

  const handlesorting = (e) => {
    const sortingtype = e.target.dataset.type ;
    setfilterfavourites(() => {
        if (!sortingtype){
            return favourites;
        }
        else {
            return [...favourites].sort((a,b)=>{
                return sortingtype === "asc" ? a.popularity - b.popularity : b.popularity - a.popularity ;
            })
        }
    })
  }

  return (
    <>
      <h1>Favourite Movies</h1>
      <div className="favourite-wrapper">
        <div className="left-section">
          <div className="genre-wrapper">
            <div
              className={`genre ${selectedGenreId === "" ? "selected" : ""}`}
              onClick={handlegenreselection}
              data-id=""
              key="all-genres"
            >
              All Genres
            </div>
            {genres.map((genreId) => (
              <div
                className={`genre ${selectedGenreId == genreId ? "selected" : ""}`}
                data-id={genreId}
                onClick={handlegenreselection}
                key={genreId}
              >
                {genreids[genreId]}
              </div>
            ))}
          </div>
        </div>
        <div className="right-section">
        <input type="text" placeholder="search movie" onChange={handlesearch}></input> 
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Genre</th>
                <th> <span data-type="" onClick={handlesorting} >Popularity</span>  <button data-type="asc" onClick={handlesorting}>Asc</button> 
                <button data-type="desc" onClick={handlesorting}>Desc</button>
                </th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filterfavourites.map((favourite) => (
                <tr key={favourite.id}>
                  <td>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${favourite.poster_path}`}
                      style={{ width: "80px" }}
                      alt=""
                    />
                  </td>
                  <td>{favourite.title}</td>
                  <td>{genreids[favourite.genre_ids[0]]}</td>
                  <td>{favourite.popularity}</td>
                  <td>{favourite.vote_average}</td>
                  <td>
                    <div
                      className="deleteBtn"
                      onClick={() => removeFromFavourites(favourite.id)}
                    >
                      Delete
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MovieFavourite;
